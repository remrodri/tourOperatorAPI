import { HttpException } from "@/modules/middleware/HttpException";
import { StatusCodes } from "http-status-codes";
import type { IUserRepository } from "../repository/IUserRepository";
import { UserVo } from "../vo/UserVo";
import type { IUserService } from "./IUserService";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(userId: string): Promise<UserVo | null> {
    const user = await this.userRepository.findById(userId);
    if (user === null) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }
    return new UserVo(
      user._id.toString(),
      user.firstName,
      user.lastName,
      user.phone,
      user.email,
      user.ci,
      user.firstLogin,
    );
  }
}
