// THIS IS WHERE YOU SHOULD REFACTOR YOUR ERROR HANDLING FUNCTION FROM APP.JS
const { NODE_ENV } = require("../config");

function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
}

module.exports = errorHandler;
