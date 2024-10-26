import {
  retrieveData,
  updateSingleData
} from "@services/mongo.service"

import type {
  ServiceReturnType,
  MongoParamsType
} from "@proptypes/request.types"

export const retrieveProfileService = async (payload: MongoParamsType): Promise<ServiceReturnType> => {
  const user = await retrieveData({
    collection: "users",
    find: payload.find,
    limit: payload.limit || 100,
    display: { availability: false }
  })

  if (user.length > 0) {
    return {
      code: 200,
      json: {
        list: user
      }
    }
  } else {
    return {
      code: 400,
      json: {
        data: []
      }
    }
  }
}

export const updateProfileService = async (payload: MongoParamsType): Promise<ServiceReturnType> => {
  const results = await updateSingleData({
    collection: 'users',
    id: payload.id!,
    field: payload.fields!
  })

  if (results.acknowledged) {
    return {
      code: 200,
      json: {
        message: "Profile updated successfully."
      }
    }
  } else {
    return {
      code: 201,
      json: {
        message: "Profile was already updated."
      }
    }
  }
}