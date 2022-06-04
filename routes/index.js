const express = require("express");
const session = require("express-session");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signIn, signUp } = require("../login");
const User = require("../models/Users");
const Schedule = require("../models/Schedule");
const getSchedule = require("../getSchedule");

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

// @desc    login form
// @route   POST /login
router.post("/login", (req, res) => {
  if (req.body.action == "login") {
    const { email, password } = req.body;

    signIn(email, password)
      .then((result) => {
        console.log(result);
        res.redirect("/");
        req.session.name = "logged";
      })
      .catch((e) => {
        res.render("login", { RegError: e.message });
      });
  } else if (req.body.action == "register") {
    const { login, email, password, rePassword } = req.body;

    signUp(login, email, password, rePassword)
      .then(() => {
        res.redirect("/");
      })
      .catch((e) => {
        res.render("login", { LogError: e.message });
      });
  }
});

// @desc    schedule getter
// @route   GET /schedule
router.get("/schedule", (req, res) => {
  const { city, date } = req.body;
  getSchedule(city, date)
    .then((schedule) => {
      res.send({ schedule: schedule });
    })
    .catch((e) => {
      console.log(e.message);
    });
});

module.exports = router;
