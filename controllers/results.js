const { sequelize, User, Student, School, StudentClass, SchoolStaff, SchoolClass, Demarcation, Assessment, Grade, StudentResult, AssessmentLineItem, Subject, SubjectLineItem } = require('../models');
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

    console.log('sflskslfkslfsjl-----', currentSession)

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

const getStudents = async(req, res) => {
    let currentUser = req.user;

    if(!currentUser) {
        res.redirect('/auth/sign-n');
    }

    const { studentClassId, subjectId } = req.query;
    const _res = {};

    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();
    const currentSession = await school.getCurrentSession();
    const currentTerm = await school.getCurrentTerm();

    try {
        const results = await sequelize.transaction(async (t) => {
            const studentClass = await StudentClass.scope(null).findOne({
                where: {
                    schoolId: school.id,
                    id: studentClassId
                },
                transaction: t
            });

            const students = await studentClass.getStudents({
                attributes: ['id', 'userId', 'regNumber'],
                orderBy: [['firstName', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'middleName', 'lastName', 'fullName']
                    }
                ],
                transaction: t
            });

            const studentsResults = await StudentResult.findAll({
                where: {
                    schoolId: school.id,
                    sessionId: currentSession.id,
                    termId: currentTerm.id,
                    studentClassId: studentClassId
                },
                attributes: ['id', 'schoolId', 'sessionId', 'termId', 'studentId'],
                include: [
                    {
                        model: SubjectLineItem,
                        where: { subjectId: subjectId },
                        attributes: ['id', 'studentResultId', 'subjectId', 'schoolStaffId'],
                        include: [
                            {
                                model: AssessmentLineItem,
                                include: [
                                    {
                                        model: Assessment,
                                        order: [['ordinal', 'DEC']],
                                        attributes: ['id', 'name', 'maximumScore', 'ordinal']
                                    }
                                ]
                            }
                        ]
                    }
                ],
                transaction: t
            });

            const data = {
                studentClass,
                students,
                studentsResults
            }

            _res.status = 200;
            _res.success = true;
            _res.severity = 'success';
            _res.message = 'Students scores fetched successfully';
            _res.data = data;

        })

    } catch (err) {
        console.log(err);
        _res.status = 500;
        _res.success = false;
        _res.severity = 'error';
        _res.message = 'We encountered a fatal error while processing your form. Please report this error';
        _res.data = {};
        // console.log(err)
    }

    res.json(_res);
}

const resultController = { index, getStudents };

module.exports = resultController;