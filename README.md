# Prodsec

Marketing website for **Productive Security Inc.** — private security programs across Ontario since 1997.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- **Supabase** — form storage + email alerts

## Local development

```bash
npm install
cp .env.example .env   # add Supabase keys (see docs/SUPABASE_SETUP.md)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Forms & notifications

Contact, quote, and career forms save to Supabase (`inquiries` table). Email alerts are sent via a Supabase Edge Function + Resend when a new row is inserted.

**Full setup walkthrough:** [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)

Quick summary:
1. Create Supabase project + run `supabase/migrations/20260630000000_inquiries.sql`
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`
3. Deploy `supabase/functions/notify-inquiry` + Resend API key
4. Create a Database Webhook on `inquiries` INSERT → `notify-inquiry`

## Production checklist

Before going live:

1. **Environment variables** (Vercel / Netlify):
   - `VITE_SITE_URL` — e.g. `https://prodsec.ca`
   - `VITE_SUPABASE_URL` — from Supabase → Settings → API
   - `VITE_SUPABASE_ANON_KEY` — anon public key (safe for browser)
2. **Supabase** — migration applied, webhook + Edge Function deployed
3. **Domain** — DNS + HTTPS on your host
4. **Test forms** — `/contact`, `/quote`, `/careers/jobs/apply`
5. **Assets** — `public/media/landing-hero.mp4`, images under `public/images/`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run typecheck` | TypeScript check |

## Deploy

**Vercel** — `vercel.json` includes SPA rewrites, security headers, and caching.  
**Netlify** — `netlify.toml` is configured the same way.

## CI

GitHub Actions runs `typecheck` + `build` on push/PR to `main` or `master`.

## License

Private — Productive Security Inc.
