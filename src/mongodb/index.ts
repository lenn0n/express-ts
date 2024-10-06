const { MongoClient } = require('mongodb')
var dbConnection: null

module.exports = {
  connectToDb: async (cb: Function) => {
    return await MongoClient.connect(process.env.MONGO_DB_URI)
      .then((client: { db: Function }) => {
        dbConnection = client.db()
        return cb()
      })
      .catch((err: null) => {
        return cb(err)
      })
  },
  mongoDB: () => dbConnection
}