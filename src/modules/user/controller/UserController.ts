import { ApiResponseBuilder } from "@/modules/utils/ApiResponseBuilder";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { UpdateUserDto } from "../dto/UpdateUserDto";
import type { IUserService } from "../service/IUserService";

export class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("User found succesfully")
        .setData(user)
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updateUserDto = req.body as UpdateUserDto;
      const userId = req.params.id;

      const updateUser = await this.userService.updateUser(userId, updateUserDto);

      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("User updated succesfully")
        .setData(updateUser)
        .build();
      res.status(StatusCodes.OK).json(response);
      return;
    } catch (error) {
      next(error);
    }
  }
}
