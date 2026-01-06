import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local or .env");
  process.exit(1);
}

const sections = [
  "nav",
  "hero",
  "workExperience",
  "educationAndAwards",
  "projects",
  "contact",
  "footer"
];

async function syncSeed() {
  const client = new MongoClient(MONGODB_URI!);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db();
    const data: Record<string, any> = {};

    console.log("Fetching data from collections...");

    for (const section of sections) {
      const collectionName = section.charAt(0).toUpperCase() + section.slice(1);
      const doc = await db.collection(collectionName).findOne({}, { projection: { _id: 0 } });
      
      if (doc) {
        data[section] = doc;
        console.log(`✓ Fetched ${collectionName}`);
      } else {
        console.warn(`! No data found for ${collectionName}`);
      }
    }

    const seedFilePath = path.join(process.cwd(), "scripts", "seed.ts");
    
    if (!fs.existsSync(seedFilePath)) {
      throw new Error(`Seed file not found at ${seedFilePath}`);
    }

    const seedContent = fs.readFileSync(seedFilePath, "utf-8");

    // Find the start and end of the initialData object
    const startRegex = /const\s+initialData\s*=\s*/;
    const endRegex = /async\s+function\s+seed\(\)/;

    const startMatch = seedContent.match(startRegex);
    const endMatch = seedContent.match(endRegex);

    if (!startMatch || !endMatch) {
      throw new Error("Could not locate 'initialData' block or 'seed' function in seed.ts.");
    }

    const startIndex = startMatch.index! + startMatch[0].length;
    const endIndex = endMatch.index!;

    // Format the new data as a JSON string
    const newDataString = JSON.stringify(data, null, 2);

    // Construct the new file content
    // Construct the new file content
    const newContent =
      seedContent.substring(0, startIndex) +
      newDataString +
      ";\n\n" +
      seedContent.substring(endIndex);

    fs.writeFileSync(seedFilePath, newContent, "utf-8");
    console.log("\nSuccessfully updated scripts/seed.ts with current database content.");

  } catch (error) {
    console.error("\nSync failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

syncSeed();
