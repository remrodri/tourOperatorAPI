import { Router } from "express";
import authRouter from "./auth/route/authRouter";
import roleRouter from "./role/route/RoleRouter";
import userRouter from "./user/route/userRouter";

const apiRouter: Router = Router();

apiRouter.use("/v1", authRouter);
apiRouter.use("/v1", userRouter);
apiRouter.use("/v1", roleRouter);

export default apiRouter;
