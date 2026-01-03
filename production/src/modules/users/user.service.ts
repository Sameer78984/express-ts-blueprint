import { CreateUserInput } from "./user.schema";
import bcrypt from "bcryptjs";

// Simulating an in-memory database for this demo
const users: CreateUserInput[] = [];

export const registerUser = async (input: CreateUserInput) => {
  // 1. Check if user already exists
  const existingUser = users.find((u) => u.email === input.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // 2. Hash Password
  const hashedPassword = await bcrypt.hash(input.password, 10); // Hash with 10 rounds

  // 3. Save the user (with hashed password)
  const newUser = {
    ...input,
    password: hashedPassword, // Store hash, not plain text
    id: users.length + 1,
    createdAt: new Date(),
  };
  users.push(newUser);

  // 4. Return the created user (omit password for safety in real apps, but we'll return it here for demo consistency or just return what's needed)
  return newUser;
};

export const getAllUsers = async () => {
  return users;
};
