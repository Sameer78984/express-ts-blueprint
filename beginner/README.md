# 🌱 Beginner Express + TypeScript Starter

Welcome! This is the simplest possible way to build a backend using **Express.js** and **TypeScript**.

We have stripped away all the complex tools (Docker, Zod, sophisticated logging) to focus on one thing: **How it works.**

## 🎓 What You Will Learn
- **Express**: How to build a server.
- **TypeScript**: How to write safe code.
- **MongoDB**: How to save data.
- **Security**: How to handle passwords and login tokens safely.

---

## 🏁 Getting Started

### 1. Install Dependencies
Open your terminal in this folder and run:
```bash
npm install
```

### 2. Setup Environment
Copy the example environment file:
```bash
cp .env.example .env
```
(Windows: `copy .env.example .env`)

> **Note**: Open `.env` and make sure `MONGO_URI` and `JWT_SECRET` are set correctly!

### 3. Run the Server
```bash
npm run dev
```
(Uses `tsx` for instant startup)
```
You should see:
```
✅ MongoDB Connected: ...
🚀 Server is running on http://localhost:3000
```

---

## 🛠️ Testing the API

Since we kept this project simple, we don't include automated test files. We use **Postman** or **Insomnia** to test it manually.

> **Note**: We use `tsx` for super-fast development. When you change a file, the server restarts instantly!

### 1. Register a User
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/register`
- **Body** (JSON):
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**: You will be automatically logged in! The server sends a **HTTPOnly Cookie** with your token.

### 2. Login
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/login`
- **Body** (JSON):
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```

### 3. Access Protected Route
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/health`
- **Note**: Since the token is in a cookie, your browser/Postman will automatically send it.

### 4. Logout
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/logout`

---

## 🧠 Key Concepts Explained

### 🔐 Passwords & Security
We **never** store passwords in plain text. If a hacker viewed our database, they would see `user123` as `$2a$10$w...`.
- **Hashing**: We use `bcrypt` to scramble the password before saving it.
- **Validation**: We use `express-validator` to ensure emails look like emails (`@`) and passwords are strong enough.

### 🎟️ Tokens (JWT) & Cookies
When you login, the server gives you a **Token** (like a digital ID card).
- **HTTPOnly Cookies**: We put this token inside a special cookie that JavaScript cannot read. This prevents cross-site scripting (XSS) attacks.
- **Expiration**: The cookie is set to expire in **7 days**.

### 📂 Project Structure
```
src/
├── config/                # Database connection logic
├── middleware/            # Helpers (Error handling, Auth checks)
├── modules/               # 📦 Features (Auth, Health)
│   ├── auth/              # Auth (Controllers, Models, Routes)
│   └── health/            # Simple health check endpoint
├── utils/                 # Utilities (Token generation)
├── app.ts                 # Express App Configuration
├── index.ts               # Entry Point (Server Start)
└── routes/                # Main Router
```

---

## 🧹 Code Quality (Linting)

We use **ESLint** to keep our code clean.

### Run Linting
Check for errors:
```bash
npm run lint
```
Fix errors automatically:
```bash
npm run lint:fix
```

---

## 🚀 Ready for more?

Check out the **Production** folder in this repository for the advanced version with:
- Automated Tests (Jest)
- Architecture split (User vs Auth)
- Docker
- Strict Types
