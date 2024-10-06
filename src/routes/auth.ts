import { Router } from "express";
import { validateToken } from "@routes/middleware";
import { login, user } from "@controllers/auth.controller";

const router = Router();

router.post("/login", login)

// Example with Middleware
router.get("/user", validateToken, user)

export default router;