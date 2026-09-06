import type { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/jwt.js';
import type { JWTPayload } from '../types.js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPayload;
  }
}

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    return reply.status(401).send({ error: 'Invalid or expired token' });
  }

  request.user = payload;
};
