import { IRole } from "@/modules/role/model/IRole";
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
    roleId: string,
  ): Promise<UserResponseDto>;

  login(email: string, password: string): Promise<{ user: UserResponseDto; token: string }>;

  registerUserQuestionsAnswers(userId: string): Promise<void>;
}
