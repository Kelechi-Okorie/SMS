const express = require('express');
// const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const app = express();

const port = process.env.port || 3005;

// routes
const userRouter = require('./routes/userRoutes');

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.set('views', '/views')
app.set('view engine', 'ejs');

// userRouter.route('/').get(async () => {

// });

app.use('/dashboard/users', userRouter)

app.get('/', async (req, res) => {
    res.send('the testing file');
});

app.get('/tests', async (req, res) => {
    // res.send('testing')
    res.sendFile(path.join(__dirname, 'views', 'tests', 'index.html'));
});


app.get('/dashboard', async (req, res) => {
    res.send('the dashboard')
});




app.listen(port, () => {
    console.log(`the app has started on port  ${port}`);
});