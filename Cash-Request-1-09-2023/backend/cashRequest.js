const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./router/router');
const logger = require('./logs/logger');
const PORT = 3000;
const session = require('express-session');
const Logger = require('./logs/logger');
const CryptoJs = require('crypto-js');
const cookieParser = require('cookie-parser');
// const { google } = require('googleapis');
// const setGoogleAuth = require('./config/googleAuthConfig');
const store = require('store');
// const history = require('connect-history-api-fallback');

// require('./config/gmailAPIConfig');


app.use(cors())
// app.use(history());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,

}))
app.use(cookieParser())

app.use('/', Router);
//must
// app.use(express.static(path.resolve(__dirname, '../frontend/dist')))
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
// });

let storeToken = [];

const generateUrl = async (state) => {
    const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']

    const oauth2Client = await setGoogleAuth();

    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        prompt: 'consent',
    })
    return authorizationUrl;
}

// app.get('/session', (req, res) => {
//     req.session.token = storeToken[0]
//     res.send(req.session)

// })

// app.get('/getToken', (req, res) => {
//     if (req.session.token) {
//         res.send({ access_token: req.session.token })
//     } else {
//         res.send({ message: req.session.token })
//     }

// })
// app.get('/signin', (req, res) => {
//     Logger.loggerInfo.addContext('context', `google signin authenticate`);
//     Logger.loggerInfo.info(`/auth/google/signin`);
//     generateUrl().then(resp => {
//         Logger.loggerInfo.addContext('context', `google signin authenticate`);
//         Logger.loggerInfo.info(`/auth/google/signin - generateUrl : ${resp.toString()}`);
//         res.send({url: resp.toString()})
//     }).catch(err => {
//         Logger.loggerError.addContext('context', `google signin authenticate`);
//         Logger.loggerError.error(`/auth/google/signin - generateUrl : ${JSON.stringify(err)}`);
//         res.send(err)
//     })
// })

// app.get('/auth/google/callback', async (req, res) => {
//     Logger.loggerInfo.addContext('context', `google authenticate callback`);
//     Logger.loggerInfo.info(`/auth/google/callback`);

//     const code = req.query.code

//     const oauth2Client = await setGoogleAuth();

//     oauth2Client.getToken(code).then(resp => {
//         Logger.loggerInfo.addContext('context', `google authenticate callback  - /auth/google/callback`);
//         Logger.loggerInfo.info(`getToken: ${resp.tokens.access_token}`);
//         oauth2Client.setCredentials({
//             refresh_token: resp.tokens.refresh_token,
//             access_token: resp.tokens.access_token
//         });

//         storeToken.push(resp.tokens.access_token);

//         store.set('access_token', {access_token : resp.tokens.access_token})
//         store.set('refresh_token', {refresh_token : resp.tokens.refresh_token})

//         let oauth2 = google.oauth2({
//             auth: oauth2Client,
//             version: 'v2'
//         })
//         oauth2.userinfo.get().then(response => {
//             Logger.loggerInfo.addContext('context', `google authenticate callback  - /auth/google/callback`);
//             Logger.loggerInfo.info(`getUserInfo: ${JSON.stringify(response.data)}`);
//             res.redirect(`/auth/google/success/?user=${JSON.stringify(response.data)}&token=${resp.tokens.access_token}`)
            
//         }).catch(error => {
//             Logger.loggerError.addContext('context', `google authenticate callback  - /auth/google/callback`);
//             Logger.loggerError.error(`getUserInfo ERROR: ${JSON.stringify(error)}`);
//             res.send({ message: error })
//         })
//     }).catch(err => {
//         Logger.loggerError.addContext('context', `google authenticate callback  - /auth/google/callback`);
//         Logger.loggerError.error(`getToken ERROR: ${JSON.stringify(err)}`);
//         res.send({ message: err })
//     })

// })

// app.get('/auth/google/success/', (req, res) => {
//     try {
        
//         const cipherUser = CryptoJs.AES.encrypt(req.query.user, process.env.SECRET).toString();
//         const encData = CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(cipherUser));

