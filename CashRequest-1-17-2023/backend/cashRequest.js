const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./router/router');
const logger = require('./logs/logger');
const PORT = 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path')

app.use(cors())

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


app.listen(PORT, () => {
    logger.loggerInfo.addContext('context', 'server.js - ');
    logger.loggerInfo.info(`Server listening to port: ${PORT}`)
    console.log(`Server listening to port: ${PORT}`);
})