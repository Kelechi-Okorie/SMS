const express = require('express');

const {index, getById, newSchoolType } = require('../controllers/schoolType');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.get('/', index);
router.get('/new', newSchoolType);
router.get('/:id', getById);
// router.post('/new', createNewSchoolType)


module.exports = router;