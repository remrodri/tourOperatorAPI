// import { IUser } from "../model/IUser";

import type { IUser } from "@/modules/auth/model/IUser";
import type { UpdateUserDto } from "../dto/UpdateUserDto";

export interface IUserRepository {
  findById(userId: string): Promise<IUser | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<IUser | null>;
}
