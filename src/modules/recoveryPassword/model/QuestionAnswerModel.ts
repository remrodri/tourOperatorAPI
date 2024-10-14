import { Schema } from "mongoose";

const QuestionAnswerSchema: Schema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
});
