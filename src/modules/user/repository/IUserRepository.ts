// import { IUser } from "../model/IUser";

import type { IUser } from "@/modules/auth/model/IUser";

export interface IUserRepository {
  findById(userId: string): Promise<IUser | null>;
}
