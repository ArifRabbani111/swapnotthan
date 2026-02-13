# Admin setup – frontend and backend

There are **two** admin flows in this project.

---

## 1. Frontend admin (Next.js dashboard)

**Used for:** Website admin panel at `/login` → `/dashboard` (events, members, gallery, news, etc.)

**Auth:** Firebase (email/password + Google).

### Setup

1. **Firebase** – Add your Firebase config to `frontend/.env.local` (see `frontend/FIREBASE_SETUP.md`).
2. **Admin user** – In Firebase Console → Authentication → Add user:
   - Email: `admin@swapnotthan.com`
   - Password: `Admin@123` (or your choice).
3. **AUTH_SECRET** – Already in `frontend/.env.local` for server-side auth.
4. Run frontend: `cd frontend && npm run dev` → open **http://localhost:3000/login**.

### Summary

- Login: **http://localhost:3000/login**
- Dashboard: **http://localhost:3000/dashboard**
- Logout: Sidebar → Log out (Firebase sign-out).

---

## 2. Backend admin (Express API)

**Used for:** Backend API routes that require a JWT (e.g. `/api/admin/*`, protected routes).

**Auth:** JWT signed with `JWT_SECRET`. Clients get a token by calling `/api/auth/login` with admin email/password (MongoDB admin).

### Setup

1. **Backend `.env`** – In `backend/` create or edit `.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/swapnotthan?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

2. **JWT_SECRET** – Must be set. For production use a long random string (e.g. `openssl rand -base64 32`). If missing in production, the server returns an error.
3. **MongoDB** – `MONGO_URI` must point to your MongoDB (e.g. Atlas).
4. **Create an admin** – Register via API, e.g.:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Admin\",\"email\":\"admin@example.com\",\"password\":\"YourPassword123\"}"
   ```
   Then login to get a JWT:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"YourPassword123\"}"
   ```
5. Run backend: `cd backend && npm run dev` → API at **http://localhost:5000**.

### Summary

- Register: `POST /api/auth/register` (name, email, password).
- Login: `POST /api/auth/login` (email, password) → returns `token`.
- Use token: `Authorization: Bearer <token>` on protected routes.

---

## Quick reference

| Item            | Frontend admin      | Backend admin        |
|-----------------|---------------------|----------------------|
| Env file        | `frontend/.env.local` | `backend/.env`     |
| Secret          | `AUTH_SECRET`       | `JWT_SECRET`         |
| Auth            | Firebase            | JWT (MongoDB admin)  |
| Login URL       | `/login`            | `POST /api/auth/login` |
| Docs            | `frontend/FIREBASE_SETUP.md` | This file (backend section) |

---

## Troubleshooting

- **Frontend: "Firebase is not configured"** – Add all `NEXT_PUBLIC_FIREBASE_*` vars to `frontend/.env.local` and restart dev server.
- **Frontend: Google sign-in not working** – In Firebase Console → Authentication → Google, add your Web client ID and Web client secret.
- **Backend: "JWT_SECRET must be set"** – Add `JWT_SECRET` to `backend/.env` (use a long random string in production).
- **Backend: 401 Unauthorized** – Send a valid JWT in the `Authorization: Bearer <token>` header.
