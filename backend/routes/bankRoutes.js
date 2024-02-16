const express = require("express");
const authMiddleware = require("../middleware/userMiddleware");
const Bank = require("../models/bankModel");
const mongoose = require("mongoose");
const bankRouter = express.Router();

bankRouter.get("/balance", authMiddleware, async (req, res) => {
  const balanceOfUser = await Bank.findOne({ userId: req.userId });
  if (!balanceOfUser) {
    return res.json({ error: "unable to find balance" });
  }
  res.json({ balance: balanceOfUser.balance });
});

bankRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  const currentUserAccount = await Bank.findOne({ userId: req.userId }).session(
    session
  );
  if (currentUserAccount.balance < amount) {
    session.abortTransaction();
    return res.json({ error: "Insufficient Funds" });
  }
  const toUser = await Bank.findOne({ userId: to }).session(session);
  if (!toUser) {
    session.abortTransaction();
    return res.json({ error: "Invalid Account " });
  }
  await Bank.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Bank.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);
  await session.commitTransaction();
  res.json({ msg: "transaction Successfull" });
});

module.exports = bankRouter;
