import { ApiResponseBuilder } from "@/modules/utils/ApiResponseBuilder";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateRoleDto } from "../dto/CreateRoleDto";
import { RoleIdDto } from "../dto/roleIdDto";
import type { IRoleService } from "../service/IRoleService";

export class RoleController {
  private readonly roleService: IRoleService;

  constructor(roleService: IRoleService) {
    this.roleService = roleService;
  }

  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      // const roleIdDto = RoleIdDto.parse(req.params.id)
      // const role = await this.roleService.getRoleById(roleIdDto.id);
      const role = await this.roleService.getRoleById(req.params.id);
      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("Role found succesfully")
        .setData(role)
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.roleService.getAllRoles();
      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("Roles found succesfully")
        .setData(roles)
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const createRoleDto = CreateRoleDto.parse(req.body);
      const role = await this.roleService.register(createRoleDto.name);
      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.CREATED)
        .setMessage("Role created succesfully")
        .setData(role)
        .build();
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }
}
