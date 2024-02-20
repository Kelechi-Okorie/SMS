const { sequelize, User, SchoolType, SchoolClass } = require('../models');

const auth = async (currentUser) => {
    if(!currentUser) {
        res.redirect('/auth/sign-in');
    }

    currentUser = await User.findByPk(currentUser.id);
    return currentUser;
}

const remapClasses = (data) => {
    return data.map((datum, index) => {
        return {name: datum};
    });
}

const index = async (req, res) => {
    let currentUser = req.user;

    if(!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const schoolTypes = await SchoolType.findAll();
    res.render('dashboard/school-types/index', { currentUser, schoolTypes });
};

const newSchoolType = async (req, res) => {
    let currentUser = req.user;

    if(!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);

    const _res = {status: 201, success: true};

    res.render('dashboard/school-types/new', { currentUser });
};

const createNewSchoolType = async (req, res) => {
    // let currentUser = req.user;
    // console.log(req.user, '----------------------')

    // if(!currentUser) {
    //     res.redirect('/auth/sign-in');
    // }
    // currentUser = await User.findByPk(currentUser.id);

    const { name, classes } = req.body;

    const _res = {};

    try { // http: 201
        const result = await sequelize.transaction(async (t) => {

            const schoolType = await SchoolType.create({ name: name }, { transaction: t });

            const remappedClassed = remapClasses(classes);
            const createdClasses = await SchoolClass.bulkCreate(remappedClassed, { transaction: t});

            await schoolType.addSchoolClasses(createdClasses, { transaction: t });

            const data = {
                schoolType
            }

            _res.status = 201;
            _res.success = true;
            _res.severity = 'success';
            _res.message = 'School type created successfully';
            _res.data = data;

        })

    } catch (err) { // http: 500
        console.log(err);

        _res.status = 500;
        _res.success = false;
        _res.severity = 'error';
        _res.message = 'We encountered a fatal error while processing your form. Please report this error';
        _res.data = {};
    }

    res.json(_res);

};


const schoolTypeController = { index, newSchoolType, createNewSchoolType };


module.exports = schoolTypeController;