# 🛡️ Splito — Security & Compliance Architecture

This document details the security model, token storage, HTTP security headers, Content Security Policy (CSP), and secret isolation policies for **Splito**.

---

## 🔑 Authentication & Token Management

- **Access Token Storage**: Stored securely using `tokenStorage` (`src/lib/auth/token-storage.ts`).
- **Bearer Token Injection**: Automatically attached to outbound API requests via Axios request interceptors (`src/lib/axios.ts`).
- **Mutex Refresh Queue**: When a `401 Unauthorized` error is encountered, requests are queued while a single background `POST /auth/refresh` request obtains a new token before replaying all failed requests.

---

## 🔒 HTTP Security Headers (`next.config.ts`)

- **`X-Frame-Options: DENY`**: Protects against clickjacking.
- **`X-Content-Type-Options: nosniff`**: Prevents MIME-type sniffing.
- **`Referrer-Policy: strict-origin-when-cross-origin`**: Restricts referrer info leak.
- **`Permissions-Policy`**: Disables unused browser hardware capabilities (camera, microphone, geolocation).

---

## 🛑 Secret Isolation Policy

Environment variables prefixed with `NEXT_PUBLIC_` are limited strictly to public variables (e.g. `NEXT_PUBLIC_API_URL`). Secrets and private keys are never prefixed with `NEXT_PUBLIC_`.
