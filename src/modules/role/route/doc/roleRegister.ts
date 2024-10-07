import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { CreateRoleDto } from "../../dto/CreateRoleDto";
import { RoleVo } from "../../vo/RoleVo";

export const roleRegistry = new OpenAPIRegistry();

roleRegistry.register("Role", CreateRoleDto);

// Definir el esquema de autenticación para JWT
roleRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

roleRegistry.registerPath({
  method: "get",
  path: "/api/v1/roles/{id}",
  description: "Get role by id",
  tags: ["Roles"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        example: "6703656815e302e279c25fe8",
      },
    },
  ],
  security: [{ bearerAuth: [] }], // Añadir el esquema de seguridad aquí
  responses: {
    200: {
      description: "Role found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
            },
          },
          example: {
            id: "6703656815e302e279c25fe8",
            name: "administrator",
          },
        },
      },
    },
  },
});

roleRegistry.register("Role", CreateRoleDto);

roleRegistry.registerPath({
  method: "post",
  path: "/api/v1/roles/register",
  description: "Register a new role",
  tags: ["Roles"],
  requestBody: {
    description: "Role to register",
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "operador de ventas" },
          },
          required: ["name"],
        },
      },
    },
  },
  security: [{ bearerAuth: [] }], // Añadir el esquema de seguridad aquí
  responses: {
    201: {
      description: "Role created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string", example: "6703656815e302e279c25fe8" },
              name: {
                type: "string",
                example: "operador de ventas",
              },
            },
          },
        },
      },
    },
  },
});

roleRegistry.registerPath({
  method: "get",
  path: "/api/v1/roles",
  description: "Get all roles",
  tags: ["Roles"],
  security: [{ bearerAuth: [] }], // Añadir el esquema de seguridad aquí
  responses: {
    200: {
      description: "Roles retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "array",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
            },
          },
          example: [
            {
              id: "6703656815e302e279c25fe8",
              name: "operador de ventas",
            },
            {
              id: "6703656815e302e279c25fe9",
              name: "operador de ventas",
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
  },
});
