import mongoose, { Schema } from "mongoose";
import type { IUser } from "./IUser";

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    ci: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "123456" },
    deleted: { type: Boolean, default: false },
    firstLogin: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "user",
  },
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
