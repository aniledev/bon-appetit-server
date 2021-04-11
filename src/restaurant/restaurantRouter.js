// // This is the module that holds the router for the different endpoints.
const path = require("path");
const express = require("express");
const restaurantRouter = express.Router();
const db = require("../db");
const bodyParser = express.json();

restaurantRouter
  .get("/", async (req, res, next) => {
    try {
      // const response = await db.query("SELECT * FROM restaurants");
      const response = await db.query(
        "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
      );
      // console.log(response["rows"]);
      res.status(200).json({
        response: response.rows.length,
        data: { restaurants: response["rows"] },
      });
    } catch (error) {
      console.log(error);
    }
  })
  .get("/:id", async (req, res) => {
    // use the req.params to get the of the restaurant we want to get
    try {
      const response = await db.query(
        "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1",
        [req.params.id]
      );

      // make another request to get related reviews for a single restauran
      const reviews = await db.query(
        "SELECT * FROM reviews WHERE restaurant_id = $1",
        [req.params.id]
      );

      // console.log(response["rows"]);
      // console.log(reviews.rows);
      res.status(200).json({
        response: response.rows.length,
        data: { restaurant: response.rows[0], reviews: reviews.rows },
      });
    } catch (error) {
      console.log(error);
    }
    // SELECT FROM * restaurants WHERE id = 1; <-- selecting a specific restaurant based on the id
  })
  .post("/", async (req, res) => {
    //destruture the req.body to send request to the server
    // wrap your async actions in try catch block with simple error handling
    // INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning * <= query for database
    try {
      const response = await db.query(
        "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]
      );
      // console.log(response);
      res.status(201).json({
        response: response.rows.length,
        data: { restaurant: response.rows[0] },
      });
    } catch (error) {
      console.log(error);
    }
    // return the appropriate data back in a request
  });

module.exports = restaurantRouter;
