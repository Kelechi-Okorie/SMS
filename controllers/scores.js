const { sequelize, User, School, StudentClass, SchoolStaff, SchoolClass, Demarcation, Assessment, Grade } = require('../models');
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

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();
    const currentSession = await school.getCurrentSession();
    const currentTerm = await school.getCurrentTerm();
    const schoolClasses = await school.getSchoolClasses({
        attributes: {
            include: ['name', 'id']
        }
    });

    let studentClasses;

    if (currentSession) {
        studentClasses = await StudentClass.findAll({
            where: {
                schoolId: school.id,
                sessionId: currentSession.id,
            },
            include: [
                {
                    model: SchoolClass,
                    attributes: ['name', 'id']
                },
                {
                    model: Demarcation,
                    attributes: ['name', 'id']
                }
            ]
        });
    }

    const subjects = await school.getSubjects({attributes: ['id', 'name']});
    const assessments = await Assessment.findAll();
    const grades = await Grade.findAll();
    const schoolSettings = await school.getSchoolSetting();

    let settings;
    if (schoolSettings) {
        settings = schoolSettings.settings;
    }


    res.render('dashboard/scores/index', { currentUser, currentSession, currentTerm, schoolClasses, studentClasses, subjects, assessments, grades });
};

const getById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.redirect('/dashboard/schools')
    }

    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();


    const staff = await SchoolStaff.findOne({where: {id, schoolId: school.id}, include: [{model: User}]});

    res.render('dashboard/staffs/details', { currentUser, staff });
};


const scoreController = { index };


module.exports = scoreController;