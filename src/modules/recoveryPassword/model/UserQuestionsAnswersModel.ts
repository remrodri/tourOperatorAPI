import mongoose, { Schema } from "mongoose";
import type { IUserQuestionsAnswers } from "./IUserQuestionsAnswers";

const UserQuestionsAnswersSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    collection: "User_Questions_Answers",
  },
);

export const UserQuestionsAnswersModel = mongoose.model<IUserQuestionsAnswers>(
  "UserQuestionsAnswers",
  UserQuestionsAnswersSchema,
);
