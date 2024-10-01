import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiResponseBuilder } from "../../utils/ApiResponseBuilder";
import { AuthController } from "../controller/AuthController";
import { CreateUserDto } from "../dto/CreateUserDto";
import { AuthRepository } from "../repository/AuthRepository";
import { AuthService } from "../service/AuthService";
// import { AuthController } from "./controller/authController";

const authRouter: Router = Router();

//instanciamos los servicios y repositorios
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// export const authRegistry = new OpenAPIRegistry();

// authRegistry.register("Auth", CreateUserDto);

// authRegistry.registerPath({
//   method: "post",
//   path: "/auth/register",
//   description: "Register a new user",
//   tags: ["Auth"],
//   requestBody: {
//     description: "User registration data",
//     required: true,
//     content: {
//       "application/json": {
//         schema: {
//           type: "object",
//           properties: {
//             firstName: {
//               type: "string",
//               example: "John",
//             },
//             lastName: {
//               type: "string",
//               example: "Doe",
//             },
//             phone: {
//               type: "string",
//               example: "1234567890",
//             },
//             email: {
//               type: "string",
//               format: "email",
//               example: "john.doe@example.com",
//             },
//             ci: {
//               type: "string",
//               example: "1234567",
//             },
//             password: {
//               type: "string",
//               example: "mypassword",
//             },
//           },
//           required: ["firstName", "lastName", "phone", "email", "ci", "password"],
//         },
//       },
//     },
//   },
//   responses: {
//     201: {
//       description: "User created successfully",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               id: {
//                 type: "string",
//                 example: "60c72b2f9b1e8e001c8a9a7d",
//               },
//               firstName: {
//                 type: "string",
//                 example: "John",
//               },
//               lastName: {
//                 type: "string",
//                 example: "Doe",
//               },
//               phone: {
//                 type: "string",
//                 example: "1234567890",
//               },
//               email: {
//                 type: "string",
//                 format: "email",
//                 example: "john.doe@example.com",
//               },
//               firstLogin: {
//                 type: "boolean",
//                 example: true,
//               },
//             },
//           },
//         },
//       },
//     },
//     400: {
//       description: "Bad Request - User already exists",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               httpCode: {
//                 type: "integer",
//                 example: 400,
//               },
//               message: {
//                 type: "string",
//                 example: "User already exists",
//               },
//               data: {
//                 type: "null",
//               },
//             },
//           },
//         },
//       },
//     },
//     500: {
//       description: "Internal Server Error",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               httpCode: {
//                 type: "integer",
//                 example: 500,
//               },
//               message: {
//                 type: "string",
//                 example: "Something went wrong",
//               },
//               data: {
//                 type: "null",
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// });

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));

export default authRouter;
