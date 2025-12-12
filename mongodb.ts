import { MongoClient, MongoClientOptions } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";
import dotenv from "dotenv";

dotenv.config();

const options: MongoClientOptions = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000,
};
const client = new MongoClient(
  process.env.MONGODB_URI as string,
  options
);

attachDatabasePool(client);

export default client;
