import { z } from "zod";
import type { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";

export interface IRecoveryPasswordService {
  registerUserQuestionsAnswers(userId: string): Promise<UserQuestionsAnswersVo>;
}
