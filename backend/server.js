import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { sendEmail } from "./brevoEmail.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

// Email logic moved to brevoEmail.js

// --------------------------------------
// 🛢 Mongo Connection
// --------------------------------------
mongoose
  .connect(MONGO_URI, { dbName: "iskcon_srisailam_db" })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Mongo Err:", err));


// --------------------------------------
// 🧩 Schemas
// --------------------------------------
const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  role: { type: String, default: "user" },
});

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  image: String,
  description: String,
});

const donationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  wants80G: Boolean,
  pan: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);
const Donation = mongoose.model("Donation", donationSchema);


// --------------------------------------
// 🔐 Authentication
// --------------------------------------
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, passwordHash: hash, role });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admins only" });
  next();
}


// --------------------------------------
// 📅 EVENT ROUTES (EMAIL INCLUDED)
// --------------------------------------
app.post("/events", authenticateToken, adminOnly, async (req, res) => {
  try {
    const { title, date, image, description, time } = req.body;

    const event = await Event.create({ title, date, image, description, time });

    // Fetch all user emails
    const users = await User.find({}, "email");
    const emailList = users.map(u => u.email).filter(e => e); // Filter undefined/null

    console.log(`🔍 Found ${emailList.length} users to email.`);

    if (emailList.length > 0) {
      await sendEmail(
        emailList,
        `New Event Added: ${title}`,
        `New Event: ${title}. ${description}. Check details at https://iskcon-frontend.onrender.com`,
        `
          <h2>${title}</h2>
          <p>A new event has been added.</p>
          <p><b>Date:</b> ${date}</p>
          <p><b>Time:</b> ${time || "Not specified"}</p>
          <p>${description}</p>
          <br/>
          ${image ? `<img src="${image}" width="300" />` : ""}
          <br/>
          <p>Check details here: <a href="https://iskcon-frontend.onrender.com">https://iskcon-frontend.onrender.com</a></p>
          <br/>
          <p>Hare Krishna,</p>
          <p>ISKCON Srisailam Team</p>
        `
      );
    } else {
      console.warn("⚠️ No users found to send email to.");
    }

    res.json({ message: "Event added & emails sent", event });
  } catch (err) {
    res.status(500).json({ message: "Event add failed", error: err.message });
  }
});

app.get("/events", async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

app.put("/events/:id", authenticateToken, adminOnly, async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "Updated", event: updated });
});

app.delete("/events/:id", authenticateToken, adminOnly, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


// --------------------------------------
// 💰 Donation Routes
// --------------------------------------
app.post("/donations", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();

    console.log("💰 Donation received payload:", JSON.stringify(req.body, null, 2));

    // Send Thank You Email
    if (req.body.email) {
      console.log(`📧 Attempting to send receipt to: ${req.body.email}`);
      const { firstName, amount, email } = req.body;
      await sendEmail(
        [email],
        "Thank You for Your Donation to ISKCON Srisailam",
        `Hare Krishna ${firstName}, thank you for donating ₹${amount}.`,
        `
          <h2>Hare Krishna ${firstName},</h2>
          <p>Thank you for your generous donation of <b>₹${amount}</b>.</p>
          <p>Your support helps us serve the devotees and the lord.</p>
          <br/>
          <p><i>May Lord Krishna bless you and your family.</i></p>
          <br/>
          <p>Warm Regards,</p>
          <p>ISKCON Srisailam Team</p>
        `
      );
    }

    res.json({ message: "Donation saved & email sent" });
  } catch (err) {
    console.error("Donation err:", err);
    res.status(500).json({ message: "Donation failed" });
  }
});

app.get("/donations", authenticateToken, adminOnly, async (req, res) => {
  const donations = await Donation.find().sort({ date: -1 });
  res.json(donations);
});


// --------------------------------------
app.get("/", (req, res) => res.send("ISKCON API Running"));
// --------------------------------------

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
