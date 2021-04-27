// IMPORT REQUIRED LIBRARIES AND SECURITY PACKAGES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = express.json();
const { NODE_ENV } = require("./config");
const errorHandler = require("./middleware/error-handler");
const restaurantRouter = require("./restaurant/restaurantRouter");

const app = express();

//STANDARD MIDDLEWARE
app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "dev", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());
app.use(bodyParser);

// ROUTES

app.use("/api/restaurant", restaurantRouter);

// TEST ENDPOINT
app.get("/api", (req, res) => {
  res.send("Hello, world!");
});

// CATCH ANY THROWN ERRORS AND THEN DEFINE THE ERROR AND KEEP THE APPLICATION RUNNING;
app.use(errorHandler);
//PIPELINE ENDS

module.exports = app;
