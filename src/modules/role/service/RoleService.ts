import { HttpException } from "@/modules/middleware/HttpException";
import { StatusCodes } from "http-status-codes";
import roleMappper from "../mapper/RoleMapper";
import type { IRoleRepository } from "../repository/IRoleRepository";
import type { RoleVo } from "../vo/RoleVo";
import type { IRoleService } from "./IRoleService";

export class RoleService implements IRoleService {
  private readonly roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }
  async register(name: string): Promise<RoleVo> {
    const existingRole = await this.roleRepository.findByName(name);
    if (existingRole) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Role already exists");
    }
    const newRole = await this.roleRepository.saveRole(name);
    return roleMappper(newRole);
  }

  async getRoleById(id: string): Promise<RoleVo | null> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Role not found");
    }
    return roleMappper(role);
  }

  async getAllRoles(): Promise<RoleVo[]> {
    const roles = await this.roleRepository.findAll();
    return roles.map((role) => roleMappper(role));
  }
}
