import { GetUserSchema } from "@/api/user/userModel";
import { userRegistry } from "@/api/user/userRouter";
import { authRegistry } from "@/modules/auth/route/doc/authRegister";
import { ApiResponse } from "@/modules/utils/ApiResponse";
import { ApiResponseBuilder } from "@/modules/utils/ApiResponseBuilder";
import { UpdateUserDto } from "../../dto/UpdateUserDto";

authRegistry.register("User", UpdateUserDto);

authRegistry.registerPath({
  method: "patch",
  path: "/api/v1/users/{id}",
  tags: ["Users"],
  request: { params: GetUserSchema.shape.params },
  responses: {
    200: {
      description: "User updated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              phone: { type: "string" },
              email: { type: "string", format: "email" },
              ci: { type: "string" },
              firstLogin: { type: "boolean" },
            },
          },
          example: {
            id: "60c72b2f9b1e8e001c8a9a7d",
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
            email: "john.doe@example.com",
            ci: "1234567",
            firstLogin: true,
          },
        },
      },
    },
  },
});
