const dotenv = require('dotenv')
dotenv.config()

const dbConnection = require('../config/dbConnection');
const query = require('../config/queries');
const logger = require('../logs/logger');
const branchdbConnection = require('../config/branchDBConnection');
const jwt = require('jsonwebtoken');

module.exports = {
    userLogin(req, res) {
        const token = jwt.sign({ id: req.params.userId, },
            process.env.TOKEN_SECRET,
            { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) })
        console.log(token);
        res.status(200).send({ token: token })
    },
    
    isUserApproverByIdNumber(req, res) {
        console.log(req.body.idNumber);
        let userId = req.body.idNumber;
        let data = [];
        try {
            branchdbConnection.query(`SELECT
            (CASE 
                WHEN (am.idNumber = '${userId}') THEN (SELECT idNumber FROM am_approvers WHERE idNumber = '${userId}')
                ELSE NULL
            END) AS area_approver,
            (CASE 
                WHEN (rm.idNumber = '${userId}') THEN (SELECT idNumber FROM rm_approvers WHERE idNumber = '${userId}')
                ELSE NULL
            END) AS rm_approver,
            (CASE 
                WHEN (ram.idNumber = '${userId}') THEN (SELECT idNumber FROM ram_approvers WHERE idNumber = '${userId}')
                ELSE NULL
            END) AS ram_approver,
            (CASE 
                WHEN (ass.idNumber = '${userId}') THEN (SELECT idNumber FROM ass_vpo_approvers WHERE idNumber = '${userId}')
                ELSE NULL
            END) AS ass_approver,
            (CASE 
                WHEN (vpo.idNumber = '${userId}') THEN (SELECT idNumber FROM vpo_approver WHERE idNumber = '${userId}')
                ELSE NULL
            END) AS vpo_approver
            FROM am_approvers am
            CROSS JOIN rm_approvers rm
            CROSS JOIN ram_approvers ram
            CROSS JOIN ass_vpo_approvers ass
            CROSS JOIN vpo_approver vpo
            WHERE am.idNumber = '${userId}' OR rm.idNumber = '${userId}' OR ram.idNumber = '${userId}'
            OR ass.idNumber = '${userId}' OR vpo.idNumber = '${userId}'
            LIMIT 1`, (err, buRows, fields) => {
                console.log(buRows);
                if (!err) {
                    if (!buRows.length == 0) {

                        res.status(200).send({ rows: buRows, statusCode: 200 });
                        logger.loggerInfo.addContext('context', 'USERS CONTROLLER - isUserApproverByIdNumber');
                        logger.loggerInfo.info(`200: SUCCESSFULLY RETRIEVED DATA`);
                    } else {
                        res.status(200).send({ rows: buRows, statusCode: 200, message: 'USER IS NOT ALLOWED.' });
                        logger.loggerInfo.addContext('context', 'USERS CONTROLLER - isUserApproverByIdNumber');
                        logger.loggerInfo.info(`200: USER IS NOT ALLOWED. - burows: ${buRows.length}`);
                    }

                }
                else {
                    res.send({ rows: data, message: "" })
                    logger.loggerError.addContext('context', 'USERS CONTROLLER - isUserApproverByIdNumber');
                    logger.loggerError.error(`404: DATABASE ERROR`)
                }

            })
        } catch (error) {
            res.status(500).send({ rows: data, message: "Server error. Please refresh the page and try again.", statusCode: 500 })
            logger.loggerFatal.addContext('context', 'USERS CONTROLLER - getUserById');
            logger.loggerFatal.fatal(`500: SERVER ERROR - ${error}`);
        }
    },
    getUserByEmailRevolvingFund(req, res) {
        let data = [];
        try {
            dbConnection.query(query.getUserByEmail, [req.body.email, req.body.email], (err, buRows, fields) => {
                if (!err) {
                    if (!buRows.length == 0) {
                        dbConnection.query(query.getByBranchCodeZoneCode, [buRows[0].BranchCode, buRows[0].ZoneCode], (err, brRows, fields) => {
                            if (!err) {
                                if (!brRows.length == 0) {
                                    data.push({ branchcode: buRows[0].BranchCode, zonecode: buRows[0].ZoneCode, fullname: buRows[0].fullname, email: buRows[0].EmailAddress, jobTitle: buRows[0].RoleID, resourceId: buRows[0].ResourceID, region: brRows[0].regionname, area: brRows[0].areaname, branch: brRows[0].branchname });
                                    res.status(200).send({ rows: data[0], statusCode: 200, message: 'Logged in Successfully' });

                                    logger.loggerInfo.addContext('context', 'USERS CONTROLLER - getUserByEmail');
                                    logger.loggerInfo.info(`200: SUCCESSFULLY RETRIEVED DATA`);
                                }
                                else {
                                    res.status(404).send({ rows: data, message: "No data found.", statusCode: 404 })
                                    logger.loggerError.addContext('context', 'USERS CONTROLLER - getUserByEmail');
                                    logger.loggerError.error(`200: NO DATA FOUND FROM table_branches length: ${brRows.length}`)
                                }
                            } else {
                                res.status(400).send({ rows: data, message: "Failed to retrieved data. Please try again", statusCode: 400 })
                                logger.loggerError.addContext('context', 'USERS CONTROLLER - getUserByEmail')
                                logger.loggerError.error(`400: FAILED RETRIEVED DATA from table_branches - ${err}`)
                            }
                        })
                    }
                    else {
                        res.status(404).send({ rows: data, message: "No data found. Email Address does not exist", statusCode: 404 })
                        logger.loggerError.addContext('context', 'USERS CONTROLLER - getUserByEmail');
                        logger.loggerError.error(`404: NO DATA FOUND FROM table_sysuseraccounts_branchusers length: ${buRows.length}`)
                    }
                } else {
                    res.status(400).send({ rows: data, message: "Failed to retrieved data. Please try again", statusCode: 400 })
                    logger.loggerError.addContext('context', 'USERS CONTROLLER - getUserByEmail')
                    logger.loggerError.error(`400: FAILED RETRIEVED DATA from table_sysuseraccounts_branchusers - ${err}`)
                }

            })
        } catch (error) {
            res.status(500).send({ rows: data, message: "Server error. Please refresh the page and try again.", statusCode: 500 })
            logger.loggerFatal.addContext('context', 'USERS CONTROLLER - getUserById');
            logger.loggerFatal.fatal(`500: SERVER ERROR - ${error}`);
        }
    }
}