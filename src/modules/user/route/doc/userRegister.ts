import { UserSchema } from "@/api/user/userModel";
import { ApiResponse } from "@/modules/utils/ApiResponse";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

// Crear el registro de OpenAPI
export const myUserRegistry = new OpenAPIRegistry();

myUserRegistry.register("Users", UserSchema);

myUserRegistry.registerPath({
  method: "patch",
  path: "/api/v1/users/{id}/delete",
  description: "soft delete",
  tags: ["Users"],
  // request: { params: GetUserSchema.shape.params },
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string", example: "670044e869589efcd1ce4ee5" },
    },
  ],

  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "User marked as deleted",
    },
  },
});

// Aplicar seguridad globalmente o a rutas específicas
myUserRegistry.registerPath({
  method: "get",
  path: "/api/v1/users",
  description: "Get all users",
  tags: ["Users"],

  security: [{ bearerAuth: [] }], // Añadir el esquema de seguridad aquí
  responses: {
    200: {
      description: "Users retrieved successfully",
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
              firstLogin: { type: "boolean" },
            },
          },
          example: [
            {
              id: "60c72b2f9b1e8e001c8a9a7d",
              firstName: "John",
              lastName: "Doe",
              phone: "1234567890",
              email: "john.doe@example.com",
              firstLogin: true,
            },
            {
              id: "60c72b2f9b1e8e001c8a9a7d",
              firstName: "John",
              lastName: "Doe",
              phone: "1234567890",
              email: "john.doe@example.com",
              firstLogin: true,
            },
          ],
        },
      },
    },
    401: {
      description: "Unauthorized - Missing or invalid token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              httpCode: { type: "number" },
              message: { type: "string" },
              data: { type: "null" },
            },
          },
          example: {
            httpCode: 401,
            message: "Unauthorized - Missing or invalid token",
            data: null,
          },
        },
      },
    },
    // 404: {
    //   description: "User not found",
    //   content: {
    //     "application/json": {
    //       schema: {
    //         type: "object",
    //         properties: {
    //           httpCode: { type: "number" },
    //           message: { type: "string" },
    //           data: { type: "null" },
    //         },
    //       },
    //       example: {
    //         httpCode: 404,
    //         message: "User not found",
    //         data: null,
    //       },
    //     },
    //   },
    // },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              httpCode: { type: "number" },
              message: { type: "string" },
              data: { type: "null" },
            },
          },
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
