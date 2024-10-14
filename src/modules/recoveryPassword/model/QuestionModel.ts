import mongoose, { Schema } from "mongoose";
import type { IQuestion } from "./IQuestion";

const QuestionSchema: Schema = new Schema(
  {
    questionText: { type: String },
  },
  { collection: "Questions" },
);

export const QuestionModel = mongoose.model<IQuestion>("Question", QuestionSchema);
