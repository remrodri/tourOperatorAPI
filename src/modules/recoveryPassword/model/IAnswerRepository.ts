import type { UpdateAnswerDto } from "../dto/UpdateAnswerDto";
import type { IAnswer } from "./IAnswer";

export interface IAnswerRepository {
  update(answerId: string, updateAnswerDto: UpdateAnswerDto): Promise<IAnswer | null>;
}
