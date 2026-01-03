# 🌱 Beginner Express + TypeScript Starter

Welcome! This is the simplest possible way to build a backend using **Express.js** and **TypeScript**.

We have stripped away all the complex tools (Docker, Zod, sophisticated logging) to focus on one thing: **How it works.**

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

### 3. Run the Server
```bash
npm run dev
```
You should see:
```
✅ MongoDB Connected: ...
🚀 Server is running on http://localhost:3000
```

### 4. Test It
- **Health Check**: `GET http://localhost:3000/api/health`
- **Get Demos**: `GET http://localhost:3000/api/demos`
- **Create Demo**: `POST http://localhost:3000/api/demos`
  - Body: `{"title": "Learn Express", "description": "It is fun!"}`

---

## 📂 Project Structure

```
src/
├── config/                # Database connection logic
├── controllers/           # Handles the logic (getHealth, createDemo)
├── middleware/            # Error handling
├── models/                # Database Schemas (Mongoose)
├── utils/                 # Helpers (Logger, API Response, Async Wrapper)
├── app.ts                 # Express Setup
├── index.ts               # Entry Point (Connects DB & Starts Server)
└── routes/                # All URL paths defined here
```

## 🧠 Theory: The Request Lifecycle

When you visit a URL (like `/api/health`), here is exactly what happens:

1.  **Request**: The browser sends a request to your server.
2.  **`index.ts`**: The server is listening and receives the request.
3.  **`app.ts`**: Express looks at the request and sends it to the **Router**.
4.  **`routes.ts`**: Matches the URL `/health` and calls the specific **Controller** (`getHealth`).
5.  **`health.controller.ts`**: The function runs. It prepares the data and sends a **Response** JSON back to you.

If any error happens, it goes to the **Error Middleware**.

---

## 👩‍💻 How to Add a New Route

Try this exercise to learn!

1.  **Create a Controller**:
    Create `src/controllers/user.controller.ts`:
    ```typescript
    import { Request, Response } from "express";

    export const getUser = (req: Request, res: Response) => {
      res.json({ name: "Alice", id: 1 });
    };
    ```

2.  **Add to Router**:
    Open `src/routes.ts`:
    ```typescript
    import { getUser } from "./controllers/user.controller";
    // ...
    router.get("/user", getUser);
    ```

3.  **Test**: Visit `http://localhost:3000/api/user`.

---

## 🚀 Ready for more?

Once you understand this flow, you are ready for the **Production** version!
The production version does the exact same thing, but it organizes files into **Modules** (User Module, Product Module) and adds layers of **Security** and **Validation**.

👉 **[Go to Production Version](../production/)**
