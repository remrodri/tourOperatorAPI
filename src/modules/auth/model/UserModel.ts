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
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    questionsAnswers: { type: Schema.Types.ObjectId, ref: "UserQuestionsAnswers" },
  },
  {
    timestamps: true,
    collection: "Users",
  },
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
