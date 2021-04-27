// This is the module that holds the router for the different endpoints.
const express = require("express");
const restaurantRouter = express.Router();
const db = require("../db");

restaurantRouter
  .get("/", async (req, res, next) => {
    try {
      const response = await db.query(
        "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
      );
      res.status(200).json({
        response: response.rows.length,
        data: { restaurants: response["rows"] },
      });
    } catch (error) {
      console.log(error);
    }
  })
  .get("/:id", async (req, res) => {
    // use req.params to get the id of the restaurant we want
    try {
      const response = await db.query(
        "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1",
        [req.params.id]
      );

      const reviews = await db.query(
        "SELECT * FROM reviews WHERE restaurant_id = $1",
        [req.params.id]
      );

      res.status(200).json({
        response: response.rows.length,
        data: { restaurant: response.rows[0], reviews: reviews.rows },
      });
    } catch (error) {
      console.log(error);
    }
  })
  .post("/", async (req, res) => {
    //destructure the req.body to send request to the server
    try {
      const response = await db.query(
        "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]
      );
      res.status(201).json({
        response: response.rows.length,
        data: { restaurant: response.rows[0] },
      });
    } catch (error) {
      console.log(error);
    }
  })
  .post("/:id/review", async (req, res) => {
    try {
      const response = await db.query(
        "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
        [req.params.id, req.body.name, req.body.review, req.body.rating]
      );
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
    try {
      const response = await db.query(
        "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]
      );
      res.status(200).json({
        response: response.rows.length,
        data: { restaurant: response.rows[0] },
      });
    } catch (error) {
      console.log(error);
    }
  })
  .delete("/:id", async (req, res) => {
    // DELETE FROM table_name WHERE id = #
    try {
      const response = await db.query("DELETE FROM restaurants WHERE id = $1", [
        req.params.id,
      ]);
      res.status(204).end();
    } catch (error) {
      console.log(error);
    }
  });

module.exports = restaurantRouter;
