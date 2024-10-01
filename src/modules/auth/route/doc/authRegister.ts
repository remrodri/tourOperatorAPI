import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { CreateUserDto } from "../../dto/CreateUserDto";
import { LoginDto } from "../../dto/LoginDto";
import { login } from "./authLogin";

// Crear el registro de OpenAPI
export const authRegistry = new OpenAPIRegistry();

authRegistry.register("Auth", CreateUserDto);

// Esquema para la respuesta de éxito del registro
const registerSuccessResponse = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  firstLogin: z.boolean(),
});

// Esquema para la respuesta de error
const registerErrorResponse = z.object({
  httpCode: z.number(),
  message: z.string(),
  data: z.null(),
});

// Añadir las rutas con los ejemplos y respuestas manuales
authRegistry.registerPath({
  method: "post",
  path: "/auth/register",
  description: "Register a new user",
  tags: ["Auth"],
  requestBody: {
    description: "User registration data",
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            phone: { type: "string", example: "1234567890" },
            email: { type: "string", format: "email", example: "john.doe@example.com" },
            ci: { type: "string", example: "1234567" },
            password: { type: "string", example: "mypassword" },
          },
          required: ["firstName", "lastName", "phone", "email", "ci", "password"],
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: registerSuccessResponse,
          example: {
            id: "60c72b2f9b1e8e001c8a9a7d",
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
            email: "john.doe@example.com",
            firstLogin: true,
          },
        },
      },
    },
    400: {
      description: "Bad Request - User already exists",
      content: {
        "application/json": {
          schema: registerErrorResponse,
          example: {
            httpCode: 400,
            message: "User already exists",
            data: null,
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: registerErrorResponse,
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

//LOGIN

const loginSuccessResponse = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    firstLogin: z.boolean(),
  }),
});

// Respuesta de error
const loginErrorResponse = z.object({
  httpCode: z.number(),
  message: z.string(),
  data: z.null(),
});

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
              firstLogin: true,
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