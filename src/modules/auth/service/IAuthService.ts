import type { UserResponseDto } from "../dto/UserResponseDto";
import type { IUser } from "../model/IUser";

export interface IAuthService {
  register(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    ci: string,
    password: string,
  ): Promise<UserResponseDto>;

  login(email: string, password: string): Promise<IUser | null>;
}
