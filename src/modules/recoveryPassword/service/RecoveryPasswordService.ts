import { HttpException } from "@/modules/middleware/HttpException";
import { StatusCodes } from "http-status-codes";
import type { IQuestionRepository } from "../repository/IQuestionRepository";
import type { IRecoveryPasswordRepository } from "../repository/IRecoveryPasswordRepository";
import { QuestionVo } from "../vo/QuestionVo";
import { UserQuestionsAnswersV2Vo } from "../vo/UserQuestionAnswersv2Vo";
import { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";
import type { IRecoveryPasswordService } from "./IRecoveryPasswordService";

export class RecoveryPasswordService implements IRecoveryPasswordService {
  private readonly recoveryPasswordRepository: IRecoveryPasswordRepository;
  private readonly questionRepository: IQuestionRepository;

  constructor(recoveryPasswordRepository: IRecoveryPasswordRepository, questionRepository: IQuestionRepository) {
    this.recoveryPasswordRepository = recoveryPasswordRepository;
    this.questionRepository = questionRepository;
  }
  async getRandomUserQuestionByUserId(userId: string): Promise<QuestionVo | null> {
    // console.log('entre al service::: ',);
    const userQuestionsAnswers = await this.recoveryPasswordRepository.getRandomUserQuestionByUserId(userId);
    if (!userQuestionsAnswers) {
      throw new HttpException(StatusCodes.NOT_FOUND, "userQuestionsAnswers not found");
    }
    const question =
      userQuestionsAnswers.questionsAnswers[Math.floor(Math.random() * userQuestionsAnswers.questionsAnswers.length)];
    // console.log(question.question);

    return new QuestionVo(question.question._id.toString(), question.question.questionText);
  }

  async registerUserQuestionsAnswers(userId: string): Promise<UserQuestionsAnswersVo> {
    // console.log('userId::: ', userId);
    const randomQuestions = await this.questionRepository.getRandomQuestions(3);
    // console.log(randomQuestions);
    const questionsIds = randomQuestions.map((question) => question.questionId.toString());
    const uqaId = await this.recoveryPasswordRepository.register(userId, questionsIds);
    const vo = new UserQuestionsAnswersVo(uqaId.id.toString());
    return vo;
    // return await this.recoveryPasswordRepository.register(userId);

    // throw new Error("Method not implemented.");
  }
}
