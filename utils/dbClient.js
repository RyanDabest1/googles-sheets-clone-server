const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const password = process.env.PASS;

const uri = `mongodb://ryanDabest1:${password}@cluster0-shard-00-00.zheqh.mongodb.net:27017,cluster0-shard-00-01.zheqh.mongodb.net:27017,cluster0-shard-00-02.zheqh.mongodb.net:27017/?ssl=true&replicaSet=atlas-11l92a-shard-0&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

async function run() {
  try {
      await client.connect();      
      console.log("Connected to MongoDB database");
  } catch (err) {
      console.error("Error connecting to MongoDB:", err);
  } finally {
      await client.close();
  }
}
  run().catch(console.dir);

  module.exports = { client };
