import { Router } from "express";
import { RecoveryPasswordController } from "../controller/RecoveryPasswordController";
import { AnswerRepository } from "../model/AnswerRepository";
import { QuestionRepository } from "../repository/QuestionRepository";
import { RecoveryPasswordRepository } from "../repository/RecoveryPasswordRepository";
import { RecoveryPasswordService } from "../service/RecoveryPasswordService";

const recoveryPasswordRouter: Router = Router();

const recoveryPasswordRepository = new RecoveryPasswordRepository();
const questionRepository = new QuestionRepository();
const answerRepository = new AnswerRepository();
const recoveryPasswordService = new RecoveryPasswordService(
  recoveryPasswordRepository,
  questionRepository,
  answerRepository,
);
const recoveryPasswordController = new RecoveryPasswordController(recoveryPasswordService);

recoveryPasswordRouter.get("/recovery-password/:id/get-random-question", (req, res, next) =>
  recoveryPasswordController.getQuestionByUserId(req, res, next),
);
recoveryPasswordRouter.patch("/recovery-password/:id/update-answer", (req, res, next) =>
  recoveryPasswordController.updateAnswerbyAnswerId(req, res, next),
);

export default recoveryPasswordRouter;
