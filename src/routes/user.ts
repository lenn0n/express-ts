import { Router } from "express";
import { validateToken } from "@routes/middleware";
import {
  retrieveProfile,
  updateProfile
} from "@controllers/user.controller";

const router = Router();

router.get("/profile", validateToken, retrieveProfile)
router.put("/profile", validateToken, updateProfile)

export default router;