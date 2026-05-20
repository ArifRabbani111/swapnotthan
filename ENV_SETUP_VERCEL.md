# Environment Variables Setup Guide

## Files Created/Updated

### 1. `.env.production` (Frontend)
Location: `frontend/.env.production`

This file contains all production environment variables with:
- ✅ **Generated AUTH_SECRET**: `8e+VkJpZrlGCgCj5iTorrfYS5eh+G/2dsr4gsBlzA9w=`
- ✅ **Firebase Credentials**: Already populated from your local config
- ✅ **NEXTAUTH_URL**: Set to `https://swapnotthan-delta.vercel.app`
- ℹ️ **DATABASE_URL**: Placeholder (optional - set if using PostgreSQL)

### 2. `vercel.json` (Updated)
Added environment variables configuration with references to Vercel secrets.

---

## Next Steps: Add Environment Variables to Vercel Dashboard

### Where to Add (Vercel Dashboard):

1. **Go to**: https://vercel.com/arif-rabbani/swapnotthan
2. **Navigate to**: Settings → Environment Variables
3. **Add these variables** (copy values from `.env.production`):

| Variable Name | Value | Type |
|---|---|---|
| `AUTH_SECRET` | `8e+VkJpZrlGCgCj5iTorrfYS5eh+G/2dsr4gsBlzA9w=` | Secret |
| `NEXTAUTH_URL` | `https://swapnotthan-delta.vercel.app` | Plain |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyCmZaPOM9dK_Q0yhcokyTflkh5zfkf7qPM` | Plain |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `swanpnottan.firebaseapp.com` | Plain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `swanpnottan` | Plain |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `swanpnottan.firebasestorage.app` | Plain |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `499847191619` | Plain |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:499847191619:web:a82ebdae4a5c49c93048f6` | Plain |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-EJV998FD8F` | Plain |
| `DATABASE_URL` | (Optional - add PostgreSQL URL if needed) | Secret |

---

## Complete the Setup:

1. ✅ Add all environment variables to Vercel dashboard
2. Redeploy from Vercel → Deployments → Latest → Redeploy
3. Update Firebase Console → Authentication → Authorized Domains → Add `swapnotthan-delta.vercel.app`
4. Test admin login at: https://swapnotthan-delta.vercel.app/login
   - Email: `admin@swapnotthan.com`
   - Password: `Admin@123` (or your Firebase user)

---

## Environment Variable Types in Vercel:

- **Plain**: Public variables (visible in browser) - use for `NEXT_PUBLIC_*`
- **Secret**: Hidden variables - use for `AUTH_SECRET`, `DATABASE_URL`
- **Sensitive**: Extra protected - use for API keys with high risk

All `NEXT_PUBLIC_*` variables are automatically public regardless of type selected.
