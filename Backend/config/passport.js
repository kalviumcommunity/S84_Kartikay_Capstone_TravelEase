const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getOrCreateGoogleUser } = require('../controllers/userController');
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/users/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await getOrCreateGoogleUser(profile);
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}); 