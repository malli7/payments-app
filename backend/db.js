const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connectToDB;
