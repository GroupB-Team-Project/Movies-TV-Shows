import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// ES Modules helpers
// =====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================
// Serve static frontend files
// =====================

// Serve assets folder (images, icons, etc.)
app.use("/assets", express.static(path.resolve(__dirname, "../assets")));

// Serve JS and CSS folders
app.use("/js", express.static(path.resolve(__dirname, "../js")));
app.use("/css", express.static(path.resolve(__dirname, "../css")));

// Serve pages (HTML files)
const pagesPath = path.resolve(__dirname, "../pages");
app.use(express.static(pagesPath));

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(pagesPath, "index.html"));
});

// =====================
// TMDB API proxy
// =====================
app.get("/api/tmdb/:type/:category", async (req, res) => {
  const { type, category } = req.params;
  const page = req.query.page || 1;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${category}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "TMDB fetch failed" });
  }
});

// =====================
// Authentication routes
// =====================
app.use("/api", authRoutes);

// Test API route
app.get("/api/test", (req, res) => {
  res.json({ message: "API works!" });
});

// =====================
// MongoDB connection
// =====================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// =====================
// Start server
// =====================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});