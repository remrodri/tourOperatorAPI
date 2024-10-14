import { QuestionModel } from "@/modules/recoveryPassword/model/QuestionModel";

import { QuestionVo } from "../vo/QuestionVo";
import type { IQuestionRepository } from "./IQuestionRepository";

export class QuestionRepository implements IQuestionRepository {
  async getRandomQuestions(limit = 3): Promise<QuestionVo[]> {
    const questions = await QuestionModel.aggregate([{ $sample: { size: limit } }]);
    return questions.map((question) => new QuestionVo(question._id));
  }
}
