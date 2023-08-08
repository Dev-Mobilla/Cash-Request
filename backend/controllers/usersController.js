const dotenv = require('dotenv')
dotenv.config()

const logger = require('../logs/logger');
const branchdbConnection = require('../config/branchDBConnection');
const query = require('../config/queries')
const jwt = require('jsonwebtoken');
const response = require('./resonseCodeMessages');
const { getApproversEmail } = require('./ConditionalDbQueryController');

module.exports = {
    userLogin(req, res) {
        try {
            let branch = req.body.branch
            let res_id = req.body.resId
            let zone = req.body.zone
            let jobTitle = req.body.jobTitle
            let myQuery = '';

            if (zone == 'VISMIN' || zone == 'VISAYAS') {
                if (jobTitle == 'AREA MANAGER') {

                    myQuery = `SELECT email FROM vismin_am_approvers WHERE res_id = ${res_id} AND zone IN ('VISAYAS', 'VISMIN', 'SHOWROOM')`

                } else if (jobTitle == 'REGIONAL MAN') {

                    myQuery = `SELECT email FROM vismin_rm_approvers WHERE res_id = ${res_id} AND zone IN ('VISAYAS', 'VISMIN', 'SHOWROOM')`

                } else if (jobTitle == 'RAM') {

                    myQuery = `SELECT email FROM vismin_ram_approvers WHERE res_id = ${res_id} AND zone IN ('VISAYAS', 'VISMIN', 'SHOWROOM')`

                } else if (jobTitle == 'GMO-ASTGENMAN' || jobTitle == 'ADM ASS SR' || jobTitle == "GM'S STAFF") {

                    myQuery = `SELECT email FROM vismin_asstvpo_approver WHERE res_id = ${res_id} AND zone IN ('VISAYAS', 'VISMIN', 'SHOWROOM')`

                } else if (jobTitle == 'GMO-GENMAN') {

                    myQuery = `SELECT email FROM vismin_vpo_approver WHERE res_id = ${res_id} AND zone IN ('VISAYAS', 'VISMIN', 'SHOWROOM')`

                } else {
                    myQuery = `SELECT email FROM branch_requestor WHERE branch = '${branch}' AND zone IN ('VISAYAS', 'VISMIN', 'SHOWROOM')`
                }
            } else if (zone == 'LUZON' || zone == 'NCR' || zone == 'LNCR') {

                if (jobTitle == 'AREA MANAGER') {

                    myQuery = `SELECT email FROM luzon_am_approvers WHERE res_id = ${res_id} AND zone IN ('LUZON', 'NCR', 'LNCR', 'SHOWROOM')`

                } else if (jobTitle == 'REGIONAL MAN') {

                    myQuery = `SELECT email FROM luzon_rm_approvers WHERE res_id = ${res_id} AND zone IN ('LUZON', 'NCR', 'LNCR', 'SHOWROOM')`

                } else if (jobTitle == 'RAM') {

                    myQuery = `SELECT email FROM luzon_ram_approvers WHERE res_id = ${res_id} AND zone IN ('LUZON', 'NCR', 'LNCR', 'SHOWROOM')`

                } else if (jobTitle == 'GMO-ASTGENMAN' || jobTitle == 'ADM ASS SR' || jobTitle == "GM'S STAFF") {

                    myQuery = `SELECT email FROM luzon_asstvpo_aaprover WHERE res_id = ${res_id} AND zone IN ('LUZON', 'NCR', 'LNCR', 'SHOWROOM')`

                } else if (jobTitle == 'GMO-GENMAN') {

                    myQuery = `SELECT email FROM luzon_vpo_approver WHERE res_id = ${res_id} AND zone IN ('LUZON', 'NCR', 'LNCR', 'SHOWROOM')`

                } else {

                    myQuery = `SELECT email FROM branch_requestor WHERE branch = ${branch} AND zone IN ('LUZON', 'NCR', 'LNCR', 'SHOWROOM')`
                }
            }
            branchdbConnection.query(myQuery, (err, email, fields) => {
                if (!err) {
                    if (!email.length == 0) {
                        const token = jwt.sign({ id: req.body.userId },
                            process.env.TOKEN_SECRET,
                            {
                                expiresIn: "15m"
                            })
                        logger.loggerInfo.addContext('context', `userLogin`);
                        logger.loggerInfo.info(`Successfully generated a token - ${token}`)
                        res.status(200).send({ token: token, email: email[0].email })
                    } else {
                        logger.loggerInfo.addContext('context', `userLogin`);
                        logger.loggerInfo.info(`No email found - ${res_id}`)
                        res.status(200).send({ token: token, email: email[0].email })
                    }
                }
                else {
                    logger.loggerInfo.addContext('context', `userLogin`);
                    logger.loggerInfo.info(`Service error - ${err}`)
                    res.status(400).send({ message: response(3), resCode: 3 })
                }
            })

        } catch (err) {
            logger.loggerFatal.addContext('context', 'userLogin');
            logger.loggerFatal.fatal(`responseMesage - ${response(4)}: ${err}, responseCode - 3`);
            res.send({ message: response(4), resCode: 4 })
        }
    },
    getAllApproverEmail(req, res) {

        let approvers = req.body.approvers
        let zone = req.body.zone
        let jobTitle = req.body.jobTitle

        try {

            let getAllApproversEmail = getApproversEmail(zone, approvers);

            getAllApproversEmail.then(getEmail => {

                if (getEmail.sqlCode === 0) {

                    return getEmail

                }

            })
                .then(filterEmail => {

                    let result = filterEmail.result[0]

                    if (jobTitle == 'AREA MANAGER' && !result.rm_email == '' && !result.ram_email == '' && !result.ass_email == '' && !result.vpo_email == '') {
                        logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
                        logger.loggerInfo.info(`responseMesage - ${response(0)} - Complete Approvers for AM User. , responseCode - 0`);
                        res.send({ result: result, resCode: 0 })

                    } else if (jobTitle == 'REGIONAL MAN' && !result.ram_email == '' && !result.ass_email == '' && !result.vpo_email == '') {
                        logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
                        logger.loggerInfo.info(`responseMesage - ${response(0)} - Complete Approvers for RM User. , responseCode - 0`);
                        res.send({ result: result, resCode: 0 })

                    } else if (jobTitle == 'RAM' && !result.ass_email == '' && !result.vpo_email == '') {
                        logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
                        logger.loggerInfo.info(`responseMesage - ${response(0)} - Complete Approvers for RAM User. , responseCode - 0`);
                        res.send({ result: result, resCode: 0 })

                    } else if (jobTitle == 'GMO-ASTGENMAN' || jobTitle == 'ADM ASS SR' || jobTitle == "GM'S STAFF" && !result.vpo_email == '') {
                        logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
                        logger.loggerInfo.info(`responseMesage - ${response(0)} - Complete Approvers for Asst. User. , responseCode - 0`);
                        res.send({ result: result, resCode: 0 })

                    } else if (jobTitle == 'GMO-GENMAN') {
                        logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
                        logger.loggerInfo.info(`responseMesage - ${response(0)} - VPO User  , responseCode - 0`);
                        res.send({ result: result, resCode: 0 })

                    } else if (!result.am_email == '' && !result.rm_email == '' && !result.ram_email == '' && !result.ass_email == '' && !result.vpo_email == '') {
                        logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
                        logger.loggerInfo.info(`responseMesage - ${response(0)} - Complete (5) Approvers. , responseCode - 0`);
                        res.send({ result: result, resCode: 0 })
                    }
                    else {
                        logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
                        logger.loggerInfo.info(`responseMesage - ${response(1)} - User can't proceed. Incomplete approver credentials. , responseCode - 1`);
                        res.send({ message: 'Not Found', message2: "User can't proceed. Incomplete approver credentials.", resCode: 1 })
                    }
                })
                .catch(err => {
                    logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
                    logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 3`);
                    res.send({ resCode: 3, message2: "User can't proceed. Failed to retrieve approver credentials.", message: 'Service Error' });
                })


        } catch (error) {
            logger.loggerInfo.addContext('context', 'usersController - getAllApproverEmail');
            logger.loggerInfo.info(`responseMesage - ${response(4)} - , responseCode - 4`);
            res.status(500)
        }
    },

    isUserApproverByIdNumber(req, res) {
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
    }

}