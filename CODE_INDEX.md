# Code Index

Project: Rehman Umrah & Travels

This repository contains a Node/Express API backed by Supabase and a React client (Vite) with Tailwind. The code is organized into a server folder and a client folder, plus design/docs references.

Directory overview
- server: API, data models, and routes
- client: UI, Vite config, Tailwind setup
- Design & Code: design system reference documents
- root package.json provides a monorepo-style dev flow that can boot both server and client

Directory Index
- server/
  - index.js: Express server bootstrap, Supabase client creation, routes mounting
  - routes/authRoutes.js: Simple admin login using JWT
  - routes/packageRoutes.js: CRUD operations backed by Supabase for "packages" and a seed endpoint
  - models/Package.js: Mongoose schema for a package (note: project uses Supabase for data; this provides an additional model example)
  - package.json: server dependencies (Express, Supabase client, JWT, etc.)
- client/
  - package.json: client dependencies and scripts (vite, react, tailwind, etc.)
  - vite.config.js: Vite config with React plugin and a proxy to the server API
  - README.md: brief client-side project guide (provided by template)
- Design & Code/
  - sacred_horizon/DESIGN.md: design system reference guidelines for the project

Key files (brief summaries)
- server/index.js: Creates an Express app, initializes Supabase client, attaches it to req, and mounts routes at /api/auth and /api/packages
- server/routes/authRoutes.js: Admin login: validates hard-coded credentials and issues a JWT; demonstrates auth flow
- server/routes/packageRoutes.js: GET /api/packages, GET /api/packages/:id, POST /api/packages, POST /api/packages/seed, DELETE /api/packages/:id; uses req.supabase to interact with the database
- server/models/Package.js: Mongoose schema for a Package (title, description, price, category, itinerary, etc.)
- client/vite.config.js: React plugin setup and Tailwind integration; dev server proxy to /api
- client/README.md: template notes for React + Vite setup
- Design & Code/DESIGN.md: design system and visual language guidelines

Run locally
1) Install dependencies at the repo root to enable the monorepo dev flow:
   - npm install
2) Start both server and client (development):
   - npm run dev
   This runs the server and the client concurrently as defined in the root package.json
3) Environment setup (required for the API to talk to Supabase):
   - SUPABASE_URL: your Supabase project URL
   - SUPABASE_KEY: your Supabase anon/public key
   - JWT_SECRET: secret key for signing JWT tokens (optional default is 'secretkey' in code)

Notes
- The server uses Supabase for data operations in packageRoutes.js. The server/models/Package.js file provides a Mongoose schema example; the current API routes do not rely on it directly but it may be useful for reference or future migrations.
- The client proxy in vite.config.js forwards /api requests to http://localhost:5000, so the server should be started at that port or adjust the environment/server configuration accordingly.

If you want a quick starting point, run the following commands:
- npm install
- npm run dev

If you need a static index of files or want to customize the index, tell me and I can regenerate it with more/less detail.
