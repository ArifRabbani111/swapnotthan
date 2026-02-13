# Firebase login setup (admin panel)

The admin panel uses **Firebase Authentication** for login.

**Project:** Swanpnottan (ID: `swanpnottan`, Project #: 499847191619)  
**Support email:** esoftware30@gmail.com  
Config is loaded from `frontend/.env.local` (NEXT_PUBLIC_FIREBASE_*). Do not commit real keys to git.

---

## 1. Create a Firebase project

1. Go to **[Firebase Console](https://console.firebase.google.com/)**.
2. Click **Add project** (or use an existing one).
3. Enter a project name (e.g. **Swapnotthan**) → **Continue** → finish the wizard.

---

## 2. Enable Authentication

1. In the left sidebar, open **Build** → **Authentication**.
2. Click **Get started**.
3. Open the **Sign-in method** tab.
4. Enable:
   - **Email/Password** — turn on **Email/Password** (first toggle), then **Save**.
   - **Google** — click **Google**, turn **Enable** on, then under **Web SDK configuration** enter:
     - **Web client ID:** (from Google Cloud Console → APIs & Services → Credentials → your OAuth 2.0 Web client)
     - **Web client secret:** (same OAuth client’s secret)
     - Choose a **Project support email**, then **Save**.

---

## 3. Get your config

1. Click the **gear icon** next to “Project Overview” → **Project settings**.
2. Scroll to **Your apps**.
3. Click the **Web** icon (`</>`) to add a web app (or use an existing one).
4. Register app with a nickname (e.g. “Swapnotthan Web”) → **Register app**.
5. Copy the `firebaseConfig` object. You’ll need:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## 4. Add config to the app

1. In the **frontend** folder, create or edit **`.env.local`**.
2. Add (replace with your values):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. Restart the dev server: `npm run dev`.

---

## 5. Create admin user (email/password)

1. In **Firebase Console** → **Authentication** → **Users**.
2. Click **Add user**.
3. Use:
   - **Email:** `admin@swapnotthan.com`
   - **Password:** `Admin@123` (or your choice; min 6 characters)
4. Click **Add user**.

You can now sign in at `/login` with this email and password. You can add Google sign-in later in the same **Sign-in method** tab if you want.

---

## 6. Test

1. Open **http://localhost:3000/login**.
2. **Email/Password:** Sign in with `admin@swapnotthan.com` / `Admin@123` (or create another account via “Create one”).
3. **Google:** Click **Google** if you enabled it.
4. You should be redirected to **/dashboard**.

---

## Production (Vercel)

Add the same `NEXT_PUBLIC_*` variables in **Vercel** → your project → **Settings** → **Environment Variables**, then redeploy.

In **Firebase Console** → **Authentication** → **Settings** → **Authorized domains**, add your production domain (e.g. `your-app.vercel.app`).

---

## Summary

- **AUTH_SECRET** is in `.env.local` for server-side auth; generate a new one for production (`openssl rand -base64 32`).
- **Email/Password** and **Google** sign-in are enabled on the login page.
- Default admin: create user **admin@swapnotthan.com** with password **Admin@123** in Firebase (step 5).
- Dashboard is protected: if you’re not logged in with Firebase, you’re redirected to `/login`.
- Logout (sidebar) signs out from Firebase and sends you to the home page.
