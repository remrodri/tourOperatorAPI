import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { LoginDto } from "../../dto/LoginDto";

// Esquema para el DTO de login
// export const LoginUserDto = z.object({
//   email: z.string().email(),
//   password: z.string(),
// });

// Respuesta de éxito
const loginSuccessResponse = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
  }),
});

// Respuesta de error
const loginErrorResponse = z.object({
  httpCode: z.number(),
  message: z.string(),
  data: z.null(),
});

// Crear el registro de OpenAPI
export const authRegistry = new OpenAPIRegistry();

authRegistry.register("Auth", LoginDto);

// authRegistry.registerPath({
authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  description: "Login a user",
  tags: ["Auth"],
  requestBody: {
    description: "User login data",
    required: true,
    content: {
      "application/json": {
        // schema: LoginUserDto,
        // example: {
        //   email: "john.doe@example.com",
        //   password: "mypassword",
        // },
        schema: {
          type: "object",
          properties: {
            email: { type: "string", format: "email", example: "john.doe@example.com" },
            password: { type: "string", example: "mypassword" },
          },
          required: ["email", "password"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "User logged in successfully",
      content: {
        "application/json": {
          schema: loginSuccessResponse,
          example: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            user: {
              id: "60c72b2f9b1e8e001c8a9a7d",
              firstName: "John",
              lastName: "Doe",
              email: "john.doe@example.com",
            },
          },
        },
      },
    },
    400: {
      description: "Invalid credentials",
      content: {
        "application/json": {
          schema: loginErrorResponse,
          example: {
            httpCode: 400,
            message: "Invalid email or password",
            data: null,
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: loginErrorResponse,
          example: {
            httpCode: 500,
            message: "Internal Server Error",
            data: null,
          },
        },
      },
    },
  },
});
