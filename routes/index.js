const express = require("express");
const router = express.Router();

// @desc    Strona główna
// @route   GET /
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
