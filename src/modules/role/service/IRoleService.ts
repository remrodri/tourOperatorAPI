import type { RoleVo } from "../vo/RoleVo";

export interface IRoleService {
  getRoleById(id: string): Promise<RoleVo | null>;
  getAllRoles(): Promise<RoleVo[]>;
  register(name: string): Promise<RoleVo>;
}
