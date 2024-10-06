import type { IUserRepository } from "@/modules/user/repository/IUserRepository";
import { generateToken } from "@/modules/utils/jwt";
import { logger } from "@/server";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { HttpException } from "../../middleware/HttpException";
import type { UserResponseDto } from "../dto/UserResponseDto";
import type { IAuthRepository } from "../repository/IAuthRepository";
import type { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
  private readonly authRepository: IAuthRepository;
  private readonly userRepository: IUserRepository;

  constructor(authRepository: IAuthRepository, userRepository: IUserRepository) {
    this.authRepository = authRepository;
    this.userRepository = userRepository;
  }

  async register(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    ci: string,
    password: string,
  ): Promise<UserResponseDto> {
    // Verificar si ya existe un usuario con el mismo email y que no esté eliminado
    const existingUser = await this.authRepository.findByEmail(email);

    if (existingUser) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "User already exists");
    }

    // Si el usuario está eliminado, permitir la creación de un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario
    const newUser = await this.authRepository.saveUser(firstName, lastName, phone, email, ci, hashedPassword);
    logger.info(newUser);

    return {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      email: newUser.email,
      firstLogin: newUser.firstLogin,
    };
  }

  async login(email: string, password: string): Promise<{ user: UserResponseDto; token: string }> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }

    if (user?.deleted) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, "User is deleted");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }

    const token = generateToken(user._id, user.password);

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        firstLogin: user.firstLogin,
      },
      token,
    };
  }
}
