
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

async function checkNav() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("No MONGODB_URI");
    return;
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  const nav = await db.collection("Nav").findOne({});
  console.log(JSON.stringify(nav, null, 2));
  await client.close();
}

checkNav();
