const { sequelize, User, School, SchoolStaff, SchoolType, Student, Session, SchoolClass, Demarcation, StudentClass } = require('../models');
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
    const students = await school.getStudents({include: [{model: User}]});

    res.render('dashboard/students/index', { currentUser, students });
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


    // const student = await Student.findByPk(id, { include: [{ model: User }] });
    const student = await


        res.render('dashboard/students/details', { currentUser, student });
};

const newStudent = async (req, res) => {
    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();

    const schoolSessions = await school.getSessions();
    const classes = await school.getSchoolClasses();
    const demarcations = await Demarcation.findAll();
    const currentSession = await school.getCurrentSession();

    let studentClasses = [];
    if (currentSession) {
        studentClasses = await StudentClass.findAll({
            where: {
                schoolId: school.id,
                sessionId: currentSession.id,
                schoolClassId: classes[0].id
            },
            include: [
                {
                    model: Demarcation
                }
            ]
        });
    }

    console.log({schoolSessions, classes, demarcations, currentSession})

    res.render('dashboard/students/new', { currentUser, schoolSessions, classes, demarcations, currentSession });
};

const createNewStudent = async (req, res) => {
    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);

    const school = await currentUser.getSchool();

    const currentSession = await school.getCurrentSession();
    const _res = {};

    const {regNumber, firstname, middlename, lastname, dob, phone, address, classId, demarcationId} = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {

            const [studentClass, isNewStudentClass] = await StudentClass.scope(null).findOrCreate(
                {
                    where: {
                        schoolId: school.id,
                        sessionId: currentSession.id,
                        schoolClassId: classId,
                        demarcationId: demarcationId

                    },
                    transaction: t
                }
            );

            const user = await User.create({
                userName: regNumber,
                password: regNumber,
                phone: phone,
                firstName: firstname,
                lastName: lastname,
                middleName: middlename,
                dob: dob,
                address:address,
                isStudent: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, { transaction: t });

            // await user.setSchool(school, { transaction: t });
            await school.setUser(user, { transaction: t});

            const student = await school.createStudent({
                regNumber: regNumber,
            }, { transaction: t });

            await student.setUser(user, { transaction: t });
            await student.addStudentClass(studentClass, { transaction: t });

            const data = {
                student,
                user
            }

            _res.status = 201;
            _res.success = true;
            _res.severity = 'success';
            _res.message = 'User created successfully';
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

const schoolController = { index, getById, newStudent, createNewStudent };


module.exports = schoolController;