import { z } from "zod";

export const CreateRoleDto = z.object({
  name: z.string({ message: "Name is required" }),
});
