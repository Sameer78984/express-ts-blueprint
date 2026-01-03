import bcrypt from "bcryptjs";
import { UserModel, UserDocument } from "../user/user.model";
import { SignupInput, LoginInput } from "./auth.schema";

export const signup = async (input: SignupInput) => {
  const existingUser = await UserModel.findOne({ email: input.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await UserModel.create({
    email: input.email,
    password: hashedPassword,
  });

  return user.toObject();
};

export const login = async (input: LoginInput): Promise<UserDocument> => {
  // We need to explicitly select the password because it's set to `select: false` in the model
  const user = await UserModel.findOne({ email: input.email }).select("+password");
  if (!user || !user.password) {
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  return user.toObject();
};
