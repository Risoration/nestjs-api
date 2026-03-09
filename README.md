# My Podcast

A full-stack podcast discovery and management application. Browse podcasts, save favourites, get personalized recommendations, and explore episodes with topic tagging.

## Tech Stack

- **API**: NestJS 11, TypeScript, Prisma, PostgreSQL
- **Client**: Next.js 16, React 19, Tailwind CSS 4
- **Auth**: JWT (Passport)
- **External APIs**: [Listen Notes Podcast API](https://www.listennotes.com/api/)

## Project Structure

```
nestjs-api/
├── my-podcast-api/     # NestJS backend
│   ├── prisma/         # Database schema & migrations
│   └── src/
│       ├── auth/       # Registration, login, JWT
│       ├── podcast/    # Podcast search, favourites, recommendations
│       ├── episode/    # Episode management
│       ├── topics/     # Topic tagging
│       ├── user/       # User profile
│       ├── rss/        # RSS feed parsing
│       └── prisma/     # Database client
└── my-podcast-client/  # Next.js frontend
```

## Prerequisites

- Node.js 18+
- PostgreSQL
- [Listen Notes](https://www.listennotes.com/) API key (free tier available)

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd nestjs-api
```

### 2. API setup

```bash
cd my-podcast-api
npm install
```

Create a `.env` file in `my-podcast-api/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/my_podcast"
JWT_SECRET="your-secret-key"
API_TOKEN="your-listen-notes-api-key"
PORT=3001
```

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Client setup

```bash
cd my-podcast-client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 4. Run the application

**Terminal 1 – API**
```bash
cd my-podcast-api
npm run start:dev
```

**Terminal 2 – Client**
```bash
cd my-podcast-client
npm run dev
```

- **API**: http://localhost:3001
- **Client**: http://localhost:3000

## API Overview

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/register` | POST | No | Create account |
| `/auth/login` | POST | No | Login |
| `/podcasts/search?q=` | GET | No | Search podcasts (Listen Notes) |
| `/podcasts` | GET | No | List all podcasts |
| `/podcasts` | POST | JWT | Add podcast to library |
| `/podcasts/:id` | GET | No | Podcast details with episodes |
| `/podcasts/favourites` | GET | JWT | User's favourite genres |
| `/podcasts/recommendations` | GET | JWT | Personalized recommendations |

## Environment Variables

### API (`my-podcast-api/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for signing JWT tokens |
| `API_TOKEN` | Yes | Listen Notes Podcast API key |
| `PORT` | No | Default: 3001 |

### Client (`my-podcast-client/.env.local`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | API base URL (e.g. `http://localhost:3001`) |

## Scripts

### API
- `npm run start:dev` – Dev server with hot reload
- `npm run build` – Production build
- `npm run test` – Unit tests

### Client
- `npm run dev` – Dev server
- `npm run build` – Production build
- `npm run start` – Start production server

## License

UNLICENSED
