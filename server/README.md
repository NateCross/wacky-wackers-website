# Server

This is where we hook into MongoDB. It is the back-end of the site.

# Setup

- `npm i --include-dev`
- Create an env file called `.env` in this directory.
- Fill in these environment variables.

```env
ATLAS_URI=mongodb://<Username>:<Password>@ac-lvuyot7-shard-00-00.gen9guk.mongodb.net:27017,ac-lvuyot7-shard-00-01.gen9guk.mongodb.net:27017,ac-lvuyot7-shard-00-02.gen9guk.mongodb.net:27017/?ssl=true&replicaSet=atlas-sab92v-shard-0&authSource=admin&retryWrites=true&w=majority
PORT=5000
```

- `npm start` to run the server.

# Commands

- Get all products: `curl localhost:5000/products`
- POST: `curl -X POST -H "Content-Type: application/json" -d '{"name": "Pistachio", "price": 100.12345}' localhost:5000/products/add`
