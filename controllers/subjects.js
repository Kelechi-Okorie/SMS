const { sequelize, User, Subject } = require('../models');

const index = async (req, res) => {
    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();
    const subjects = await Subject.findAll({where: {schoolId: school.id}});

    res.render('dashboard/subjects', { currentUser, subjects });
};

const newSubject = async (req, res) => {
    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);

    res.render('dashboard/subjects/new', { currentUser });
};

const getById = async (req, res) => {
    const { id } = req.params;

    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();
    const subject = await Subject.findByPk(id);

    res.render('dashboard/subjects/details', { currentUser, subject });
};

const createNew = async (req, res) => {
    const _res = {};

    let currentUser = req.user;
    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();

    const { name, description } = req.body;

    try { // http: 201
        const result = await sequelize.transaction(async (t) => {

            const [subject, isNewSubject] = await Subject.findOrCreate({
                where: {
                    schoolId: school.id,
                    name: name.trim(),
                },
                defaults: {
                    description: description
                },
                transaction: t
            });


            if (isNewSubject) {
                await school.addSubject(subject, { transaction: t });
            }

            const data = {
                subject
            }

            _res.status = isNewSubject ? 201 : 400;
            _res.success = isNewSubject ? true : false;
            _res.severity = isNewSubject ? 'success' : 'error';
            _res.message = isNewSubject ? 'Subject created successfully' : 'Subject already exist';
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

    res.json(_res)
};


const userController = { index, newSubject, createNew, getById };

module.exports = userController;