# API, authentication, and privacy

Read before changing API calls or contracts, authentication, session handling, location/camera permissions, personal data, browser configuration, or infrastructure examples.

## API and authentication

- Use `src/utils/api.js` for application API calls so base URL, authorization, timeout, and refresh behavior remain consistent. Do not build parallel auth clients inside screens.
- Use `src/utils/auth.js` for session reads/writes and logout. Local route guards are UX; the server must authorize data access and premium entitlements.
- Encode user-supplied query values with `URLSearchParams` or equivalent encoding. Preserve selected month and category filters in navigation.
- Verify request shapes, response types, icons, and error behavior against the Rails API before altering a contract. Keep backward compatibility when other clients depend on it.
- Google callback is `/sign_in`; GCP and the Rails redirect URI must match exactly. Do not exchange or expose the OAuth client secret in frontend code.
- Do not log authorization headers, refresh tokens, callback codes, or request bodies containing personal data. Use mocked data for routine browser verification.

## Public repository and configuration

- This repository is public. Do not add real infrastructure identifiers to documentation, scripts, workflow examples, or agent instructions: bucket names, account IDs, distribution IDs, ARNs, private endpoints, and personal deployment profiles belong in private configuration or CI secrets.
- Use clearly named placeholders in setup examples. Public website/canonical URLs can remain where the product requires them.
- Keep credentials, local environment files, generated builds, logs, receipts, and customer data out of Git. Check tracked files before suggesting a public push; ignore rules do not remove files already tracked.

For OAuth, hosting, or callback configuration changes, also read the [deployment guide](deployment.md).
