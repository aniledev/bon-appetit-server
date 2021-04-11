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
  })
  .post("/:id/review", async (req, res) => {
    try {
      const response = await db.query(
        "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
        [req.params.id, req.body.name, req.body.review, req.body.rating]
      );
      // console.log(response);
      res.status(201).json({
        response: response.rows.length,
        data: {
          review: response.rows[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  })
  .put("/:id", async (req, res) => {
    // destructure the req.params to get the id of the restaurant that you want to GET and update
    // destructure teh req.body to get the new information that you are sending to the server
    // wrap the async action in a try catch block for future error handling
    // use UPDATE table_name property = value WHERE id = # to update a single row in the table
    // return data from the response using query
    try {
      const response = await db.query(
        "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]
      );
      // console.log(response.rows[0]);
      res.status(200).json({
        response: response.rows.length,
        data: { restaurant: response.rows[0] },
      });
    } catch (error) {
      console.log(error);
    }
  })
  .delete("/:id", async (req, res) => {
    // wrap the async action in a try catch block for future error handling
    // DELETE FROM table_name WHERE id = #
    // no data gets returned from a 204 request use end() to end the request response cycle
    try {
      const response = await db.query("DELETE FROM restaurants WHERE id = $1", [
        req.params.id,
      ]);
      // console.log(response);
      res.status(204).end();
    } catch (error) {
      console.log(error);
    }
  });

module.exports = restaurantRouter;
