import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import givingRoutes from './routes/givings.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({
  logger: true
});

// Register plugins
await app.register(cors, {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true
});

await app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

await app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads/',
  decorateReply: false
});

// Register routes
await app.register(authRoutes, { prefix: '/api/auth' });
await app.register(userRoutes, { prefix: '/api/users' });
await app.register(givingRoutes, { prefix: '/api/givings' });

// Health check
app.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000');
    const host = process.env.HOST || '127.0.0.1';
    
    await app.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
