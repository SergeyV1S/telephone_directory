import config from "@/config";
import type { Request } from "express";

export const extractRefreshTokenFromCookie = (request: Request): string | undefined => {
  const token = request.cookies[`${config.app.name}-refresh-token`];
  return token || undefined;
};
