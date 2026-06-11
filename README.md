# Rafa Soelistiono Portfolio

Modern editorial portfolio built with Next.js App Router.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Environment

Copy `.env.example` to `.env.local` and fill these values:

```bash
NEXT_PUBLIC_SITE_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SECRET=
```

The contact form sends email through SMTP with Nodemailer. Credentials must stay in environment variables.

## Admin

Admin routes:

- `/admin`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/[id]/edit`
- `/admin/experience`
- `/admin/experience/new`
- `/admin/experience/[id]/edit`

The admin uses a minimal cookie session based on `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SECRET`. Admin pages are marked `noindex`.

## Data Storage

Projects and experience are stored in local JSON files under `data/`. This is fine for local development and a single Node server, but it is not ideal for serverless deployments because file writes may not persist.

Recommended production storage options:

- Prisma with SQLite or PostgreSQL
- Supabase
- Vercel Postgres
- A small external CMS

## Deployment Notes

GitHub Pages only supports static output. The SMTP contact form and admin CRUD need a server runtime, so they will not work on plain GitHub Pages.

Options:

1. Use static export and move email/admin to an external backend or CMS.
2. Deploy to Vercel, Render, or Railway so Next.js route handlers, SMTP, and admin CRUD can run.
