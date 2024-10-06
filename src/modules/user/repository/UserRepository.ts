// import { IUser } from "../model/IUser";
import type { IUser } from "@/modules/auth/model/IUser";
import { UserModel } from "@/modules/auth/model/UserModel";
import type { UpdateUserDto } from "../dto/UpdateUserDto";
// import { UserModel } from "../model/UserModel";
import type { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async softDelete(userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { deleted: true });
  }

  async getAll(): Promise<IUser[]> {
    return await UserModel.find({ deleted: false }).exec();
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = UserModel.findOne({ email, deleted: false }).exec();
    return !user;
  }

  async getById(userId: string): Promise<IUser | null> {
    return await UserModel.findOne({ _id: userId, deleted: false }).exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<IUser | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    return updatedUser;
  }
}
