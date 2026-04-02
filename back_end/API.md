# API reference (frontend)

**Base URL:** `http://localhost:7000` (or your server host + `PORT` from `.env`)

All JSON bodies use header: `Content-Type: application/json`

**CORS:** Allowed origins come from `CORS_ORIGIN` in `.env` (comma-separated), or default `http://localhost:5173` and `http://127.0.0.1:5173`. Use `CORS_ORIGIN=*` to allow any origin (dev only).

---

## Auth

### `POST /api/auth/login`

Admin login. Returns a JWT (valid **1 hour**).

**Body**

| Field      | Type   | Required |
| ---------- | ------ | -------- |
| `email`    | string | yes      |
| `password` | string | yes      |

Credentials are set in `.env`: `ADMIN_EMAIL`, `ADMIN_PASSWORD`.

**Responses**

| Status | Body |
| ------ | ---- |
| `200`  | `{ "token": "<jwt>" }` |
| `401`  | `{ "message": "Invalid credentials" }` |

---

## Users

### `GET /api/users`

Returns all users from the database.

**Auth:** required — header:

```http
Authorization: Bearer <token>
```

(Raw JWT without `Bearer` also works.)

**Responses**

| Status | Body |
| ------ | ---- |
| `200`  | Array of user objects (see below) |
| `401`  | `{ "message": "Unauthorized" }` or `{ "message": "Invalid token" }` |
| `403`  | `{ "message": "admin access only" }` (token must include `role: "admin"`) |
| `500`  | `{ "message": "<error message>" }` |

**User object** (each item in the array)

| Field        | Type   |
| ------------ | ------ |
| `_id`        | string |
| `first_name` | string |
| `last_name`  | string |
| `age`        | number |
| `email`      | string |
| `phone`      | string |
| `city`       | string |
| `__v`        | number | *(Mongoose version key, optional)* |

---

## Quick frontend flow

1. `POST /api/auth/login` with `{ email, password }` → save `token`.
2. For protected calls: `Authorization: Bearer ${token}`.
3. `GET /api/users` → render the list.

---

## Summary

| Method | Path              | Auth   |
| ------ | ----------------- | ------ |
| `POST` | `/api/auth/login` | No     |
| `GET`  | `/api/users`      | JWT    |
