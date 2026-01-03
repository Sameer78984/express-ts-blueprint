import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
  },
);

/**
 * User Model
 *
 * Represents a user in the system.
 * Password is automatically hidden from queries unless explicitly selected.
 */
export const UserModel = mongoose.model<UserDocument>("User", userSchema);
