const express = require("express");
const cors = require("cors");
const router = require("./router");
// import .env file
require("dotenv").config();

// Initialization
const app = express();
const PORT = process.env.PORT || 3001;

// Common middleware
app.use(cors());
app.use(express.json())

// Routing
app.get("/", (req, res) => {
  res.send("Server is running.")
});
app.post("/", (req, res) => {
  res.status(201);
  res.send(req.body.hello);
});
app.get("/status", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.use("/api", router);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
