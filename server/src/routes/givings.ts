import type { FastifyInstance } from 'fastify';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { generateId } from '../utils/id.js';
import type { Giving, GivingWithUser, User } from '../types.js';

export default async function givingRoutes(fastify: FastifyInstance) {
  // Create a new giving
  fastify.post('/', { preHandler: [authenticate] }, async (request, reply) => {
    const { userId } = request.user!;
    const { amount, type, date, description } = request.body as {
      amount: number;
      type: 'offering' | 'tithe' | 'pledge';
      date: string;
      description?: string;
    };

    if (!amount || amount <= 0) {
      return reply.status(400).send({ error: 'Invalid amount' });
    }

    if (!type || !['offering', 'tithe', 'pledge'].includes(type)) {
      return reply.status(400).send({ error: 'Invalid giving type' });
    }

    if (!date) {
      return reply.status(400).send({ error: 'Date is required' });
    }

    const id = generateId();
    await pool.execute(
      'INSERT INTO givings (id, user_id, amount, type, date, description) VALUES (?, ?, ?, ?, ?, ?)',
      [id, userId, amount, type, date, description || null]
    );

    return { success: true, id };
  });

  // List givings (paginated, with user expand)
  fastify.get('/', { preHandler: [authenticate] }, async (request, reply) => {
    const { userId } = request.user!;
    const { page = 1, perPage = 30, sort = '-date,-created' } = request.query as {
      page?: number;
      perPage?: number;
      sort?: string;
    };

    const offset = (page - 1) * perPage;

    // Parse sort parameter
    const sortFields = sort.split(',').map(s => {
      const desc = s.startsWith('-');
      const field = desc ? s.substring(1) : s;
      return { field, desc };
    });

    const orderBy = sortFields.map(s => `${s.field} ${s.desc ? 'DESC' : 'ASC'}`).join(', ');

    // Get total count
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM givings WHERE user_id = ?',
      [userId]
    );
    const total = (countResult as any[])[0].total;

    // Get givings with user data
    const [givings] = await pool.execute(
      `SELECT g.*, 
              u.id as user_id, u.email as user_email, u.name as user_name, 
              u.avatar as user_avatar, u.verified as user_verified,
              u.created as user_created, u.updated as user_updated
       FROM givings g
       LEFT JOIN users u ON g.user_id = u.id
       WHERE g.user_id = ?
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
      [userId, perPage, offset]
    );

    // Transform results
    const items = (givings as any[]).map(row => ({
      id: row.id,
      user_id: row.user_id,
      amount: Number(row.amount),
      type: row.type,
      date: row.date,
      description: row.description,
      created: row.created,
      updated: row.updated,
      expand: {
        user: row.user_id ? {
          id: row.user_id,
          email: row.user_email,
          name: row.user_name,
          avatar: row.user_avatar,
          verified: row.user_verified,
          created: row.user_created,
          updated: row.user_updated
        } : null
      }
    }));

    return {
      items,
      page,
      perPage,
      totalItems: total,
      totalPages: Math.ceil(total / perPage)
    };
  });

  // Get single giving
  fastify.get('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { userId } = request.user!;

    const [givings] = await pool.execute(
      `SELECT g.*, 
              u.id as user_id, u.email as user_email, u.name as user_name, 
              u.avatar as user_avatar, u.verified as user_verified,
              u.created as user_created, u.updated as user_updated
       FROM givings g
       LEFT JOIN users u ON g.user_id = u.id
       WHERE g.id = ? AND g.user_id = ?`,
      [id, userId]
    );

    const givingArray = givings as any[];
    if (givingArray.length === 0) {
      return reply.status(404).send({ error: 'Giving not found' });
    }

    const row = givingArray[0];
    return {
      id: row.id,
      user_id: row.user_id,
      amount: Number(row.amount),
      type: row.type,
      date: row.date,
      description: row.description,
      created: row.created,
      updated: row.updated,
      expand: {
        user: row.user_id ? {
          id: row.user_id,
          email: row.user_email,
          name: row.user_name,
          avatar: row.user_avatar,
          verified: row.user_verified,
          created: row.user_created,
          updated: row.user_updated
        } : null
      }
    };
  });

  // Delete giving
  fastify.delete('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { userId } = request.user!;

    const [result] = await pool.execute(
      'DELETE FROM givings WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if ((result as any).affectedRows === 0) {
      return reply.status(404).send({ error: 'Giving not found' });
    }

    return { success: true };
  });
}
