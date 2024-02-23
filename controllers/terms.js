const { sequelize, User, School, Session, Term } = require('../models');

const index = async (req, res) => {
    let currentUser = req.user;

    currentUser = await User.findByPk(currentUser.id);

    const school = await currentUser.getSchool();
    const sessions = await Session.findAll();

    const _res = {
        message: 'You should not be here'
    };
    res.json(_res)
};

const editTerm = async (req, res) => {
    const _res = {};

    let currentUser = req.user;
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();

    const { termId, sessionId, isStarted, isCurrentTerm, isEnded } = req.body;

    try { // http: 201

        const result = await sequelize.transaction(async (t) => {

            const schoolSession = await Session.findOne({
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
            });

            const term = await Term.findOne({
                where: {
                    sessionId: sessionId,
                    id: termId
                },
                transaction: t
            });

            let updated = false;

            if (isEnded) {
                if (term.termNumber === 3) {
                    await schoolSession.update({
                        isEnded: true,
                        endDate: new Date()
                    },
                        { transaction: t }
                    );
                }
            }

            if (term) {
                if (isCurrentTerm === true) {
                    const currentTerm = await school.getCurrentTerm({ transaction: t });
                    currentTerm.update({
                        isCurrentTerm: false
                    },
                        { transaction: t }
                    );
                }

                await term.update({
                    isStarted: isStarted || term.isStarted,
                    startDate: isStarted ? new Date() : term.startDate,
                    isEnded: isEnded || term.isEnded,
                    endDate: isEnded ? new Date() : term.endDate,
                    isCurrentTerm: isCurrentTerm || term.isCurrentTerm
                },
                    { transaction: t }
                );

                updated = true;
            }

            await schoolSession.reload({ transaction: t });

            const schoolSettings = await school.getSchoolSetting({ transaction: t });
            const settings = schoolSettings.settings;
            await schoolSettings.update({
                settings: {
                    ...settings,
                    isOpenForGradeSubmission: false
                }
            },
                { transaction: t }
            );

            const data = {
                term,
                schoolSession
            }

            const status = updated ? 202 : 404;
            const success = updated ? true : false;
            const severity = updated ? 'success' : 'warning';
            const message = updated ? 'Successfully modified' : 'The term was not found. Please contact your admin';

            _res.status = status;
            _res.success = success;
            _res.severity = severity;
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
    }

    res.json(_res);
}

const sessionController = { index, editTerm };

module.exports = sessionController;