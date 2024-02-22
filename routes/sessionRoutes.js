const express = require('express');

const {index, getById, newSesion, createNew, } = require('../controllers/sessions');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.get('/', index);
router.get('/new', newSesion);
router.get('/:id', getById);

module.exports = router;