import { z } from "zod";
import type { UpdateAnswerDto } from "../dto/UpdateAnswerDto";
import type { AnswerVo } from "../vo/AnswerVo";
import type { QuestionVo } from "../vo/QuestionVo";
import type { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";

export interface IRecoveryPasswordService {
  registerUserQuestionsAnswers(userId: string, questionsIds: string[]): Promise<UserQuestionsAnswersVo>;
  getRandomUserQuestionByUserId(userId: string): Promise<QuestionVo | null>;
  updateAnswer(answerId: string, updateAnswerDto: UpdateAnswerDto): Promise<AnswerVo>;
}
