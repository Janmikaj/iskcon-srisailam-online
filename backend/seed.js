import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/iskcon_srisailam_db";

// Event schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
});

const Event = mongoose.model("Event", eventSchema);

const run = async () => {
  console.log("⏳ Connecting to MongoDB...");
  try {
    await mongoose.connect(MONGO_URI, { dbName: "iskcon_srisailam_db" });
    console.log("✅ Connected to MongoDB");

    // Load events from JSON
    const eventsPath = path.join(__dirname, 'events_data.json');
    if (!fs.existsSync(eventsPath)) {
      console.error("❌ events_data.json not found! Run 'node generate_json.js' first.");
      process.exit(1);
    }

    const defaultEvents = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
    console.log(`📂 Loaded ${defaultEvents.length} events from JSON.`);

    let insertedCount = 0;
    for (const evt of defaultEvents) {
      const exists = await Event.findOne({ title: evt.title, date: evt.date });
      if (!exists) {
        await Event.create(evt);
        // console.log(`✅ Added: ${evt.title} on ${evt.date}`);
        insertedCount++;
        if (insertedCount % 50 === 0) console.log(`...Added ${insertedCount} events so far`);
      }
    }

    if (insertedCount === 0) {
      console.log("⚠️ All events already exist. No new events added.");
    } else {
      console.log(`🎉 Added ${insertedCount} new events.`);
    }

  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected.");
  }
};

run().catch(console.error);

