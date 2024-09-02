const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
  };

module.exports.signup = async (req, res,next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, err => { 
        if (err) {
            return next(err);
          }
          req.flash("success", "Welcome to TrailsByKav");
          res.redirect("/listing");
      } );
      
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  };

 module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
  };

 module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to TrailsByKav!");
    let redirectUrl = res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl);
  } ;

  module.exports.logout = (req,res,next)=>{
    req.logout((err)=> {
      if (err) {
         return next(err);
      }
    
    req.flash("success","Thanks for visiting TrailsByKav!");
    res.redirect("/listing");
  });
  };

