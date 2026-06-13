# Local Setup, Config, And Deploy

Use this with [Gemini Key Setup](./gemini-key-setup.md), [Deploy To
Vercel](./deploy-vercel.md), [Testing And Debugging](./testing-debugging.md),
the [Architecture](./architecture.md), and the [Code Map](./code-map.md).

## Prerequisites

Install Node.js and npm. Then from the repo root:

```bash
npm install
```

## Run Locally In Mock Mode

Mock mode is the safest way to test the workshop app.

```bash
npm run serve:mock
```

Open:

```text
http://127.0.0.1:8787/
```

The smaller workshop scaffold is still available for teaching exercises:

```text
http://127.0.0.1:8787/starter/index.html
```

If port 8787 is busy, stop the old server and run the command again.

## Run The E2E Tests

```bash
npm run test:e2e
```

This starts the mock server automatically and tests both desktop and mobile
browser paths.

Useful variants:

```bash
npm run test:e2e:headed
npm run test:e2e:ui
```

## Use A Real Gemini Key Locally

For the full beginner walkthrough, use [Gemini Key
Setup](./gemini-key-setup.md). Short version:

Do not paste keys into chat or commit keys to Git.

Create a local private env file:

```bash
cp .env.example .env
```

Edit `.env`:

```text
GEMINI_API_KEY=your_private_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
```

Then run:

```bash
npm run serve:mock
```

The local server loads `.env` and `/api/coach` will use Gemini if the key is
valid.

## Deploy

For the full beginner walkthrough, use [Deploy To Vercel](./deploy-vercel.md).
Short version:

The repo includes:

- `api/coach.js`
- `vercel.json`
- static files in `reference/` and `starter/`

For a Vercel-style deploy:

1. Push the repo.
2. Import the project in the host.
3. Set server-side environment variables:
   - `GEMINI_API_KEY`
   - optional `GEMINI_MODEL`
4. Deploy.
5. Test `/` and `/index.html`; both should open the polished Soma Study Coach.
6. Test the optional `/starter/index.html` workshop scaffold and `POST /api/coach`.
7. Confirm the Debug Lab does not show keys.

## Mock Versus Gemini

Mock mode:

- no API key required,
- deterministic responses,
- best for tests and early student work.

Gemini mode:

- requires server-side key,
- calls the real provider,
- can hit quota or rate limits,
- best for final demos after setup is verified.

## What Not To Do

- Do not add provider keys to `reference/app.js`.
- Do not add provider keys to `starter/app.js`.
- Do not commit `.env`.
- Do not ask students to create or share personal API keys unless the workshop
  plan explicitly requires it.
