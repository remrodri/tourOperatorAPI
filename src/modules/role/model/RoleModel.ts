import mongoose, { Schema } from "mongoose";
import type { IRole } from "./IRole";

const RoleSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: "roles",
  },
);

export const RoleModel = mongoose.model<IRole>("Role", RoleSchema);
