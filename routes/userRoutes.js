const express = require('express');

const router = express.Router();

// userRouter.route().get('/', async (req, res) => {
//     res.send('this is coming from the user route file');
// });

router.use((req, res, next) => {
    console.log('Time', Date.now());
    next()
});

router.get('/', async (req, res) => {
    res.send('this is coming from the user route file');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    res.send(`This user has the following id ${id}`);
});




module.exports = router;