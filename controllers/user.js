const { User } = require('../models');

const index = async (req, res) => {
    // return { name: 'kelechi', id: id };
    const users = await User.findAll();
    const currentUser = await User.findByPk(3);

    res.render('dashboard/users/index', { currentUser, users });
};

const getById = async (req, res) => {
    const { id } = req.params;

    const currentUser = await User.findByPk(3);
    const user = await User.findByPk(id);
    
    res.render('dashboard/users/user-details', { currentUser, user });
};

const userController = { index, getById };


module.exports = userController;