# Deploy To Vercel

Use this guide to put Soma Study Coach on a public Vercel URL.

Vercel is a good fit for this repo because the app has static files plus one
serverless endpoint at `api/coach.js`.

Official reference:

- https://vercel.com/docs/getting-started-with-vercel/import
- https://vercel.com/docs/projects/environment-variables
- https://vercel.com/docs/deployments

## What You Need

- a GitHub account,
- a Vercel account,
- the repo pushed to GitHub,
- optional `GEMINI_API_KEY` if you want real Gemini answers,
- no private keys committed to the repo.

## 1. Check The Repo First

From the repo root:

```bash
git status --short
npm run test:e2e
```

Before deploying with a real Gemini key, also check:

```bash
rg -n "AIza|GEMINI_API_KEY|\\?key=" reference starter
```

Expected:

- `.env` is not tracked,
- tests pass,
- no real key appears in frontend files,
- `vercel.json` is present,
- `api/coach.js` is present.

## 2. Create Or Sign In To Vercel

1. Go to Vercel.
2. Sign up or log in.
3. Connect your GitHub account when Vercel asks for a Git provider.
4. Allow Vercel to access the `code-yetu-soma` repository.

Use the GitHub import path for the simplest beginner flow. After that, pushes
to `main` can trigger new deployments.

## 3. Import The Project

1. In Vercel, choose **Add New**.
2. Choose **Project**.
3. Select the GitHub repo.
4. Keep the default framework setting for a static/plain JavaScript project.
5. Leave build command empty unless Vercel asks for one.
6. Leave output directory empty unless Vercel asks for one.

This repo does not need a frontend build step.

## 4. Add Environment Variables

If you want mock/demo mode only, skip this section.

If you want real Gemini mode, add these in Vercel project settings:

```text
GEMINI_API_KEY=your_private_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
```

Use Vercel's project environment variable UI. Do not add these values to
GitHub.

Choose the environments you need:

- Production for the public demo,
- Preview if you want pull-request deployments to call Gemini,
- Development only if you use Vercel's local tooling.

## 5. Deploy

Click **Deploy**.

After deployment, open the public URL. For this repo, the root page should show
the polished Soma Study Coach because `vercel.json` rewrites `/` to
`/reference`.

## 6. Smoke Test The Live Site

Check these routes:

```text
/
/index
/index.html
/style.css
/data.js
/app.js
/starter/index.html
/api/coach
```

In the browser:

1. Open `/`.
2. Confirm the page is styled, not plain HTML.
3. Pick a topic.
4. Ask a short study question.
5. Open Debug Lab.
6. Confirm no API key or key-bearing URL appears.
7. Open `/starter/index.html` and confirm the workshop scaffold loads.

For `/api/coach`, use a `POST` request. Opening it as a normal browser page may
return a method error because the endpoint expects `POST`.

## 7. Update After Changes

If the project is connected to GitHub:

1. Commit changes.
2. Push to `main`.
3. Wait for Vercel to deploy.
4. Re-run the live smoke test.

If you change asset names or move files, update `vercel.json` in the same
commit. The current public route contract expects root asset paths:

```text
/style.css -> /reference/style.css
/data.js -> /reference/data.js
/app.js -> /reference/app.js
```

## Common Problems

### Root page is plain HTML

The HTML loaded, but CSS or JS did not. Check `/style.css`, `/data.js`, and
`/app.js`. If those routes fail, update `vercel.json`.

### Coach answer fails

Check whether `GEMINI_API_KEY` exists in Vercel environment variables. If it is
missing, the app should use mock/demo mode. If it is present but invalid, update
the key and redeploy.

### Debug Lab shows a key

This is a blocker. Remove the key from any frontend file or debug payload,
redeploy, and run the safety check again.

### New deploy does not show changes

Check the Vercel deployment log and confirm the commit hash matches the pushed
GitHub commit.

Back to [Docs Home](./README.md).
