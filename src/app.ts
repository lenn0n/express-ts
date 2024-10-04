// REST API
import express from "express"
import routes from "@routes/api-routes"
import cors from 'cors';

require('@utils/custom.console');
require('dotenv').config();

const app = express();
const expressParseOptions = {
  limit: '500mb',
};

// Express Options
app.use(express.json(expressParseOptions));

// Allow CORS
app.use(cors());

// RESTful API
app.use("/api/v1", routes);

// Start server
app.listen(process.env.SERVER_PORT, () => {
  console.info(`API Server are now running on port ${process.env.SERVER_PORT}.`)
})