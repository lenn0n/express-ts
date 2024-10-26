import { generateHash, validateInput, signToken } from "@hooks/useJWT";
import useNodeMailer from "@hooks/useNodeMailer"
import { retrieveData, insertData } from "@services/mongo.service"
import e from "express";

type loginWithPasswordProp = { password: string, expiresIn?: string }
type emailTemplateProp = { sendTo: string, subject: string, html: string }

export const loginWithPassword = async ({ password, expiresIn }: loginWithPasswordProp) => {

  // QUERY THE HASH FROM THE DATABASE
  const hash = "SELECTED_FROM_DATABASE_USING_USERNAME_OR_EMAIL"
  const checkPassword = await validateInput({ input: password, hash })

  if (!checkPassword) {
    return {
      code: 401,
      json: {
        message: "Incorrect password."
      }
    }
  }

  // GENERATION OF PAYLOAD
  const userPublicData = {
    userData: {}
  }
  let tokenOptions = {
    expiresIn: expiresIn || '24h'
  }

  const generatedToken = signToken({ payload: userPublicData, options: tokenOptions })

  return {
    code: 200,
    json: {
      message: "User authenticated successfully.",
      token: generatedToken
    }
  }
}

export const sendEmailMessage = async ({ sendTo, subject, html }: emailTemplateProp) => {
  const { sendEmail } = await useNodeMailer({
    sendTo,
    subject,
    html,
  })
  return await sendEmail();
}
