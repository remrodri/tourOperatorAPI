import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { ApiResponseBuilder } from "../utils/ApiResponseBuilder";
import { HttpException } from "./HttpException";

export const errorMiddleware = (error: HttpException | ZodError, req: Request, res: Response, next: NextFunction) => {
  let status = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";
  // const data = err.data || null;

  if (error instanceof ZodError) {
    status = StatusCodes.BAD_REQUEST;
    message = error.errors.map((err) => `${err.path.join(".")} - ${err.message}`).join(", ");
  } else if (error instanceof HttpException) {
    status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    message = error.message || "Something went wrong";
  }

  const response = new ApiResponseBuilder().setStatusCode(status).setMessage(message).setData(null).build();

  // res.status(status).json({
  //   httpCode: status,
  //   message,
  //   data: null
  // });
  res.status(status).json(response);
};
