const index = async (req, res) => {
    // return { name: 'kelechi', id: id };

    console.log(res);
    res.render('dashboard/users/index');
};

const getById = () => {
    return [{ name: 'kelechi' }];
};

const userController = { index, getById };


module.exports = userController;