//         const queryToken = req.query.token
//         const token = CryptoJs.AES.encrypt(JSON.stringify(queryToken), process.env.SECRET).toString();
//         const encToken = CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(token));

//             Logger.loggerInfo.addContext('context', `redirect after callback  - `);
//             Logger.loggerInfo.info(`/auth/google/success`);
//             req.session.token = storeToken[0]
//             //  res.redirect(`http://cashrequest.mlhuillier.com:3000/#/home?user=${encData}&token=${encToken}`)
//              res.redirect(`http://127.0.0.1:8080/#/home?user=${encData}&token=${encToken}`)

//     } catch (err) {
//         Logger.loggerError.addContext('context', `/auth/google/success/${req.params.path}  - `);
//         Logger.loggerError.error(`ERROR : ${JSON.stringify(err)}`);
//         res.send(err)
//     }

// })

// app.get('/auth/google/failed', (req, res) => {
//     Logger.loggerError.addContext('context', `/auth/google/failed  - ${req.query}`);
//     Logger.loggerError.error(`ERROR : google authentication failed`);
//     res.send('authentication failed')
// })

// app.get('/logout', async (req, res, next) => {
//     Logger.loggerInfo.addContext('context', 'LOG OUT  - ');
//     Logger.loggerInfo.info(`Logging out...`);

//     const token = req.query.token;
//     let postData = "token=" + token

//     let postOptions = {
//         host: 'oauth2.googleapis.com',
//         port: '443',
//         path: '/revoke',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Content-Length': Buffer.byteLength(postData)
//         }
//     };

//     const postReq = https.request(postOptions, (response) => {
//         Logger.loggerInfo.addContext('context', 'LOG OUT  - ');
//         Logger.loggerInfo.info(`Requesting - headers: ${response.headers.date.toString()}, statusCode: ${response.statusCode}`);

//         response.setEncoding('utf8');
//         response.on('data', d => {
//             Logger.loggerInfo.addContext('context', 'LOG OUT  - ');
//             Logger.loggerInfo.info(`postReq on data: ${d}, SESSION: ${JSON.stringify(req.session)}`);
//                 Logger.loggerInfo.addContext('context', 'LOG OUT  - ');
//                 Logger.loggerInfo.info(`postReq on data: ${d}, statusCode: ${response.statusCode}`);
//                 req.session = null
//                 res.send({ message: 'Successfully Logged out', statusCode: response.statusCode })
//         })
//         response.on('error', error => {
//             Logger.loggerError.addContext('context', 'LOG OUT  - ');
//             Logger.loggerError.error(`postReq on error: ${JSON.stringify(error)}`);
//             res.send({ message: 'Unable to Log out. Server Error', statusCode: 500 })
//         });
//     })
//     postReq.on('error', error => {
//         Logger.loggerError.addContext('context', 'LOG OUT  - ');
//         Logger.loggerError.error(`postReq on error: ${JSON.stringify(error)}`);
//     });

