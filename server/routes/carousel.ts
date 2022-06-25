import express from "express";
import dbConn from "../db/conn.js";

import { ObjectId } from "mongodb";

const carouselRoutes = express.Router();

carouselRoutes.route("/carousel").get((req, res) => {
  let db = dbConn.getDb();
  db
    .collection("carousel")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

export default carouselRoutes;
