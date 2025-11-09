import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "harekrishna_secret_key";

// ==========================
// 📦 MONGODB CONNECTION
// ==========================
mongoose
  .connect(process.env.MONGO_URI, { dbName: "iskcon_srisailam_db" })
  .then(() => console.log("✅ Connected to MongoDB (iskcon_srisailam_db)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ==========================
// 🧩 MONGOOSE SCHEMAS
// ==========================
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "user" },
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, default: "" },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);

// ==========================
// 🔐 AUTH ROUTES
// ==========================
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, passwordHash: hash, role: role || "user" });

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
    if (!valid) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

app.get("/auth/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Access denied: No token provided" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    res.json({ user });
  });
});

// ==========================
// 🛡️ AUTH MIDDLEWARES
// ==========================
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });
  next();
}

// ==========================
// 📅 EVENT ROUTES
// ==========================
app.post("/events", authenticateToken, adminOnly, async (req, res) => {
  try {
    const { title, date, image, description, time } = req.body;
    if (!title || !date)
      return res.status(400).json({ message: "Title and date are required" });

    const event = await Event.create({ title, date, image, description, time });
    res.json({ message: "Event added successfully", event });
  } catch (err) {
    res.status(500).json({ message: "Failed to add event", error: err.message });
  }
});

app.get("/events", async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

app.put("/events/:id", authenticateToken, adminOnly, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event updated successfully", event: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update event", error: err.message });
  }
});

app.delete("/events/:id", authenticateToken, adminOnly, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event", error: err.message });
  }
});




// // ==========================
// // 👑 CREATE ADMIN ROUTE (TEMPORARY)
// // ==========================
// app.get("/create-admin", async (req, res) => {
//   try {
//     const username = "janmikajayam@gmail.com";
//     const password = "1234";
//     const role = "admin";

//     // Check if admin already exists
//     const existing = await User.findOne({ username });
//     if (existing) return res.status(400).send("⚠️ Admin already exists");

//     const hash = await bcrypt.hash(password, 10);
//     await User.create({ username, passwordHash: hash, role });

//     res.send("✅ Admin created successfully");
//   } catch (err) {
//     console.error("Error creating admin:", err);
//     res.status(500).send("❌ Error creating admin");
//   }
// });

// ==========================
// 🚀 START SERVER
// ==========================
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
