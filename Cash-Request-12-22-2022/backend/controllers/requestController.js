const dotenv = require('dotenv');
dotenv.config();
const branchdbConnection = require('../config/branchDBConnection');
const dbConnection = require('../config/dbConnection');
const query = require('../config/queries');
const Logger = require('../logs/logger');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const setTransporter = require('../config/mailConfig');
const { _createPdfStream, _streamToBuffer } = require('../utils/generatePdf');
const { sendEmailRf, sendRfRequestor } = require('./mailController');
const mailController = require('./mailController');

const sendEmail = async (options) => {
    let gmailTransporter = await setTransporter();
    return await gmailTransporter.sendMail(options);
};

module.exports = {
    getMaxId(req, res) {
        try {

            branchdbConnection.query(query.getMaxId, (err, row, fields) => {
                if (!err) {
                    if (!row.length == 0) {
                        Logger.loggerInfo.addContext('context', `requestController - getMaxId - `);
                        Logger.loggerInfo.info(`row: ${row.length}`)
                        res.send(row[0])
                    } else {
                        Logger.loggerError.addContext('context', 'requestController - getMaxId - ');
                        Logger.loggerError.error(`No ID found row: ${row.length}`);
                        res.send({ id: 0 })
                    }
                } else {
                    Logger.loggerError.addContext('context', 'requestController - getMaxId - ');
                    Logger.loggerError.error(`Error retrieving ID ${err}`);
                    res.send({ message: "Error ID retrieval." })
                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'requestController - getMaxId - ');
            Logger.loggerFatal.fatal(`Method Error - ${error}`);
            res.send({ message: "Error ID retrieval." })
        }
    },
    getRfMaxId(req, res) {
        try {
            branchdbConnection.query(query.getRfMaxId, (err, row, fields) => {
                if (!err) {
                    if (!row.length == 0) {
                        Logger.loggerInfo.addContext('context', `requestController - getRfMaxId - `);
                        Logger.loggerInfo.info(`row: ${row.length}`)
                        res.send(row[0])
                    } else {
                        Logger.loggerError.addContext('context', 'requestController - getRfMaxId - ');
                        Logger.loggerError.error(`No ID found row: ${row.length}`);
                        res.send({ id: 0 })
                    }
                } else {
                    Logger.loggerError.addContext('context', 'requestController - getRfMaxId - ');
                    Logger.loggerError.error(`Error retrieving ID ${err}`);
                    res.send({ message: "Error ID retrieval." })
                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'requestController - getRfMaxId - ');
            Logger.loggerFatal.fatal(`Method Error - ${error}`);
            res.send({ message: "Error ID retrieval." })
        }
    },
    postRequest(req, res) {
        Logger.loggerInfo.addContext('context', 'requestController - postRequest - ');
        Logger.loggerInfo.info(`DATA: ${JSON.stringify(req.body.data)}`);

        let type = req.body.type;

        try {
            if (type === '') {
                Logger.loggerInfo.addContext('context', 'requestController - postRequest -');
                Logger.loggerInfo.info(`Requestor Type: Branch`);
                branchdbConnection.query(
                    `SELECT am.fullname AS am_fullname, am.email AS am_email, rm.fullname AS rm_fullname, rm.email AS rm_email, ram.fullname AS ram_fullname, 
                    ram.email AS ram_email, ass.fullname AS ass_fullname, ass.email AS ass_email, vpo.fullname AS vpo_fullname, vpo.email AS vpo_email FROM am_approvers am
                    INNER JOIN rm_approvers rm ON am.regionname = rm.regionname
                    INNER JOIN ram_approvers ram ON am.regionname = ram.regionname
                    CROSS JOIN ass_vpo_approvers ass
                    CROSS JOIN vpo_approver vpo
                    WHERE am.regionname LIKE '${req.body.data.region}' AND am.areaname LIKE '${req.body.data.area}'`,

                    (err, approverRows, fields) => {
                        if (!err) {
                            if (!approverRows.length == 0) {
                                try {
                                    branchdbConnection.query(query.postRequest,
                                        [
                                            req.body.data.idNumber, req.body.data.author, req.body.data.jobTitle,
                                            req.body.data.branch, req.body.data.area, req.body.data.region, req.body.data.email, req.body.data.purpose,
                                            req.body.data.controlNo, req.body.data.date, req.body.data.travelDate, req.body.data.departureDate,
                                            req.body.data.arrivalDate, req.body.data.amount, approverRows[0].am_email, '', '', approverRows[0].rm_email, '', '',
                                            approverRows[0].ram_email, '', '', approverRows[0].ass_email, '', '', approverRows[0].vpo_email, '', '', 'pending'
                                        ], (err, fields) => {
                                            if (!err) {
                                                try {
                                                    branchdbConnection.query(query.getRequestByControlNo, (req.body.data.controlNo), (err, request_rows, fields) => {
                                                        if (!err) {
                                                            if (!request_rows.length == 0) {
                                                                mailController.sendMail(request_rows, type).then(response => {
                                                                    if (response.accepted) {
                                                                        mailController.sendEmailNotificationRequestor(request_rows).then(resp => {
                                                                            if (resp.accepted) {
                                                                                Logger.loggerInfo.addContext('context', 'requestController - postRequest - Request Submitted Successfully');
                                                                                Logger.loggerInfo.info(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                res.send({ message: 'Request submitted successfully', rows: request_rows[0] })
                                                                            } else if (resp.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - Network error');
                                                                                Logger.loggerInfo.error(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                res.status(400).send({ message: 'Network error' })
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailNotificationRequestor ${err}`)
                                                                            res.status(400).send({ message: 'Network error' })
                                                                        })
                                                                    }
                                                                    else if (response.rejected) {
                                                                        Logger.loggerError.addContext('context', 'requestController - postRequest - Failed to submit request');
                                                                        Logger.loggerInfo.error(`sendMail - ${response.messageId} - ${response.rejected}`);
                                                                        res.status(400).send({ message: 'Failed to submit request' })
                                                                    }
                                                                }).catch(err => {
                                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                    Logger.loggerError.error(`sendMail ${err}`)
                                                                    res.status(400).send({ message: 'Network error' })
                                                                })
                                                            } else {
                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                                Logger.loggerError.error(`No data found request_rows: ${request_rows.length}`)
                                                                res.status(400).send({ message: 'Failed to submit request' })
                                                            }
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                            Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${err}`);
                                                            res.status(404).send({ message: 'Failed to submit request' })
                                                        }
                                                    })
                                                } catch (error) {
                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                    Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${error}`);
                                                    res.status(404).send({ message: 'Failed to submit request' });
                                                }
                                            }
                                            else {
                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                Logger.loggerError.error(`Failed to submit request ${err}`);
                                                res.status(400).send({ message: 'Failed to submit request' })
                                            }
                                        })
                                } catch (error) {
                                    Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                    Logger.loggerError.error(`Insertion Failed ${error}`);
                                    res.status(400).send({ message: 'Failed to submit request' });
                                }

                            } else {
                                Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                Logger.loggerError.error(`No data found for approvers ${approverRows.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                            }

                        } else {
                            Logger.loggerError.addContext('context', 'requestController - postRequest');
                            Logger.loggerError.error(`Error retrieving approvers ${err}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                            res.send({ message: "Error retrieving approvers" })
                        }
                    })
            } else if (type === 'area_approver') {
                Logger.loggerInfo.addContext('context', 'requestController - postRequest -');
                Logger.loggerInfo.info(`Requestor Type: AREA`);
                branchdbConnection.query(
                    `SELECT rm.fullname AS rm_fullname, rm.email AS rm_email, ram.fullname AS ram_fullname, 
                    ram.email AS ram_email, ass.fullname AS ass_fullname, ass.email AS ass_email, vpo.fullname AS vpo_fullname, vpo.email AS vpo_email 
                    FROM rm_approvers rm
                    INNER JOIN ram_approvers ram ON rm.regionname = ram.regionname
                    CROSS JOIN ass_vpo_approvers ass
                    CROSS JOIN vpo_approver vpo
                    WHERE rm.regionname LIKE '${req.body.data.region}'`,

                    (err, approverRows, fields) => {
                        if (!err) {
                            if (!approverRows.length == 0) {
                                try {
                                    branchdbConnection.query(query.postRequest,
                                        [
                                            req.body.data.idNumber, req.body.data.author, req.body.data.jobTitle,
                                            req.body.data.branch, req.body.data.area, req.body.data.region, req.body.data.email, req.body.data.purpose,
                                            req.body.data.controlNo, req.body.data.date, req.body.data.travelDate, req.body.data.departureDate,
                                            req.body.data.arrivalDate, req.body.data.amount, null, null, null, approverRows[0].rm_email, '', '',
                                            approverRows[0].ram_email, '', '', approverRows[0].ass_email, '', '', approverRows[0].vpo_email, '', '', 'pending'
                                        ], (err, fields) => {
                                            if (!err) {
                                                try {
                                                    branchdbConnection.query(query.getRequestByControlNo, (req.body.data.controlNo), (err, request_rows, fields) => {
                                                        if (!err) {
                                                            if (!request_rows.length == 0) {
                                                                mailController.sendMail(request_rows, type).then(response => {
                                                                    if (response.accepted) {
                                                                        mailController.sendEmailNotificationRequestor(request_rows).then(resp => {
                                                                            if (resp.accepted) {
                                                                                Logger.loggerInfo.addContext('context', 'requestController - postRequest - Request Submitted Successfully');
                                                                                Logger.loggerInfo.info(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                res.send({ message: 'Request submitted successfully', rows: request_rows[0] })
                                                                            } else if (resp.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - Network error');
                                                                                Logger.loggerInfo.error(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                res.status(400).send({ message: 'Network error' })
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailNotificationRequestor ${err}`)
                                                                            res.status(400).send({ message: 'Network error' })
                                                                        })
                                                                    }
                                                                    else if (response.rejected) {
                                                                        Logger.loggerError.addContext('context', 'requestController - postRequest - Failed to submit request');
                                                                        Logger.loggerInfo.error(`sendMail - ${response.messageId} - ${response.rejected}`);
                                                                        res.status(400).send({ message: 'Failed to submit request' })
                                                                    }
                                                                }).catch(err => {
                                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                    Logger.loggerError.error(`sendMail ${err}`)
                                                                    res.status(400).send({ message: 'Network error' })
                                                                })
                                                            } else {
                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                                Logger.loggerError.error(`No data found request_rows: ${request_rows.length}`)
                                                                res.status(400).send({ message: 'Failed to submit request' })
                                                            }
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                            Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${err}`);
                                                            res.status(404).send({ message: 'Failed to submit request' })
                                                        }
                                                    })
                                                } catch (error) {
                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                    Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${error}`);
                                                    res.status(404).send({ message: 'Failed to submit request' });
                                                }
                                            }
                                            else {
                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                Logger.loggerError.error(`Failed to submit request ${err}`);
                                                res.status(400).send({ message: 'Failed to submit request' })
                                            }
                                        })
                                } catch (error) {
                                    Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                    Logger.loggerError.error(`Insertion Failed ${error}`);
                                    res.status(400).send({ message: 'Failed to submit request' });
                                }

                            } else {
                                Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                Logger.loggerError.error(`No data found for approvers ${approverRows.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                            }

                        } else {
                            Logger.loggerError.addContext('context', 'requestController - postRequest');
                            Logger.loggerError.error(`Error retrieving approvers ${err}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                            res.send({ message: "Error retrieving approvers" })
                        }
                    })
            } else if (type === 'rm_approver') {
                Logger.loggerInfo.addContext('context', 'requestController - postRequest -');
                Logger.loggerInfo.info(`Requestor Type: REGIONAL`);
                branchdbConnection.query(
                    `SELECT ram.fullname AS ram_fullname, 
                    ram.email AS ram_email, ass.fullname AS ass_fullname, ass.email AS ass_email, vpo.fullname AS vpo_fullname, 
                    vpo.email AS vpo_email FROM ram_approvers ram
                    CROSS JOIN ass_vpo_approvers ass
                    CROSS JOIN vpo_approver vpo
                    WHERE ram.regionname LIKE '${req.body.data.region}'`,

                    (err, approverRows, fields) => {
                        if (!err) {
                            if (!approverRows.length == 0) {
                                try {
                                    branchdbConnection.query(query.postRequest,
                                        [
                                            req.body.data.idNumber, req.body.data.author, req.body.data.jobTitle,
                                            req.body.data.branch, req.body.data.area, req.body.data.region, req.body.data.email, req.body.data.purpose,
                                            req.body.data.controlNo, req.body.data.date, req.body.data.travelDate, req.body.data.departureDate,
                                            req.body.data.arrivalDate, req.body.data.amount, null, null, null, null, null, null,
                                            approverRows[0].ram_email, '', '', approverRows[0].ass_email, '', '', approverRows[0].vpo_email, '', '', 'pending'
                                        ], (err, fields) => {
                                            if (!err) {
                                                try {
                                                    branchdbConnection.query(query.getRequestByControlNo, (req.body.data.controlNo), (err, request_rows, fields) => {
                                                        if (!err) {
                                                            if (!request_rows.length == 0) {
                                                                mailController.sendMail(request_rows, type).then(response => {
                                                                    if (response.accepted) {
                                                                        mailController.sendEmailNotificationRequestor(request_rows).then(resp => {
                                                                            if (resp.accepted) {
                                                                                Logger.loggerInfo.addContext('context', 'requestController - postRequest - Request Submitted Successfully');
                                                                                Logger.loggerInfo.info(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                res.send({ message: 'Request submitted successfully', rows: request_rows[0] })
                                                                            } else if (resp.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - Network error');
                                                                                Logger.loggerInfo.error(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                res.status(400).send({ message: 'Network error' })
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailNotificationRequestor ${err}`)
                                                                            res.status(400).send({ message: 'Network error' })
                                                                        })
                                                                    }
                                                                    else if (response.rejected) {
                                                                        Logger.loggerError.addContext('context', 'requestController - postRequest - Failed to submit request');
                                                                        Logger.loggerInfo.error(`sendMail - ${response.messageId} - ${response.rejected}`);
                                                                        res.status(400).send({ message: 'Failed to submit request' })
                                                                    }
                                                                }).catch(err => {
                                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                    Logger.loggerError.error(`sendMail ${err}`)
                                                                    res.status(400).send({ message: 'Network error' })
                                                                })
                                                            } else {
                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                                Logger.loggerError.error(`No data found request_rows: ${request_rows.length}`)
                                                                res.status(400).send({ message: 'Failed to submit request' })
                                                            }
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                            Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${err}`);
                                                            res.status(404).send({ message: 'Failed to submit request' })
                                                        }
                                                    })
                                                } catch (error) {
                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                    Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${error}`);
                                                    res.status(404).send({ message: 'Failed to submit request' });
                                                }
                                            }
                                            else {
                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                Logger.loggerError.error(`Failed to submit request ${err}`);
                                                res.status(400).send({ message: 'Failed to submit request' })
                                            }
                                        })
                                } catch (error) {
                                    Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                    Logger.loggerError.error(`Insertion Failed ${error}`);
                                    res.status(400).send({ message: 'Failed to submit request' });
                                }

                            } else {
                                Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                Logger.loggerError.error(`No data found for approvers ${approverRows.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                            }

                        } else {
                            Logger.loggerError.addContext('context', 'requestController - postRequest');
                            Logger.loggerError.error(`Error retrieving approvers ${err}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                            res.send({ message: "Error retrieving approvers" })
                        }
                    })
            } else if (type === 'ram_approver') {
                Logger.loggerInfo.addContext('context', 'requestController - postRequest -');
                Logger.loggerInfo.info(`Requestor Type: REGIONAL AREA`);
                branchdbConnection.query(
                    `SELECT ass.fullname AS ass_fullname, ass.email AS ass_email, vpo.fullname AS vpo_fullname, vpo.email AS vpo_email 
                    FROM ass_vpo_approvers ass
                    CROSS JOIN vpo_approver vpo`,

                    (err, approverRows, fields) => {
                        if (!err) {
                            if (!approverRows.length == 0) {
                                try {
                                    branchdbConnection.query(query.postRequest,
                                        [
                                            req.body.data.idNumber, req.body.data.author, req.body.data.jobTitle,
                                            req.body.data.branch, req.body.data.area, req.body.data.region, req.body.data.email, req.body.data.purpose,
                                            req.body.data.controlNo, req.body.data.date, req.body.data.travelDate, req.body.data.departureDate,
                                            req.body.data.arrivalDate, req.body.data.amount, null, null, null, null, null, null,
                                            null, null, null, approverRows[0].ass_email, '', '', approverRows[0].vpo_email, '', '', 'pending'
                                        ], (err, fields) => {
                                            if (!err) {
                                                try {
                                                    branchdbConnection.query(query.getRequestByControlNo, (req.body.data.controlNo), (err, request_rows, fields) => {
                                                        if (!err) {
                                                            if (!request_rows.length == 0) {
                                                                mailController.sendMail(request_rows, type).then(response => {
                                                                    if (response.accepted) {
                                                                        mailController.sendEmailNotificationRequestor(request_rows).then(resp => {
                                                                            if (resp.accepted) {
                                                                                Logger.loggerInfo.addContext('context', 'requestController - postRequest - Request Submitted Successfully');
                                                                                Logger.loggerInfo.info(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                res.send({ message: 'Request submitted successfully', rows: request_rows[0] })
                                                                            } else if (resp.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - Network error');
                                                                                Logger.loggerInfo.error(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                res.status(400).send({ message: 'Network error' })
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailNotificationRequestor ${err}`)
                                                                            res.status(400).send({ message: 'Network error' })
                                                                        })
                                                                    }
                                                                    else if (response.rejected) {
                                                                        Logger.loggerError.addContext('context', 'requestController - postRequest - Failed to submit request');
                                                                        Logger.loggerInfo.error(`sendMail - ${response.messageId} - ${response.rejected}`);
                                                                        res.status(400).send({ message: 'Failed to submit request' })
                                                                    }
                                                                }).catch(err => {
                                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                    Logger.loggerError.error(`sendMail ${err}`)
                                                                    res.status(400).send({ message: 'Network error' })
                                                                })
                                                            } else {
                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                                Logger.loggerError.error(`No data found request_rows: ${request_rows.length}`)
                                                                res.status(400).send({ message: 'Failed to submit request' })
                                                            }
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                            Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${err}`);
                                                            res.status(404).send({ message: 'Failed to submit request' })
                                                        }
                                                    })
                                                } catch (error) {
                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                    Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${error}`);
                                                    res.status(404).send({ message: 'Failed to submit request' });
                                                }
                                            }
                                            else {
                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                Logger.loggerError.error(`Failed to submit request ${err}`);
                                                res.status(400).send({ message: 'Failed to submit request' })
                                            }
                                        })
                                } catch (error) {
                                    Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                    Logger.loggerError.error(`Insertion Failed ${error}`);
                                    res.status(400).send({ message: 'Failed to submit request' });
                                }

                            } else {
                                Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                Logger.loggerError.error(`No data found for approvers ${approverRows.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                            }

                        } else {
                            Logger.loggerError.addContext('context', 'requestController - postRequest');
                            Logger.loggerError.error(`Error retrieving approvers ${err}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                            res.send({ message: "Error retrieving approvers" })
                        }
                    })
            } else if (type === 'ass_approver') {
                Logger.loggerInfo.addContext('context', 'requestController - postRequest -');
                Logger.loggerInfo.info(`Requestor Type: ASST.`);
                branchdbConnection.query(
                    `SELECT vpo.fullname AS vpo_fullname, vpo.email AS vpo_email FROM vpo_approver vpo`,

                    (err, approverRows, fields) => {
                        if (!err) {
                            if (!approverRows.length == 0) {
                                try {
                                    branchdbConnection.query(query.postRequest,
                                        [
                                            req.body.data.idNumber, req.body.data.author, req.body.data.jobTitle,
                                            req.body.data.branch, req.body.data.area, req.body.data.region, req.body.data.email, req.body.data.purpose,
                                            req.body.data.controlNo, req.body.data.date, req.body.data.travelDate, req.body.data.departureDate,
                                            req.body.data.arrivalDate, req.body.data.amount, null, null, null, null, null, null,
                                            null, null, null, null, null, null, approverRows[0].vpo_email, '', '', 'pending'
                                        ], (err, fields) => {
                                            if (!err) {
                                                try {
                                                    branchdbConnection.query(query.getRequestByControlNo, (req.body.data.controlNo), (err, request_rows, fields) => {
                                                        if (!err) {
                                                            if (!request_rows.length == 0) {
                                                                mailController.sendMail(request_rows, type).then(response => {
                                                                    if (response.accepted) {
                                                                        mailController.sendEmailNotificationRequestor(request_rows).then(resp => {
                                                                            if (resp.accepted) {
                                                                                Logger.loggerInfo.addContext('context', 'requestController - postRequest - Request Submitted Successfully');
                                                                                Logger.loggerInfo.info(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                res.send({ message: 'Request submitted successfully', rows: request_rows[0] })
                                                                            } else if (resp.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - Network error');
                                                                                Logger.loggerInfo.error(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                res.status(400).send({ message: 'Network error' })
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailNotificationRequestor ${err}`)
                                                                            res.status(400).send({ message: 'Network error' })
                                                                        })
                                                                    }
                                                                    else if (response.rejected) {
                                                                        Logger.loggerError.addContext('context', 'requestController - postRequest - Failed to submit request');
                                                                        Logger.loggerInfo.error(`sendMail - ${response.messageId} - ${response.rejected}`);
                                                                        res.status(400).send({ message: 'Failed to submit request' })
                                                                    }
                                                                }).catch(err => {
                                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
                                                                    Logger.loggerError.error(`sendMail ${err}`)
                                                                    res.status(400).send({ message: 'Network error' })
                                                                })
                                                            } else {
                                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                                Logger.loggerError.error(`No data found request_rows: ${request_rows.length}`)
                                                                res.status(400).send({ message: 'Failed to submit request' })
                                                            }
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                            Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${err}`);
                                                            res.status(404).send({ message: 'Failed to submit request' })
                                                        }
                                                    })
                                                } catch (error) {
                                                    Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                    Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${error}`);
                                                    res.status(404).send({ message: 'Failed to submit request' });
                                                }
                                            }
                                            else {
                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                Logger.loggerError.error(`Failed to submit request ${err}`);
                                                res.status(400).send({ message: 'Failed to submit request' })
                                            }
                                        })
                                } catch (error) {
                                    Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                    Logger.loggerError.error(`Insertion Failed ${error}`);
                                    res.status(400).send({ message: 'Failed to submit request' });
                                }

                            } else {
                                Logger.loggerError.addContext('context', 'requestController - postRequest -');
                                Logger.loggerError.error(`No data found for approvers ${approverRows.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                            }

                        } else {
                            Logger.loggerError.addContext('context', 'requestController - postRequest');
                            Logger.loggerError.error(`Error retrieving approvers ${err}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                            res.send({ message: "Error retrieving approvers" })
                        }
                    })
            } else if (type === 'vpo_approver') {
                Logger.loggerInfo.addContext('context', 'requestController - postRequest -');
                Logger.loggerInfo.info(`Requestor Type: VPO`);
                try {
                    branchdbConnection.query(query.postRequest,
                        [
                            req.body.data.idNumber, req.body.data.author, req.body.data.jobTitle,
                            req.body.data.branch, req.body.data.area, req.body.data.region, req.body.data.email, req.body.data.purpose,
                            req.body.data.controlNo, req.body.data.date, req.body.data.travelDate, req.body.data.departureDate,
                            req.body.data.arrivalDate, req.body.data.amount, null, null, null, null, null, null,
                            null, null, null, null, null, null, null, null, null, 'approved'
                        ], (err, fields) => {
                            if (!err) {
                                try {
                                    branchdbConnection.query(query.getRequestByControlNo, (req.body.data.controlNo), (err, request_rows, fields) => {
                                        if (!err) {
                                            if (!request_rows.length == 0) {
                                                let approvedTemplate = fs.readFileSync(path.join(__dirname, '..', 'views', 'templates', 'approved_pdf.hbs'), 'utf-8');

                                                let context = {
                                                    data: request_rows[0]

                                                }
                                                let template = handlebars.compile(approvedTemplate);

                                                let DOC = template(context);

                                                _createPdfStream(DOC).then((stream) => {
                                                    _streamToBuffer(stream, function (err, buffer) {
                                                        if (err) {
                                                            Logger.loggerError.addContext('context', 'CASH ADVANCE APPROVED -  PDF CONFIGURATION IN CASH ADVANCE - ');
                                                            Logger.loggerError.error(err);

                                                            throw new Error(err);
                                                        }

                                                        sendEmail({
                                                            subject: `Cash Advance ${request_rows[0].controlNo} REQUEST APPROVED`,
                                                            to: request_rows[0].email,
                                                            from: "'Cash Request <vpo-carf@mlhuillier.com>'",
                                                            template: "approved",
                                                            context: {
                                                                status: request_rows[0].request_status,
                                                                requestor: request_rows[0].author,
                                                                controlno: request_rows[0].controlNo
                                                            },
                                                            attachments: [{
                                                                filename: `CASH ADVANCE ${request_rows[0].controlNo}.pdf`,
                                                                content: buffer,
                                                                contentDisposition: 'application/pdf'
                                                            }]
                                                        });
                                                    });
                                                });
                                                res.send({ message: 'Request submitted successfully', rows: request_rows[0] })
                                            } else {
                                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                                Logger.loggerError.error(`No data found request_rows: ${request_rows.length}`)
                                                res.status(400).send({ message: 'Failed to submit request' })
                                            }
                                        } else {
                                            Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                            Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${err}`);
                                            res.status(404).send({ message: 'Failed to submit request' })
                                        }
                                    })
                                } catch (error) {
                                    Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                    Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${error}`);
                                    res.status(404).send({ message: 'Failed to submit request' });
                                }
                            }
                            else {
                                Logger.loggerError.addContext('context', 'requestController - postRequest - ');
                                Logger.loggerError.error(`Failed to submit request ${err}`);
                                res.status(400).send({ message: 'Failed to submit request' })
                            }
                        })
                } catch (error) {
                    Logger.loggerError.addContext('context', 'requestController - postRequest -');
                    Logger.loggerError.error(`Insertion Failed ${error}`);
                    res.status(400).send({ message: 'Failed to submit request' });
                }

            }

            // branchdbConnection.query(
            //     `SELECT am.fullname AS am_fullname, am.email AS am_email, rm.fullname AS rm_fullname, rm.email AS rm_email, ram.fullname AS ram_fullname, 
            //     ram.email AS ram_email, ass.fullname AS ass_fullname, ass.email AS ass_email, vpo.fullname AS vpo_fullname, vpo.email AS vpo_email FROM am_approvers am
            //     INNER JOIN rm_approvers rm ON am.regionname = rm.regionname
            //     INNER JOIN ram_approvers ram ON am.regionname = ram.regionname
            //     CROSS JOIN ass_vpo_approvers ass
            //     CROSS JOIN vpo_approver vpo
            //     WHERE am.regionname LIKE '${req.body.data.region}' AND am.areaname LIKE '${req.body.data.area}'`,

            //     (err, approverRows, fields) => {
            //         if (!err) {
            //             if (!approverRows.length == 0) {
            //                 try {
            //                     branchdbConnection.query(query.postRequest,
            //                         [
            //                             req.body.data.idNumber, req.body.data.author, req.body.data.jobTitle,
            //                             req.body.data.branch, req.body.data.area, req.body.data.region, req.body.data.email, req.body.data.purpose,
            //                             req.body.data.controlNo, req.body.data.date, req.body.data.travelDate, req.body.data.departureDate,
            //                             req.body.data.arrivalDate, req.body.data.amount, approverRows[0].am_email, '', '', approverRows[0].rm_email, '', '',
            //                             approverRows[0].ram_email, '', '', approverRows[0].ass_email, '', '', approverRows[0].vpo_email, '', '', 'pending'
            //                         ], (err, fields) => {
            //                             if (!err) {
            //                                 try {
            //                                     branchdbConnection.query(query.getRequestByControlNo, (req.body.data.controlNo), (err, request_rows, fields) => {
            //                                         if (!err) {
            //                                             if (!request_rows.length == 0) {
            //                                                 mailController.sendMail(request_rows).then(response => {
            //                                                     if (response.accepted) {
            //                                                         mailController.sendEmailNotificationRequestor(request_rows).then(resp => {
            //                                                             if (resp.accepted) {
            //                                                                 Logger.loggerInfo.addContext('context', 'requestController - postRequest - Request Submitted Successfully');
            //                                                                 Logger.loggerInfo.info(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.accepted}`);
            //                                                                 res.send({ message: 'Request submitted successfully', rows: request_rows[0] })
            //                                                             } else if (resp.rejected) {
            //                                                                 Logger.loggerError.addContext('context', 'requestController - postRequest - Network error');
            //                                                                 Logger.loggerInfo.error(`sendEmailNotificationRequestor - ${resp.messageId} - ${resp.rejected}`);
            //                                                                 res.status(400).send({ message: 'Network error' })
            //                                                             }
            //                                                         }).catch(err => {
            //                                                             Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
            //                                                             Logger.loggerError.error(`sendEmailNotificationRequestor ${err}`)
            //                                                             res.status(400).send({ message: 'Network error' })
            //                                                         })
            //                                                     }
            //                                                     else if (response.rejected) {
            //                                                         Logger.loggerError.addContext('context', 'requestController - postRequest - Failed to submit request');
            //                                                         Logger.loggerInfo.error(`sendMail - ${response.messageId} - ${response.rejected}`);
            //                                                         res.status(400).send({ message: 'Failed to submit request' })
            //                                                     }
            //                                                 }).catch(err => {
            //                                                     Logger.loggerError.addContext('context', 'requestController - postRequest - Network Error -');
            //                                                     Logger.loggerError.error(`sendMail ${err}`)
            //                                                     console.log(err);
            //                                                     res.status(400).send({ message: 'Network error' })
            //                                                 })
            //                                             } else {
            //                                                 Logger.loggerError.addContext('context', 'requestController - postRequest - ');
            //                                                 Logger.loggerError.error(`No data found request_rows: ${request_rows.length}`)
            //                                                 res.status(400).send({ message: 'Failed to submit request' })
            //                                             }
            //                                         } else {
            //                                             Logger.loggerError.addContext('context', 'requestController - postRequest - ');
            //                                             Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${err}`);
            //                                             res.status(404).send({ message: 'Failed to submit request' })
            //                                         }
            //                                     })
            //                                 } catch (error) {
            //                                     Logger.loggerError.addContext('context', 'requestController - postRequest - ');
            //                                     Logger.loggerError.error(`ERR REQUEST_BY_CONTROLID ${error}`);
            //                                     res.status(404).send({ message: 'Failed to submit request' });
            //                                 }
            //                             }
            //                             else {
            //                                 Logger.loggerError.addContext('context', 'requestController - postRequest - ');
            //                                 Logger.loggerError.error(`Failed to submit request ${err}`);
            //                                 res.status(400).send({ message: 'Failed to submit request' })
            //                             }
            //                         })
            //                 } catch (error) {
            //                     Logger.loggerError.addContext('context', 'requestController - postRequest -');
            //                     Logger.loggerError.error(`Insertion Failed ${error}`);
            //                     res.status(400).send({ message: 'Failed to submit request' });
            //                 }

            //             } else {
            //                 Logger.loggerError.addContext('context', 'requestController - postRequest -');
            //                 Logger.loggerError.error(`No data found for approvers ${approverRows.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
            //                 res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
            //             }

            //         } else {
            //             Logger.loggerError.addContext('context', 'requestController - postRequest');
            //             Logger.loggerError.error(`Error retrieving approvers ${err}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
            //             res.send({ message: "Error retrieving approvers" })
            //         }
            //     })

        } catch (error) {
            Logger.loggerFatal.addContext('context', 'requestController - postRequest');
            Logger.loggerFatal.fatal(`Method Error ${error}`);
            res.status(500).send({ message: "Something's wrong in the server. Please refresh the page and try again." });
        }

    },
    post_RfRequest(req, res) {

        try {

            switch (req.body.data.type) {
                case "Branch Manager":
                    try {
                        Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest -');
                        Logger.loggerInfo.info(`Requestor Type: Branch Manager`);
                        dbConnection.query(`SELECT areaname AS areaname, regionname AS region, branchname AS branch FROM branches WHERE branchname 
                                            LIKE '${req.body.data.baseBranch}'`, (err, branch, fields) => {
                            if (!err) {
                                if (!branch.length == 0) {

                                    branchdbConnection.query(

                                        `SELECT am.fullname AS am_fullname, am.email AS am_email, rm.fullname AS rm_fullname, 
                                        rm.email AS rm_email, ram.fullname AS ram_fullname, ram.email AS ram_email, 
                                        ass.fullname AS ass_fullname, ass.email AS ass_email, vpo.fullname AS vpo_fullname, 
                                        vpo.email AS vpo_email FROM am_approvers am
                                        INNER JOIN rm_approvers rm ON am.regionname = rm.regionname
                                        INNER JOIN ram_approvers ram ON am.regionname = ram.regionname
                                        CROSS JOIN ass_vpo_approvers ass
                                        CROSS JOIN vpo_approver vpo
                                        WHERE am.regionname LIKE '${branch[0].region}' AND am.areaname LIKE '${branch[0].areaname}'`,
                                        (err, approvers, fields) => {
                                            if (!err) {
                                                if (!approvers.length == 0) {
                                                    branchdbConnection.query(query.postRfRequest,
                                                        [
                                                            req.body.data.type, req.body.data.rfDate, req.body.data.requestor, branch[0].branch, branch[0].region,
                                                            req.body.data.email, req.body.data.period, req.body.data.controlNo, req.body.data.rfAllowance, req.body.data.pendingRf,
                                                            req.body.data.totalExpenses, req.body.data.cashOnHand, req.body.data.transpo, req.body.data.supplies,
                                                            req.body.data.meals, req.body.data.others, req.body.data.total, req.body.data.purpose,
                                                            approvers[0].am_email, '', '', approvers[0].rm_email, '', '', approvers[0].ram_email, '', '', approvers[0].ass_email, '', '',
                                                            approvers[0].vpo_email, '', '', 'pending'
                                                        ],
                                                        (err, results, fields) => {
                                                            if (!err) {
                                                                branchdbConnection.query(query.getRfRequestByControlNo, (req.body.data.controlNo), (err, request, fields) => {
                                                                    if (!err) {
                                                                        if (!request.length == 0) {
                                                                            sendEmailRf(request[0]).then(response => {
                                                                                if (response.accepted) {
                                                                                    sendRfRequestor(request[0], request[0].am_fullname, request[0].rm_fullname).then(resp => {
                                                                                        if (resp.accepted) {
                                                                                            Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest - Request Submitted Successfully');
                                                                                            Logger.loggerInfo.info(`sendRfRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                            res.send({ message: 'Request submitted successfully', rows: request[0] });
                                                                                        } else if (resp.rejected) {
                                                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network error');
                                                                                            Logger.loggerInfo.error(`sendRfRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                            res.send({ message: 'Network Error' });
                                                                                        }
                                                                                    }).catch(err => {
                                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                        Logger.loggerError.error(`sendRfRequestor ${err}`)
                                                                                        res.send({ message: "Network Error" });
                                                                                    })
                                                                                } else if (response.rejected) {
                                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                    Logger.loggerError.error(`sendEmailRf - ${response.messageId} - ${response.rejected}`)
                                                                                    res.send({ message: 'Network Error' });
                                                                                }
                                                                            }).catch(err => {
                                                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                Logger.loggerError.error(`sendEmailRf ${err}`)
                                                                                res.send({ message: "Network Error" });
                                                                            })

                                                                        } else {
                                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                            Logger.loggerError.error(`No data found - ${request.length}`);
                                                                            res.status(404).send({ message: 'Failed to submit request' });
                                                                        }
                                                                    } else {
                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                        Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                                        res.status(500).send({ message: "Something's wrong in the server" });
                                                                    }
                                                                })
                                                                // res.send(results);
                                                            } else {
                                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest - postRfRequest');
                                                                Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                                res.status(500).send({ message: "Something's wrong in the server" });
                                                            }
                                                        })
                                                } else {
                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                                    Logger.loggerError.error(`No data found for approvers - approvers length: ${approvers.length}`);
                                                    Logger.loggerError.error(`No data found for approvers ${approvers.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                                    res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                                                }
                                            } else {
                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                                Logger.loggerError.error(`Error retrieving approvers - ${err}`);
                                                res.status(500).send({ message: "Something's wrong in the server" })
                                            }
                                        })
                                } else {
                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                    Logger.loggerError.error(`No areacode found  - areacode length: ${branch.length}`);
                                    res.status(404).send({ message: "No data found. Make sure that Base Branch and Region is correct." });
                                }

                            } else {
                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                Logger.loggerError.error(`Error retrieving areacode - ${err}`);
                                res.status(500).send({ message: "Something's wrong in the server" })
                            }

                        })
                    } catch (error) {
                        Logger.loggerFatal.addContext('context', 'requestContoller - post_RfRequest - ');
                        Logger.loggerFatal.fatal(`Something's wrong in the server - ${error}`);
                        res.status(500).send({ message: "Something's wrong in the server" })
                    }
                    break;
                case "Area Manager":
                    Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest -');
                    Logger.loggerInfo.info(`Requestor Type: Area Manager`);
                    dbConnection.query(`SELECT areaname AS areaname, regionname AS region, branchname AS branch FROM branches WHERE branchname LIKE '${req.body.data.baseBranch}'`, (err, branch, fields) => {
                        if (!err) {
                            if (!branch.length == 0) {
                                branchdbConnection.query(

                                    `SELECT rm.fullname AS rm_fullname, rm.email AS rm_email, ram.fullname AS ram_fullname, 
                                    ram.email AS ram_email, ass.fullname AS ass_fullname, ass.email AS ass_email, 
                                    vpo.fullname AS vpo_fullname, vpo.email AS vpo_email FROM rm_approvers rm
                                    INNER JOIN ram_approvers ram ON rm.regionname = ram.regionname
                                    CROSS JOIN ass_vpo_approvers ass
                                    CROSS JOIN vpo_approver vpo
                                    WHERE rm.regionname LIKE '${branch[0].region}'`,
                                    (err, approvers, fields) => {
                                        if (!err) {
                                            if (!approvers.length == 0) {
                                                branchdbConnection.query(query.postRfRequest,
                                                    [
                                                        req.body.data.type, req.body.data.rfDate, req.body.data.requestor, branch[0].branch, branch[0].branch,
                                                        req.body.data.email, req.body.data.period, req.body.data.controlNo, req.body.data.rfAllowance, req.body.data.pendingRf,
                                                        req.body.data.totalExpenses, req.body.data.cashOnHand, req.body.data.transpo, req.body.data.supplies,
                                                        req.body.data.meals, req.body.data.others, req.body.data.total, req.body.data.purpose,
                                                        null, null, null, approvers[0].rm_email, '', '', approvers[0].ram_email, '', '', approvers[0].ass_email, '', '',
                                                        approvers[0].vpo_email, '', '', 'pending'
                                                    ],
                                                    (err, results, fields) => {
                                                        if (!err) {
                                                            branchdbConnection.query(query.getRfRequestByControlNo, (req.body.data.controlNo), (err, request, fields) => {
                                                                if (!err) {
                                                                    if (!request.length == 0) {
                                                                        sendEmailRf(request[0]).then(response => {
                                                                            if (response.accepted) {
                                                                                sendRfRequestor(request[0], request[0].rm_fullname, request[0].ram_fullname).then(resp => {
                                                                                    if (resp.accepted) {
                                                                                        Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest - Request Submitted Successfully');
                                                                                        Logger.loggerInfo.info(`sendRfRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                        res.send({ message: 'Request submitted successfully', rows: request[0] });
                                                                                    } else if (resp.rejected) {
                                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network error');
                                                                                        Logger.loggerInfo.error(`sendRfRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                        res.status(500).send({ message: 'Network Error' });
                                                                                    }
                                                                                }).catch(err => {
                                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                    Logger.loggerError.error(`sendRfRequestor ${err}`)
                                                                                    res.status(500).send({ message: "Network Error" });
                                                                                })
                                                                            } else if (response.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                Logger.loggerError.error(`sendEmailRf - ${response.messageId} - ${response.rejected}`)
                                                                                res.status(500).send({ message: 'Network Error' });
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailRf ${err}`)
                                                                            res.status(500).send({ message: "Network Error" });
                                                                        })

                                                                    } else {
                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                        Logger.loggerError.error(`No data found - ${request.length}`);
                                                                        res.status(404).send({ message: 'Failed to submit request' });
                                                                    }
                                                                } else {
                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                    Logger.loggerError.error(`No data found - ${request.length}`);
                                                                    res.status(500).send({ message: "Something's wrong in the server" });
                                                                }
                                                            })
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                            Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                            res.status(500).send({ message: "Something's wrong in the server" });
                                                        }
                                                    })
                                            } else {
                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                                Logger.loggerError.error(`No data found for approvers ${approvers.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                                            }
                                        } else {
                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                            Logger.loggerError.error(`Error retrieving approvers - ${err}`);
                                            res.status(500).send({ message: "Something's wrong in the server" })
                                        }
                                    })
                            } else {
                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                Logger.loggerError.error(`No areacode found  - areacode length: ${branch.length}`);
                                res.status(404).send({ message: 'No data found. Make sure that Base Branch and Region is correct.' })
                            }
                        } else {
                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                            Logger.loggerError.error(`Error retrieving areacode - ${err}`);
                            res.status(500).send({ message: "Something's wrong in the server" })
                        }
                    })

                    break;
                case "Regional Manager":
                    Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest -');
                    Logger.loggerInfo.info(`Requestor Type: Regional Manager`);
                    dbConnection.query(`SELECT areaname AS areaname, regionname AS region, branchname AS branch FROM branches WHERE branchname 
                                        LIKE '${req.body.data.baseBranch}'`, (err, branch, fields) => {
                        if (!err) {
                            if (!branch.length == 0) {

                                branchdbConnection.query(

                                    `SELECT ram.fullname AS ram_fullname, 
                                    ram.email AS ram_email, ass.fullname AS ass_fullname, ass.email AS ass_email, 
                                    vpo.fullname AS vpo_fullname, vpo.email AS vpo_email FROM ram_approvers ram
                                    CROSS JOIN ass_vpo_approvers ass
                                    CROSS JOIN vpo_approver vpo
                                    WHERE ram.regionname LIKE '${branch[0].region}'`,
                                    (err, approvers, fields) => {
                                        if (!err) {
                                            if (!approvers.length == 0) {
                                                branchdbConnection.query(query.postRfRequest,
                                                    [
                                                        req.body.data.type, req.body.data.rfDate, req.body.data.requestor, branch[0].branch, branch[0].region,
                                                        req.body.data.email, req.body.data.period, req.body.data.controlNo, req.body.data.rfAllowance, req.body.data.pendingRf,
                                                        req.body.data.totalExpenses, req.body.data.cashOnHand, req.body.data.transpo, req.body.data.supplies,
                                                        req.body.data.meals, req.body.data.others, req.body.data.total, req.body.data.purpose,
                                                        null, null, null, null, null, null, approvers[0].ram_email, '', '', approvers[0].ass_email, '', '',
                                                        approvers[0].vpo_email, '', '', 'pending'
                                                    ],
                                                    (err, results, fields) => {
                                                        if (!err) {
                                                            branchdbConnection.query(query.getRfRequestByControlNo, (req.body.data.controlNo), (err, request, fields) => {
                                                                if (!err) {
                                                                    if (!request.length == 0) {
                                                                        sendEmailRf(request[0]).then(response => {
                                                                            if (response.accepted) {
                                                                                sendRfRequestor(request[0], request[0].ram_fullname, request[0].ass_fullname).then(resp => {
                                                                                    if (resp.accepted) {
                                                                                        Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest - Request Submitted Successfully');
                                                                                        Logger.loggerInfo.info(`sendRfRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                        res.send({ message: "Request submitted successfully", rows: request[0] });
                                                                                    } else if (resp.rejected) {
                                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network error');
                                                                                        Logger.loggerInfo.error(`sendRfRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                        res.status(500).send({ message: "Network Error" })
                                                                                    }
                                                                                }).catch(err => {
                                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                    Logger.loggerError.error(`sendRfRequestor ${err}`)
                                                                                    res.status(500).send({ message: "Network Error" });
                                                                                })
                                                                            } else if (response.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                Logger.loggerError.error(`sendEmailRf - ${response.messageId} - ${response.rejected}`)
                                                                                res.status(500).send({ message: 'Network Error' });
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailRf ${err}`)
                                                                            res.status(500).send({ message: 'Network Error' });
                                                                        })

                                                                    } else {
                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                        Logger.loggerError.error(`No data found - ${request.length}`);
                                                                        res.status(404).send({ message: 'Failed to submit request' });
                                                                    }
                                                                } else {
                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                    Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                                    res.status(500).send({ message: "Something's wrong in the server" });
                                                                }
                                                            })
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - postRfRequest');
                                                            Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                            res.status(500).send({ message: "Something's wrong in the server" });
                                                        }
                                                    })
                                            } else {
                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                                Logger.loggerError.error(`No data found for approvers ${approvers.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                                            }
                                        } else {
                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                            Logger.loggerError.error(`Error retrieving approvers - ${err}`);
                                            res.status(500).send({ message: "Something's wrong in the server" });
                                        }
                                    })
                            } else {
                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                Logger.loggerError.error(`No areacode found  - areacode length: ${branch.length}`);
                                res.status(404).send({ message: "No data found. Make sure that Base Branch and Region is correct." });
                            }
                        } else {
                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                            Logger.loggerError.error(`Error retrieving areacode - ${err}`);
                            res.status(500).send({ message: "Something's wrong in the server" })
                        }
                    })
                    break;

                case "Regional Area Manager":
                    Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest -');
                    Logger.loggerInfo.info(`Requestor Type: Regional Area Manager`);
                    dbConnection.query(`SELECT areaname AS areaname, regionname AS region, branchname AS branch FROM branches WHERE branchname 
                                        LIKE '${req.body.data.baseBranch}'`, (err, branch, fields) => {
                        if (!err) {
                            if (!branch.length == 0) {
                                branchdbConnection.query(

                                    `SELECT ass.fullname AS ass_fullname, ass.email AS ass_email, 
                                    vpo.fullname AS vpo_fullname, vpo.email AS vpo_email FROM ass_vpo_approvers ass
                                    CROSS JOIN vpo_approver vpo`,
                                    (err, approvers, fields) => {
                                        if (!err) {
                                            if (!approvers.length == 0) {
                                                branchdbConnection.query(query.postRfRequest,
                                                    [
                                                        req.body.data.type, req.body.data.rfDate, req.body.data.requestor, branch[0].branch, branch[0].region, req.body.data.email,
                                                        req.body.data.period, req.body.data.controlNo, req.body.data.rfAllowance, req.body.data.pendingRf,
                                                        req.body.data.totalExpenses, req.body.data.cashOnHand, req.body.data.transpo, req.body.data.supplies,
                                                        req.body.data.meals, req.body.data.others, req.body.data.total, req.body.data.purpose,
                                                        null, null, null, null, null, null, null, null, null, approvers[0].ass_email, '', '',
                                                        approvers[0].vpo_email, '', '', 'pending'
                                                    ],
                                                    (err, results, fields) => {
                                                        if (!err) {
                                                            branchdbConnection.query(query.getRfRequestByControlNo, (req.body.data.controlNo), (err, request, fields) => {
                                                                if (!err) {
                                                                    if (!request.length == 0) {
                                                                        sendEmailRf(request[0]).then(response => {
                                                                            if (response.accepted) {
                                                                                sendRfRequestor(request[0], request[0].ass_fullname, request[0].vpo_fullname).then(resp => {
                                                                                    if (resp.accepted) {
                                                                                        Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest - Request Submitted Successfully');
                                                                                        Logger.loggerInfo.info(`sendRfRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                        res.send({ message: "Request submitted successfully", rows: request[0] });
                                                                                    } else if (resp.rejected) {
                                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network error');
                                                                                        Logger.loggerInfo.error(`sendRfRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                        res.status(500).send({ message: "Network Error" });
                                                                                    }
                                                                                }).catch(err => {
                                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                    Logger.loggerError.error(`sendRfRequestor ${err}`);
                                                                                    res.status(500).send({ message: "Network Error" });
                                                                                })
                                                                            } else if (response.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                Logger.loggerError.error(`sendEmailRf - ${response.messageId} - ${response.rejected}`)
                                                                                res.status(500).send({ message: 'Network Error' });
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailRf ${err}`)
                                                                            res.status(500).send({ message: 'Network Error' });
                                                                        })

                                                                    } else {
                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                        Logger.loggerError.error(`No data found - ${request.length}`);
                                                                        res.status(404).send({ message: 'Failed to submit request' });
                                                                    }
                                                                } else {
                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                    Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                                    res.status(500).send({ message: "Something's wrong in the server" });
                                                                }
                                                            })
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - postRfRequest');
                                                            Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                            res.status(500).send({ message: "Something's wrong in the server" });
                                                        }
                                                    })
                                            } else {
                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                                Logger.loggerError.error(`No data found for approvers ${approvers.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                                            }
                                        } else {
                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                            Logger.loggerError.error(`Error retrieving approvers - ${err}`);
                                            res.status(500).send({ message: "Something's wrong in the server" });
                                        }
                                    })
                            } else {
                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                Logger.loggerError.error(`No areacode found  - areacode length: ${branch.length}`);
                                res.status(404).send({ message: "No data found. Make sure that Base Branch and Region is correct." });
                            }
                        } else {
                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                            Logger.loggerError.error(`Error retrieving areacode - ${err}`);
                            res.status(500).send({ message: "Something's wrong in the server" })
                        }
                    })
                    break;
                case "Asst. to Vpo | Coo":
                    Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest -');
                    Logger.loggerInfo.info(`Requestor Type: Asst. to Vpo | Coo`);
                    dbConnection.query(`SELECT areaname AS areaname, regionname AS region, branchname AS branch FROM branches WHERE branchname 
                                        LIKE '${req.body.data.baseBranch}'`, (err, branch, fields) => {
                        if (!err) {
                            if (!branch.length == 0) {
                                branchdbConnection.query(
                                    `SELECT vpo.fullname AS vpo_fullname, vpo.email AS vpo_email 
                                    FROM vpo_approver vpo`,
                                    (err, approvers, fields) => {
                                        if (!err) {
                                            if (!approvers.length == 0) {
                                                branchdbConnection.query(query.postRfRequest,
                                                    [
                                                        req.body.data.type, req.body.data.rfDate, req.body.data.requestor, branch[0].branch, branch[0].region,
                                                        req.body.data.email, req.body.data.period, req.body.data.controlNo, req.body.data.rfAllowance, req.body.data.pendingRf,
                                                        req.body.data.totalExpenses, req.body.data.cashOnHand, req.body.data.transpo, req.body.data.supplies,
                                                        req.body.data.meals, req.body.data.others, req.body.data.total, req.body.data.purpose,
                                                        null, null, null, null, null, null, null, null, null, null, '', '',
                                                        approvers[0].vpo_email, '', '', 'pending'
                                                    ],
                                                    (err, results, fields) => {
                                                        if (!err) {
                                                            branchdbConnection.query(query.getRfRequestByControlNo, (req.body.data.controlNo), (err, request, fields) => {
                                                                if (!err) {
                                                                    if (!request.length == 0) {
                                                                        sendEmailRf(request[0]).then(response => {
                                                                            if (response.accepted) {
                                                                                sendRfRequestor(request[0], request[0].vpo_fullname, '').then(resp => {
                                                                                    if (resp.accepted) {
                                                                                        Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest - Request Submitted Successfully');
                                                                                        Logger.loggerInfo.info(`sendRfRequestor - ${resp.messageId} - ${resp.accepted}`);
                                                                                        res.send({ message: "Request submitted successfully", rows: request[0] })
                                                                                    } else if (resp.rejected) {
                                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network error');
                                                                                        Logger.loggerInfo.error(`sendRfRequestor - ${resp.messageId} - ${resp.rejected}`);
                                                                                        res.status(500).send({ message: "Network Error" });
                                                                                    }
                                                                                }).catch(err => {
                                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                    Logger.loggerError.error(`sendRfRequestor ${err}`);
                                                                                    res.status(500).send({ message: "Network Error" });
                                                                                })
                                                                            } else if (response.rejected) {
                                                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                                Logger.loggerError.error(`sendEmailRf - ${response.messageId} - ${response.rejected}`)
                                                                                res.status(500).send({ message: 'Network Error' });
                                                                            }
                                                                        }).catch(err => {
                                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - Network Error -');
                                                                            Logger.loggerError.error(`sendEmailRf ${err}`)
                                                                            res.status(500).send({ message: "Network Error" });
                                                                        })

                                                                    } else {
                                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                        Logger.loggerError.error(`No data found - ${request.length}`);
                                                                        res.status(404).send({ message: 'Failed to submit request' });
                                                                    }
                                                                } else {
                                                                    Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                                                    Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                                    res.status(500).send({ message: "Something's wrong in the server" });
                                                                }
                                                            })
                                                        } else {
                                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - postRfRequest');
                                                            Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                                            res.status(500).send({ message: "Something's wrong in the server" });
                                                        }
                                                    })
                                            } else {
                                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                                Logger.loggerError.error(`No data found for approvers ${approvers.length}, REGION NAME AND AREA NAME NOT SUPPORTED/EXIST`)
                                                res.status(404).send({ message: "Failed to submit request. Region name and Area doesn't exist" })
                                            }
                                        } else {
                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                            Logger.loggerError.error(`Error retrieving approvers - ${err}`);
                                            res.send({ message: "Something's wrong in the server" });
                                        }
                                    })
                            } else {
                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                Logger.loggerError.error(`No areacode found  - areacode length: ${branch.length}`);
                                res.status(404).send({ message: "No data found. Make sure that Base Branch and Region is correct." });
                            }
                        } else {
                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                            Logger.loggerError.error(`Error retrieving areacode - ${err}`);
                            res.status(500).send({ message: "Something's wrong in the server" })
                        }
                    })
                    break;
                case "Vpo":
                    Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest -');
                    Logger.loggerInfo.info(`Requestor Type: Vpo | Coo`);
                    branchdbConnection.query(query.postRfRequest,
                        [
                            req.body.data.type, req.body.data.rfDate, req.body.data.requestor, req.body.data.baseBranch, req.body.data.region,
                            req.body.data.email, req.body.data.period, req.body.data.controlNo, req.body.data.rfAllowance, req.body.data.pendingRf,
                            req.body.data.totalExpenses, req.body.data.cashOnHand, req.body.data.transpo, req.body.data.supplies,
                            req.body.data.meals, req.body.data.others, req.body.data.total, req.body.data.purpose,
                            null, null, null, null, null, null, null, null, null, null, null, null, null,
                            null, null, 'approved'
                        ], (err, result, fields) => {
                            if (!err) {
                                branchdbConnection.query(query.getRfRequestByControlNo, (req.body.data.controlNo), (err, request, field) => {
                                    if (!err) {
                                        if (!request.length == 0) {
                                            let approvedTemplate = fs.readFileSync(path.join(__dirname, '..', 'views', 'templates', 'rfApproved_pdf.hbs'), 'utf-8');

                                            let context = {
                                                data: request[0],
                                                isNotVpo: false
                                            }
                                            let template = handlebars.compile(approvedTemplate);

                                            let DOC = template(context);

                                            _createPdfStream(DOC).then((stream) => {
                                                _streamToBuffer(stream, function (err, buffer) {
                                                    if (err) {
                                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest -');
                                                        Logger.loggerError.error(`Error generating PDF ${err}`);
                                                        throw new Error(err);
                                                    }
                                                    sendEmail({
                                                        subject: `Revolving Fund ${request[0].controlNo} REQUEST APPROVED`,
                                                        to: request[0].email,
                                                        from: "'Cash Request <cashrequest@mlhuillier.com>'",
                                                        template: "rfApproved",
                                                        context: {
                                                            data: request[0],
                                                        },
                                                        attachments: [{
                                                            filename: `REVOLVING FUND LIQUIDATION ${request[0].controlNo}.pdf`,
                                                            content: buffer,
                                                            contentDisposition: 'application/pdf'
                                                        }]
                                                    });
                                                });
                                            });
                                            Logger.loggerInfo.addContext('context', 'requestController - post_RfRequest - Request Submitted Successfully');
                                            Logger.loggerInfo.info(`generate PDF - success`);
                                            res.send({ message: 'Request Submitted Successfully', rows: request[0] })
                                        } else {
                                            Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                            Logger.loggerError.error(`No data found - ${request.length}`);
                                            res.status(404).send({ message: 'Failed to submit request' });
                                        }
                                    } else {
                                        Logger.loggerError.addContext('context', 'requestController - post_RfRequest - getRfRequestByControlNo');
                                        Logger.loggerError.error(`Something's wrong in the server - ${err}`);
                                        res.status(500).send({ message: "Something's wrong in the server" });
                                    }
                                })
                            } else {
                                Logger.loggerError.addContext('context', 'requestController - post_RfRequest - postRfRequest');
                                Logger.loggerError.error(`Failed to submit request - ${err}`);
                                res.status(500).send({ message: "Failed to submit request" });
                            }
                        })
                    break;
                default:
                    break;
            }

        } catch (error) {
            Logger.loggerFatal.addContext('context', 'requestController - post_RfRequest');
            Logger.loggerFatal.fatal(`Method Error ${error}`);
            res.status(500).send({ message: "Something's wrong in the server. Please refresh the page and try again." });
        }
    },
    getAllRequestsCash(req, res) {

        try {
            branchdbConnection.query(query.getAllRequestsCa, [req.params.idNumber, req.params.status], (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        Logger.loggerInfo.addContext('context', 'getAllRequestsCash')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send(rows)
                    } else {
                        Logger.loggerInfo.addContext('context', 'getAllRequestsCash - No data found')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send(rows)
                    }
                } else {
                    Logger.loggerError.addContext('context', 'getAllRequestsCash')
                    Logger.loggerError.error(`Error : ${JSON.stringify(err)}`)
                    res.send({ message: 'Error retrieving requests' })
                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'getAllRequestsCash');
            Logger.loggerFatal.fatal(`Error : ${JSON.stringify(error)}`)
            res.send(error)
        }
    },
    getAllRequestsRevolving(req, res) {

        try {
            branchdbConnection.query(query.getAllRequestsRf, [req.params.email, req.params.status], (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        res.send(rows)
                    } else {
                        res.send(rows)
                    }
                } else {
                    res.send({ message: 'Error retrieving requests' })
                }
            })
        } catch (error) {
            res.send(error)
        }
    },
    getRequestByControlNoRf(req, res) {
        try {
            const approver = [];
            branchdbConnection.query(query.getRfRequestByControlNo, (req.params.controlNo), (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        rows.map(element => {
                            if (!element.am_approver == '') {
                                approver.push(
                                    {
                                        name: element.am_fullname,
                                        status: element.am_status,
                                        date: element.am_date,
                                        remarks: element.am_remarks,
                                        approver: 'area_approver',
                                        position: 'Area Manager'
                                    }
                                )
                            }
                            if (!element.rm_approver == '') {
                                approver.push(
                                    {
                                        name: element.rm_fullname,
                                        status: element.rm_status,
                                        date: element.rm_date,
                                        remarks: element.rm_remarks,
                                        approver: 'rm_approver',
                                        position: 'Regional Manager'
                                    }
                                )
                            }
                            if (!element.ram_approver == '') {
                                approver.push(
                                    {
                                        name: element.ram_fullname,
                                        status: element.ram_status,
                                        date: element.ram_date,
                                        remarks: element.ram_remarks,
                                        approver: 'ram_approver',
                                        position: 'Regional Area Manager'
                                    }
                                )
                            }
                            if (!element.ass_vpo_approver == '') {
                                approver.push(
                                    {
                                        name: element.ass_fullname,
                                        status: element.ass_status,
                                        date: element.ass_date,
                                        remarks: element.ass_remarks,
                                        approver: 'ass_approver',
                                        position: 'Asst. to the COO | VPO'
                                    }
                                )
                            }
                            if (!element.vpo_approver == '') {
                                approver.push(
                                    {
                                        name: element.vpo_fullname,
                                        status: element.vpo_status,
                                        date: element.vpo_date,
                                        remarks: element.vpo_remarks,
                                        approver: 'vpo_approver',
                                        position: 'COO | VPO'
                                    }
                                )
                            }

                        })
                        res.send({ request: rows, approvers: approver })
                    } else {
                        res.send(rows)
                    }
                } else {
                    res.send({ message: 'Error retrieving requests' })
                }
            })
        } catch (error) {
            res.send(error)
        }
    },
    // getRequestByControlNoCash(req, res) {
    //     try {

    //         let approver = [];
    //         branchdbConnection.query(query.getRequestByControlNo, (req.params.controlNo), (err, rows, fields) => {
    //             if (!err) {
    //                 if (!rows.length == 0) {
    //                     rows.map(element => {
    //                         if (!element.area_approver == '') {
    //                             approver.push(
    //                                 {
    //                                     name: element.am_fullname,
    //                                     status: element.am_status,
    //                                     date: element.am_date,
    //                                     remarks: element.am_remarks,
    //                                     approver: 'area_approver',
    //                                     position: 'Area Manager'
    //                                 }
    //                             )
    //                         }
    //                         if (!element.regional_approver == '') {
    //                             approver.push(
    //                                 {
    //                                     name: element.rm_fullname,
    //                                     status: element.rm_status,
    //                                     date: element.rm_date,
    //                                     remarks: element.rm_remarks,
    //                                     approver: 'rm_approver',
    //                                     position: 'Regional Manager'
    //                                 }
    //                             )
    //                         }
    //                         if (!element.ram_approver == '') {
    //                             approver.push(
    //                                 {
    //                                     name: element.ram_fullname,
    //                                     status: element.ram_status,
    //                                     date: element.ram_date,
    //                                     remarks: element.ram_remarks,
    //                                     approver: 'ram_approver',
    //                                     position: 'Regional Area Manager'
    //                                 }
    //                             )
    //                         }
    //                         if (!element.ass_vpo_approver == '') {
    //                             approver.push(
    //                                 {
    //                                     name: element.ass_fullname,
    //                                     status: element.ass_status,
    //                                     date: element.ass_date,
    //                                     remarks: element.ass_remarks,
    //                                     approver: 'ass_approver',
    //                                     position: 'Asst. to the COO | VPO'
    //                                 }
    //                             )
    //                         }
    //                         if (!element.vpo_approver == '') {
    //                             approver.push(
    //                                 {
    //                                     name: element.vpo_fullname,
    //                                     status: element.vpo_status,
    //                                     date: element.vpo_date,
    //                                     remarks: element.vpo_remarks,
    //                                     approver: 'vpo_approver',
    //                                     position: 'COO | VPO'
    //                                 }
    //                             )
    //                         }

    //                     })
    //                     res.send({ rows: rows, approvers: approver })
    //                 } else {
    //                     res.send({ rows: rows })
    //                 }
    //             } else {
    //                 res.send({ message: 'Error retrieving requests' })
    //             }
    //         })
    //     } catch (error) {
    //         res.send(error)
    //     }
    // },
    getAllRequestsForApprovalCash(req, res) {
        const email = req.body.email;
        const status = req.body.status;
        const approver = req.body.approver;

        try {
            let data = []
            branchdbConnection.query(`
                SELECT ca.id AS id, ca.idNumber AS idNumber, ca.author AS author, ca.jobTitle AS jobTitle, ca.branch AS branch, ca.area AS AREA ,
                ca.region AS region, ca.email AS email, ca.purpose AS purpose, ca.controlNo AS controlNo, ca.date AS date, ca.travelDate AS travelDate,
                ca.departureDate AS departureDate, ca.arrivalDate AS arrivalDate, ca.amount AS amount, ca.area_approver AS area_approver, 
                ca.am_status AS am_status,ca.am_date AS am_date, ca.am_remarks AS am_remarks,ca.regional_approver AS regional_approver, 
                ca.rm_status AS rm_status,ca.rm_date AS rm_date, ca.rm_remarks AS rm_remarks, ca.ram_approver AS ram_approver, 
                ca.ram_status AS ram_status,ca.ram_date AS ram_date, ca.ram_remarks AS ram_remarks, ca.ass_vpo_approver AS ass_vpo_approver,
                ca.ass_status AS ass_status,ca.ass_date AS ass_date, ca.ass_remarks AS ass_remarks, ca.vpo_approver AS vpo_approver, 
                ca.vpo_status AS vpo_status,ca.vpo_date AS vpo_date, ca.vpo_remarks AS vpo_remarks, ca.request_status AS request_status
                FROM cash_advance_request ca 
                WHERE ${approver} = '${email}' AND request_status = 'pending' AND ${status} = ''`, (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        if (approver === 'area_approver') {
                            res.send({ rows: rows })
                        } else if (approver === 'regional_approver' ) {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];

                                if (element.am_status == 'approved' || element.area_approver == null) {
                                    data.push(element)
                                }

                            }
                            res.send({ rows: data })
                        } else if (approver === 'ram_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.rm_status == 'approved' || element.regional_approver == null) {
                                    data.push(element)
                                }

                            }
                            res.send({ rows: data })
                        } else if (approver === 'ass_vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ram_status == 'approved' || element.ram_approver == null) {
                                    data.push(element)
                                }

                            }
                            res.send({ rows: data })
                        } else if (approver === 'vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ass_status == 'approved' || element.ass_vpo_approver == null) {
                                    data.push(element)
                                }

                            }
                            res.send({ rows: data })
                        }

                    } else {
                        res.send({ rows: data })
                    }
                } else {
                    res.send({ message: 'Error retrieving requests' })
                }
            })
        } catch (error) {
            res.send(error)
        }
    },
    getAllRequestsForApprovalRevolving(req, res) {
        const email = req.body.email;
        const status = req.body.status;
        const approver = req.body.approver;

        try {
            let data = []

            branchdbConnection.query(`
            SELECT rf.id AS id, rf.type AS type, rf.rfDate AS date, rf.requestor AS requestor, rf.baseBranch AS branch, rf.region AS region,
            rf.controlNo AS controlNo, rf.totalExpenses AS total, rf.cashOnHand AS cashOnHand, 
            rf.am_approver AS am_approver, rf.am_status AS am_status, 
            rf.rm_approver AS rm_approver, rf.rm_status AS rm_status,
            rf.ram_approver AS ram_approver, rf.ram_status AS ram_status, 
            rf.ass_vpo_approver AS ass_vpo_approver,rf.ass_status AS ass_status,
            rf.vpo_approver AS vpo_approver, rf.vpo_status AS vpo_status,
            rf.request_status AS request_status
            FROM revolving_fund_request rf 
            WHERE ${approver} = '${email}' AND request_status = 'pending' AND ${status} = ''`, (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        if (approver === 'am_approver') {
                            res.send({ rows: rows })
                        } else if (approver === 'rm_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];

                                if (element.am_status == 'approved' || element.am_approver == null) {
                                    data.push(element)
                                }

                            }
                            res.send({ rows: data })
                        } else if (approver === 'ram_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.rm_status == 'approved' || element.rm_approver == null) {
                                    data.push(element)
                                }
                            }
                            res.send({ rows: data })
                        } else if (approver === 'ass_vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ram_status == 'approved' || element.ram_approver == null) {
                                    data.push(element)
                                }
                            }
                            res.send({ rows: data })
                        } else if (approver === 'vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ass_status == 'approved' || element.ram_approver == null) {
                                    data.push(element)
                                }
                            }
                            res.send({ rows: data })
                        }
                    } else {

                        res.send({ rows: rows })
                    }
                } else {
                    res.send({ message: 'Error retrieving requests' })
                }
            })
        } catch (error) {
            res.send(error)
        }
    },
    cancelCashRequest(req, res) {
        let controlno = req.body.controlNo

        try {
            branchdbConnection.query(`UPDATE cash_advance_request SET request_status = 'cancelled'  WHERE controlNo = '${controlno}'`, (err, result, fields) => {
                if (!err) {
                    res.send({ message: 'Successfully cancelled' })
                } else {
                    res.send({ message: 'Cancellation failed. Please refresh page' })
                }
            })
        } catch (error) {
            res.send({ message: 'Network Error' })
        }
    },
    cancelRevRequest(req, res) {
        let controlno = req.body.controlNo

        try {
            branchdbConnection.query(`UPDATE revolving_fund_request SET request_status = 'cancelled'  WHERE controlNo = '${controlno}'`, (err, result, fields) => {

                if (!err) {
                    res.send({ message: 'Successfully cancelled' })
                } else {
                    res.send({ message: 'Cancellation failed. Please refresh page' })
                }
            })
        } catch (error) {
            res.send({ message: 'Network Error' })
        }
    }

}