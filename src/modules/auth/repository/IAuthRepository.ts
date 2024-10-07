import type { IUser } from "../model/IUser";

export interface IAuthRepository {
  findByEmail(email: string): Promise<IUser | null>;
  saveUser(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    ci: string,
    password: string,
    roleId: string,
  ): Promise<IUser>;
  findAllByEmail(email: string): Promise<IUser[]>;
}
