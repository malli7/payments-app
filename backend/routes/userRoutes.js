const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const zod = require("zod");
const userRouter = express.Router();
const saltRounds = 10;
const JWT_SECRET="jwtsecret"
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/userMiddleware");
const Bank = require("../models/bankModel");

const signupBody = zod.object({
  userName: zod.string().min(3).email(),
  password: zod.string().min(6),
  firstName: zod.string().min(3),
  lastName: zod.string().min(3),
});

const signinBody = zod.object({
  userName: zod.string().min(3).email(),
  password: zod.string().min(6),
});

userRouter.post("/signup", async (req, res) => {
  const { userName, password, firstName, lastName } = req.body;
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.json({ msg: "incorrect values" });
  }
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    return res.json({ msg: "username already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      userName,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const userId = newUser._id;
    await Bank.create({
      userId,
      balance: Math.floor(Math.random() * 10000),
    });

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    return res.json({ error });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.json({ error: "invalid inputs" });
  }
  const existingUser = await User.findOne({ userName });
  if (!existingUser) {
    return res.json({ error: "username doesn't exists" });
  }
  try {
    const user = await User.findOne({ userName });
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.json({ error: "Incorrect Password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    return res.json({ error });
  }
});

userRouter.put("/change", authMiddleware, async (req, res) => {
  const { password, firstName, lastName } = req.body;

  const user = await User.findById(req.userId);
  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    user.save();
    res.json({ msg: "user information updated successfully" });
  } catch (error) {
    return res.json({ error });
  }
});

userRouter.get("/getuser", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  if (user) {
    res.json({ user });
  }
});
userRouter.get("/getotheruser", authMiddleware, async (req, res) => {
  const {id} = req.body
  const user = await User.findById(req.userId);
  if (user) {
    const otherUser = await User.findById(id)
    res.json({ otherUser });
  }
});


userRouter.get("/getallusers", authMiddleware, async (req, res) => {
  try {
    const allUsersExceptCurrentUser = await User.find({ _id: { $ne: req.userId } });
    res.json({ users: allUsersExceptCurrentUser });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = userRouter;
