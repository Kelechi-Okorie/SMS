const express = require('express');

const {index, getById, newSubject, } = require('../controllers/subjects');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.get('/', index);
router.get('/new', newSubject);
router.get('/:id', getById);

module.exports = router;