const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const isEmail = require("./isEmail");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  if (!isEmail(email)) errors.push("email is required !");
  if (!password) errors.push("password is required !");
  if (errors.length > 0) {
    res.json(errors);
  } else {
    const user = await User.findOne({ email });

    if (!user) {
      errors.push("User Not Exist");
      return res.json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.push("Incorrect Password !");
      return res.json(errors);
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, name: user.name },
      "mysecretkey"
    );
    res.json({
      token,
    });
  }
});

module.exports = router;
