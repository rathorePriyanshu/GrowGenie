require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const quizs = require("./routes/quizs.cjs");
const careers = require("./routes/careers.cjs");
const otps = require("./routes/otps.cjs");
const users = require("./routes/auth.cjs");
const roadmaps = require("./routes/roadmap.cjs");
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://grow-genie-kappa.vercel.app"
    ],
    credentials: true,
  })
);

const port = process.env.PORT || 8080;


async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connection successful");
}

main()
  .then(() => {
    console.log("connection successful");
  }).catch((err) => {
    console.log(err);
  });

app.use('/api', quizs);
app.use('/api', careers);
app.use('/api', otps);
app.use('/api', users);
app.use('/api', roadmaps);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});