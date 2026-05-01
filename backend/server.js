const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ahpRoutes = require("./routes/ahpRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ahp", ahpRoutes);

app.get("/", (req, res) => {
  res.send("AHP API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});