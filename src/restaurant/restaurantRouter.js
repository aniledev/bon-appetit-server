// // This is the module that holds the router for the different endpoints.
const path = require("path");
const express = require("express");
const restaurantRouter = express.Router();
const db = require("../db");
const bodyParser = express.json();

restaurantRouter.get("/", async (req, res, next) => {
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
});

module.exports = restaurantRouter;
