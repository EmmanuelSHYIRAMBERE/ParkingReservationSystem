// import passport from "passport";
// import googleStrategy from "passport-google-oauth2";

// googleStrategy.Strategy;

// passport.serializeUser(function (user, done) {
//   /*
//     From the user take just the id (to minimize the cookie size) and just code
//     to the done callback
//     PS: You don't have to do it like this its just usually done like this

//      */

//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   /*
//     Instead of user this function usually receives the id
//     then you use the id to select the user from the db and pass the user
//     PS: You can later access this data in any routes in: req.user
//     */

//   done(null, user);
// });

// import session from "express-session";

// import passport from "passport";
// require("./utility/passport-setup");

// passport.use(
//   new googleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       passReqToCallback: true,
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       return done(null, profile);
//     }
//   )
// );

// app.use(
//   session({
//     secret: process.env.JWT_SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("htmlFiles/emailMessage.ejs");
// });
// app.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// app.get("/success", (req, res) => {
//   res.render("htmlFiles/profile.ejs", {
//     name: req.user.displayName,
//     email: req.user.emails[0].value,
//     pic: req.user.photos[0].value,
//   });
// });

// app.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/failed" }),
//   function (req, res) {
//     //Successful authentication, redirect home.
//     res.redirect("/success");
//   }
// );

// app.get("/logout", (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect("/");
// });
