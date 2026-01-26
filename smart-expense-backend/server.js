require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const initAdmin = require("./config/initAdmin");

//  Database connection
// connectDB().then(() => {
//   initAdmin();
// });

// for serverless deployment on vercel because vercel may cold start the server sometimes
let isConnected = false;

async function connectionToMongoDB() {
  try {
    await connectDB();
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

// add middleware to check and establish MongoDB connection
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectionToMongoDB();
  }
  next();
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
