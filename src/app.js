// IMPORT REQUIRED LIBRARIES AND SECURITY PACKAGES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const winston = require("winston");
const { NODE_ENV, PORT } = require("./config");
const errorHandler = require("./middleware/error-handler");
const router = require("./endpoint1/router");
const logger = require("./logger");

const app = express();

//STANDARD MIDDLEWARE
app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());
app.use(express.json());

// ROUTES
// app.use("/api/restaurants", routerNameHere);
// app.use("/api/endpoint2", routerNameHere);
// app.use("/api/endpoint3", routerNameHere);

// create an endpoint for GET restaurants
app.get("/api/restaurants", (req, res) => {
  res.send("Get restaurants");
});
// create an endpoint for POST a single restaurant
app.post("/api/restaurants", (req, res) => {
  res.send("Post restaurant");
});
// create an endpoint for DELETING a single restaurant
app.delete("/api/restaurants", (req, res) => {
  res.send("Delete restaurants");
});
// create an endpoint for PATCHING (updating) a single restaurant
app.patch("/api/restaurants", (req, res) => {
  res.send("Patch restaurants");
});

// TEST ENDPOINT
app.get("/api", (req, res) => {
  res.send("Hello, world!");
});

// CATCH ANY THROWN ERRORS AND THEN DEFINE THE ERROR AND KEEP THE APPLICATION RUNNING;
//STILL MIDDLEWARE
app.use(errorHandler);

//PIPELINE ENDS
module.exports = app;
