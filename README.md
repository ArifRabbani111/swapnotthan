# Swapnotthan

Monorepo: **frontend** (Next.js) and **backend** (Express API).

## Project structure

- **`frontend/`** — Next.js app (pages, dashboard, auth). Run and deploy from here.
- **`backend/`** — Express + MongoDB API. Deploy separately (e.g. Railway, Render).

## Getting started

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend (Express)

```bash
cd backend
npm install
# Set MONGO_URI etc. in .env
npm run dev
```

## Deploy on Vercel (frontend only)

1. **Import** the repo at [Vercel](https://vercel.com/new).
2. Set **Root Directory** to **`frontend`** (Project Settings → General).
3. Add **Environment variables** (Settings → Environment Variables):
   - `DATABASE_URL` — PostgreSQL (Vercel Postgres, Neon, Supabase)
   - `AUTH_SECRET` or `NEXTAUTH_SECRET` — e.g. `openssl rand -base64 32`
   - `NEXTAUTH_URL` — `https://your-project.vercel.app`
   - `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` — from [Google Cloud Console](https://console.cloud.google.com/)
4. Deploy. Vercel will run `npm install` and `npm run build` inside `frontend/`.

Deploy the **backend** to Railway, Render, or another Node host.
