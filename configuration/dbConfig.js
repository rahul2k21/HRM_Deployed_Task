const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://rahulmandal2k21:h3osdmzi1XFM73Rn@cluster0.sxwqdxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri); 
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  } 
};

module.exports = connectDB;
