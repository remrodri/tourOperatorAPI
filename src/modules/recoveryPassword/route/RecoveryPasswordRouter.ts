import { Router } from "express";
import { RecoveryPasswordController } from "../controller/RecoveryPasswordController";
import { AnswerRepository } from "../model/AnswerRepository";
import { QuestionRepository } from "../repository/QuestionRepository";
import { RecoveryPasswordRepository } from "../repository/RecoveryPasswordRepository";
import { UserQuestionsAnswersRepository } from "../repository/UserQuestionsAnswersRepository";
import { RecoveryPasswordService } from "../service/RecoveryPasswordService";

const recoveryPasswordRouter: Router = Router();

const recoveryPasswordRepository = new RecoveryPasswordRepository();
const questionRepository = new QuestionRepository();
const answerRepository = new AnswerRepository();
const userQuestionsAnswers = new UserQuestionsAnswersRepository();
const recoveryPasswordService = new RecoveryPasswordService(
  recoveryPasswordRepository,
  questionRepository,
  answerRepository,
  userQuestionsAnswers,
);
const recoveryPasswordController = new RecoveryPasswordController(recoveryPasswordService);

recoveryPasswordRouter.get("/recovery-password/:id/get-random-question", (req, res, next) =>
  recoveryPasswordController.getQuestionByUserId(req, res, next),
);
recoveryPasswordRouter.patch("/recovery-password/:id/update-answer", (req, res, next) =>
  recoveryPasswordController.updateAnswerbyAnswerId(req, res, next),
);
recoveryPasswordRouter.get("/recovery-password/:id/questions-answers", (req, res, next) =>
  recoveryPasswordController.getAllQuestionsAnswersByUserId(req, res, next),
);
recoveryPasswordRouter.post("/recovery-password/:id/fetch-answer", (req, res, next) =>
  recoveryPasswordController.fetchAnswer(req, res, next),
);

export default recoveryPasswordRouter;
