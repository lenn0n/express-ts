import { Router } from "express";
import { validateToken } from "@routes/middleware";
import { login, user, test } from "@controllers/auth.controller";

const router = Router();

router.post("/login", login)
router.get("/test", test)

// Example with Middleware
router.get("/user", validateToken, user)

export default router;