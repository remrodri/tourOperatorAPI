import { QuestionModel } from "@/modules/recoveryPassword/model/QuestionModel";

import type { IQuestion } from "../model/IQuestion";
import { QuestionVo } from "../vo/QuestionVo";
import type { IQuestionRepository } from "./IQuestionRepository";

export class QuestionRepository implements IQuestionRepository {
  getQuestionById(questionId: string): Promise<IQuestion | null> {
    return QuestionModel.findById(questionId).exec();
    // throw new Error("Method not implemented.");
  }
  async getRandomQuestions(limit = 3): Promise<QuestionVo[]> {
    const questions = await QuestionModel.aggregate([{ $sample: { size: limit } }]);
    return questions.map((question) => new QuestionVo(question._id));
  }
}
