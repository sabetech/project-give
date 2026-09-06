import type { FastifyInstance } from 'fastify';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';
import type { User } from '../types.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function userRoutes(fastify: FastifyInstance) {
  // Get user by ID
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const [users] = await pool.execute(
      'SELECT id, email, name, avatar, verified, created, updated FROM users WHERE id = ?',
      [id]
    );

    const userArray = users as User[];
    if (userArray.length === 0) {
      return reply.status(404).send({ error: 'User not found' });
    }

    return userArray[0];
  });

  // Update user (avatar)
  fastify.patch('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { userId } = request.user!;

    // Only allow users to update their own profile
    if (id !== userId) {
      return reply.status(403).send({ error: 'Forbidden' });
    }

    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: 'No file uploaded' });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'avatars', id);
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate filename
    const ext = path.extname(data.filename) || '.jpg';
    const filename = `avatar${ext}`;
    const filepath = path.join(uploadsDir, filename);

    // Save file
    const buffer = await data.toBuffer();
    await fs.writeFile(filepath, buffer);

    // Update user in database
    await pool.execute(
      'UPDATE users SET avatar = ? WHERE id = ?',
      [filename, id]
    );

    return { success: true, avatar: filename };
  });
}
