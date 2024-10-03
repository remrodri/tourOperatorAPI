import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// Crear el registro de OpenAPI
export const myUserRegistry = new OpenAPIRegistry();

// Esquema para la respuesta de éxito al obtener un usuario
const getUserSuccessResponse = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  firstLogin: z.boolean(),
});

// Esquema para la respuesta de error
const getUserErrorResponse = z.object({
  httpCode: z.number(),
  message: z.string(),
  data: z.null(),
});

// Añadir las rutas con los ejemplos y respuestas manuales
myUserRegistry.registerPath({
  method: "get",
  path: "/api/v1/users/{id}",
  description: "Get user by ID",
  tags: ["Users"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        example: "60c72b2f9b1e8e001c8a9a7d",
      },
    },
    // Parámetro del token de autenticación
    {
      name: "Authorization",
      in: "header",
      required: true,
      description: "Bearer token for authentication",
      schema: {
        type: "string",
        example:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmZkN2U4OTg3MTFkM2M4ZTJmZDhhZjgiLCJlbWFpbCI6IiQyYSQxMCR6NnNZQU9rSkoyM1dLNGRtWEZ5bmsuSkhHOC8vdXBtcDAvaTFmME9rQzZST1poZzVlRnNnMiIsImlhdCI6MTcyNzkwODcyNywiZXhwIjoxNzMwNTAwNzI3fQ.OpcuD89za8GYeJYE3LZttLal2X0dYMEYgRhVti-HqZk",
      },
    },
  ],
  responses: {
    200: {
      description: "User retrieved successfully",
      content: {
        "application/json": {
          schema: getUserSuccessResponse,
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
    401: {
      description: "Unauthorized - Missing or invalid token",
      content: {
        "application/json": {
          schema: getUserErrorResponse,
          example: {
            httpCode: 401,
            message: "Unauthorized - Missing or invalid token",
            data: null,
          },
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: getUserErrorResponse,
          example: {
            httpCode: 404,
            message: "User not found",
            data: null,
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: getUserErrorResponse,
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
