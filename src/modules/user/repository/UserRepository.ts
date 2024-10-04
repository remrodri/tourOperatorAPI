// import { IUser } from "../model/IUser";
import type { IUser } from "@/modules/auth/model/IUser";
import { UserModel } from "@/modules/auth/model/UserModel";
import type { UpdateUserDto } from "../dto/UpdateUserDto";
// import { UserModel } from "../model/UserModel";
import type { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async findById(userId: string): Promise<IUser | null> {
    return UserModel.findById(userId).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    return updatedUser;
  }
}
