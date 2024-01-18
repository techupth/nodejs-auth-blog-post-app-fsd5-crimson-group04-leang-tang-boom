import { MongoClient } from "mongodb";

// const MONGODB_URL =
//   "mongodb+srv://devrleang:4321@cluster0.6hdh41z.mongodb.net/";
const connectionString = "mongodb://localhost:27017";

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

export const db = client.db("practice-mongo4");
