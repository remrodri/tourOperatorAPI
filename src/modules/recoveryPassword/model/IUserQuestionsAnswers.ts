import type { AnswerVo } from "../vo/AnswerVo";
import type { QuestionVo } from "../vo/QuestionVo";
import { IQuestion } from "./IQuestion";

export interface IUserQuestionsAnswers extends Document {
  _id: string;
  user: string;
  // questionsAnswers: [QuestionVo, AnswerVo]; // [question, answer]
  questionsAnswers: [any, any]; // [question, answer]
  // questionsAnswers: [object, object]; // [question, answer]
  // questionsAnswers: [{question:string, answer:string}]
}
