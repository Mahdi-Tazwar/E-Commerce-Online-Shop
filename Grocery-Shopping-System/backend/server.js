require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const user = require("./routes/userRoute");

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", user);

mongoose.connect(process.env.DB_URI).then((data) => {
  console.log(`Mongodb is connected`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working`);
});