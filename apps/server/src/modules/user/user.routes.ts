import { isAuthenticated } from "@/middleware/auth.middleware";
import { Router } from "express";

import * as UserController from "./user.controller";

const router = Router();

router.get("/profile", isAuthenticated, UserController.getUserProfile);

export default router;
