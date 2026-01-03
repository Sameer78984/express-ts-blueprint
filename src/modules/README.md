# 🏗️ The Application Architecture

We use a **Modular Architecture** to keep code organized. This is standard in the industry.

Everything related to a specific feature (like "Users") lives in one folder: `src/modules/users/`.

## 📦 The 4 Parts of a Module

Imagine you are ordering food at a restaurant. Here is how our code works like a restaurant:

### 1. 🛣️ Route (`user.route.ts`) - "The Menu"
The **Route** defines what URL you can visit (e.g., `/api/users`).
- It matches your request to the right waiter (Controller).
- **Analogy**: You point to "Pizza" on the menu.

### 2. 🛡️ Schema (`user.schema.ts`) - " The Bouncer"
The **Schema** checks if your data is correct.
- If you forget your password or send a bad email, it stops you here.
- **Analogy**: The waiter checks if you actually have money before taking the order.

### 3. 🎮 Controller (`user.controller.ts`) - "The Waiter"
The **Controller** manages the flow.
- It takes your order (Request).
- It tells the kitchen (Service) to cook.
- It brings you the food (Response).
- **Analogy**: The waiter doesn't cook the food; they just manage your order.

### 4. 🧠 Service (`user.service.ts`) - "The Kitchen"
The **Service** does the actual work.
- It saves data to the database, sends emails, or calculates logic.
- It doesn't know about the customer (HTTP), it just cooks.
- **Analogy**: The chef cooks the pizza.

---

## 🔄 The Flow of Data

1. **User** sends a request -> `POST /api/users`
2. **Router** sends it to **Validation**.
3. **Validation** checks the data. If good -> **Controller**.
4. **Controller** gives data to **Service**.
5. **Service** saves to Database and returns the new User.
6. **Controller** returns the User to the **User** as JSON.

Simple, scalable, and organized! 🚀
