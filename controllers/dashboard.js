const { User } = require('../models');

const index = async (req, res) => {
    // return { name: 'kelechi', id: id };
    const users = await User.findAll();
    const currentUser = await User.findByPk(3);

    console.log('the user ins hte request--', req.user, '================')

    res.render('dashboard/index', { currentUser, users });
};


const dashboardController = { index };

module.exports = dashboardController;