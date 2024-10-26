import { Request, Response } from "express";
import { 
  retrieveProfileService, 
  updateProfileService
} from "@services/user.service";
const { ObjectId } = require('mongodb')

const retrieveProfile = async (req: Request, res: Response) => {
  let payload: any = {};

  if (req.query.email){
    payload['find'] = { email: req.query.email }
  }

  const results = await retrieveProfileService(payload)
  return res.status(results.code).json(results.json);
}

const updateProfile = async (req: Request, res: Response) => {
  let payload: any = {};

  const id = req.body.id as string;
  const fields = req.body.fields as string | {};

  if (!id) return res.status(400).json({ message: "Please provide user ID." });
  else payload['id'] = req.body.id
  
  if (!fields) return res.status(400).json({ message: "Please provide user ID." });
  else payload['fields'] = req.body.fields 

  const results = await updateProfileService(payload)
  return res.status(results.code).json(results.json);
}


export {
  retrieveProfile,
  updateProfile,
}