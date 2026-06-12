# Rafa Soelistiono Portfolio

Modern editorial portfolio built with Next.js App Router.

## Run Locally

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
```

The contact form sends email through SMTP with Nodemailer. Credentials must stay in environment variables.

## Content Data

Projects and experience are read from JSON files:

- `data/projects.json`
- `data/experience.json`

There is no admin panel. To update website content, edit the JSON files locally, commit the change, push to GitHub, and redeploy.

## Edit Projects

Open `data/projects.json`. Each project item follows this shape:

```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "slug": "project-name",
  "category": "Backend Service / Java Spring Boot",
  "year": "May 2026 - Jun 2026",
  "description": "Short project description.",
  "image": "",
  "link": "https://example.com",
  "repository": "https://github.com/example/repo",
  "featured": true,
  "order": 1
}
```

Rules:

- `id` must be unique.
- `slug` should be lowercase and URL-safe, for example `yomu-backend-service`.
- `featured: true` places the project first in featured sections.
- `order` controls display order. Smaller numbers appear first.
- `image` can stay empty because the current UI uses text-only project cards.

## Edit Experience

Open `data/experience.json`. Each experience item follows this shape:

```json
{
  "id": "unique-experience-id",
  "company": "Company Name",
  "role": "Role Title",
  "startDate": "Jun 2026",
  "endDate": "Aug 2026",
  "location": "Indonesia",
  "description": "Short experience description.",
  "highlights": ["Backend", "CI/CD"],
  "order": 1
}
```

Rules:

- `id` must be unique.
- `highlights` must be an array of strings.
- `order` controls display order. Smaller numbers appear first.

## Update Website Content

1. Edit `data/projects.json` or `data/experience.json`.
2. Check JSON validity. A missing comma or quote will break the build.
3. Run:

```bash
npm run build
```

4. Commit and push:

```bash
git add data/projects.json data/experience.json
git commit -m "Update portfolio content"
git push
```

5. Vercel will redeploy automatically if the repository is connected.

## Deployment Notes

The public portfolio content is JSON-based and safe for Vercel because the app only reads `data/*.json`.

The contact form still needs a server runtime because it uses `/api/contact` and SMTP. It works on Vercel, but not on plain GitHub Pages unless replaced with an external form service.

## SEO Notes

Set this environment variable in production so canonical URLs, Open Graph URLs, robots.txt, and sitemap.xml point to the correct domain:

```bash
NEXT_PUBLIC_SITE_URL=https://rafasoelistiono.tech
```

After changing the production domain, redeploy and submit these URLs in Google Search Console:

- `https://rafasoelistiono.tech/sitemap.xml`
- `https://rafasoelistiono.tech/googleebc6bd81654c30cc.html`

The site includes Person, WebSite, ProfilePage, and project/experience structured data to help search engines understand that Rafa Soelistiono, rafasoelistiono, software engineer, web developer, and the portfolio content refer to the same entity.
