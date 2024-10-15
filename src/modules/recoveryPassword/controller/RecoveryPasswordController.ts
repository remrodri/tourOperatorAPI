import { ApiResponseBuilder } from "@/modules/utils/ApiResponseBuilder";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { UpdateAnswerDto } from "../dto/UpdateAnswerDto";
import type { IRecoveryPasswordService } from "../service/IRecoveryPasswordService";

export class RecoveryPasswordController {
  private readonly recoveryPasswordService: IRecoveryPasswordService;

  constructor(recoverPasswordService: IRecoveryPasswordService) {
    this.recoveryPasswordService = recoverPasswordService;
  }

  async getQuestionByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const questionAnswer = await this.recoveryPasswordService.getRandomUserQuestionByUserId(req.params.id);
      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("questionAnswer found succesfully")
        .setData(questionAnswer)
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateAnswerbyAnswerId(req: Request, res: Response, next: NextFunction) {
    try {
      const updateAnswerDto = req.body as UpdateAnswerDto;
      const answerId = req.params.id;

      await this.recoveryPasswordService.updateAnswer(answerId, updateAnswerDto);

      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("answer updated succesfully")
        .setData(null)
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllQuestionsAnswersByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const userQuestionsAnswers = await this.recoveryPasswordService.getAllUserQuestionsAnswersByUserId(userId);
      // console.log('userQuestionsAnswers::: ', userQuestionsAnswers);

      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("userQuestionsAnswers found succesfully")
        .setData(userQuestionsAnswers)
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async fetchAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const questionAnswerId = req.body.questionAnswerId;
      const answer = req.body.answer;
      await this.recoveryPasswordService.isAnswerCorrect(userId, questionAnswerId, answer);
      const response = new ApiResponseBuilder()
        .setStatusCode(StatusCodes.OK)
        .setMessage("answer is correct")
        .setData(null)
        .build();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}
