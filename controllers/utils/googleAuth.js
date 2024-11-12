const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
  
passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID:"547830882551-bnfa5qumac8ikrbnekvplo3g61suv49b.apps.googleusercontent.com", 
    clientSecret:"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", 
    callbackURL:"http://localhost:9090/user/google-auth",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));