import mongoose, { Schema } from "mongoose";
import type { IAnswer } from "./IAnswer";

const AnswerSchema: Schema = new Schema(
  {
    answerText: { type: String, default: "" },
  },
  { collection: "Answers" },
);

export const AnswerModel = mongoose.model<IAnswer>("Answer", AnswerSchema);
