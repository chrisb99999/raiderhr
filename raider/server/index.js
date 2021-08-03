"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { getCompanies, addTestUser } = require("./handlers");
const PORT = 4000;
express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //endpoints
  .get("/api/companies", getCompanies)
  .post("/api/test/user", addTestUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
