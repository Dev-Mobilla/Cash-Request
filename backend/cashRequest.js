const dotenv = require('dotenv');
dotenv.config();

const PORT = 3000;

//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const CronJob = require('cron').CronJob;
const path = require('path');

//directories
const Router = require('./router/router');
const logger = require('./logs/logger');
const ScheduledEmail = require('./controllers/ScheduledEmail');

const app = express();

app.use(cors());

// app.use(cors(
//     {
//         origin: 'http://127.0.0.1:4000',
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//         optionsSuccessStatus: 200
//     }
// ))

// app.use((req, res, next) => {
//     console.log('dvfgh');

//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4000/');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Max-Age', '86400')
//     next();
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,

}))
app.use(cookieParser())

app.use('/', Router);

app.set('view engine', 'ejs')

//must
app.use(express.static(path.resolve(__dirname, '../frontend/dist')))
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

app.get('/next', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../backend/views/templates', 'next.html'));
});

app.get('/form', (req, res) => {
    res.render('pending_form.ejs')
});


// EMAIL SCHEDULE CASH ADVANCE
const jobCash = new CronJob(
    //sec, min, hr, dayofmonth(1-31), month, dayofweek:0-6(sun-sat)
    '0 0 0 */1 * *',
    ScheduledEmail.CashRequestForEmailFollowUp,
    null,
    false,
)


// EMAIL SCHEDULE REVOLVING FUND
const jobRev = new CronJob(
    '0 0 0 */1 * *',
    ScheduledEmail.RevolvingRequestForEmailFollowUp,
    null,
    false,
)


jobCash.start()

jobRev.start()

logger.loggerInfo.addContext('context', 'cashRequest.js - Run Cron Job')
logger.loggerInfo.info(`Job for Cash Advance is running: ${jobCash.running} , Job for Revolving Fund is running: ${jobRev.running}`)

app.listen(PORT, () => {
    logger.loggerInfo.addContext('context', 'cashRequest.js - ');
    logger.loggerInfo.info(`Server listening to port: ${PORT}`)
    console.log(`Server listening to port: ${PORT}`);
})