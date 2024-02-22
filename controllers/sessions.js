const { sequelize, User, School, Session } = require('../models');

const index = async (req, res) => {
    let currentUser = req.user;

    currentUser = await User.findByPk(currentUser.id);

    const school = await currentUser.getSchool();
    const sessions = await Session.findAll();

    res.render('dashboard/sessions/index', { currentUser, school, sessions });
};

const newSesion = async (req, res) => {
    let currentUser = req.user;

    currentUser = await User.findByPk(currentUser.id);
    const school = currentUser.getSchool();

    res.render('dashboard/users/new', { currentUser });
};

const getById = async (req, res) => {
    const { id } = req.params;

    let currentUser = req.user;
    currentUser = await User.findByPk(currentUser.id);

    const user = await User.findByPk(id);

    res.render('dashboard/users/details', { currentUser, user });
};

const createNew = async (req, res) => {
    const _res = {};

    const { username, firstname, middlename, lastname, dob, phone, type, address } = req.body;

    const isType = (dbType, formType) => {
        if (dbType == formType) {
            return true
        }
    }

    try { // http: 201

        const result = await sequelize.transaction(async (t) => {

            const [user, isNewUser] = await User.findOrCreate({
                where: {
                    userName: username
                },
                defaults: {
                    firstName: firstname,
                    lastName: lastname,
                    middleName: middlename,
                    dob: dob,
                    userName: username,
                    phone: phone,
                    address: address,
                    password: username,
                    isPortalAdmin: isType('isPortalAdmin', type),
                    isSchoolStaff: isType('isSchoolStaff', type)
                },
                transaction: t
            });

            if (isNewUser && isType('isPortalAdmin', type)) {
                await user.createPortalAdmin({}, { transaction: t });
            }

            const data = {
                user
            };

            const status = isNewUser ? 201 : 400;
            const success = isNewUser ? true : false;
            const severity = isNewUser ? 'success' : 'warning';
            const message = isNewUser ? 'User created Successfully' : 'A user with that email already exists';

            _res.status = status;
            _res.success = success;
            _res.severity = severity
            _res.message = message;
            _res.data = data;
        });

    } catch (err) { // http: 500
        console.log(err);
        _res.status = 500;
        _res.success = false;
        _res.severity = 'error';
        _res.message = 'We encountered a fatal error while processing your form. Please report this error';
        _res.data = {};
        // console.log(err)
    }

    res.json(_res)

};

const sessionController = { index, newSesion, createNew, getById };


module.exports = sessionController;