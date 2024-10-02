import { generateToken } from "@/modules/utils/jwt";
import { logger } from "@/server";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import type { UserResponseDto } from "../dto/UserResponseDto";
import { HttpException } from "../middleware/HttpException";
import type { IAuthRepository } from "../repository/IAuthRepository";
import type { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
  private readonly authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async register(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    ci: string,
    password: string,
  ): Promise<UserResponseDto> {
    //verificar  si el usuario existe
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpException(400, "User already exists");
    }
    //si no existe crear el usuario

    const hashedPassword = await bcrypt.hash(password, 10);

    //crer el usuario y guardarlo en la bd
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
    //verificar si el usuario existe
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
    //verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
    //crear el jwt
    const token = generateToken(user._id, user.password);

    // si la contraseña es correcta devolver el usuario(sin el password) y el token
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
