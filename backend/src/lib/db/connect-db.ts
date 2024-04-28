import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/flexi-chat";
const client = new MongoClient(url);

const dbName = "flexi-chat";

export const db = client.db(dbName);

export const connectDb = async () => {
  try {
    await client.connect();
    console.log("connected to DB");
  } catch (error) {
    console.log("error connecting to DB:", error);
    client.close();
  }
};
