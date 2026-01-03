<div align="center">

# 🚀 Enterprise Express + TypeScript Starter (Production Version)

> [!CAUTION]
> **This is the ADVANCED version.**
> If you are new to Express or TypeScript, please start with the [Beginner Version](../beginner/).
> This version assumes knowledge of Clean Architecture, Docker, and Strict Types.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**A professional, production-ready backend foundation for building scalable APIs.**

[Features](#-features) • [Getting Started](#-getting-started) • [Architecture](#-project-structure) • [Contributing](#-contribution)

</div>

---

## 🌟 Why this Template?

Building a backend from scratch is time-consuming. You need to configure TypeScript, set up linting, ensure type safety for environment variables, and build a scalable folder structure.

**I have done the heavy lifting for you.** This template isn't just a "Hello World" — it's an **opinionated, enterprise-grade foundation** used by professional teams to ship products faster.

---

## ✨ Features

- **🛡️ Type-Safe Everything**: Strict TypeScript configuration with strict mode enabled.
- **🏗️ Modular Architecture**: Clear separation between **Entities** (`user`) and **Features** (`auth`).
- **📝 Validation**: Request validation using [Zod](https://zod.dev/).
- **🔒 Security First**: 
    - **HttpOnly Cookies**: For secure session management.
    - **Private Passwords**: User passwords hidden by default via Mongoose Schema.
    - **Hardened**: [Helmet](https://helmetjs.github.io/), CORS, and Rate Limiting enabled.
- **⚡ Developer Experience**: Hot-reloading, beautiful logging, and pre-configured VS Code settings.
- **⚙️ Env Validation**: Fails fast if keys like `JWT_SECRET` are missing.
- **🐳 DevOps Ready**: Includes `Dockerfile` and `docker-compose`.
- **🧪 Professional Testing**: Jest + Supertest with Unit & Integration suites.
- **🤖 CI/CD Pipeline**: GitHub Actions workflow for automated testing and building.
- **🐶 Git Hooks**: Husky prevents bad commits (Lint/Test).

---

## 🛠️ Getting Started

Follow these steps to get your server running in minutes.

### 1️⃣ Clone & Install

```bash
git clone https://github.com/Sameer78984/express-ts-blueprint.git
cd ts-express-backend/production
npm install
```

### 2️⃣ Configure Environment

Copy the example environment file and adjust as needed.

```bash
cp .env.example .env
```

### 3️⃣ Run It!

**Development Mode** (with hot-reload):

```bash
npm run dev
```

**Production Build**:

```bash
npm run build
npm run start
```

### 4️⃣ Test It!

```bash
npm test            # Run all tests
npm run test:watch  # Run in watch mode
npm run test:coverage # Generate coverage report
```

---

## 📂 Project Structure

I follow a **feature-based** modular architecture, separating Data Entities from Business Logic.

```
src/
├── config/             # ⚙️ Configuration (Env, DB)
├── constants/          # 🗿 Static constants
├── middleware/         # 🛡️ Global Middlewares
├── modules/            # 📦 Feature Modules (The core logic)
│   ├── auth/           # 🔐 Feature: Authentication
│   │   ├── auth.controller.ts  # Handles HTTP Requests
│   │   ├── auth.service.ts     # Business Logic & Hashing
│   │   ├── auth.schema.ts      # Validation Schemas
│   │   └── auth.route.ts       # Route Definitions
│   └── user/           # 👤 Entity: User Data
│       └── user.model.ts       # Database Schema (Mongoose)
├── utils/              # 🛠️ Helpers & Utilities
├── app.ts              # 🚀 App Configuration
└── server.ts           # 🏁 Entry Point
```

---

## 📚 Learn by Example

I have added detailed **educational comments** throughout the code.

- Check `src/modules/auth/auth.service.ts` to see **Business Logic** separation.
- Check `src/config/env.ts` to learn about **Zod Environment Validation**.
- Check `src/app.ts` to see our **Global Error Handling** strategy.

---

## 🤝 Contribution

I welcome contributions! Please see my [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ by Developer, for Developers.</sub>
</div>
