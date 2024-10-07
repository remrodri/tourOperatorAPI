import { logger } from "@/server";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponseBuilder } from "../../utils/ApiResponseBuilder";
import { CreateUserDto } from "../dto/CreateUserDto";
import { RegisterDto } from "../dto/RegisterDto";
import type { AuthService } from "../service/AuthService";

export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    // logger.info(req.body);
    try {
      const createUserDto = CreateUserDto.parse(req.body);
      // logger.info(createUserDto)
      const user = await this.authService.register(
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.phone,
        createUserDto.email,
        createUserDto.ci,
        createUserDto.password,
        createUserDto.roleId,
      );
      // logger.info(user)

      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.CREATED)
        .setMessage("User registered succesfully")
        .setData(user)
        .build();

      // res.status(StatusCodes.CREATED).json({
      //   httpCode: StatusCodes.CREATED,
      //   message: "User created successfully",
      //   data: user
      // });
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // const user = await this.authService.login(email, password);
      const { user, token } = await this.authService.login(email, password);

      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("User logged in succesfully")
        .setData({ user, token })
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error); //delega el manejo de errores al middleware
    }
  }
}
