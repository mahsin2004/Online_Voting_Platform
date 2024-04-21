const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function MongoDB() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}

MongoDB();

export default client;
