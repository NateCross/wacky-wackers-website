import express from "express";
import bcrypt from "bcrypt";
import dbConn from "../db/conn.js";

import { ObjectId } from "mongodb";

const UsersRoutes = express.Router();

interface User {
  _id?: ObjectId,
  email: string,
  password: string,
  name: string,
};

UsersRoutes.route("/users").get((req, res) => {
  let db = dbConn.getDb();
  db
    .collection("users")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

UsersRoutes.route("/register").post(async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user: User = {
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    };

    let db = dbConn.getDb();
    db
      .collection("users")
      .insertOne(user, (err, response) => {
        if (err) throw err;
        res.json(response);
      })
  } catch(e) {
    console.log(e);
    res.status(401).send("Unable to register.");
  }
});

UsersRoutes.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  let db = dbConn.getDb();
  const loggedInUser = await db.collection("users").findOne<User>({ email });

  if (!loggedInUser) {
    res.status(401).send("Unable to find user.");
    return;
  }

  try {
    const comparison = await bcrypt.compare(password, loggedInUser.password)
    if (!comparison) res.status(401).send("Incorrect password.");

    // We do this to "throw away" the password and ID so it does not get sent
    // to the client
    const { password: _, ...accountDetails } = { ...loggedInUser };

    return res.json(accountDetails);

  } catch {
    res.status(401).send("Incorrect password.");
    return;
  }
});

export default UsersRoutes;
