"use strict";
const assert = require("assert");
require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const { v4: uuidv4 } = require("uuid");

const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");

  const result = await db.collection("users").find().toArray();
  let companies = [];

  result.forEach((element) => {
    companies.push(Object.keys(element)[1]);
  });
  if (companies.length > 0) {
    res.status(200).json({ status: 200, result: companies });
  } else {
    res.status(500).json({ status: 500, error: "No companies found." });
  }

  client.close();
  console.log("disconnected from db");
};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");

  const result = await db.collection("users").insertOne({
    journey: [
      {
        givenName: "Bob",
        surname: "Ross",
        email: "bob@journey.com",
        title: "Junior Engineer",
        _id: uuidv4(),
        role: "User",
        directReports: [],
        reportsTo: "Terry Rossio",
        team: "engineering",
        salary: 5000,
        address: "123 Fake Street",
        country: "Canada",
        postalCode: "H1A 1A1",
        birthday: new Date("02/12/31"),
        startDate: new Date("20/12/31"),
        status: "active",
        terminationDate: "n/a",
        avatarSrc: "",
        company: "Journey",
      },
    ],
    _id: uuidv4(),
  });
  console.log(result);
  if (result) {
    res.status(201).json({ status: 201, user: result });
  } else {
    res.status(404).json({ status: 404, error: "error inserting test user" });
  }
  client.close();
  console.log("disconnected!");
};

const addTestUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");

  const result = await db.collection("users").insertOne({
    journey: [
      {
        givenName: "Bob",
        surname: "Ross",
        email: "bob@journey.com",
        title: "Junior Engineer",
        _id: uuidv4(),
        role: "User",
        directReports: [],
        reportsTo: "Terry Rossio",
        team: "engineering",
        salary: 5000,
        address: "123 Fake Street",
        country: "Canada",
        postalCode: "H1A 1A1",
        birthday: new Date("02/12/31"),
        startDate: new Date("20/12/31"),
        status: "active",
        terminationDate: "n/a",
        avatarSrc: "",
        company: "Journey",
      },
    ],
    _id: uuidv4(),
  });
  console.log(result);
  if (result) {
    res.status(201).json({ status: 201, user: result });
  } else {
    res.status(404).json({ status: 404, error: "error inserting test user" });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { addTestUser, getCompanies, addUser };
