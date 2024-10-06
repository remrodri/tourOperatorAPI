import type { UpdateUserDto } from "../dto/UpdateUserDto";
import type { UserVo } from "../vo/UserVo";

export interface IUserService {
  getUserById(userId: string): Promise<UserVo | null>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserVo | null>;
  softDelete(userId: string): Promise<void>;
  getAllUsers(): Promise<UserVo[]>;
}
