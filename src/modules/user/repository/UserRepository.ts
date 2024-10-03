// import { IUser } from "../model/IUser";
import type { IUser } from "@/modules/auth/model/IUser";
import { UserModel } from "@/modules/auth/model/UserModel";
// import { UserModel } from "../model/UserModel";
import type { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async findById(userId: string): Promise<IUser | null> {
    return UserModel.findById(userId).exec();
  }
}
