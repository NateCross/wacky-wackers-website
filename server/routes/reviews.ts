import express from "express";
import dbConn from "../db/conn.js";

import { ObjectId } from "mongodb";

const reviewRoutes = express.Router();

reviewRoutes.route("/reviews").get((req, res) => {
  let db = dbConn.getDb();
  db
    .collection("reviews")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

export default reviewRoutes;
