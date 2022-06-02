const express = require("express");
const session = require("express-session");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signIn, signUp } = require("../login");
const User = require("../models/Users");

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

router.post("/login", (req, res) => {
  if (req.body.action == "login") {
    const { email, password } = req.body;

    signIn(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        res.render("login", { error: e.message });
      });
  } else if (req.body.action == "register") {
    const { login, email, password, rePassword } = req.body;

    signUp(login, email, password, rePassword)
      .then(() => {
        res.redirect("/");
        console.log("User saved sucessfully");
      })
      .catch((e) => {
        res.render("login", { error: e.message });
      });
  }
});

// @desc    auth
// @route   POST /auth
// router.post("/login/auth", (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   signIn(email, password)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.redirect("/login");
//     });
// });

// // @desc    register
// // @route   POST /reg
// router.post("/login/reg", (req, res) => {
//   const login = req.body.login;
//   const email = req.body.email;
//   const password = req.body.password;
//   const rePassword = req.body.rePassword;

//   signUp(login, email, password, rePassword)
//     .then(() => {
//       res.redirect("/");
//       console.log("User saved sucessfully");
//     })
//     .catch((e) => {
//       console.log("Smth bad happend: ", e.message);
//       res.status(401).send({ loginStatus: "Passwords doesn't match" });
//       res.render("login", {
//         loginStatus: 1,
//       });
//     });
// });

module.exports = router;
