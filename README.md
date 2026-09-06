# Give

A church giving and donation tracking app built with React, TypeScript, and Fastify.

## Features

- Google OAuth2 authentication
- Record tithes, offerings, and other donations
- View giving history
- Profile management with Google profile picture

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4, Ant Design Mobile
- **Backend:** Node.js, Fastify
- **Database:** MySQL
- **State Management:** React Query (TanStack Query)
- **Routing:** React Router 7

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL server

### Setup

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Set up MySQL database:
   ```bash
   mysql -u root < server/src/schema.sql
   ```

4. Configure environment variables:
   - Copy `server/.env.example` to `server/.env` and update the values
   - Copy `.env.example` to `.env` and update the values

5. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   npm run dev
   ```

7. Open [http://127.0.0.1:5173](http://127.0.0.1:5173)

### Google OAuth2 Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable the Google+ API
3. Create OAuth 2.0 credentials (Web application)
4. Add `http://127.0.0.1:3000/api/auth/google/callback` as an authorized redirect URI
5. Add your Google Client ID and Secret to `server/.env`

## Project Structure

```
├── server/                 # Backend API
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/      # Auth middleware
│   │   ├── utils/          # Utility functions
│   │   ├── db.ts           # Database connection
│   │   ├── index.ts        # Server entry point
│   │   └── schema.sql      # Database schema
│   └── uploads/            # File uploads
├── src/                    # Frontend React app
│   ├── auth/               # Login page
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API client config
│   ├── pages/              # Page components
│   ├── routes/             # Route definitions
│   ├── services/           # API service functions
│   └── types/              # TypeScript type definitions
└── README.md
```

## Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend

| Command | Description |
|---------|-------------|
| `cd server && npm run dev` | Start backend server |
| `cd server && npm run build` | Build for production |
| `cd server && npm start` | Start production server |
