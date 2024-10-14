import { ApiResponseBuilder } from "@/modules/utils/ApiResponseBuilder";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { IRecoveryPasswordService } from "../service/IRecoveryPasswordService";

export class RecoveryPasswordController {
  private readonly recoveryPasswordService: IRecoveryPasswordService;

  constructor(recoverPasswordService: IRecoveryPasswordService) {
    this.recoveryPasswordService = recoverPasswordService;
  }

  async getQuestionByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const question = await this.recoveryPasswordService.getRandomUserQuestionByUserId(req.params.id);
      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("question found succesfully")
        .setData(question)
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}
