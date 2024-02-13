const { User } = require('../models');

const index = async (req, res) => {
    // return { name: 'kelechi', id: id };
    const users = await User.findAll();

    res.render('dashboard/users/index', { users });
};

const getById = () => {
    return [{ name: 'kelechi' }];
};

const userController = { index, getById };


module.exports = userController;