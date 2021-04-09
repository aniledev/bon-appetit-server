// This is the module that holds the router for the different endpoints.
const path = require("path");
const express = require("express");
const xss = require("xss");
const service = require("./service");

const Router = express.Router();
const bodyParser = express.json();

Router.route().get().post();

module.exports = router;
