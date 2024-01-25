import express from "express";
import passport from "passport";
require("../utility/passport-setup");

const sign = express.Router();

sign.get("/", (req, res) => {
  res.render("htmlFiles/emailMessage.ejs");
});
sign.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

sign.get("/success", (req, res) => {
  res.render("htmlFiles/profile.ejs", {
    name: req.user.displayName,
    email: req.user.emails[0].value,
    pic: req.user.photos[0].value,
  });
});

sign.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    //Successful authentication, redirect home.
    res.redirect("/success");
  }
);

sign.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

export default sign;
