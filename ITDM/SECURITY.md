# Security and Data Boundary

- Keep `OPENAI_API_KEY` in the backend environment only.
- Never place API keys, client evidence, run records, or feedback in browser JavaScript or Git.
- Demo evidence is public historical material. Do not enter confidential client material into this pilot.
- Live model responses use `store: false`. Confirm your organization and provider retention settings before client use.
- Replace local JSON storage with authenticated, encrypted storage and explicit retention rules before multi-user deployment.
- Add authentication, authorization, rate limiting, request logging controls, malware scanning, and tenant separation before accepting uploaded client files.
- Treat model output as untrusted until schema, evidence IDs, calculations, and human approval pass.
- Rotate any key that is accidentally committed or exposed.
