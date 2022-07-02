import express from "express";
import dbConn from "../db/conn.js";

const reviewRoutes = express.Router();

reviewRoutes.route("/reviews").get((_, res) => {
  let db = dbConn.getDb();
  db
    .collection("reviews")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

reviewRoutes.route("/reviews/fetchRandom/:randomCount").get((req, res) => {
  const randomCount = parseInt(req.params.randomCount);
  let db = dbConn.getDb();

  const aggregatePipeline = [
    { $sample: {size: randomCount} }
  ];

  db
    .collection("reviews")
    .aggregate(aggregatePipeline)
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

export default reviewRoutes;
