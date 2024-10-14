import type { IAnswer } from "./IAnswer";
import type { IQuestion } from "./IQuestion";

export interface IQuestionAnswer extends Document {
  Question: IQuestion;
  Answer: IAnswer;
}
