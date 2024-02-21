const { sequelize, User, PortalAdmin } = require('../models');

const index = async (req, res) => {
    let currentUser = req.user;

    if(!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);

    const adminUsers = await User.findAll({ where: { isPortalAdmin: true } });
    

    res.render('dashboard/admins/index', { currentUser, adminUsers });
};


const getById = async (req, res) => {
    const { id } = req.params;

    let currentUser = req.user;

    if(!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);

    const adminUser = await User.findByPk(id);

    res.render('dashboard/admins/details', { currentUser, adminUser });
};


const userController = { index, getById };


module.exports = userController;