# GitHub Upload and Deployment Boundary

## Upload

Upload the contents of this folder to a new GitHub repository. Do not upload the ZIP as the only repository file. Preserve `.github`, `public`, `lib`, `fixtures`, and `runs/.gitkeep`.

Before committing, confirm these are absent:

- `.env`
- Any real API key
- `runs/*.json`
- Client evidence
- Private outcome keys

GitHub Actions will run the demonstration test and block committed `.env`, run records, and private JSON files.

## Deployment

GitHub Pages cannot run `server.mjs`. Use a Node-capable hosting service or container platform. Configure these environment variables on the hosting service:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `ITDM_ALLOW_LIVE=true`
- `PORT`, normally supplied by the host
- `HOST=0.0.0.0`

Deploy in demonstration mode first. Confirm the health endpoint, comparison, feedback consent, and data storage location before enabling live AI calls.

## Production blockers

Do not expose the product to client-confidential evidence until authentication, role-based authorization, encrypted storage, tenant separation, retention rules, rate limiting, audit logging, and an approved privacy review are implemented.
