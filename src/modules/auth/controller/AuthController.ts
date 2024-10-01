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
    try {
      const createUserDto = CreateUserDto.parse(req.body);
      const user = await this.authService.register(
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.phone,
        createUserDto.email,
        createUserDto.ci,
        createUserDto.password,
      );

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
}
