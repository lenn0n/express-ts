import { Request, Response } from "express";
import { loginWithPassword } from "@services/auth.service";

const loginWithUsingPassword = async (req: Request, res: Response) => {
  // Check if email payload is password
  const password = req.body.password;
  if (!password) {
    return res.status(400).json({ message: "Please provide password." });
  }

  const results = await loginWithPassword(password)
  return res.status(results.code).json({ ...results.json, trace: 'loginWithPassword'});
}

export {
  loginWithUsingPassword
}