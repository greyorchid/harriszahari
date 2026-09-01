# ITDM Transformation Diagnostic Product MVP

This is the first usable product release for capturing real workflow feedback. It runs two independent ITDM v0.2.1 assessors, locks Round 1 before contradiction release, validates structured outputs, calculates agreement deterministically, applies contradiction-sensitive ECI, requires human review, and captures post-use feedback.

## Run immediately in demonstration mode

Requirements: Node.js 20 or newer.

```text
node server.mjs
```

Open `http://127.0.0.1:8787` and select **Demonstration, no API cost**.

## Enable live AI assessors

1. Copy `.env.example` to `.env` or configure server environment variables through your host.
2. Set `OPENAI_API_KEY` on the server. Never put the key in browser JavaScript or GitHub Pages.
3. Set `OPENAI_MODEL` to the model approved through your benchmark.
4. Set `ITDM_ALLOW_LIVE=true`.
5. Start the server with those environment variables loaded.

Live mode uses four Responses API calls. Assessor A Round 1 and Assessor B Round 1 run independently. Each Round 1 result is locked before that assessor receives Round 2 evidence. Both final outputs are compared only after completion.

## Product controls

- Strict JSON Schema outputs.
- Evidence-ID allowlist validation.
- Six separate ECI dimensions.
- 60% and 40% unresolved-contradiction caps.
- Code-calculated ECI, agreement, and weighted kappa.
- Complete score-change controls.
- Human approval on every run.
- `store: false` for model responses.
- API keys remain server-side.
- Feedback consent and warning against confidential input.

## Feedback records

Runs and feedback are stored as JSON under `runs/`. That directory is excluded from Git. File storage supports local pilot use. Replace it with an authenticated database, access control, retention rules, encryption, and audit logging before multi-user or client deployment.

## Hosting

GitHub can host this source repository. GitHub Pages cannot execute the server or protect an API key. Deploy the full application to a Node-capable host such as Azure App Service, Cloud Run, Render, Railway, or another approved environment. You may host the static interface separately, but the `/api` routes must point to the secure backend.

## Test

```text
node test.mjs
```

## Status

Production-shaped pilot. Ready for controlled internal use and feedback capture. Not validated for autonomous client diagnosis, predictive claims, certification, audit, or compliance decisions.
