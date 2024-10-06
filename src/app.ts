import express from "express"
import authRoutes from "@routes/auth"
import cors from 'cors';

// Express Initialization
const app = express();
const expressParseOptions = {
  limit: '500mb',
};

// Mongo DB Initialization
const { connectToDb } = require("@mongodb")

// Utils
require('@utils/custom.console');
require('dotenv').config();

// Express Options
app.use(express.json(expressParseOptions));

// Static files
// app.use(express.static(''))

// Allow access to req.body
app.use(express.urlencoded({ extended: true }))

// Allow CORS
app.use(cors());

// RESTful API
app.use("/api/v1", authRoutes);

// Connect to Mongo and start the server
connectToDb((err: any) => {
  if (!err) {
    // Start server
    app.listen(process.env.SERVER_PORT, () => {
      console.info(`API is now running on port ${process.env.SERVER_PORT}. MongoDB was also initialized.`)
    })
  } else {
    console.error(`An error occured while trying to connect to MongoDB URI. ${process.env.MONGO_DB_URI}`);
  }
})
