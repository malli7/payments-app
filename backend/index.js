const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const connectToDB = require("./db");
const bankRouter = require("./routes/bankRoutes");
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


connectToDB();

app.use("/user", userRouter);
app.use("/bank", bankRouter);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
