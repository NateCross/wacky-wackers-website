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

reviewRoutes.route("/reviews/add").post((req, response) => {
  let db = dbConn.getDb();

  const review = {
    userName: req.body.userName,
    reviewName: req.body.reviewName,
    text: req.body.text,
    address: req.body.address,
    mail: req.body.mail,
    rating: req.body.rating,
  };

  db.collection("reviews").insertOne(review, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

export default reviewRoutes;
