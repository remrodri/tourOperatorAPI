import mongoose, { Schema } from "mongoose";
import type { IUser } from "./IUser";

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ci: { type: String, required: true },
  password: { type: String, required: true },
  firstLogin: { type: Boolean, default: true },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
