const express = require("express");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/persons");
var cors = require("cors");

const app = express();

mongoose.connect(
  "mongodb+srv://abdoehab:Lirten12345@lirtentask.isxop9w.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

app.use("/persons", profileRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ err });
});

app.listen(8000, () => {
  console.log(`Connection Succeeded and Run !!!`);
});
