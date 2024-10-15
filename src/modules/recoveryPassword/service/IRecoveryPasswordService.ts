import { z } from "zod";
import type { UpdateAnswerDto } from "../dto/UpdateAnswerDto";
import { IUserQuestionsAnswers } from "../model/IUserQuestionsAnswers";
import type { AnswerVo } from "../vo/AnswerVo";
import type { QuestionVo } from "../vo/QuestionVo";
import { UserQuestionsAnswersV2Vo } from "../vo/UserQuestionAnswersv2Vo";
import type { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";
import { UserQuestionsAnswersV3vo } from "../vo/UserQuestionsAnswersv3Vo";

export interface IRecoveryPasswordService {
  registerUserQuestionsAnswers(userId: string, questionsIds: string[]): Promise<UserQuestionsAnswersVo>;
  getRandomUserQuestionByUserId(userId: string): Promise<QuestionVo | null>;
  updateAnswer(answerId: string, updateAnswerDto: UpdateAnswerDto): Promise<AnswerVo>;
  getAllUserQuestionsAnswersByUserId(userId: string): Promise<any | null>;
  isAnswerCorrect(userId: string, questionAnswerId: string, answer: string): Promise<void>;
}
