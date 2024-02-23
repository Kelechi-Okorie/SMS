const { sequelize, User, School, Session, Term } = require('../models');

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
    const school = await currentUser.getSchool();
    const sessions = await school.getSessions();

    res.render('dashboard/sessions/new', { currentUser, school, sessions });
};

const getById = async (req, res) => {
    const { id } = req.params;

    let currentUser = req.user;
    currentUser = await User.findByPk(currentUser.id);

    const school = await currentUser.getSchool();
    const session = await Session.findByPk(id, { include: [{ model: Term }] });
    const currentSession = await school.getCurrentSession();
    const currentTerm = await school.getCurrentTerm();

    console.log(session)

    res.render('dashboard/sessions/details', { currentUser, school, session, currentSession, currentTerm });
};

const createNew = async (req, res) => {
    const _res = {};

    const { name } = req.body;
    let currentUser = req.user;
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();

    try { // http: 201

        const result = await sequelize.transaction(async (t) => {

            const schoolSessions = await school.getSessions({ transaction: t });

            const isFirstSession = schoolSessions.length > 0 ? false : true;

            const [schoolSession, isNewSchoolSession] = await Session.findOrCreate({
                where: {
                    schoolId: school.id,
                    name: name
                },
                defaults: {
                    isCurrentSession: isFirstSession,
                    isStarted: isFirstSession,
                    startDate: isFirstSession ? new Date() : null
                },
                transaction: t
            });


            if (isNewSchoolSession) {
                await schoolSession.setSchool(school, { transaction: t });

                await Term.bulkCreate([
                    {
                        sessionId: schoolSession.id,
                        name: 'First',
                        termNumber: 1,
                        isStarted: isFirstSession,
                        startDate: new Date(),
                        isCurrentTerm: isFirstSession
                    },
                    {
                        sessionId: schoolSession.id,
                        name: 'Second',
                        termNumber: 2
                    },
                    {
                        sessionId: schoolSession.id,
                        name: 'Third',
                        termNumber: 3
                    }
                ],
                    { transaction: t }
                );
            }

            await schoolSession.reload({ transaction: t });

            const data = {
                schoolSession,
            }

            _res.status = isNewSchoolSession ? 201 : 400;
            _res.success = isNewSchoolSession ? true : false;
            _res.severity = isNewSchoolSession ? 'success' : 'error';
            _res.message = isNewSchoolSession ? 'Session created successfully' : 'Session already exists';
            _res.data = data;
        });

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

const editSession = async (req, res) => {
    const _res = {};

    let currentUser = req.user;
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();

    const { sessionId, isStarted, isCurrentSession } = req.body;

    try { // http: 201

        const result = await sequelize.transaction(async (t) => {

            const schoolSession = await Session.findOne({
                where: {
                    id: sessionId,
                    schoolId: school.id
                },
                transaction: t
            });

            let updated = false;

            if (schoolSession) {
                if (isCurrentSession === true) {
                    const currentSession = await school.getCurrentSession({ transaction: t });

                    await currentSession.update({
                        isCurrentSession: false,
                        isEnded: true,
                        endDate: new Date()
                    },
                        { transaction: t }
                    );

                    const currentTerm = await school.getCurrentTerm({ transaction: t });
                    await currentTerm.update({
                        isCurrentTerm: false
                    },
                        { transaction: t }
                    );

                    const newCurrentTerm = await Term.findOne({
                        where: {
                            sessionId: sessionId,
                            termNumber: 1
                        },
                        transaction: t
                    });

                    await newCurrentTerm.update({
                        isStarted: true,
                        startDate: new Date(),
                        isCurrentTerm: true
                    },
                        { transaction: t }
                    );
                }

                await schoolSession.update({
                    isStarted: isStarted || schoolSession.isStarted,
                    startDate: schoolSession.startDate || new Date(),
                    isCurrentSession: isCurrentSession || schoolSession.isCurrentSession
                },
                    { transaction: t }
                );

                updated = true;
            }

            let schSession;

            if (updated) {
                schSession = await Session.findOne({
                    where: {
                        schoolId: school.id,
                        id: sessionId
                    },
                    include: [
                        {
                            model: Term
                        }
                    ],
                    transaction: t
                })

            }

            await schoolSession.reload({ transaction: t });

            const data = {
                schoolSession: schSession
            }

            _res.status = updated ? 202 : 404;
            _res.success = updated ? true : false;
            _res.severity = updated ? 'success' : 'error';
            _res.message = updated ? 'Session modified successfully' : 'The session was not found. Please try again or contact admin';
            _res.data = data;

        });

    } catch (err) { // http: 500
        console.log(err);

        _res.status = 500;
        _res.success = false;
        _res.severity = 'error'
        _res.message = 'We encountered a fatal error while processing your form. Please report this error';
        _res.data = {};
    }

    res.json(_res);
}

const sessionController = { index, newSesion, createNew, editSession, getById };

module.exports = sessionController;