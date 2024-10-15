import type { UpdateAnswerDto } from "../dto/UpdateAnswerDto";
import { AnswerModel } from "./AnswerModel";
import type { IAnswer } from "./IAnswer";
import type { IAnswerRepository } from "./IAnswerRepository";

export class AnswerRepository implements IAnswerRepository {
  async update(answerId: string, updateAnswerDto: UpdateAnswerDto): Promise<IAnswer | null> {
    const updatedUser = await AnswerModel.findByIdAndUpdate(answerId, updateAnswerDto, { new: true });
    return updatedUser;
  }
}
