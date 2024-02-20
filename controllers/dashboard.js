const { User } = require('../models');

const index = async (req, res) => {
    let currentUser = req.user;

    // if(!currentUser) {
    //     res.redirect('/auth/sign-in');
    // }
    currentUser = await User.findByPk(currentUser.id);
    const users = await User.findAll();

    res.render('dashboard/index', { currentUser, users });
};


const dashboardController = { index };

module.exports = dashboardController;