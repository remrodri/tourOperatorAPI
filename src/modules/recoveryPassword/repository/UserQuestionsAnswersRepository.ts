import type { IUserQuestionsAnswers } from "../model/IUserQuestionsAnswers";
import { UserQuestionsAnswersModel } from "../model/UserQuestionsAnswersModel";
import { UserQuestionsAnswersV2Vo } from "../vo/UserQuestionAnswersv2Vo";
import type { IUserQuestionsAnswersRepository } from "./IUserQuestionsAnswersRepository";

export class UserQuestionsAnswersRepository implements IUserQuestionsAnswersRepository {
  async getUserQuestionsAnswersById(id: string): Promise<IUserQuestionsAnswers | null> {
    return await UserQuestionsAnswersModel.findById(id).populate("questionsAnswers.question");
  }

  async getAllUserQuestionsAnswersByUserId(userId: string): Promise<IUserQuestionsAnswers | null> {
    const userQuestionsAnswers = await UserQuestionsAnswersModel.findOne({ user: userId }).exec();
    return userQuestionsAnswers;
    // console.log('userQuestionsAnswers::: ', userQuestionsAnswers);

    // throw new Error("Method not implemented.");
  }
}
