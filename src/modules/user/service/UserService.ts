import { HttpException } from "@/modules/middleware/HttpException";
import { StatusCodes } from "http-status-codes";
import type { UpdateUserDto } from "../dto/UpdateUserDto";
import userMapper from "../mappers/UserMapper";
import type { IUserRepository } from "../repository/IUserRepository";
import type { UserVo } from "../vo/UserVo";
import type { IUserService } from "./IUserService";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async softDelete(userId: string): Promise<void> {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found or already deleted");
    }
    await this.userRepository.softDelete(userId);
  }

  async getAllUsers(): Promise<UserVo[]> {
    const users = await this.userRepository.getAll();
    return users.map((user) => userMapper(user));
  }

  async getUserById(userId: string): Promise<UserVo | null> {
    const user = await this.userRepository.getById(userId);
    if (!user || user.deleted) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found or already deleted");
    }
    // return new UserVo(
    //   user._id.toString(),
    //   user.firstName,
    //   user.lastName,
    //   user.phone,
    //   user.email,
    //   user.ci,
    //   user.firstLogin,
    // );
    return userMapper(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserVo | null> {
    const user = await this.userRepository.getById(id);
    if (!user || user.deleted) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found or already deleted");
    }
    return userMapper(await this.userRepository.update(id, updateUserDto));
  }
}
