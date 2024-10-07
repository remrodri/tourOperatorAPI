import type { IRole } from "../model/IRole";

export interface IRoleRepository {
  findById(id: string): Promise<IRole | null>;
  findAll(): Promise<IRole[]>;
  saveRole(name: string): Promise<IRole>;
  findByName(name: string): Promise<IRole | null>;
}
