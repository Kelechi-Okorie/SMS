const { User, School, SchoolType } = require('../models');

const auth = async (currentUser) => {
    if(!currentUser) {
        res.redirect('/auth/sign-in');
    }

    currentUser = await User.findByPk(currentUser.id);
    return currentUser;
}

const index = async (req, res) => {
    let currentUser = req.user;

    // if(!currentUser) {
    //     res.redirect('/auth/sign-in');
    // }
    currentUser = await User.findByPk(currentUser.id);
    const schools = await School.findAll();

    res.render('dashboard/schools/index', { currentUser, schools });
};

const getById = async (req, res) => {
    const { id } = req.params;

    let currentUser = req.user;

    // if(!currentUser) {
    //     res.redirect('/auth/sign-in');
    // }
    currentUser = await User.findByPk(currentUser.id);

    if(!id) {
        res.redirect('/dashboard/schools')
    }

    const school = await School.findByPk(id);
    
    res.render('dashboard/schools/school-details', { currentUser, school });
};

const newSchool = async (req, res) => {
    let currentUser = req.user;

    // if(!currentUser) {
    //     res.redirect('/auth/sign-in');
    // }
    currentUser = await User.findByPk(currentUser.id);
    const schoolTypes = await SchoolType.findAll()

    res.render('dashboard/schools/new', { currentUser, schoolTypes });
};


const schoolController = { index, getById, newSchool };


module.exports = schoolController;