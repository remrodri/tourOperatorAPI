import type { IQuestion } from "../model/IQuestion";
import type { QuestionVo } from "../vo/QuestionVo";

export interface IQuestionRepository {
  getRandomQuestions(limit: number): Promise<QuestionVo[]>;
  // getRandomUserQuestionByUserId(userId:string): Promise<QuestionVo>;
  getQuestionById(questionId: string): Promise<IQuestion | null>;
}
