// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const dns = require("node:dns").promises;
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());
app.use(express.json());

// Mongodb data browse
//
//

const uri = `mongodb+srv://userServer:r4xLhFm952sdGanh@cluster0.gkrxgec.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //  const database = client.db("sample_mflix");
    // const movies = database.collection("movies");

    const db = client.db("UserCrud");
    const userCollection = db.collection("Users");

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      // console.log(req.params);
      const id = req.params.id;
      const quary = {
        _id: new ObjectId(id),
      };

      const user = await userCollection.findOne(quary);
      res.send(user);
    });


    app.delete("/users/:id", async (req, res) => {
      // console.log(req.params);
      const id = req.params.id;
      const quary = {
        _id: new ObjectId(id),
      };

      const result = await userCollection.deleteOne(quary);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello simple express js server");
});

app.listen(port, () => {
  console.log(`Simple app express js data server ${port}`);
});
