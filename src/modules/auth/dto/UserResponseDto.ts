import { IRole } from "@/modules/role/model/IRole";

export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  // ci: string,
  email: string;
  // password: string,
  // deleted: boolean,
  firstLogin: boolean;
  role: string;
}
