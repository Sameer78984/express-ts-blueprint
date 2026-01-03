<div align="center">

# 🚀 Enterprise Express + TypeScript Starter

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
- **🏗️ Modular Architecture**: Feature-based folder structure that scales with your app.
- **📝 Validation**: Request validation using [Zod](https://zod.dev/) (no more raw body parsing).
- **🔒 Security First**: Hardened with [Helmet](https://helmetjs.github.io/), CORS, and Rate Limiting.
- **⚡ Developer Experience**: Hot-reloading, beautiful logging, and pre-configured VS Code settings.
- **⚙️ Env Validation**: The app crashes fast if required environment variables are missing.
- **🐳 DevOps Ready**: Includes `Dockerfile` and `docker-compose` for instant deployment.
- **🧹 Code Quality**: ESLint & Prettier pre-configured with Husky hooks.

---

## 🛠️ Getting Started

Follow these steps to get your server running in minutes.

### 1️⃣ Clone & Install

```bash
git clone https://github.com/Sameer78984/express-ts-blueprint.git
cd ts-express-backend
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
npm start
```

---

## 📂 Project Structure

I follow a **feature-based** modular architecture. Instead of grouping by type (controllers/services), I group by feature.

```
src/
├── config/             # ⚙️ Configuration (Env, DB)
├── constants/          # 🗿 Static constants
├── middleware/         # 🛡️ Global Middlewares
├── modules/            # 📦 Feature Modules (The core logic)
│   └── demo/
│       ├── demo.controller.ts  # Handles HTTP Requests
│       ├── demo.service.ts     # Business Logic
│       ├── demo.schema.ts      # Validation Schemas
│       └── demo.route.ts       # Route Definitions
├── utils/              # 🛠️ Helpers & Utilities
├── app.ts              # 🚀 App Configuration
└── server.ts           # 🏁 Entry Point
```

---

## 📚 Learn by Example

I have added detailed **educational comments** throughout the code.

- Check `src/server.ts` to see how we handle **Graceful Shutdowns**.
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
