const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Story = require("../models/Story");

//  @desc Logic/landing page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("Login", {
    layout: "login",
  });
});

//  @desc Dashb oard
// @route GET / dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();

    res.render("Dashboard", {
      name: req.user.firstName,
      layout: "main",
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
module.exports = router;
