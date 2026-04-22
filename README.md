# E-COM Frontend (Vite + React Router)

## Local development

- **Install**:

```bash
npm ci
```

- **Env**: copy `.env.example` → `.env.local` and fill:
  - `VITE_STORE_PUBLISHABLE_API_KEY`
  - (optional) `VITE_DEV_PROXY_TARGET` (defaults to `http://localhost:9000`)

- **Run**:

```bash
npm run dev
```

The dev server proxies `/api`, `/store`, `/static` to `VITE_DEV_PROXY_TARGET`.

## Production build

```bash
npm run build
npm run preview
```

## Deployment notes

- **SPA routing**: this app uses React Router. Your host must rewrite all routes to `/index.html` (deep links like `/product/123`).
  - Netlify: `public/_redirects` is included.
  - Vercel: `vercel.json` is included.
  - Nginx: `nginx.conf` is included.

- **Backend URL**: in production, prefer `VITE_STORE_API_BASE_URL=/api` and configure your platform/reverse-proxy to route `/api/*` to your backend.

## Docker (optional)

```bash
docker build -t ringecom-frontend .
docker run --rm -p 8080:80 ringecom-frontend
```
