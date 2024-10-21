import { HttpException } from "@/modules/middleware/HttpException";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { UpdateAnswerDto } from "../dto/UpdateAnswerDto";
import { QuestionModel } from "../model/QuestionModel";
import { UserQuestionsAnswersModel } from "../model/UserQuestionsAnswersModel";
import type { IAnswerRepository } from "../repository/IAnswerRepository";
import type { IQuestionRepository } from "../repository/IQuestionRepository";
import type { IRecoveryPasswordRepository } from "../repository/IRecoveryPasswordRepository";
import type { IUserQuestionsAnswersRepository } from "../repository/IUserQuestionsAnswersRepository";
import { AnswerVo } from "../vo/AnswerVo";
import { QuestionVo } from "../vo/QuestionVo";
import { UserQuestionsAnswersV2Vo } from "../vo/UserQuestionAnswersv2Vo";
import { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";
import { UserQuestionsAnswersV3vo } from "../vo/UserQuestionsAnswersv3Vo";
import type { IRecoveryPasswordService } from "./IRecoveryPasswordService";

export class RecoveryPasswordService implements IRecoveryPasswordService {
  private readonly recoveryPasswordRepository: IRecoveryPasswordRepository;
  private readonly questionRepository: IQuestionRepository;
  private readonly answerRespository: IAnswerRepository;
  private readonly userQuestionsAnswersRepository: IUserQuestionsAnswersRepository;

  constructor(
    recoveryPasswordRepository: IRecoveryPasswordRepository,
    questionRepository: IQuestionRepository,
    answerRepository: IAnswerRepository,
    userQuestionsAnswersRepository: IUserQuestionsAnswersRepository,
  ) {
    this.recoveryPasswordRepository = recoveryPasswordRepository;
    this.questionRepository = questionRepository;
    this.answerRespository = answerRepository;
    this.userQuestionsAnswersRepository = userQuestionsAnswersRepository;
  }
  async updateAnswers(answers: { answerId: string; answerText: string }[]): Promise<void> {
    answers.forEach((answer: { answerId: string; answerText: string }) => {
      this.updateAnswer(answer.answerId, { answerText: answer.answerText });
    });
  }

  async isAnswerCorrect(userId: string, questionAnswerId: string, answer: string): Promise<void> {
    const userQuestionsAnswers = await this.recoveryPasswordRepository.getAllUserQuestionsAnswerByUserId(userId);
    if (!userQuestionsAnswers) {
      throw new HttpException(StatusCodes.NOT_FOUND, `UserQuestionsAnswers not found with userId ${userId}`);
    }
    const questionsAnswers = userQuestionsAnswers.questionsAnswers;
    const questionAnswer = questionsAnswers.find((qa) => qa._id.toString() === questionAnswerId);
    if (!questionAnswer) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        `QuestionAnswer not found with questionAnswerId ${questionAnswerId}`,
      );
    }
    const answerStored = questionAnswer.answer.answerText;
    // console.log('answerStored::: ', answerStored);

    if (answer !== answerStored) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Answer is not correct");
    }
  }

  async getAllUserQuestionsAnswersByUserId(userId: string): Promise<any | null> {
    const userQuestionsAnswers = await this.userQuestionsAnswersRepository.getAllUserQuestionsAnswersByUserId(userId);
    if (!userQuestionsAnswers) {
      throw new HttpException(StatusCodes.NOT_FOUND, `UserQuestionsAnswers not found with userId ${userId}`);
    }
    const userQuestionsAnswersPopulated = await this.userQuestionsAnswersRepository.getUserQuestionsAnswersById(
      userQuestionsAnswers._id.toString(),
    );
    if (!userQuestionsAnswersPopulated) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        `UserQuestionsAnswers not found with id ${userQuestionsAnswers._id.toString()}`,
      );
    }
    const res = new UserQuestionsAnswersV3vo(
      userQuestionsAnswersPopulated._id,
      userQuestionsAnswersPopulated.user,
      userQuestionsAnswersPopulated.questionsAnswers,
    );
    return res;
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
