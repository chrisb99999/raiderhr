"use strict";
const assert = require("assert");
require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const { v4: uuidv4 } = require("uuid");

const getCompanies = async (req, res) => {
  // res.status(200).json({ message: "hello" });
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");

  const result = await db.collection("users").find().toArray();
  let companies = [];

  result.forEach((element) => {
    companies.push(element.company);
  });
  if (companies.length > 0) {
    res.status(200).json({ status: 200, result: companies });
  } else {
    res.status(500).json({ status: 500, error: "No companies found." });
  }

  client.close();
  console.log("disconnected from db");
};

const getUsersByCo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");
  const searchTerm = req.params.company;

  const result = await db.collection("users").find().toArray();
  let users = [];

  result.forEach((element) => {
    element.company.toLowerCase() === searchTerm.toLowerCase()
      ? users.push(element)
      : undefined;
  });

  if (users.length > 0) {
    res.status(200).json({ status: 200, result: users });
  } else {
    res.status(500).json({ status: 500, error: "No users found." });
  }

  client.close();
  console.log("disconnected from db");
};

const addTestUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");

  const result = await db.collection("users").insertOne({
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
  const user = req.body;

  try {
    const result = await db.collection("users").insertOne(user);
    console.log(result);
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

const getUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  const _id = req.params.userid;
  console.log(_id);
  try {
    const result = await db.collection("users").findOne({ _id: ObjectId(_id) });
    console.log(result);

    if (result) {
      res.status(201).json({ status: 201, user: result });
    } else {
      res
        .status(404)
        .json({ status: 404, error: `error inserting user ${_id}` });
    }
  } catch (err) {
    console.log(`getUserById error: `);
    console.log(err);
    res.status(404).json({ status: 404, message: err, user: "error" });
  }
  client.close();
  console.log("disconnected!");
};

const getUserByEmail = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  const email = req.params.email;

  try {
    const result = await db.collection("users").findOne({ email: email });
    console.log(result);

    if (result) {
      res.status(201).json({ status: 201, user: result });
    } else {
      res
        .status(404)
        .json({ status: 404, error: `error finding user ${email}` });
    }
  } catch (err) {
    console.log(`getUserByEmail error: `);
    console.log(err);
    res.status(404).json({ status: 404, message: err, user: "error" });
  }
  client.close();
  console.log("disconnected!");
};

const editUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  const _id = req.params.userid;
  let newUserInfo = req.body;
  console.log(_id);
  try {
    delete newUserInfo["_id"];

    const result = await db
      .collection("users")
      .replaceOne({ _id: ObjectId(_id) }, newUserInfo);
    console.log(result);

    if (result) {
      res.status(201).json({ status: 201, user: result });
    } else {
      res.status(404).json({ status: 404, error: `error editing user ${_id}` });
    }
  } catch (err) {
    console.log(`getUserById error: `);
    console.log(err);
    res.status(404).json({ status: 404, message: err, user: "error" });
  }
  client.close();
  console.log("disconnected!");
};

const getJobById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");

  try {
    const jobs = await db.collection("jobs").findOne({ _id: req.params.id });

    if (jobs) {
      res.status(200).json({ status: 200, result: jobs });
    } else {
      res.status(500).json({ status: 500, error: "No job found." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }

  client.close();
  console.log("disconnected from db");
};

const getJobs = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");

  try {
    const jobs = await db.collection("jobs").find().toArray();

    if (jobs.length > 0) {
      res.status(200).json({ status: 200, result: jobs });
    } else {
      res.status(500).json({ status: 500, error: "No jobs found." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }

  client.close();
  console.log("disconnected from db");
};

const addJob = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");
  const _id = uuidv4();

  const job = { _id: _id, ...req.body };

  try {
    console.log(job);
    const result = await db.collection("jobs").insertOne(job);
    res.status(201).json({ status: 201, result: result });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }

  client.close();
  console.log("disconnected from db");
};

const getJobsByCo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");
  const company = req.params.name;

  console.log(company);
  try {
    const jobs = await db
      .collection("jobs")
      .find({ company: company })
      .toArray();
    console.log(jobs);
    if (jobs.length > 0) {
      res.status(200).json({ status: 200, result: jobs });
    } else {
      res.status(500).json({ status: 500, error: "No jobs found." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }

  client.close();
  console.log("disconnected from db");
};

const editJobById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");

  let newJobInfo = req.body;

  try {
    delete newJobInfo["_id"];
    const jobs = await db
      .collection("jobs")
      .replaceOne({ _id: req.params.id }, newJobInfo);

    if (jobs) {
      res.status(200).json({ status: 200, result: jobs });
    } else {
      res.status(500).json({ status: 500, error: "No job found." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }

  client.close();
  console.log("disconnected from db");
};

const addJobApplication = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");
  const _id = uuidv4();

  const application = { _id: _id, ...req.body };

  try {
    console.log(application);
    const result = await db.collection("applications").insertOne(application);
    res.status(201).json({ status: 201, result: result });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }

  client.close();
  console.log("disconnected from db");
};

const getApplicationsByJobId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");
  const id = req.params.id;

  try {
    console.log(id);
    const result = await db
      .collection("applications")
      .find({ jobId: id })
      .toArray();
    console.log(result);
    res.status(201).json({ status: 201, result: result });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }

  client.close();
  console.log("disconnected from db");
};

const editApplicationById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("RaiderHR");
  console.log("connected to db");
  const id = req.params.id;
  let application = req.body;

  try {
    delete application["_id"];

    const result = await db
      .collection("applications")
      .replaceOne({ _id: id }, application);
    console.log(result);
    res.status(201).json({ status: 201, result: result });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }

  client.close();
  console.log("disconnected from db");
};

module.exports = {
  addTestUser,
  getCompanies,
  getUserById,
  addUser,
  editUserById,
  getUserByEmail,
  getUsersByCo,
  getJobs,
  addJob,
  getJobById,
  getJobsByCo,
  editJobById,
  addJobApplication,
  getApplicationsByJobId,
  editApplicationById,
};
