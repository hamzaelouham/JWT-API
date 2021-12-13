const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const register = require("./auth/register");
const login = require("./auth/login");
const productController = require("./controllers/productController");

require("dotenv").config();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api", login);
app.use("/api", register);
app.use("/api", productController);

app.listen(port, () => {
  console.log(`server is runing in port ${port}`);
});
