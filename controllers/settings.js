const { sequelize, User, PortalAdmin } = require('../models');

const index = async (req, res) => {
    let currentUser = req.user;

    if(!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);

    res.render('dashboard/settings/index', { currentUser });
};

const userController = { index };

module.exports = userController;