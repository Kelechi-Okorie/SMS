const express = require('express');

const {index, newUser, getById} = require('../controllers/user');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.get('/', index);
router.get('/new', newUser);
router.get('/:id', getById);

module.exports = router;