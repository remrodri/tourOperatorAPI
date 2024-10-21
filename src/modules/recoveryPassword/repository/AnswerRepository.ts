import type { UpdateAnswerDto } from "../dto/UpdateAnswerDto";
import { AnswerModel } from "../model/AnswerModel";
import type { IAnswer } from "../model/IAnswer";
import type { IAnswerRepository } from "./IAnswerRepository";

export class AnswerRepository implements IAnswerRepository {
  async update(answerId: string, updateAnswerDto: UpdateAnswerDto): Promise<IAnswer | null> {
    const updatedUser = await AnswerModel.findByIdAndUpdate(
      answerId,
      { $set: { answerText: updateAnswerDto.answerText } },
      { new: true },
    );
    return updatedUser;
  }
}
