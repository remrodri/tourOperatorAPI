import { z } from "zod";

export const UserIdDto = z.object({
  _id: z.string({ message: "userId is required" }),
});
