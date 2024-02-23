const express = require('express');

const { editTerm } = require('../../../controllers/terms');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.put('/:id', editTerm)

module.exports = router;