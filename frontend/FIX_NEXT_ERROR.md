# Fix: "Cannot find module '../server/require-hook'"

This happens when **Node.js is too new** (e.g. v24) or **node_modules is broken** (e.g. OneDrive locked files).

## Option 1: Use Node.js 20 LTS (recommended)

1. Install **Node.js 20 LTS** from [nodejs.org](https://nodejs.org) (or use `nvm`: `nvm install 20` then `nvm use 20`).
2. In a **new terminal**, go to the frontend folder and reinstall:

   ```bash
   cd frontend
   rd /s /q node_modules
   del package-lock.json
   npm install
   npm run dev
   ```

   (Use `rd /s /q node_modules` on Windows CMD, or `Remove-Item -Recurse -Force node_modules` in PowerShell.)

## Option 2: Clean reinstall (keep Node 24)

1. **Close Cursor/VS Code** and any terminal using this folder (so nothing locks files).
2. Open **Command Prompt** or **PowerShell** as usual (no need to run as Admin).
3. Run:

   ```bash
   cd "c:\Users\Dell\OneDrive\Documents\Chat App\swapnotthan\frontend"
   rd /s /q node_modules
   del package-lock.json
   npm install
   npm run dev
   ```

If `rd /s /q node_modules` fails because "directory is not empty", move the project out of OneDrive temporarily (e.g. to `C:\Projects\swapnotthan`), then run the same steps there.

## Summary

- Use **Node 18 or 20** for best compatibility with Next.js.
- A **clean** `node_modules` (delete + `npm install`) fixes the missing `require-hook` error.
