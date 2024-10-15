import type { IRole } from "../model/IRole";
import { RoleModel } from "../model/RoleModel";
import type { IRoleRepository } from "./IRoleRepository";

export class RoleRepository implements IRoleRepository {
  async findByName(name: string): Promise<IRole | null> {
    return await RoleModel.findOne({ name: name }).exec();
  }
  async saveRole(name: string): Promise<IRole> {
    const role = new RoleModel({
      name,
    });
    return await role.save();
  }
  async findById(id: string): Promise<IRole | null> {
    return await RoleModel.findById(id).exec();
  }

  async findAll(): Promise<IRole[]> {
    return await RoleModel.find().exec();
  }
}
