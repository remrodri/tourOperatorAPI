import { Router } from "express";
import authRouter from "./auth/route/authRouter";
import userRouter from "./user/route/userRouter";

const apiRouter: Router = Router();

apiRouter.use("/v1", authRouter);
apiRouter.use("/v1", userRouter);

export default apiRouter;
