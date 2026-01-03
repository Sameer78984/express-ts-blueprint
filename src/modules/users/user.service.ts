import { CreateUserInput } from './user.schema';

/**
 * 🧠 SERVICE (The Brain)
 * ----------------------
 * The Service contains the "Business Logic". This is where the actual work happens.
 *
 * Examples of what happens here:
 * - Saving data to the database
 * - Sending emails
 * - Calculating numbers
 *
 * It does NOT know about HTTP (req/res). It just takes data and returns data.
 */

// Simulating an in-memory database for this demo
const users: CreateUserInput[] = [];

export const registerUser = async (input: CreateUserInput) => {
  // 1. Check if user already exists (Business Logic)
  const existingUser = users.find((u) => u.email === input.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // 2. Save the user to the database (Business Logic)
  const newUser = { ...input, id: users.length + 1, createdAt: new Date() };
  users.push(input); // In a real app, this would be: await UserModel.create(input);

  // 3. Return the created user
  return newUser;
};

export const getAllUsers = async () => {
  return users;
};
