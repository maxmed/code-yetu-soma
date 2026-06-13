# Getting Started From Zero

Use this as the single beginner path for Soma. It gets you from no local setup to
a running app, then shows how to add a Gemini key safely when you are ready for
real AI responses.

You do not need a Gemini key for the first workshop pass. Start in mock/demo
mode, prove the app works, then add the key later.

## What You Need

- A computer with a browser.
- A terminal app.
- Node.js and npm installed.
- This repo opened locally.
- Optional later: a Google account for Google AI Studio.
- Optional later: a Vercel account for deployment.

References for deeper detail:

- [Local Setup](./local-setup.md)
- [Gemini Key Setup](./gemini-key-setup.md)
- [Deploy To Vercel](./deploy-vercel.md)

## 1. Install Node.js And npm

Install Node.js from https://nodejs.org/ if it is not already installed. npm is
included with Node.js.

Check the install:

```bash
node --version
npm --version
```

If both commands print version numbers, continue.

## 2. Open The Repo

Open a terminal in the repo root. You should see files such as:

```text
README.md
package.json
reference/
starter/
docs/
api/
```

If you are using Git, make sure you are on the latest code:

```bash
git clone https://github.com/maxmed/code-yetu-soma.git
cd code-yetu-soma
git pull origin main
```

If you already cloned the repo earlier, skip `git clone` and run:

```bash
cd code-yetu-soma
git pull origin main
```

If you downloaded a ZIP instead of using Git, unzip it and open the extracted
folder in your editor and terminal. You will not use `git pull` in that case.

## 3. Install Dependencies

Run:

```bash
npm install
```

A successful install should finish without errors. It may say something like:

```text
found 0 vulnerabilities
```

Do not worry if the exact number of packages changes over time.

## 4. Start Mock/Demo Mode

Run:

```bash
npm run serve:mock
```

Keep this terminal open. The server should print a local URL such as:

```text
Soma server running at http://127.0.0.1:8787 (mock/demo mode)
```

Mock/demo mode does not need an API key. It is the safest mode for learning the
app, editing UI, and running tests.

## 5. Open The App

Open the polished Soma app:

```text
http://127.0.0.1:8787/
```

Open the beginner scaffold:

```text
http://127.0.0.1:8787/starter/index.html
```

Expected:

- `/` shows Soma Study Coach.
- `/starter/index.html` shows Soma Study Coach Starter.
- The page is styled, not plain unstyled HTML.
- Buttons respond when clicked.

If the page looks old or unstyled, hard refresh:

- Windows/Linux: `Ctrl+Shift+R`
- Mac: `Cmd+Shift+R`

## 6. Test One Mock Study Question

In the polished app or starter:

1. Pick a topic.
2. Click **Use sample**.
3. Click **Ask Soma** or **Call /api/coach**.
4. Confirm a study response appears.
5. Open **Behind The Scenes** if you are in the polished app.

Do not type names, schools, marks, phone numbers, or private records. Use dummy
study questions only.

## 7. Make One Starter Edit

Find these files:

```text
starter/index.html
starter/style.css
starter/app.js
starter/data.js
```

In `starter/index.html`, change the visible heading text:

```html
Soma Study Coach Starter
```

to something like:

```html
My Science Study Coach
```

Save, hard refresh `/starter/index.html`, and confirm the heading changed.

Open the browser developer tools and check the Console tab. A beginner should
know how to see whether the page has a red JavaScript error before moving on.

## 8. Run The Smoke Tests

In a second terminal from the repo root, run:

```bash
npm run test:e2e
```

Expected: the Playwright student-flow tests pass. If they fail, read the first
error and check whether the local server or browser route is wrong.

## 9. Add A Gemini Key Later

Only do this after mock mode works.

You need a Google account.

1. Open https://aistudio.google.com
2. Sign in.
3. Click **Get API key**.
4. Click **Create API key**.
5. Copy the key once and keep it private.

Never paste the key into:

- `reference/`,
- `starter/`,
- browser JavaScript,
- GitHub,
- screenshots,
- shared chat,
- student handouts.

## 10. Create `.env`

From the repo root:

```bash
cp .env.example .env
```

Open `.env` and add:

```text
GEMINI_API_KEY=your_private_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
```

Keep the variable name exactly `GEMINI_API_KEY`.

## 11. Restart And Test Gemini Mode

Stop the old server with `Ctrl+C`, then run:

```bash
npm run serve:mock
```

The command name is still `serve:mock`, but the server uses Gemini provider mode
when `.env` contains `GEMINI_API_KEY`.

Open:

```text
http://127.0.0.1:8787/
```

Ask one short dummy study question, such as:

```text
How do I separate salt and sand?
```

Expected:

- the app returns a structured study answer,
- the browser still calls only `/api/coach`,
- the key does not appear in the page,
- the key does not appear in Behind The Scenes,
- the key does not appear in the browser console.

## 12. Check That The Key Is Safe

Before committing or sharing anything, run:

```bash
git status --short
rg -n "AIza|GEMINI_API_KEY|\?key=" reference starter
rg -n "AIza|key=AIza|GEMINI_API_KEY=[A-Za-z0-9_-]{20,}" . --glob '!node_modules/**' --glob '!.git/**'
```

Expected:

- `.env` is not tracked by Git,
- no real key appears in `reference/` or `starter/`,
- no real key appears in docs or config,
- no `?key=` URL appears in frontend code.

If `rg` is not installed, use the grep commands in
[Gemini Key Setup](./gemini-key-setup.md#safety-checklist).

## 13. Optional: Deploy Later

Deployment is not required for the first local workshop path. When ready, use
[Deploy To Vercel](./deploy-vercel.md).

The short version:

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Add `GEMINI_API_KEY` as a Vercel environment variable if you want real Gemini
   mode.
4. Deploy.
5. Test `/`, `/reference`, `/starter/index.html`, and `POST /api/coach`.
6. Confirm no key appears in the browser or Debug Lab.

## Ready For The Workshop Check

You are ready to continue if you can:

- open `http://127.0.0.1:8787/`,
- open `http://127.0.0.1:8787/starter/index.html`,
- ask one mock study question,
- make one visible starter edit,
- run the smoke tests or explain the smoke-test path,
- explain where API keys are allowed: server-side `.env` or hosting env vars
  only.

Back to [Docs Home](./README.md) or [Workshop Course](./workshop/README.md).
