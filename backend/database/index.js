const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connectionInstance = await mongoose.connect(process.env.DB_URI);
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
