"use strict";
const assert = require("assert");
require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const { v4: uuidv4 } = require("uuid");

const getCompanyList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");

  const result = await db
    .collection("companies")
    .find({ _id: "f48a7bb5-5c07-451f-bcdf-581b12e6bc55" })
    .toArray();

  res.status(200).json({ companies: result });
  client.close();
  console.log("disconnected from db");
};

const getUsersByCompany = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");
  const company = req.params;
  const lookupvalue = company.companyName;
  let query={};
  query[lookupvalue]
  const result = await db
    .collection("users")
    .findOne({ `lookupvalue`: { $exists: true } })
    .toArray();
  let companies = [];
  console.log(result, lookupvalue);
  result.forEach((element) => {
    console.log(element);
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

const getCompanies = async (req, res) => {
  // res.status(200).json({ message: "hello" });
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

const addCompany = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  const newCo = req.params;
  const name = newCo.companyName;
  let query = {};
  query[name] = [];

  try {
    const result = await db
      .collection("companies")
      .updateOne(
        { _id: "f48a7bb5-5c07-451f-bcdf-581b12e6bc55" },
        { $push: { companies: name } }
      );
    const userCo = await db
      .collection("users")
      .updateOne(
        { _id: "69471363-6ed5-4940-a785-9587f2df5480" },
        { $push: query }
      );
    if (result && userCo) {
      res.status(201).json({ status: 201, message: "ok", newCo: name });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "error adding company", newCo: "error" });
    }
  } catch (err) {
    console.log(`addCompany error: `);
    console.log(err);
    res.status(404).json({ status: 404, message: err, newCo: "error" });
  }
};

const addTestCo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");

  const result = await db
    .collection("companies")
    .insertOne({ companies: [], _id: uuidv4() });

  if (result) {
    res.status(201).json({ status: 201, user: result });
  } else {
    res.status(404).json({ status: 404, error: "error inserting test co" });
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

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  const newCo = req.params;
  const name = newCo.companyName;
  let query = {};
  query[name] = [];

  try {
    const result = await db
      .collection("users")
      .updateOne(
        { _id: "69471363-6ed5-4940-a785-9587f2df5480" },
        { $push: query }
      );

    if (result) {
      res.status(201).json({ status: 201, user: result });
    } else {
      res.status(404).json({ status: 404, error: "error inserting user" });
    }
  } catch {
    console.log(`addUser error: `);
    console.log(err);
    res.status(404).json({ status: 404, message: err, user: "error" });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = {
  addTestUser,
  getCompanies,
  addTestCo,
  addCompany,
  getCompanyList,
  addUser,
  getUsersByCompany,
};
