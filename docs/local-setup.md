# Local Setup Reference

Start with [Getting Started From Zero](./getting-started.md). That is the one
complete beginner path.

This page is only a quick reference for mentors or returning students who
already know the flow.

## Install

From the repo root:

```bash
npm install
```

## Run Locally

```bash
npm run serve:mock
```

Open:

```text
http://127.0.0.1:8787/
http://127.0.0.1:8787/starter/index.html
```

Mock/demo mode needs no API key. If `.env` contains `GEMINI_API_KEY`, the same
server command uses Gemini provider mode.

## Test

```bash
npm run test:e2e
```

Expected result: the Playwright student-flow tests pass.

## Related References

- [Gemini Key Setup](./gemini-key-setup.md)
- [Deploy To Vercel](./deploy-vercel.md)
- [Testing And Debugging](./testing-debugging.md)
- [Architecture](./architecture.md)
- [Code Map](./code-map.md)
