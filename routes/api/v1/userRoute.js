const express = require('express');

const { createNewUser, searchByUserName } = require('../../../controllers/user');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.post('/new', createNewUser);
router.get('/search-by-username/:username', searchByUserName);

module.exports = router;