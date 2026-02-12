# Go live: GitHub + Vercel

## 1. Push to GitHub

From the project root:

```bash
cd "c:\Users\Dell\OneDrive\Documents\Chat App\swapnotthan"
git add -A
git status
git commit -m "Project complete: frontend Next.js 15, fixes, deploy-ready"
git push origin main
```

- **No remote yet?** `git remote add origin https://github.com/YOUR_USERNAME/swapnotthan.git`
- **Push asks for login?** Use a [Personal Access Token](https://github.com/settings/tokens) as password, or `gh auth login`.

---

## 2. Deploy on Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in (use “Continue with GitHub”).
2. **Import** your GitHub repo (`YOUR_USERNAME/swapnotthan`).
3. **Root Directory:** Click **Edit**, set to **`frontend`**, then **Continue**.
4. **Environment Variables** (add before first deploy):

   | Name | Value |
   |------|--------|
   | `AUTH_SECRET` or `NEXTAUTH_SECRET` | `openssl rand -base64 32` (run locally to generate) |
   | `NEXTAUTH_URL` | `https://YOUR-PROJECT.vercel.app` (replace with your Vercel URL after first deploy) |
   | `DATABASE_URL` | Optional. PostgreSQL URL (Vercel Postgres, Neon, Supabase) for events, donations, etc. |
   | `AUTH_GOOGLE_ID` | Optional. From [Google Cloud Console](https://console.cloud.google.com/) |
   | `AUTH_GOOGLE_SECRET` | Optional. From Google Cloud Console |

5. Click **Deploy**. Wait for the build to finish.
6. After deploy, set **NEXTAUTH_URL** in Vercel to your live URL (e.g. `https://swapnotthan.vercel.app`) and redeploy if you changed it.

Your app will be live at `https://YOUR-PROJECT.vercel.app`.

---

## 3. Backend (optional)

The **backend** (Express + MongoDB) is not on Vercel. To use it:

- Deploy backend on **Railway**, **Render**, or similar.
- Add `MONGO_URI`, `JWT_SECRET`, etc. there.
- Point frontend API calls to the backend URL if needed.
