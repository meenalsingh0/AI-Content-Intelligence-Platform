const express = require("express");
const cors = require("cors");

const articleRoutes = require("./routes/articleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", articleRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
