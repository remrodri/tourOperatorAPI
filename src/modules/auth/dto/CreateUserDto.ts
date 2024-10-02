import { z } from "zod";

export const CreateUserDto = z.object({
  firstName: z.string().min(1, "FirstName is required"),
  lastName: z.string().min(1, "LastName is required"),
  phone: z.string().min(8, "Phone must have at least 10 digits"),
  email: z.string().email("invalid email format"),
  ci: z.string().min(7, "ci must have at least 7 characters"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});
