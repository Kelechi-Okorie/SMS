const express = require('express');

const passport = require('passport');

const router = express.Router();

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up');
});

router.post('/sign-up', (req, res) => {
    // create user 

    req.login(req.body, () => {
        res.redirect('/dashboard');
    });
    // res.json(req.body);
});

router.get('/profile', async (req, res) => {
    res.json(req.user);
});

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in')
});

router.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}));

router.get('/sign-out', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/auth/sign-in');
    });
});

router.get('/', (req, res) => {
    res.send('you hit the auth route')
});

router.post('/', (req, res) => {
    res.json(req.body);
})


module.exports = router;