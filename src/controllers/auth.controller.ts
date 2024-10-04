require("dotenv").config()

import { Request, Response } from "express";
import { loginWithPassword } from "@services/auth.service";

const login = (req: Request, res: Response) => {
  const password = req.body.password;
  const accessToken = loginWithPassword({ password, expiresIn: '1m' })

  if (!accessToken) {
    return res.status(401).json({ message: "Wrong Password. Please try again." });
  }

  return res.status(200).json({
    access: accessToken
  })
}

const user = (req: Request, res: Response) => {
  return res.status(200).json({
    profile: {
      name: 'John Doe',
      country: 'PH'
    },
    settings: {
      mfa: false,
      pin: false
    },
    authenticated: true
  })
}

export {
  login,
  user
}