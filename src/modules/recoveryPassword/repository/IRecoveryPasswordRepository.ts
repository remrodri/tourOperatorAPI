import type { IUserQuestionsAnswers } from "../model/IUserQuestionsAnswers";
import { QuestionVo } from "../vo/QuestionVo";
import type { UserQuestionsAnswersV2Vo } from "../vo/UserQuestionAnswersv2Vo";
import type { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";

export interface IRecoveryPasswordRepository {
  register(userId: string, questionIds: string[]): Promise<UserQuestionsAnswersVo>;
  getRandomUserQuestionByUserId(userId: string): Promise<UserQuestionsAnswersV2Vo | null>;
  getAllUserQuestionsAnswerByUserId(userId: string): Promise<IUserQuestionsAnswers | null>;
}