//     postReq.write(postData);
//     postReq.end();


    // const oauth2Client = await setGoogleAuth();
    // oauth2Client.getAccessToken().then(resp => {
    //     console.log(resp);
    //     Logger.loggerInfo.addContext('context', 'LOG OUT  - ');
    //     Logger.loggerInfo.info(`getAccesstoken: ${resp}`);
    //     let postData = "token=" + resp.token

    // let postOptions = {
    //     host: 'oauth2.googleapis.com',
    //     port: '443',
    //     path: '/revoke',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Content-Length': Buffer.byteLength(postData)
    //     }
    // };

    // const postReq = https.request(postOptions, (response) => {
    //     Logger.loggerInfo.addContext('context', 'LOG OUT  - ');
    //     Logger.loggerInfo.info(`Requesting: ${response}`);

    //     response.setEncoding('utf8');
    //     response.on('data', d => {
    //         console.log('Response:', d);
    //         Logger.loggerInfo.addContext('context', 'LOG OUT  - ');
    //         Logger.loggerInfo.info(`postReq on data: ${d}`);
    //     })
    // })
    // postReq.on('error', error => {
    //     console.log(error);
    //     Logger.loggerError.addContext('context', 'LOG OUT  - ');
    //     Logger.loggerError.error(`postReq on error: ${error}`);
    // });

    // postReq.write(postData);
    // postReq.end();

    // req.logout(function (err) {
    //     if (err) {
    //         Logger.loggerInfo.addContext('context', `LOG OUT  - `);
    //         Logger.loggerInfo.info(`ERROR : ${err}`);
    //         return next(err);
    //     }
    //     req.session = null
    //     console.log('SESSION LOGOUT', req.session);
    //     res.send({ message: 'Successfully Logged out', statusCode: 200 })
    //     Logger.loggerInfo.addContext('context', 'LOG OUT  - ');
    //     Logger.loggerInfo.info(`SESSION: ${req.session}`);
    // });

    // }).catch(err => {
    //     console.log(err);
    //     Logger.loggerError.addContext('context', 'LOG OUT  - ');
    //     Logger.loggerError.error(`getAccessToken: ${JSON.stringify(err)}`);
    // })
// })


// EXTERNAL URL
// app.get('/response/:controlno', (req, res) => {
//     Logger.loggerInfo.addContext('context', `redirect after clicking buttons  - `);
//     Logger.loggerInfo.info(`/response/${req.params.controlno}`);
//     res.send({ controlNo: req.params.controlno, status: req.query.status, response: 'Progress' })
// })
// app.get('/alert/:controlno', (req, res) => {
//     Logger.loggerInfo.addContext('context', `redirect after clicking buttons  - `);
//     Logger.loggerInfo.info(`/alert/${req.params.controlno}`);
//     res.send({ controlNo: req.params.controlno, status: req.query.status, response: 'Done' })
// })
// app.get('/alert-comment/:controlno', (req, res) => {
//     Logger.loggerInfo.addContext('context', `redirect after clicking buttons  - `);
//     Logger.loggerInfo.info(`/alert-comment/${req.params.controlno}`);
//     res.send({ controlNo: req.params.controlno, status: req.query.status, response: 'Pending' })
// })
app.post('/confirm-approval/:controlNo/:approver', (req, res) =>{
    res.redirect(`http://127.0.0.1:8080/#/confirmation?controlno=${req.params.controlNo}&approver=${req.params.approver}&comment=${req.body.comment}&approved_button=${req.body.approved}&disapproved_button=${req.body.disapproved}`)
    // res.redirect(`http://cashrequest.mlhuillier.com:3000/#/confirmation?controlno=${req.params.controlNo}&approver=${req.params.approver}&comment=${req.body.comment}&approved_button=${req.body.approved}&disapproved_button=${req.body.disapproved}`)
});

app.get('/cash-approval/:controlNo/:approver', (req, res) => {
    res.redirect(`http://127.0.0.1:8080/#/home/open-request/cash-advance/for-approval?controlNo=${req.params.controlNo}&approver=${req.params.approver}`)
    // res.redirect(`http://cashrequest.mlhuillier.com:3000/#/home/open-request/cash-advance/for-approval?controlNo=${req.params.controlNo}&approver=${req.params.approver}`)
})
app.get('/rev-approval/:controlNo/:approver', (req, res) => {
    res.redirect(`http://127.0.0.1:8080/#/home/open-request/revolving-fund/for-approval?controlNo=${req.params.controlNo}&approver=${req.params.approver}`)
    // res.redirect(`http://cashrequest.mlhuillier.com:3000/#/home/open-request/revolving-fund/for-approval?controlNo=${req.params.controlNo}&approver=${req.params.approver}`)
})



app.listen(PORT, () => {
    logger.loggerInfo.addContext('context', 'server.js - ');
    logger.loggerInfo.info(`Server listening to port: ${PORT}`)
    console.log(`Server listening to port: ${PORT}`);
})