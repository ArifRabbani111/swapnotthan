# Run the frontend

## "Cannot find module '../server/require-hook'" or similar Next.js errors

Next.js 15 works best with **Node.js 18, 20, or 22**. If you're on **Node 24**, switch to Node 20 LTS:

- **With nvm:** `nvm install 20` then `nvm use 20`
- **Without nvm:** Install Node 20 LTS from [nodejs.org](https://nodejs.org/)

Then from the `frontend` folder:

```bash
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
npm install
npm run dev
```

---

## Quick fix: Connection Failed / ERR_CONNECTION_RESET

If the browser shows **Connection Failed** on localhost:3000 or 3002:

1. **Stop all Node processes** (so one clean server can run):
   ```bash
   taskkill /F /IM node.exe
   ```
2. **Start the frontend with a clean lock:**
   ```bash
   cd "c:\Users\Dell\OneDrive\Documents\Chat App\swapnotthan\frontend"
   npm run dev:fresh
   ```
3. Open the URL shown in the terminal (usually **http://localhost:3000**).

---

## "Unable to acquire lock" or "another instance of next dev running"

Another `npm run dev` is already running. Do one of the following:

1. **Use the existing server**  
   Open the URL shown in the other terminal (e.g. http://localhost:3000 or http://localhost:3002).

2. **Stop the other server and start a single one**  
   - In the terminal where `npm run dev` is running, press **Ctrl+C**.  
   - From the `frontend` folder run again:
     ```bash
     cd frontend
     npm run dev
     ```

3. **If you don't see that terminal** (Windows):  
   - Open Task Manager (Ctrl+Shift+Esc) → find **Node.js** or **node** → End task.  
   - Or in a new terminal run:
     ```bash
     taskkill /F /IM node.exe
     ```
   - Then run `npm run dev` again from the `frontend` folder.

## Port 3000 in use

If you see "Port 3000 is in use... using port 3002", either:

- Use **http://localhost:3002** in the browser, or  
- Free port 3000 by stopping the process that uses it, then restart `npm run dev`.

## Turbopack / lockfile warning

The config is set so Turbopack uses the frontend folder as the project root. Always run `npm run dev` from inside the **frontend** folder:

```bash
cd frontend
npm run dev
```

Then open **http://localhost:3000** (or the port shown in the terminal).
