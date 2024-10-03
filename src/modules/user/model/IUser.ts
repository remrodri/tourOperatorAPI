import type { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  ci: string;
  email: string;
  password: string;
  firstLogin: boolean;
}
