import { authMiddleware } from "@/modules/middleware/authMiddleware";
import { Router } from "express";
import { RoleController } from "../controller/RoleController";
import { RoleRepository } from "../repository/RoleRepository";
import { RoleService } from "../service/RoleService";

const roleRouter: Router = Router();

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

roleRouter.get("/roles/:id", authMiddleware, (req, res, next) => roleController.getRoleById(req, res, next));
roleRouter.get("/roles/", authMiddleware, (req, res, next) => roleController.getAllRoles(req, res, next));
roleRouter.post("/roles/register", (req, res, next) => roleController.register(req, res, next));
// roleRouter.get("/roles/:id", authMiddleware, (req, res, next) => roleController.getRoleById(req, res, next));
// roleRouter.get("/roles/", authMiddleware, (req, res, next) => roleController.getAllRoles(req, res, next));
// roleRouter.post("/roles/register", authMiddleware, (req, res, next) => roleController.register(req, res, next));

export default roleRouter;
