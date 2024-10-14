import { Router } from "express";
import { RecoveryPasswordController } from "../controller/RecoveryPasswordController";
import { QuestionRepository } from "../repository/QuestionRepository";
import { RecoveryPasswordRepository } from "../repository/RecoveryPasswordRepository";
import { RecoveryPasswordService } from "../service/RecoveryPasswordService";

const recoveryPasswordRouter: Router = Router();

const recoveryPasswordRepository = new RecoveryPasswordRepository();
const questionRepository = new QuestionRepository();
const recoveryPasswordService = new RecoveryPasswordService(recoveryPasswordRepository, questionRepository);
const recoveryPasswordController = new RecoveryPasswordController(recoveryPasswordService);

recoveryPasswordRouter.get("/recovery-password/:id", (req, res, next) =>
  recoveryPasswordController.getQuestionByUserId(req, res, next),
);

export default recoveryPasswordRouter;
