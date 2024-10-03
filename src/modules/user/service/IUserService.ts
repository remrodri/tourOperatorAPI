import type { UserVo } from "../vo/UserVo";

export interface IUserService {
  getUserById(userId: string): Promise<UserVo | null>;
}
