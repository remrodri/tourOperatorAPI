import { IAnswer } from "../model/IAnswer";
import { IQuestion } from "../model/IQuestion";
import { AnswerVo } from "./AnswerVo";
import { QuestionVo } from "./QuestionVo";

export class UserQuestionsAnswersV2Vo {
  constructor(
    public readonly id: string,
    public readonly questionsAnswers: [any, any],
  ) {}
}
