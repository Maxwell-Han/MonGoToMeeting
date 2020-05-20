const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../db/models");
if(process.env.NODE_ENV !== 'production') require("../../secrets");

const verificationCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { doc: user } = await User.findOrCreate({
      googleId: profile.id
    });
    console.log("created user via mongoose and user is : ", user);
    done(null, user);
  } catch (err) {
    console.log('GOOGLE OAUTH ERROR ', err)
    done(err);
  }
};

const strategy = new GoogleStrategy(
  {
    clientID: process.env.clientId,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.googleCallback
  },
  verificationCallback
);

passport.use(strategy);

router.get("/", passport.authenticate("google", { scope: "email" }));

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);

module.exports = router;
