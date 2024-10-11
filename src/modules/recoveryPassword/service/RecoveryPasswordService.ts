import type { IRecoveryPasswordRepository } from "../repository/IRecoveryPasswordRepository";
import { UserQuestionsAnswersVo } from "../vo/UserQuestionsAnswersVo";
import type { IRecoveryPasswordService } from "./IRecoveryPasswordService";

export class RecoveryPassword implements IRecoveryPasswordService {
  private readonly recoveryPasswordRepository: IRecoveryPasswordRepository;

  constructor(recoveryPasswordRepository: IRecoveryPasswordRepository) {
    this.recoveryPasswordRepository = recoveryPasswordRepository;
  }

  async registerUserQuestionsAnswers(userId: string): Promise<UserQuestionsAnswersVo> {
    // console.log('userId::: ', userId);
    const uqaId = await this.recoveryPasswordRepository.register(userId);
    const vo = new UserQuestionsAnswersVo(uqaId.id.toString());
    return vo;
    // return await this.recoveryPasswordRepository.register(userId);

    // throw new Error("Method not implemented.");
  }
}
