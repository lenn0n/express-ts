const jwt = require("jsonwebtoken")

type loginWithPasswordProp = { password: string, expiresIn?: string }

export const loginWithPassword = ({ password, expiresIn }: loginWithPasswordProp) => {
  // Logic
  if (btoa(password) !== btoa(process.env.PASSWORD as string) || !password) {
    return false
  }

  // Store data like email and UID.
  const userPublicData = {
    hash: btoa(String(process.env.ACCESS_TOKEN_SECRET))
  }

  // Token options
  let tokenOptions = {
    expiresIn: expiresIn || '24h'
  }

  // Return token
  return jwt.sign(userPublicData, process.env.ACCESS_TOKEN_SECRET, tokenOptions);
}