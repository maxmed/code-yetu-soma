# Gemini Key Setup For Beginners

Use this when you want Soma to call the real Gemini API instead of the local
mock/demo response.

The safe rule is simple: the Gemini key belongs on the server, not in browser
JavaScript, not in screenshots, not in GitHub, and not in student chat.

## What You Need

- a Google account,
- access to Google AI Studio,
- this repo running locally,
- a private `.env` file for local testing,
- server-side environment variables for deployment.

Official reference:

- https://ai.google.dev/gemini-api/docs/api-key
- https://ai.google.dev/gemini-api/docs/quickstart

## 1. Create A Gemini API Key

1. Open https://aistudio.google.com.
2. Sign in with your Google account. This is the same kind of account you use
   for Gmail or YouTube.
3. Click **Get API key** in the left sidebar.
4. Click **Create API key**.
5. Copy the key once and keep it private.

Do not paste the key into:

- `reference/app.js`,
- `starter/app.js`,
- `reference/index.html`,
- `starter/index.html`,
- GitHub,
- shared workshop chat,
- student handouts.

## 2. Add The Key Locally

From the repo root, copy the example env file:

```bash
cp .env.example .env
```

Open `.env` and set:

```text
GEMINI_API_KEY=your_private_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
```

Keep the variable name exactly `GEMINI_API_KEY`. The server reads that name in
`api/coach.js`.

## 3. Run The App

Install dependencies if needed:

```bash
npm install
```

Start the local server:

```bash
npm run serve:mock
```

Open:

```text
http://127.0.0.1:8787/
```

The command name still says `serve:mock` because the same beginner server is
used for both modes. If `.env` contains `GEMINI_API_KEY`, the server uses
Gemini provider mode. If the key is missing, it uses mock/demo mode.

## 4. Test That Gemini Mode Works

Ask a short study question in the app, for example:

```text
How do I separate salt and sand?
```

Expected result:

- the app returns a structured study answer,
- Debug Lab may show provider/model/status metadata,
- Debug Lab must not show the API key,
- the browser must call only `/api/coach`.

You can also check the terminal output. The local server prints whether it is
running in mock/demo mode or Gemini provider mode.

## 5. Common Problems

### The app still uses mock/demo mode

Check:

- `.env` exists in the repo root,
- the variable is named `GEMINI_API_KEY`,
- the server was restarted after editing `.env`,
- `SOMA_DISABLE_LOCAL_ENV` is not set to `1`.

### Quota or rate limit error

The shared Google project or model limit may be exhausted. Stop clicking the
coach repeatedly. Use mock/demo mode for UI and JavaScript work, then try one
real Gemini call later.

### Invalid key error

Create a new key in Google AI Studio, update `.env`, restart the server, and
try again. Do not commit the old key.

### The key appears in the browser

This is a blocker. Stop and remove the key from frontend code. The key should
only be read server-side by `api/coach.js`.

## 6. Deploy With The Key

For deployed apps, do not upload `.env`.

Set these as server-side environment variables in the hosting provider:

```text
GEMINI_API_KEY=your_private_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
```

Then redeploy. See [Deploy To Vercel](./deploy-vercel.md) for a full beginner
walkthrough.

## Safety Checklist

Before using a real key:

- run `git status --short` and confirm `.env` is not tracked,
- run `rg -n "AIza|GEMINI_API_KEY|\\?key=" reference starter`,
- if `rg` is not installed, run
  `grep -rn "AIza\\|GEMINI_API_KEY" reference starter`,
- confirm no real key appears in docs,
- ask one test question,
- open Debug Lab and confirm no key is visible,
- stop using real calls when quota errors appear.

Back to [Docs Home](./README.md).
