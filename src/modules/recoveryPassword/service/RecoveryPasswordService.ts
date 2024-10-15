import { HttpException } from "@/modules/middleware/HttpException";
import { StatusCodes } from "http-status-codes";
import type { UpdateAnswerDto } from "../dto/UpdateAnswerDto";
import type { IAnswerRepository } from "../model/IAnswerRepository";
import type { IQuestionRepository } from "../repository/IQuestionRepository";
import type { IRecoveryPasswordRepository } from "../repository/IRecoveryPasswordRepository";
import { AnswerVo } from "../vo/AnswerVo";
import { QuestionVo } from "../vo/QuestionVo";
import { UserQuestionsAnswersV2Vo } from "../vo/UserQuestionAnswersv2Vo";
import { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";
import type { IRecoveryPasswordService } from "./IRecoveryPasswordService";

export class RecoveryPasswordService implements IRecoveryPasswordService {
  private readonly recoveryPasswordRepository: IRecoveryPasswordRepository;
  private readonly questionRepository: IQuestionRepository;
  private readonly answerRespository: IAnswerRepository;

  constructor(
    recoveryPasswordRepository: IRecoveryPasswordRepository,
    questionRepository: IQuestionRepository,
    answerRepository: IAnswerRepository,
  ) {
    this.recoveryPasswordRepository = recoveryPasswordRepository;
    this.questionRepository = questionRepository;
    this.answerRespository = answerRepository;
  }

  async updateAnswer(answerId: string, updateAnswerDto: UpdateAnswerDto): Promise<AnswerVo> {
    const answer = await this.answerRespository.update(answerId, updateAnswerDto);
    if (!answer) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Answer not found");
    }
    return new AnswerVo(answer.answerText);
  }

  async getRandomUserQuestionByUserId(userId: string): Promise<QuestionVo | null> {
    // console.log('entre al service::: ',);
    const userQuestionsAnswers = await this.recoveryPasswordRepository.getRandomUserQuestionByUserId(userId);
    // console.log('userQuestionsAnswers::: ', userQuestionsAnswers);
    if (!userQuestionsAnswers) {
      throw new HttpException(StatusCodes.NOT_FOUND, "userQuestionsAnswers not found");
    }
    const question =
      userQuestionsAnswers.questionsAnswers[Math.floor(Math.random() * userQuestionsAnswers.questionsAnswers.length)];
    // console.log(question);

    return new QuestionVo(question.question._id.toString(), question.question.questionText, question.answer.toString());
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
