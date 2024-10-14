import mongoose, { Schema } from "mongoose";
import type { IUserQuestionsAnswers } from "./IUserQuestionsAnswers";

const UserQuestionsAnswersSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    questionsAnswers: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Question",
        },
        answer: {
          type: Schema.Types.ObjectId,
          ref: "Answer",
        },
      },
    ],
    // questionsAnswers: [{ type: Schema.Types.ObjectId, ref: "Question" }]
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
