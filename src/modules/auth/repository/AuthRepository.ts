import { IRole } from "@/modules/role/model/IRole";
import type { IUser } from "../model/IUser";
import { UserModel } from "../model/UserModel";
import type { IAuthRepository } from "./IAuthRepository";

export class AuthRepository implements IAuthRepository {
  findAllByEmail(email: string): Promise<IUser[]> {
    return UserModel.find({ email }).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  async saveUser(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    ci: string,
    password: string,
    role: string,
  ): Promise<IUser> {
    const user = new UserModel({
      firstName,
      lastName,
      phone,
      email,
      ci,
      password,
      role,
    });
    return user.save();
  }
}
