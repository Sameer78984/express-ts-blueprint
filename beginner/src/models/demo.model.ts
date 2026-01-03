import mongoose from "mongoose";

// 1. Define the Interface (The Shape of the Data in TypeScript)
interface IDemo {
  title: string;
  description: string;
  createdAt: Date;
}

// 2. Define the Schema (The Shape of the Data in MongoDB)
const demoSchema = new mongoose.Schema<IDemo>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

// 3. Export the Model
export const Demo = mongoose.model<IDemo>("Demo", demoSchema);
