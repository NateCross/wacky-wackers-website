import { Db, MongoClient, ServerApiVersion } from "mongodb";
const Database = process.env?.ATLAS_URI || "";
const client = new MongoClient(Database, {
  serverApi: ServerApiVersion.v1,
  // Place connection options here
  // https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connection-options/#std-label-node-connection-options
});

let _db: Db;

export default {
  connectToServer: (callback: Function) => {
    client.connect((err, db) => {
      if (db) {
        _db = db.db("store");
        console.log("Successfully connected to MongoDB.")
      }
      return callback(err);
    });
  },

  getDb: (): Db => {
    return _db;
  },
};


