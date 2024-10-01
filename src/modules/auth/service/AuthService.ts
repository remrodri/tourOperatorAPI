import { logger } from "@/server";
import bcrypt from "bcryptjs";
import type { UserResponseDto } from "../dto/UserResponseDto";
import { HttpException } from "../middleware/HttpException";
import type { IUser } from "../model/IUser";
import { UserModel } from "../model/UserModel";
import type { IAuthRepository } from "../repository/IAuthRepository";
import { EmailVo } from "../vo/EmailVo";
import { PasswordVo } from "../vo/PasswordVo";
import type { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
  // private readonly swtSecret = process.env.JWT_SECRET || "miSecretKey";
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
    // const emailVo = new EmailVo(email);
    // const passwordVo = new PasswordVo(password);
    const hashedPassword = await bcrypt.hash(password, 10);

    //crer el usuario y guardarlo en la bd
    const newUser = await this.authRepository.saveUser(firstName, lastName, phone, email, ci, hashedPassword);
    logger.info(newUser);
    // throw new Error("Method not implemented.");
    return {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      email: newUser.email,
      firstLogin: newUser.firstLogin,
    };
  }

  login(email: string, password: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
}
