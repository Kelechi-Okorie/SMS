const express = require('express');

const { createNew, editSession } = require('../../../controllers/sessions');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.post('/new', createNew);
router.put('/:id', editSession)

module.exports = router;