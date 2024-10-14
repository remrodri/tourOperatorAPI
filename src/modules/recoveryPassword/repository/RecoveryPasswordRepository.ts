import { AnswerModel } from "../model/AnswerModel";
import { UserQuestionsAnswersModel } from "../model/UserQuestionsAnswersModel";
import { QuestionVo } from "../vo/QuestionVo";
import { UserQuestionsAnswersV2Vo } from "../vo/UserQuestionAnswersv2Vo";
import { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";
import type { IRecoveryPasswordRepository } from "./IRecoveryPasswordRepository";

export class RecoveryPasswordRepository implements IRecoveryPasswordRepository {
  async getRandomUserQuestionByUserId(userId: string): Promise<any | null> {
    // console.log('entre al repositorio::: ',userId);
    return await UserQuestionsAnswersModel.findOne({ user: userId }).populate("questionsAnswers.question");
    // console.log('userQuestionsAnswers::: ', userQuestionsAnswers);
    // return null
  }

  async register(userId: string, questionIds: string[]): Promise<UserQuestionsAnswersVo> {
    // console.log('userId::: ', userId);
    const questionsAnswersToSave = await Promise.all(
      questionIds.map(async (questionId) => {
        const emptyAnswer = new AnswerModel();
        const createdAnswerId = (await emptyAnswer.save())._id.toString();
        return { question: questionId, answer: createdAnswerId };
      }),
    );

    const newUserQuestionsAnswers = new UserQuestionsAnswersModel({
      user: userId,
      // questionsAnswers:questionIds
      questionsAnswers: questionsAnswersToSave,
      // questionsAnswers: questionIds.map(questionId => ({
      //   question: questionId,
      //   // answer: '',
      // }))
    });
    const userQuestionsAnswersId = (await newUserQuestionsAnswers.save())._id.toString();
    return new UserQuestionsAnswersVo(userQuestionsAnswersId);

    // throw new Error("Method not implemented.");
  }
}
