const express = require('express');

const {index, getStudents, submitScores} = require('../../../controllers/results');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.get('/', index);
router.get('/fetch-students', getStudents);
router.post('/submit-scores', submitScores);

module.exports = router;