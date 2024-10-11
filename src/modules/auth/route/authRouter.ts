import { RecoveryPasswordRepository } from "@/modules/recoveryPassword/repository/RecoveryPasswordRepository";
import { RecoveryPassword } from "@/modules/recoveryPassword/service/RecoveryPasswordService";
import { RoleRepository } from "@/modules/role/repository/RoleRepository";
import { UserRepository } from "@/modules/user/repository/UserRepository";
import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthRepository } from "../repository/AuthRepository";
import { AuthService } from "../service/AuthService";

const authRouter: Router = Router();

//instanciamos los servicios y repositorios
const authRepository = new AuthRepository();
const roleRepository = new RoleRepository();
const recoveryPasswordRepository = new RecoveryPasswordRepository();
const userRepository = new UserRepository();
const recoveryPasswordService = new RecoveryPassword(recoveryPasswordRepository);

const authService = new AuthService(authRepository, roleRepository, recoveryPasswordService, userRepository);
const authController = new AuthController(authService);

authRouter.post("/auth/register", authController.register.bind(authController));
authRouter.post("/auth/login", authController.login.bind(authController));

export default authRouter;
