const express = require("express");
const router = express.Router();

// @desc    Strona główna
// @route   GET /
router.get("/", (req, res) => {
  res.render("index");
});

// @desc    Oferta
// @route   GET /offers
router.get("/offers", (req, res) => {
  res.render("offers");
});

// @desc    Cennik
// @route   GET /price-list
router.get("/price-list", (req, res) => {
  res.render("price-list");
});

// @desc    Kontakt
// @route   GET /contact
router.get("/contact", (req, res) => {
  res.render("contact");
});

// @desc    login
// @route   GET /login
router.get("/login", (req, res) => {
  res.render("login");
});

// @desc    auth
// @route   POST /auth
router.get("/auth", (req, res) => {
  let username = req.body.email;
  let password = req.body.password;
});

module.exports = router;
