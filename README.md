# Give

A church giving and donation tracking app built with React, TypeScript, and PocketBase.

## Features

- Google OAuth2 authentication
- Record tithes, offerings, and other donations
- View giving history
- Profile management with Google profile picture

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4, Ant Design Mobile
- **Backend:** PocketBase (self-hosted)
- **State Management:** React Query (TanStack Query)
- **Routing:** React Router 7

## Getting Started

### Prerequisites

- Node.js 18+
- PocketBase binary

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start PocketBase:
   ```bash
   ./bin/pocketbase serve --dev --http=127.0.0.1:8091
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://127.0.0.1:5173](http://127.0.0.1:5173)

### Google OAuth2 Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable the Google+ API
3. Create OAuth 2.0 credentials (Web application)
4. Add `http://127.0.0.1:8091/api/oauth2-redirect` as an authorized redirect URI
5. Add your Google Client ID and Secret to PocketBase via the admin UI or bootstrap hook

## Project Structure

```
src/
  auth/           # Login page
  components/     # Reusable UI components
  hooks/          # Custom React hooks (auth, data fetching)
  lib/            # PocketBase client config
  pages/          # Page components (Home, Payment, History, Settings)
  routes/         # Route definitions
  services/       # API service functions
  types/          # TypeScript type definitions
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
