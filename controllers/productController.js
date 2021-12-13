const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/products", (req, res) => {
  Product.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/product/:id", (req, res) => {
  Product.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
