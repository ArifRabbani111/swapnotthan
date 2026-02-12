# Deploy on Vercel

## 1. Push to GitHub

From the project root:

```bash
git add -A
git commit -m "Prepare for Vercel deploy"
git push origin main
```

(If you haven’t set a remote: `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`)

---

## 2. Import project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repo.
3. **Important:** Set **Root Directory** to **`frontend`**:
   - Click **Edit** next to “Root Directory”.
   - Enter `frontend` and confirm.
4. Add **Environment Variables** (before deploying):

   | Name | Description |
   |------|-------------|
   | `DATABASE_URL` | PostgreSQL connection string (Vercel Postgres, Neon, Supabase, etc.) |
   | `AUTH_SECRET` or `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | Your Vercel URL, e.g. `https://your-project.vercel.app` |
   | `AUTH_GOOGLE_ID` | From [Google Cloud Console](https://console.cloud.google.com/) (OAuth) |
   | `AUTH_GOOGLE_SECRET` | From Google Cloud Console (OAuth) |

5. Click **Deploy**. Vercel will run `npm install` and `npm run build` inside `frontend/`.

---

## 3. Backend (optional)

The **`backend/`** folder (Express + MongoDB) is not deployed with Vercel. To use it:

- Deploy it on **Railway**, **Render**, or another Node host.
- Set `MONGO_URI`, `JWT_SECRET`, etc. in that host’s environment.
- Point your frontend API calls to that backend URL.
