"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {
  getCompanies,
  addTestUser,
  addCompany,
  addTestCo,
  getCompanyList,
  addUser,
  getUsersByCompany,
} = require("./handlers");
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
  .use(morgan("dev"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //endpoints
  .get("/api/companies", getCompanies)
  .get("/api/companyList", getCompanyList)
  .get("/api/users/:companyName", getUsersByCompany)
  .post("/api/test/user", addTestUser)
  .post("/api/test/co", addTestCo)
  .put("/api/addCompany/:companyName", addCompany)
  .put("/api/addUser/:companyName", addUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
