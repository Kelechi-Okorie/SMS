const { sequelize, User, School, SchoolStaff } = require('../models');
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
    const staffs = await school.getStaff({include: [{model: User}]});
    console.log(staffs)

    res.render('dashboard/staffs/index', { currentUser, staffs });
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

const newStaff = async (req, res) => {
    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);

    res.render('dashboard/staffs/new', { currentUser });
};

const createNewStaff = async (req, res) => {
    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);

    const school = await currentUser.getSchool();

    const _res = {};

    const {email, firstname, middlename, lastname, dob, phone, address} = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {

            const [user, isNewUser] = await User.findOrCreate({
                where: {
                    userName: email
                },
                defaults: {
                    firstName: firstname,
                    lastName: lastname,
                    middleName: middlename,
                    dob: dob,
                    userName: email,
                    phone: phone,
                    address: address,
                    password: email,
                    isSchoolStaff: true
                },
                transaction: t
            });

            let staff;

            if(isNewUser) {
                staff = await school.createStaff({ transaction: t });
                await school.addUser(user, { transaction: t });
                await user.setSchoolStaff(staff, { transaction: t});
            }

            const data = {
                staff,
                user
            }

            _res.status = isNewUser ? 201: 400;
            _res.success = isNewUser ? true : false;
            _res.severity = isNewUser ? 'success' : 'warning';
            _res.message = isNewUser ? 'Staff created successfully' : 'The staff already exists';
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

    res.json(_res);
}

const schoolController = { index, getById, newStaff, createNewStaff };


module.exports = schoolController;