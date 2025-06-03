import config from "@/config";
import type { Request } from "express";

export const extractAccessTokenFromCookie = (request: Request): string | undefined => {
  const token = request.cookies[`${config.app.name}-access-token`];
  return token || undefined;
};
