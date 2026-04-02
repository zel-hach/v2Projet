# API testing with Postman

Use this guide to call the backend from [Postman](https://www.postman.com/) (or any HTTP client).

## Before you start

1. **MongoDB** is running and reachable (see `MONGO_URL` in `.env`).
2. **Environment variables** in `.env` include at least:
   - `PORT` — server port (default `7000`)
   - `MONGO_URL` — MongoDB connection string
   - `JWT_SECRET` — secret used to sign and verify JWTs (must match for login + protected routes)
3. Start the server:

   ```bash
   npm run dev
   ```

4. **Base URL** (adjust port if yours differs):

   ```text
   http://localhost:7000
   ```

---

## Postman setup (recommended)

1. Create a **Collection** (e.g. `Dashboard API`).
2. Create an **Environment** (e.g. `Local`) with variables:
   | Variable   | Initial value              |
   | ---------- | -------------------------- |
   | `baseUrl`  | `http://localhost:7000`    |
   | `token`    | *(leave empty; set after login)* |

3. In each request URL, use: `{{baseUrl}}/api/...`

---

## 1. Login

Get a JWT for authenticated routes.

| Field    | Value                         |
| -------- | ----------------------------- |
| Method   | `POST`                        |
| URL      | `{{baseUrl}}/api/auth/login`  |
| Headers  | `Content-Type: application/json` |
| Body     | **raw** → **JSON**            |

**Body (raw JSON):**

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Success — `200 OK`**

```json
{
  "token": "<jwt-string>"
}
```

Copy `token` into your environment variable `token` for the next request.

**Failure — `401 Unauthorized`**

```json
{
  "message": "Invalid credentials"
}
```

---

## 2. List users (protected)

Requires a valid JWT. The auth middleware checks the **`Authorization`** header and the token payload (see troubleshooting if you get `403`).

| Field    | Value                          |
| -------- | ------------------------------ |
| Method   | `GET`                          |
| URL      | `{{baseUrl}}/api/users`        |
| Headers  | `Authorization: {{token}}`     |

**Success — `200 OK`**

JSON array of user documents from MongoDB (shape depends on your `User` model).

**Common errors**

| Status | Body / meaning |
| ------ | -------------- |
| `401`  | `"Unauthorized"` — header missing |
| `401`  | `"Invalid token"` — bad/expired JWT or wrong `JWT_SECRET` |
| `403`  | `"admin access only"` — token valid but payload missing `role: "admin"` |

---

## Optional: Postman **Authorization** tab

You can use **Authorization → Type: Bearer Token** and paste the JWT from login. The API accepts `Authorization: Bearer <token>`.

Alternatively, set a header manually:

- Key: `Authorization`  
- Value: `Bearer {{token}}` or the raw JWT only (both work)

---

## Quick checklist

- [ ] Server logs show it is listening (e.g. port `7000`).
- [ ] Login returns `200` and a `token`.
- [ ] `GET /api/users` uses the same `JWT_SECRET` that was used to create the token.
- [ ] If you see `403` on `/api/users`, the token must include `"role": "admin"` (the default login in this project already signs that claim).

---

## Reference — routes in this project

| Method | Path             | Auth   | Description   |
| ------ | ---------------- | ------ | ------------- |
| `POST` | `/api/auth/login` | No     | Returns JWT   |
| `GET`  | `/api/users`      | Yes    | Lists users   |

---

## Importing into Postman

You can create requests manually from the tables above, or use **Import → Raw text** and paste a minimal collection JSON if you generate one later. The environment variables `baseUrl` and `token` are enough to reuse the same requests across machines.
