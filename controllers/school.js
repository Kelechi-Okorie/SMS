const { sequelize, User, School, SchoolType } = require('../models');
const { faker } = require('@faker-js/faker')

const auth = async (currentUser) => {
    if (!currentUser) {
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

    if (!id) {
        res.redirect('/dashboard/schools')
    }

    const school = await School.findByPk(id, {include: [{model: SchoolType}]});


    res.render('dashboard/schools/school-details', { currentUser, school });
};

const newSchool = async (req, res) => {
    let currentUser = req.user;

    // if(!currentUser) {
    //     res.redirect('/auth/sign-in');
    // }
    currentUser = await User.findByPk(currentUser.id);
    const schoolTypes = await SchoolType.findAll();

    res.render('dashboard/schools/new', { currentUser, schoolTypes });
};

const createNewSchool = async (req, res) => {
    const _res = {};

    const { schoolTypeId, name, phone, email, address } = req.body;

    try {

        const result = await sequelize.transaction(async (t) => {

            const school = await School.create({ name, phone, email, address }, { transaction: t });

            await school.setSchoolType(schoolTypeId, { transaction: t });

            const rand = faker.string.alphanumeric(8, { bannedChars: ['0', 'o'], casing: 'upper' });
            await school.update({ uid: `${rand}${school.id}` }, { transaction: t });

            await school.createSchoolSetting({
                settings: {
                    isOpenForGradeSubmission: false,
                    automaticRegNumberGeneration: false
                }
            }, { transaction: t }
            );

            const data = {
                school
            }

            _res.status = 201;
            _res.success = true;
            _res.severity = 'success';
            _res.message = 'School created successfully';
            _res.data = data;

        });
    } catch (err) {
        console.log(err)
        _res.status = 500;
        _res.success = false;
        _res.severity = 'error';
        _res.message = 'We encountered a fatal error while processing your form. Please report this error';
        _res.data = {}
    }

    res.json(_res)
}


const schoolController = { index, getById, newSchool, createNewSchool };


module.exports = schoolController;