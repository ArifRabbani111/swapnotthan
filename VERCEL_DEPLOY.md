# Deploy on Vercel

Code is pushed to GitHub. Deploy the frontend as follows.

---

## 1. Import project on Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**.
2. **Import** your GitHub repo: `najmunnaharhira/swapnotthan`.
3. **Root Directory:** Click **Edit** next to "Root Directory" → enter **`frontend`** → **Continue**.
4. **Environment Variables** — add these so the site and **admin login** work:

   | Name | Required | Description |
   |------|----------|-------------|
   | `AUTH_SECRET` | Yes | Generate: `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | Yes (set after 1st deploy) | Your live URL, e.g. `https://your-app.vercel.app` |
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | Yes (admin login) | From Firebase Console → Project settings |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Yes | e.g. `swanpnottan.firebaseapp.com` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Yes | e.g. `swanpnottan` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Yes | From Firebase config |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Yes | From Firebase config |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | Yes | From Firebase config |
   | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Optional | For Analytics |
   | `DATABASE_URL` | Optional | PostgreSQL for events/members/gallery data |

5. Click **Deploy**. Vercel runs `npm install` and `npm run build` inside `frontend/`.

---

## 2. After first deploy

- Copy your deployment URL (e.g. `https://swapnotthan-xxx.vercel.app`).
- In Vercel → **Project → Settings → Environment Variables**, add **`NEXTAUTH_URL`** = your deployment URL.
- In **Firebase Console** → Authentication → Settings → **Authorized domains**, add your Vercel domain (e.g. `your-app.vercel.app`).
- **Redeploy**: Deployments → **⋯** on latest → **Redeploy** (so env and auth work).
- Admin login: open **https://your-app.vercel.app/login** and sign in with Firebase (email or Google).

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
