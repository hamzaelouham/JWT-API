const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const isEmail = require("./isEmail");

router.post("/register", (req, res) => {
  const { name, email, password, repassword } = req.body;
  let erorrs = [];
  if (!name) erorrs.push("name is required !");
  if (!isEmail(email)) erorrs.push("email is required !");
  if (!password) erorrs.push("password is required !");
  if (!repassword) erorrs.push("password is required !");

  if (password !== repassword) erorrs.push("password does not match !");
  if (password.length < 8) erorrs.push("password less then 8 caracters");

  if (erorrs.length > 0) {
    res.status(201).json(erorrs);
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        erorrs.push("email already exists !");
        res.status(201).json({ message: "user already exists !" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        //bcrypt password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                const id = user._id;
                const name = user.name;
                res.status(201).json({id,name});
              })
              .catch((e) => res.status(201).json(e));
          })
        );
      }
    });
  }
});

module.exports = router;

/*

User.find({ email: req.body.email })
    .then((result) => {
      console.log(result.length);
      if (result.length !== 0) {
        res.json({
          message: "Email already exists",
          status: false,
        });
      } else {
        let userData = req.body;
        let user = new User(userData);
        user._id = new mongoose.Types.ObjectId();

        user
          .save()
          .then((result) => {
            res.json({
              message: "User register success",
              status: true,
              send: userData,
            });
          })
          .catch((error) => {
            res.json({
              message: " User Register fail",
              status: false,
            });
          });
      }
    })
    .catch((error) => {
      res.json({
        message: " User Register fail",
        status: false,
      });
    });

*/
