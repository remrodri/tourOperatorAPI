import type { IUserQuestionsAnswers } from "../model/IUserQuestionsAnswers";
import { UserQuestionsAnswersV2Vo } from "../vo/UserQuestionAnswersv2Vo";

export interface IUserQuestionsAnswersRepository {
  getAllUserQuestionsAnswersByUserId(userId: string): Promise<IUserQuestionsAnswers | null>;
  getUserQuestionsAnswersById(id: string): Promise<IUserQuestionsAnswers | null>;
}
