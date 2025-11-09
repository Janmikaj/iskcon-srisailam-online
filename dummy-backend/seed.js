import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/iskcon_srisailam_db";

// Event schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
});

const Event = mongoose.model("Event", eventSchema);

const defaultEvents = [
  { title: 'Morning Aarti', date: '2025-10-02', time: '6:00 AM - 7:30 AM', description: 'Daily temple prayers and kirtans to start your day with devotion.' },
  { title: 'Bhagavad Gita Class', date: '2025-10-04', time: '7:00 PM - 8:30 PM', description: 'Study the teachings of Krishna with guided explanations.' },
  { title: 'Navaratri Celebration', date: '2025-10-06', time: '5:00 PM - 8:00 PM', description: 'Nine nights of devotion, music, and divine celebrations.' },
  { title: 'Temple Cleaning Seva', date: '2025-10-10', time: '8:00 AM - 10:00 AM', description: 'Serve the Lord by keeping the temple clean and pure.' },
  { title: 'Kirtan Night', date: '2025-10-12', time: '6:00 PM - 8:00 PM', description: 'Join us for an ecstatic evening of musical devotion.' },
  { title: 'Rama Vijayotsava', date: '2025-10-18', time: '9:00 AM - 1:00 PM', description: 'Celebrate Lord Rama’s victory with chanting and dramas.' },
  { title: 'Monthly Feast', date: '2025-10-25', time: '12:00 PM - 2:00 PM', description: 'A grand prasadam feast for all devotees and guests.' },
  { title: 'Morning Aarti & Bhajans', date: '2025-11-01', time: '6:00 AM - 7:30 AM', description: 'A devotional morning with prayers and chanting.' },
  { title: 'Govardhan Puja', date: '2025-11-05', time: '9:00 AM - 1:00 PM', description: 'Celebrate Govardhan Puja with Annakut offering and kirtan.' },
  { title: 'Bhajan Sandhya', date: '2025-11-08', time: '6:00 PM - 8:00 PM', description: 'An evening of heartfelt devotional songs.' },
  { title: 'Youth Bhakti Gathering', date: '2025-11-12', time: '5:00 PM - 7:00 PM', description: 'An inspiring session for youth with bhakti games and talks.' },
  { title: 'Prasadam Distribution', date: '2025-11-15', time: '12:00 PM - 1:30 PM', description: 'Serving food and love to the community.' },
  { title: 'Book Distribution Drive', date: '2025-11-20', time: '10:00 AM - 12:00 PM', description: 'Spread knowledge by distributing sacred texts.' },
  { title: 'Community Feast', date: '2025-11-25', time: '12:00 PM - 2:00 PM', description: 'A joyful gathering with spiritual discussions and prasadam.' },
  { title: 'Morning Aarti', date: '2025-12-01', time: '6:00 AM - 7:30 AM', description: 'Begin the month with divine blessings.' },
  { title: 'Gita Jayanti', date: '2025-12-05', time: '9:00 AM - 12:00 PM', description: 'Celebrate the day when Lord Krishna spoke the Bhagavad Gita.' },
  { title: 'Meditation Workshop', date: '2025-12-08', time: '10:00 AM - 11:30 AM', description: 'Learn practical mantra meditation and mindfulness.' },
  { title: 'Volunteer Appreciation', date: '2025-12-12', time: '10:00 AM - 12:00 PM', description: 'Honoring our selfless volunteers for their dedication.' },
  { title: 'Cultural Night', date: '2025-12-15', time: '6:00 PM - 8:30 PM', description: 'An evening of devotional dance, drama, and music.' },
  { title: 'Winter Seva Day', date: '2025-12-20', time: '9:00 AM - 1:00 PM', description: 'Help distribute blankets and food to the needy.' },
  { title: 'Year-End Kirtan Festival', date: '2025-12-25', time: '5:00 PM - 8:00 PM', description: 'End the year with a grand kirtan celebration.' },
];

const run = async () => {
  console.log("⏳ Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI, { dbName: "iskcon_srisailam_db" });

  let insertedCount = 0;
  for (const evt of defaultEvents) {
    const exists = await Event.findOne({ title: evt.title });
    if (!exists) {
      await Event.create(evt);
      console.log(`✅ Added missing event: ${evt.title}`);
      insertedCount++;
    }
  }

  if (insertedCount === 0) {
    console.log("⚠️ All 21 events already exist. No new events added.");
  } else {
    console.log(`🎉 Added ${insertedCount} missing events.`);
  }

  await mongoose.disconnect();
  console.log("✅ MongoDB disconnected.");
};

run().catch(console.error);
