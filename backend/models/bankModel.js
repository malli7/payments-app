const mongoose = require("mongoose");
const bankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Bank = mongoose.model("Bank", bankSchema);
module.exports = Bank;
