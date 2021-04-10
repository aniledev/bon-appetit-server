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
const db = require("./db");

const app = express();

//STANDARD MIDDLEWARE
app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "dev", {
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
app.get("/api/restaurant", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM restaurants");
    console.log(response);
    res.status(200).json({
      response: response.rows.length,
      data: { restaurants: response["rows"] },
    });
  } catch (error) {
    console.log(error);
  }
});

// create an endpoint for GET a singular restaurant

app.get("/api/restaurant/:id", async (req, res) => {
  // use the req.params to get the of the restaurant we want to get
  try {
    const response = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    console.log(response["rows"]);
    res.status(200).json({
      response: response.rows.length,
      data: { restaurant: response.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
  // SELECT FROM * restaurants WHERE id = 1; <-- selecting a specific restaurant based on the id
});

// create an endpoint for POST a single restaurant
app.post("/api/restaurant", (req, res) => {
  //destruture the req.body to send request to the server
  res.status(201).send("Post restaurant");
});

// create an endpoint for DELETING a single restaurant
app.delete("/api/restaurant/:id", (req, res) => {
  // destructure the req.params body to get the id of the restaurant that you want to GET
  res.status(204).send("Delete restaurant");
});

// create an endpoint for PATCHING (updating) a single restaurant
app.put("/api/restaurant/:id", (req, res) => {
  // destructure the req.params to get the id of the restaurant that you want to GET and update
  // destructure teh req.body to get the new information that you are sending to the server
  res.status(200).send("Patch restaurants");
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
