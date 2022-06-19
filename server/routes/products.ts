import express from "express";
import dbConn from "../db/conn.js";
import Product from "../interfaces/products.js";

// Convert the id from string to ObjectId
import { ObjectId } from "mongodb";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const productsRoutes = express.Router();

// List of all records
productsRoutes.route("/products").get((req, res) => {
  let db = dbConn.getDb();
  db
    .collection("products")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
productsRoutes.route("/products/:id").get((req, res) => {
  let db = dbConn.getDb();
  let myquery = { _id: new ObjectId( req.params.id )};
  db
    .collection("products")
    .findOne(myquery, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

productsRoutes.route("/products/add").post((req, response) => {
  let db = dbConn.getDb();
  let product: Product = {
    name: req.body.name,
    price: req.body.price
  };
  db.collection("products").insertOne(product, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

productsRoutes.route("/update/:id").post((req, response) => {
  let db = dbConn.getDb();
  let query = { _id: new ObjectId(req.params.id) };
  let newValues = {
    Set: {
      name: req.body.name,
      price: req.body.price,
    },
  };
  db.collection("products").updateOne(query, newValues, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

productsRoutes.route("/:id").delete((req, response) => {
  let db = dbConn.getDb();
  let query = { _id: new ObjectId(req.params.id) };
  db.collection("products").deleteOne(query, (err, res) => {
    if (err) throw err;
    console.log("Product deleted.");
    response.json(res);
  });
});

export default productsRoutes;
