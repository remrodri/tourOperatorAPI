import { z } from "zod";

export const UpdateAnswerDto = z.object({
  answerText: z.string().min(1, "answer must have at least 1 character"),
});

export type UpdateAnswerDto = z.infer<typeof UpdateAnswerDto>;
