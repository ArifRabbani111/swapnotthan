# Upload to GitHub

Run these commands **in a terminal** from the project root:

```bash
cd "c:\Users\Dell\OneDrive\Documents\Chat App\swapnotthan"

git add -A
git status
git commit -m "Complete frontend: news, gallery, terms, contact form; backend MongoDB Atlas; Next.js config fixes"
git push origin main
```

## If you don't have a GitHub repo yet

1. Create a new repository on [github.com/new](https://github.com/new) (e.g. `swapnotthan`).
2. Do **not** initialize with README (you already have files).
3. Then run:

```bash
cd "c:\Users\Dell\OneDrive\Documents\Chat App\swapnotthan"
git remote add origin https://github.com/YOUR_USERNAME/swapnotthan.git
git add -A
git commit -m "Initial commit: Swapnotthan frontend and backend"
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## If push asks for login

- Use **GitHub CLI** (`gh auth login`) or
- Use a **Personal Access Token** as the password when Git asks (Settings → Developer settings → Personal access tokens on GitHub).
