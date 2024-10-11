import { UserQuestionsAnswersModel } from "../model/UserQuestionsAnswersModel";
import { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";
import type { IRecoveryPasswordRepository } from "./IRecoveryPasswordRepository";

export class RecoveryPasswordRepository implements IRecoveryPasswordRepository {
  async register(userId: string): Promise<UserQuestionsAnswersVo> {
    // console.log('userId::: ', userId);
    const newUserQuestionsAnswers = new UserQuestionsAnswersModel({
      userId,
    });
    const UserQuestionsAnswersId = (await newUserQuestionsAnswers.save())._id.toString();
    return new UserQuestionsAnswersVo(UserQuestionsAnswersId);

    // throw new Error("Method not implemented.");
  }
}
