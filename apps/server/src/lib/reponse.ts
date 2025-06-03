import type { HttpStatus } from "@/utils/enums/http-status";
import type { Response } from "express";

export const sendResponse = (res: Response, statusCode: HttpStatus, message: any) => {
  res.status(statusCode).json({ statusCode, message });
};
