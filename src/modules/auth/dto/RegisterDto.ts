import { z } from "zod";

export const RegisterDto = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characteres long" }),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;
