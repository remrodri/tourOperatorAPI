import { authMiddleware } from "@/modules/middleware/authMiddleware";
import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";

const userRouter: Router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/users/:id", authMiddleware, (req, res, next) => userController.getUserById(req, res, next));
userRouter.patch("/users/:id", authMiddleware, (req, res, next) => userController.updateUser(req, res, next));
userRouter.patch("/users/:id/delete", authMiddleware, (req, res, next) => userController.softDelete(req, res, next));
userRouter.get("/users", authMiddleware, (req, res, next) => userController.getAllusers(req, res, next));

export default userRouter;
