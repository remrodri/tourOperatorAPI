import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import connectDB from "./config/database";
import apiRouter from "./modules/ApiRouter";
import authRouter from "./modules/auth/route/authRouter";
import { errorMiddleware } from "./modules/middleware/ErrorMiddleware";

const logger = pino({ name: "server start" });

connectDB();

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
// app.use("/auth", authRouter);
app.use("/api", apiRouter);

// Swagger UI
app.use(openAPIRouter);

//MySwagger UI
// app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handlers
app.use(errorHandler());

//myErrorHandles
app.use(errorMiddleware);

export { app, logger };
