const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const hbs = require('nodemailer-express-handlebars');
const OAuth2 = google.auth.OAuth2;
const Logger = require('../logs/logger')

require('dotenv').config();

const setTransporter = async () => {

    // const oauth2Client = new OAuth2(
    //     process.env.CLIENT_ID,
    //     process.env.CLIENT_SECRET,
    //     process.env.REDIRECT_URI
    // );

    // oauth2Client.setCredentials({
    //     refresh_token: process.env.REFRESH_TOKEN,
    //     access_token:token
    // });

    // const accessToken = await new Promise((resolve, reject) => {
    //     oauth2Client.getAccessToken((err, token) => {
    //         if (err) {
    //             Logger.loggerError.addContext('context', 'mailConfig - getAccessToken - ');
    //             Logger.loggerError.error(`ERROR : ${err}`);
    //             reject('ERROR', err);
    //         }
    //         Logger.loggerInfo.addContext('context', 'mailConfig - getAccessToken - ');
    //         Logger.loggerError.error(`ERROR : ${err}`);
    //         resolve(token);
    //     });
    // });
    
    
    const nodeTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'vpo-carf@mlhuillier.com',
            pass: 'pkienleaoyvrpbau',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            accessToken: process.env.ACCESS_TOKEN,
            refreshToken: process.env.REFRESH_TOKEN,
            
        }
    });
    Logger.loggerInfo.addContext('context', 'mailConfig - setTransporter - ');
    Logger.loggerInfo.info(`nodeTransporter : ${nodeTransporter}`);

    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: 'views/patials',
            layoutsDir: 'views/layouts',
            defaultLayout: '',
        },
        viewPath: 'views/templates',
        extName: '.handlebars',
    };
    nodeTransporter.use('compile', hbs(handlebarOptions));

    return nodeTransporter;
};

module.exports = setTransporter;