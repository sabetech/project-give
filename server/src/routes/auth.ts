import type { FastifyInstance } from 'fastify';
import { google } from 'googleapis';
import pool from '../db.js';
import { generateToken } from '../utils/jwt.js';
import { generateId } from '../utils/id.js';
import { authenticate } from '../middleware/auth.js';
import type { User } from '../types.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export default async function authRoutes(fastify: FastifyInstance) {
  // Get Google OAuth2 URL
  fastify.get('/google', async (request, reply) => {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });

    return { url };
  });

  // Handle Google OAuth2 callback (GET - Google redirects here)
  fastify.get('/google/callback', async (request, reply) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const { code, error } = request.query as { code?: string; error?: string };

    if (error) {
      // Return HTML that posts error back to parent window
      return reply.type('text/html').send(`
        <script>
          if (window.opener) {
            window.opener.postMessage({ error: '${error}' }, '*');
            setTimeout(function() { window.close(); }, 500);
          } else {
            document.body.textContent = 'Error: ${error}';
          }
        </script>
      `);
    }

    if (!code) {
      return reply.type('text/html').send(`
        <script>
          if (window.opener) {
            window.opener.postMessage({ error: 'No code received' }, '*');
            setTimeout(function() { window.close(); }, 500);
          } else {
            document.body.textContent = 'Error: No code received';
          }
        </script>
      `);
    }

    try {
      // Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Get user info from Google
      const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
      const { data: googleUser } = await oauth2.userinfo.get();

      if (!googleUser.id || !googleUser.email) {
        throw new Error('Invalid Google user data');
      }

      // Check if user exists
      const [existingUsers] = await pool.execute(
        'SELECT * FROM users WHERE google_id = ? OR email = ?',
        [googleUser.id, googleUser.email]
      );

      const users = existingUsers as User[];
      let userId: string;

      if (users.length > 0) {
        // Update existing user
        userId = users[0].id;
        await pool.execute(
          'UPDATE users SET name = ?, avatar = ?, google_id = ? WHERE id = ?',
          [googleUser.name || null, googleUser.picture || null, googleUser.id, userId]
        );
      } else {
        // Create new user
        userId = generateId();
        await pool.execute(
          'INSERT INTO users (id, email, name, avatar, google_id, verified) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, googleUser.email, googleUser.name || null, googleUser.picture || null, googleUser.id, true]
        );
      }

      // Generate JWT
      const token = generateToken({ userId, email: googleUser.email });

      // Return HTML that posts token back to parent window
      return reply.type('text/html').send(`
        <script>
          if (window.opener) {
            window.opener.postMessage({ token: '${token}', userId: '${userId}' }, '*');
            setTimeout(function() { window.close(); }, 500);
          } else {
            document.body.textContent = 'Login successful. You can close this window.';
          }
        </script>
      `);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return reply.type('text/html').send(`
        <script>
          if (window.opener) {
            window.opener.postMessage({ error: 'Authentication failed' }, '*');
            setTimeout(function() { window.close(); }, 500);
          } else {
            document.body.textContent = 'Error: Authentication failed';
          }
        </script>
      `);
    }
  });

  // Get current user
  fastify.get('/me', { preHandler: [authenticate] }, async (request, reply) => {
    const { userId } = request.user!;

    const [users] = await pool.execute(
      'SELECT id, email, name, avatar, verified, created, updated FROM users WHERE id = ?',
      [userId]
    );

    const userArray = users as User[];
    if (userArray.length === 0) {
      return reply.status(404).send({ error: 'User not found' });
    }

    return userArray[0];
  });

  // Logout (client-side token removal, but we can invalidate if needed)
  fastify.post('/logout', async () => {
    return { success: true };
  });
}
