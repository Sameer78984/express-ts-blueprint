import mongoose from "mongoose";

// 1. Definition (What a User looks like)
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true // No duplicate emails!
  },
  password: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// 2. Export (So we can use 'User.create', 'User.find')
export const User = mongoose.model("User", userSchema);
