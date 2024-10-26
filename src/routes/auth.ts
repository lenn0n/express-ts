import { Router } from "express";
import {
  loginWithUsingPassword
} from "@controllers/auth.controller";
const router = Router();

router.post("/login", loginWithUsingPassword)

export default router;