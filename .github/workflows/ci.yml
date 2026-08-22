name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  frontend:
    name: Frontend (Next.js)
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint --if-present

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build
        env:
          # Dummy values so the build doesn't fail on missing env vars.
          # Real values live in Vercel's own env settings for deploys.
          DATABASE_URL: postgresql://ci:ci@localhost:5432/ci_test
          AUTH_SECRET: ci-test-secret-do-not-use-in-prod
          NEXTAUTH_SECRET: ci-test-secret-do-not-use-in-prod
          NEXTAUTH_URL: http://localhost:3000

  backend:
    name: Backend (Express/MongoDB)
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    services:
      mongodb:
        image: mongo:7
        ports:
          - 27017:27017
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint --if-present

      - name: Run tests
        run: npm test --if-present
        env:
          MONGO_URI: mongodb://localhost:27017/swapnotthan_test