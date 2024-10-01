import { Router } from "express";
import { AuthController } from "./controller/AuthController";
import { AuthRepository } from "./repository/AuthRepository";
import { AuthService } from "./service/AuthService";
// import { AuthController } from "./controller/authController";

const authRouter: Router = Router();

//instanciamos los servicios y repositorios
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post("/register", authController.register.bind(authController));

export default authRouter;
