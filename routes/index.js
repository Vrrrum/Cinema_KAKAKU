const express = require("express");
const session = require("express-session");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signIn, signUp } = require("../login");
const User = require("../models/Users");
const Schedule = require("../models/Schedule");
const getSchedule = require("../getSchedule");
const { redirect } = require("express/lib/response");

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
  // LOGIN
  if (req.body.action == "login") {
    const { email, password } = req.body;
    console.log(password);

    signIn(email, password)
      .then((result) => {
        res.redirect("/");
        req.session.session.userid = result._id;
        req.session.session.username = result.login;
      })
      .catch((e) => {
        res.render("login", { LogError: e.message });
      });
  }
  // REGISTER
  else if (req.body.action == "register") {
    const { login, email, password, rePassword } = req.body;

    signUp(login, email, password, rePassword)
      .then(() => {
        res.render("login", { RegError: "Zalogowano pomyślnie" });
      })
      .catch((e) => {
        res.render("login", { RegError: e.message });
      });
  }
});

// @desc    logout
// @route   GET /logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// @desc    logout
// @route   POST /logout
router.post("/getSession", (req, res) => {
  const username = req.session.username;
  res.send({ username: username });
  console.log(req.session);
});

// @desc    schedule getter
// @route   GET /schedule
router.get("/schedule", (req, res) => {
  const { city, date } = req.query;
  getSchedule(city, date)
    .then((schedule) => {
      res.send({ schedule: schedule });
    })
    .catch((e) => {
      console.log(e.message);
    });
});

module.exports = router;
