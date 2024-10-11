import type { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";

export interface IRecoveryPasswordRepository {
  register(userId: string): Promise<UserQuestionsAnswersVo>;
}
