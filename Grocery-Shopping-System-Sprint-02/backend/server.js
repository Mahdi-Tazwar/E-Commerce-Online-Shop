require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const user = require("./routes/userRoute");
const product = require("./routes/productRoute");

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/product", product);

mongoose.connect("mongodb://127.0.0.1:27017/onlinegroceryshop").then((data) => {
  console.log(`Mongodb is connected`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working`);
});