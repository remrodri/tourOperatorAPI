import { UserRepository } from "@/api/user/userRepository";
import { RoleRepository } from "@/modules/role/repository/RoleRepository";
import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthRepository } from "../repository/AuthRepository";
import { AuthService } from "../service/AuthService";

const authRouter: Router = Router();

//instanciamos los servicios y repositorios
const authRepository = new AuthRepository();
const roleRepository = new RoleRepository();
const authService = new AuthService(authRepository, roleRepository);
const authController = new AuthController(authService);

authRouter.post("/auth/register", authController.register.bind(authController));
authRouter.post("/auth/login", authController.login.bind(authController));

export default authRouter;
