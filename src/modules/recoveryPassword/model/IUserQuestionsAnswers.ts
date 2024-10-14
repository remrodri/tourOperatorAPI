import type { AnswerVo } from "../vo/AnswerVo";
import type { QuestionVo } from "../vo/QuestionVo";

export interface IUserQuestionsAnswers extends Document {
  user: string;
  // questionsAnswers: [QuestionVo, AnswerVo]; // [question, answer]
  questionsAnswers: [QuestionVo, AnswerVo]; // [question, answer]
  // questionsAnswers: [{question:string, answer:string}]
}
