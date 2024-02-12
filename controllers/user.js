const getIndex = () => {
    return [{ name: 'kelechi' }];
};

const getById = async (id) => {
    return { name: 'kelechi', id: id };
};

const userController = { getIndex, getById };


module.exports = userController;