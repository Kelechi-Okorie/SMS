const express = require('express');
// const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const port = process.env.port || 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '4CcPCnVvtBMOAp2nXG/F1LBP8WcmiBKwHw4B5A+KNOupRWugxAu+/A==', resave: true, saveUninitialized: true }));

// routes
const authRouter = require('./routes/authRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');
const userRouter = require('./routes/userRoutes');
const schoolRouter = require('./routes/schoolRoute');
const schoolTypeRouter = require('./routes/schoolTypeRoute');
const schoolTypeRouterApi = require('./routes/api/v1/schoolTypeRoute');
const schoolRouterApi = require('./routes/api/v1/schoolRoute');


require('./config/passport')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/font', express.static(path.join(__dirname, '/node_modules/bootstrap-icons/font')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// app.use((req, res, next) => {     
//     console.log(re  q.body);   
             

// });  

const authenticationMiddleWare = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/sign-in');
    }

    next();
}

app.use('/auth', authRouter);
app.use('/dashboard', authenticationMiddleWare);
app.use('/dashboard', dashboardRouter);
app.use('/dashboard/users', userRouter);
app.use('/dashboard/schools', schoolRouter);
app.use('/dashboard/school-types', schoolTypeRouter);
app.use('/api/school-types', schoolTypeRouterApi);
app.use('/api/schools', schoolRouterApi);

app.get('/', async (req, res) => {
    res.render('index')
    // res.send('the testing file');
});

app.get('/tests', async (req, res) => {
    // res.send('testing')
    res.sendFile(path.join(__dirname, 'views', 'tests', 'index.html'));
});

app.listen(port, () => {
    console.log(`the app has started on port  ${port}`);
});