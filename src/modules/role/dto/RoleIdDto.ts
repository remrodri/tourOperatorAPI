import { z } from "zod";

export const RoleIdDto = z.object({
  id: z.string({ message: "Id is required" }),
});
