require("dotenv").config();

const mongoose = require("mongoose");
const QuizData = require("./utils/data.cjs");
const CareerData = require('./utils/data2.cjs');
const Career = require('./models/career.cjs');
const Quiz = require("./models/quiz.cjs");

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected for seeding");
}

main()
  .then(() => {
    console.log("connection successful");
  }).catch((err) => {
    console.log(err);
  })

const initDB = async () => {
  // Quiz data
  await Quiz.deleteMany({});
  await Quiz.insertMany(QuizData.data);
  console.log("🎉 Quiz data seeded successfully!");

  // Career data
  await Career.deleteMany({});
  await Career.insertMany(CareerData.data);
  console.log("🎉 Career data seeded successfully!");
};

initDB();
