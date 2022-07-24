// https://www.mongodb.com/languages/mern-stack-tutorial
import express from "express";
import cors from "cors";
import "dotenv/config";
import routeRecord from "./routes/products.js";
import routeCarousel from "./routes/carousel.js";
import routeReviews from "./routes/reviews.js";
import routeUsers from "./routes/users.js";
import dbConn from "./db/conn.js";


// Declaring globals and configs
const app = express();
const port = process.env?.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routeRecord);
app.use(routeCarousel);
app.use(routeReviews);
app.use(routeUsers);

app.listen(port, () => {
  dbConn.connectToServer((err: Function) => {
    if (err) console.error(err);
  });
  console.log(`Server listening on port ${port}!`);
});
