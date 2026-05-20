# Google OAuth 2.0 setup for admin login

Follow these steps to enable "Sign in with Google" on the `/login` page.

---

## 1. Create a project in Google Cloud Console

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Sign in with your Google account.
3. Click the project dropdown at the top → **New Project**.
4. Name it (e.g. `Swapnotthan`) → **Create**.

---

## 2. Enable the Google+ API / People API

1. In the left menu go to **APIs & Services** → **Library**.
2. Search for **Google+ API** or **People API**.
3. Open it and click **Enable** (if not already enabled).

---

## 3. Configure the OAuth consent screen

1. Go to **APIs & Services** → **OAuth consent screen**.
2. Choose **External** (so any Google account can sign in) → **Create**.
3. Fill in:
   - **App name:** Swapnotthan (or your app name)
   - **User support email:** your email
   - **Developer contact:** your email
4. Click **Save and Continue**.
5. On **Scopes**, click **Add or Remove Scopes** → add **email**, **profile**, **openid** (they may already be there) → **Update** → **Save and Continue**.
6. On **Test users** (if the app is in "Testing" mode), add the Gmail addresses that will log in (e.g. your admin email).  
   When you’re ready for everyone, you can submit for verification later.
7. Click **Back to Dashboard**.

---

## 4. Create OAuth 2.0 credentials

1. Go to **APIs & Services** → **Credentials**.
2. Click **+ Create Credentials** → **OAuth client ID**.
3. **Application type:** **Web application**.
4. **Name:** e.g. `Swapnotthan Web`.
5. **Authorized JavaScript origins:**
   - Local: `http://localhost:3000` (add more if you use 3001, 3002, etc.)
   - Production: `https://your-domain.vercel.app` (your real Vercel URL)
6. **Authorized redirect URIs:**
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.vercel.app/api/auth/callback/google`
7. Click **Create**.
8. Copy the **Client ID** and **Client Secret** (you’ll use them in the next step).

---

## 5. Add credentials to your app

1. In the **frontend** folder, create or edit **`.env.local`** (this file is not committed to Git).
2. Add or update:

```env
# Required for NextAuth
AUTH_SECRET=your-secret-at-least-32-characters-long
AUTH_GOOGLE_ID=your-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-client-secret

# For local dev (optional; NextAuth can infer it)
NEXTAUTH_URL=http://localhost:3000
```

3. **AUTH_SECRET:** Generate a random string, e.g. run in terminal:
   ```bash
   openssl rand -base64 32
   ```
   and paste the result as `AUTH_SECRET`.
4. **AUTH_GOOGLE_ID:** paste the Client ID from step 4.
5. **AUTH_GOOGLE_SECRET:** paste the Client secret from step 4.
6. Save the file and **restart the dev server** (`npm run dev`).

---

## 6. Test

1. Open **http://localhost:3000/login**.
2. Click **Google**.
3. You should be redirected to Google sign-in, then back to **/dashboard** after a successful login.

---

## Production (Vercel)

1. In **Vercel** → your project → **Settings** → **Environment Variables**, add:
   - `AUTH_SECRET` (same or new secret).
   - `AUTH_GOOGLE_ID` (same Client ID).
   - `AUTH_GOOGLE_SECRET` (same Client secret).
   - `NEXTAUTH_URL` = your live URL, e.g. `https://swapnotthan.vercel.app`.
2. In Google Cloud Console, add your **production** URL to **Authorized JavaScript origins** and **Authorized redirect URIs** (as in step 4).
3. Redeploy the project on Vercel.

---

## Troubleshooting

- **"Redirect URI mismatch"**  
  The redirect URI in the browser must exactly match one of the **Authorized redirect URIs** in the Google OAuth client (including `http` vs `https` and port).

- **"Access blocked: This app's request is invalid"**  
  Check that the consent screen is configured and that you added your email (or the user’s email) under **Test users** if the app is in Testing mode.

- **Google button does nothing or 500**  
  Ensure `.env.local` has `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET`, and that you restarted the dev server after changing env.
