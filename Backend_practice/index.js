const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const fs = require("fs");
const connectdb = require("./config/db");
const productRoute = require("./routes/productRoute");
const authroute = require("./routes/authroute");
const cartRoute = require("./routes/cartRoute");

const app = express();

app.use(cors());
app.use(express.json());
// Serve uploads: return file if exists, otherwise return an inline SVG placeholder
const uploadsDir = path.join(__dirname, "uploads");
app.use("/uploads", (req, res, next) => {
  const requested = decodeURIComponent(req.path || "").replace(/^\//, "");
  const filePath = path.join(uploadsDir, requested);
  if (requested && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }

  // inline SVG fallback (keeps response as an image)
  res.setHeader("Content-Type", "image/svg+xml");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="100%" height="100%" fill="#f3f4f6" />
    <g fill="#d1d5db" font-family="Arial, Helvetica, sans-serif" font-size="18">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No image</text>
    </g>
  </svg>`;
  res.status(200).send(svg);
});

connectdb();

app.use("/product", productRoute);
app.use("/auth", authroute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.json({ message: "server is working" });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
