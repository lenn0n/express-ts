require("dotenv").config()

import { Request, Response } from "express";
import { loginWithPassword } from "@services/auth.service";

const { mongoDB } = require("@mongodb")

const login = (req: Request, res: Response) => {
  const password = req.body.password;
  const accessToken = loginWithPassword({ password })

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

const test = (req: Request, res: Response) => {
  mongoDB()
    .collection('social_links')
    .find()
    .sort()
    .toArray()
    .then((data: {}) => {
      res.status(200).json(data)
    })
    .catch((err: null) => {
      res.status(500).json({
        message: "An error occured while trying to fulfill your request."
      })
    })
}

export {
  login,
  user,
  test
}