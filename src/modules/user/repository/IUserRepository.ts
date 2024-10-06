// import { IUser } from "../model/IUser";

import type { IUser } from "@/modules/auth/model/IUser";
import { UserModel } from "@/modules/auth/model/UserModel";
import type { UpdateUserDto } from "../dto/UpdateUserDto";

export interface IUserRepository {
  getById(userId: string): Promise<IUser | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  isEmailAvailable(email: string): Promise<boolean>;
  softDelete(userId: string): Promise<void>;
}
