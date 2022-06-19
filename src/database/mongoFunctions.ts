// import { DbClient } from './mongoDb'
//
// // Based on https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb
//
// async function run() {
//   try {
//     await DbClient.connect();
//
//     await DbClient.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to MongoDB");
//   } finally {
//     await DbClient.close();
//   }
// }
//
// run().catch(console.error);
export {};
