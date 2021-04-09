// IMPORT REQUIRED LIBRARIES AND SECURITY PACKAGES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const winston = require("winston");
const { NODE_ENV, PORT } = require("./config");
const errorHandler = require("./errorHandler");
const router = require("./router");
const logger = require("./logger");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "dev";

//STANDARD MIDDLEWARE
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// CATCH ANY THROWN ERRORS AND THEN DEFINE THE ERROR AND KEEP THE APPLICATION RUNNING;
//STILL MIDDLEWARE
app.use(errorHandler);

//PIPELINE ENDS
module.exports = app;
