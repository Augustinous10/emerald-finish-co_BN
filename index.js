import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import quoteRoutes from "./routes/quote.routes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/quote", quoteRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// error handler (catches multer errors etc.)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`[server] running on http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.error("[db] failed to connect:", e.message);
    process.exit(1);
  });