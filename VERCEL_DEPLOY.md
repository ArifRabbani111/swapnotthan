# Deploy on Vercel

Code is pushed to GitHub. Deploy the frontend as follows.

---

## 1. Import project on Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**.
2. **Import** your GitHub repo: `najmunnaharhira/swapnotthan`.
3. **Root Directory:** Click **Edit** next to "Root Directory" → enter **`frontend`** → **Continue**.
4. **Environment Variables** (add before or after first deploy):

   | Name | Required | Description |
   |------|----------|-------------|
   | `AUTH_SECRET` | Yes (for login) | Generate: `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | Yes (for auth) | Your live URL, e.g. `https://swapnotthan.vercel.app` (set after first deploy) |
   | `DATABASE_URL` | Optional | PostgreSQL (Vercel Postgres, Neon, Supabase) for events, gallery, admin data |
   | `AUTH_GOOGLE_ID` | Optional | Google OAuth (from [Google Cloud Console](https://console.cloud.google.com/)) |
   | `AUTH_GOOGLE_SECRET` | Optional | Google OAuth secret |

5. Click **Deploy**. Vercel runs `npm install` and `npm run build` inside `frontend/`.

---

## 2. After first deploy

- Copy your deployment URL (e.g. `https://swapnotthan-xxx.vercel.app`).
- In Vercel → **Project → Settings → Environment Variables**, set **`NEXTAUTH_URL`** to that URL (and optionally add `DATABASE_URL`, Google OAuth).
- Redeploy once so auth works: **Deployments** → **⋯** on latest → **Redeploy**.

---

## 3. Deploy from CLI (optional)

```bash
vercel login
cd frontend
vercel
```

Or from repo root (uses root `vercel.json`):

```bash
vercel login
vercel
```

---

## 4. Backend (optional)

The **`backend/`** (Express + MongoDB) is not on Vercel. To use it, deploy to **Railway**, **Render**, or another Node host and set `MONGO_URI`, `JWT_SECRET`, etc. there.
