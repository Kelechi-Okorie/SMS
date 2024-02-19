const passport = require('passport');
const { Strategy }  = require('passport-local');
const { User } = require('../../models');
const bcrypt = require('bcrypt');


module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {

        // should actually get user from db
        const user = await User.scope(null).findOne({
            where: {
                userName: username,
                isDisabled: false
            }
        });

        const passwordMatch = (password, hash) => {
            return bcrypt.compareSync(password, hash);
        }

        // login succeded
        if (user && passwordMatch(password, user.password)) {
            done(null, user);
        } else {
            done(null, false);
        }
    }));
};