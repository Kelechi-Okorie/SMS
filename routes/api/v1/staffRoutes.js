const express = require('express');

const { createNewStaff } = require('../../../controllers/staffs');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

// router.use((req, res, next) => {
//     console.log('Time', Date.now());
//     next()
// });

router.post('/new', createNewStaff);
// router.get('/search-by-username/:username', searchByUserName);

module.exports = router;