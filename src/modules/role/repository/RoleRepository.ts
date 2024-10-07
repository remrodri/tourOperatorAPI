import type { IRole } from "../model/IRole";
import { RoleModel } from "../model/RoleModel";
import type { IRoleRepository } from "./IRoleRepository";

export class RoleRepository implements IRoleRepository {
  findByName(name: string): Promise<IRole | null> {
    return RoleModel.findOne({ name: name }).exec();
  }
  saveRole(name: string): Promise<IRole> {
    const role = new RoleModel({
      name,
    });
    return role.save();
  }
  async findById(id: string): Promise<IRole | null> {
    return RoleModel.findById(id).exec();
  }

  async findAll(): Promise<IRole[]> {
    return RoleModel.find().exec();
  }
}
