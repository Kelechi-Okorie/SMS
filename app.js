const express = require('express');
// const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { User, School, Grade, Assessment } = require('./models');

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
const studentRouter = require('./routes/studentRoutes');
const staffRouter = require('./routes/staffRoutes');
const sessionRouter = require('./routes/sessionRoutes');
const subjectRouter = require('./routes/subjectRoutes');
const AdminRouter = require('./routes/adminRoutes');
const schoolRouter = require('./routes/schoolRoute');
const schoolTypeRouter = require('./routes/schoolTypeRoute');
const settingsRouter = require('./routes/settingsRoutes');
const scoreRouter = require('./routes/scoreRoutes');

const schoolTypeRouterApi = require('./routes/api/v1/schoolTypeRoute');
const schoolRouterApi = require('./routes/api/v1/schoolRoute');
const userRouterApi = require('./routes/api/v1/userRoute');
const studentRouterApi = require('./routes/api/v1/studentRoutes');
const staffRouterApi = require('./routes/api/v1/staffRoutes');
const sessionRouterApi = require('./routes/api/v1/sessionRoutes');
const termRouterApi = require('./routes/api/v1/termRoutes');
const subjectRouterApi = require('./routes/api/v1/subjectRoute');
const resultRouterApi = require('./routes/api/v1/resultRoutes');


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
    } else {
        next();
    }
}

app.use('/auth', authRouter);
app.use('/dashboard', authenticationMiddleWare);
app.use('/dashboard', dashboardRouter);
app.use('/dashboard/users', userRouter);
app.use('/dashboard/students', studentRouter);
app.use('/dashboard/staffs', staffRouter);
app.use('/dashboard/sessions', sessionRouter);
app.use('/dashboard/admins', AdminRouter)
app.use('/dashboard/schools', schoolRouter);
app.use('/dashboard/school-types', schoolTypeRouter);
app.use('/dashboard/settings', settingsRouter);
app.use('/dashboard/subjects', subjectRouter);
app.use('/dashboard/scores', scoreRouter);

// api routes
app.use('/api/school-types', schoolTypeRouterApi);
app.use('/api/schools', schoolRouterApi);
app.use('/api/users', userRouterApi);
app.use('/api/v1/students', studentRouterApi);
app.use('/api/v1/staffs', staffRouterApi);
app.use('/api/v1/sessions', sessionRouterApi);
app.use('/api/v1/terms', termRouterApi);
app.use('/api/v1/subjects', subjectRouterApi)
app.use('/api/v1/results', resultRouterApi);

app.get('/', async (req, res) => {
    res.render('index')
    // res.send('the testing file');
});

app.get('/dashboard/settings/grades', async (req, res) => {
    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();
    const grades = await Grade.findAll();

    res.render(path.join(__dirname, 'views', 'dashboard', 'settings', 'grades'), { currentUser, grades });

});

app.get('/dashboard/settings/assessments', async (req, res) => {
    let currentUser = req.user;

    if (!currentUser) {
        res.redirect('/auth/sign-in');
    }
    currentUser = await User.findByPk(currentUser.id);
    const school = await currentUser.getSchool();
    const assessments = await Assessment.findAll();

    res.render(path.join(__dirname,'views', 'dashboard', 'settings', 'assessments'), { currentUser, assessments });

});

app.get('/tests', async (req, res) => {
    // res.send('testing')
    res.sendFile(path.join(__dirname, 'views', 'tests', 'index.html'));
});

app.listen(port, () => {
    console.log(`the app has started on port  ${port}`);
});