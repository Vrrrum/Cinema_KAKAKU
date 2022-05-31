const express = require("express");
const router = express.Router();

// @desc    Strona główna
// @route   GET /
router.get("/", (req, res) => {
  res.render("index");
});

// @desc    Oferta
// @route   GET /offers
router.get("/", (req, res) => {
  res.render("offers");
});

// @desc    Cennik
// @route   GET /price-list
router.get("/", (req, res) => {
  res.render("price-list");
});

// @desc    Kontakt
// @route   GET /contact
router.get("/", (req, res) => {
  res.render("contact");
});

// @desc    login
// @route   GET /login
router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;
