import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// ─── CORS ────────────────────────────────────────────────────────────────────
// Allow the Bibliotheca frontend dev server and any deployed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:5175", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' not allowed`));
      }
    },
    credentials: true,
  }),
);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());

// ─── Database ─────────────────────────────────────────────────────────────────
connectDB();

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "📚 Bibliotheca Book Inventory API",
    version: "2.0.0",
    endpoints: {
      books: "/api/books",
      book: "/api/books/:id",
    },
  });
});

app.use("/api/books", bookRoutes);

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: err.message || "Internal server error" });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
