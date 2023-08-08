
const branchdbConnection = require('../config/branchDBConnection');
const queries = require('../config/queries');
const Logger = require('../logs/logger');
const response = require('./resonseCodeMessages');

const { SendEmailNotificationCashApproval, SendEmailNotificationCashNextApprover, SendEmailNotificationCashRequestorApproved } = require('./EmailController');
const { updateApproverEmailDate } = require('./UpdateRequestsDBQuery');
const { getRequestorEmail, getRequestByControlNo } = require('./getRequestsDBQuery');



const updateRequestStatus = (approver, status, controlno, remarks, res, duration, appEmail, nextAppEmail) => {

    if (approver == 'vpo_approver') {

        branchdbConnection.query(queries.updateRequestStatus, [status, duration, controlno], (err, results, fields) => {
            if (!err) {

                Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateRequestStatus - `);
                Logger.loggerInfo.info(`Request Status Updated - ${controlno}`);
                updateApproverStatus(approver, controlno, status, remarks, res, appEmail, nextAppEmail)

            } else {
                Logger.loggerError.addContext('context', 'CASH ADVANCE APPROVED -  updateRequestStatus - ');
                Logger.loggerError.error(`Error updating request status, ${err}`);
                res.status(400).send({ message: response(3), resCode: 3 })
            }
        })
    } else if (status === 'disapproved') {

        branchdbConnection.query(queries.updateRequestStatus, [status, duration, controlno], (err, results, fields) => {
            if (!err) {

                Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateRequestStatus - `);
                Logger.loggerInfo.info(`Request Status Updated - ${controlno}`);
                updateApproverStatus(approver, controlno, status, remarks, res)

            } else {
                Logger.loggerError.addContext('context', 'CASH ADVANCE APPROVED -  updateRequestStatus - ');
                Logger.loggerError.error(`Error updating request status, ${err}`);
                res.status(400).send({ message: response(3), resCode: 3 })
            }
        })
    } else {
        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateRequestStatus - `);
        Logger.loggerInfo.info(`Approver Status Updating - ${controlno}`);
        updateApproverStatus(approver, controlno, status, remarks, res, appEmail, nextAppEmail)
    }


}

const updateApproverStatus = (approver, controlNo, status, remarks, res, appEmail, nextAppEmail) => {
    try {

        let dateInstance = new Date();
        let date = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString() + "/" + ("0" + dateInstance.getDate()).slice(-2).toString() + "/" + dateInstance.getFullYear().toString();
        let time = dateInstance.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        let dateTime = `${date} | ${time}`;

        switch (approver) {
            case 'area_approver':

                let amQuery = `UPDATE cash_advance_request 
                SET am_status = '${status}', am_remarks = '${remarks}', am_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(amQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            SendEmailNotificationCashNextApprover(controlNo, 'RM', nextAppEmail)
                                .then(resp => {
                                    SendEmailNotificationCashApproval(controlNo, 'RM', appEmail)
                                        .then(respo => {
                                            let approvalEmailDate = updateApproverEmailDate(controlNo, 'RM');
                                            return approvalEmailDate
                                        })
                                        .then(updateEmailDate => {

                                            if (updateEmailDate.sqlCode === 0) {

                                                Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - updateApproverEmailDateRev');
                                                Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${updateEmailDate.result.info}, responseCode - 0`);
                                                return { result: updateEmailDate.result }
                                            } else if (updateEmailDate.sqlCode === 1) {

                                                Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - updateApproverEmailDateRev');
                                                Logger.loggerInfo.info(`responseMesage - ${response(2)}: ${updateEmailDate.message}, responseCode - 0`);
                                                return updateEmailDate.message
                                            }
                                        })
                                        .then(result => {
                                            Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                            res.status(200).send({ message: response(0), resCode: 0 });
                                        })
                                        .catch(err => {
                                            Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                            res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                        })

                                }).catch(err => {
                                    Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashNextApprover');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send notification email to the next approver.", resCode: 1 });
                                })
                        }
                        else{

                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `CASH ADVANCE DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(3), resCode: 3 });
                        Logger.loggerError.addContext('context', `CashRequestEscalationController - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            case 'regional_approver':

                let rmQuery = `UPDATE cash_advance_request 
                SET rm_status = '${status}', rm_remarks = '${remarks}', rm_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(rmQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            SendEmailNotificationCashNextApprover(controlNo, 'RAM', nextAppEmail)
                                .then(resp => {
                                    SendEmailNotificationCashApproval(controlNo, 'RAM', appEmail)
                                        .then(respo => {
                                            let approvalEmailDate = updateApproverEmailDate(controlNo, 'RAM');
                                            return approvalEmailDate
                                        })
                                        .then(updateEmailDate => {

                                            if (updateEmailDate.sqlCode === 0) {
                                                Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - updateApproverEmailDateRev');
                                                Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${updateEmailDate.result.info}, responseCode - 0`);
                                                return { result: updateEmailDate.result }
                                            } else if (updateEmailDate.sqlCode === 1) {
                                                Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - updateApproverEmailDateRev');
                                                Logger.loggerInfo.info(`responseMesage - ${response(2)}: ${updateEmailDate.message}, responseCode - 0`);
                                                return updateEmailDate.message
                                            }
                                        })
                                        .then(result => {
                                            Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                            res.status(200).send({ message: response(0), resCode: 0 });
                                        })
                                        .catch(err => {
                                            Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                            res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                        })

                                }).catch(err => {
                                    Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashNextApprover');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send notification email to the next approver.", resCode: 1 });
                                })
                        }else{

                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `CASH ADVANCE DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(3), resCode: 3 });
                        Logger.loggerError.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            case 'ram_approver':

                let ramQuery = `UPDATE cash_advance_request 
                SET ram_status = '${status}', ram_remarks = '${remarks}', ram_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(ramQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            SendEmailNotificationCashNextApprover(controlNo, 'VPO Asst', nextAppEmail)
                                .then(resp => {
                                    SendEmailNotificationCashApproval(controlNo, 'VPO Asst.', appEmail)
                                        .then(respo => {
                                            let approvalEmailDate = updateApproverEmailDate(controlNo, 'VPO Asst.');
                                            return approvalEmailDate
                                        })
                                        .then(updateEmailDate => {

                                            if (updateEmailDate.sqlCode === 0) {
                                                Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - updateApproverEmailDateRev');
                                                Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${updateEmailDate.result.info}, responseCode - 0`);
                                                return { result: updateEmailDate.result }
                                            } else if (updateEmailDate.sqlCode === 1) {
                                                Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - updateApproverEmailDateRev');
                                                Logger.loggerInfo.info(`responseMesage - ${response(2)}: ${updateEmailDate.message}, responseCode - 0`);
                                                return updateEmailDate.message
                                            }
                                        })
                                        .then(result => {
                                            Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                            res.status(200).send({ message: response(0), resCode: 0 });
                                        })
                                        .catch(err => {
                                            Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                            res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                        })

                                }).catch(err => {
                                    Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashNextApprover');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send notification email to the next approver.", resCode: 1 });
                                })
                        }else{

                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `CASH ADVANCE DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(3), resCode: 3 });
                        Logger.loggerError.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            case 'ass_vpo_approver':

                let assQuery = `UPDATE cash_advance_request 
                SET ass_status = '${status}', ass_remarks = '${remarks}', ass_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(assQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            SendEmailNotificationCashApproval(controlNo, 'VPO', appEmail)
                                .then(respo => {
                                    let approvalEmailDate = updateApproverEmailDate(controlNo, 'VPO');
                                    return approvalEmailDate
                                })
                                .then(updateEmailDate => {

                                    if (updateEmailDate.sqlCode === 0) {
                                        Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - updateApproverEmailDateRev');
                                        Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${updateEmailDate.result.info}, responseCode - 0`);
                                        return { result: updateEmailDate.result }
                                    } else if (updateEmailDate.sqlCode === 1) {
                                        Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - updateApproverEmailDateRev');
                                        Logger.loggerInfo.info(`responseMesage - ${response(2)}: ${updateEmailDate.message}, responseCode - 0`);
                                        return updateEmailDate.message
                                    }
                                })
                                .then(result => {
                                    Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                    Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                    res.status(200).send({ message: response(0), resCode: 0 });
                                })
                                .catch(err => {
                                    Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                })

                        }else{

                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `CASH ADVANCE DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(3), resCode: 3 });
                        Logger.loggerError.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            case 'vpo_approver':

                let vpoQuery = `UPDATE cash_advance_request 
                SET vpo_status = '${status}', vpo_remarks = '${remarks}', vpo_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(vpoQuery, (err, fields) => {
                    if (!err) {
                        if (status == 'approved') {
                            getRequestByControlNo(controlNo).then(request => {
                                if (!request.request.length == 0) {

                                    return { request: request.request[0] }
                                } else {

                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification to the requestor." });
                                    Logger.loggerInfo.addContext('context', `CashRequestEscalationController - updateApproverStatus - getRequestByControlNo - `);
                                    Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                                }
                            }).then(getReq => {

                                let getReqEmail = getRequestorEmail(getReq.request.branch);

                                return getReqEmail
                            }).then(getEmail => {
                                if (!getEmail.email.length == 0) {

                                    SendEmailNotificationCashRequestorApproved(controlNo, getEmail.email[0].email).then(resp => {
                                        Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashRequestorApproved');
                                        Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${resp.accepted}, responseCode - 0`);
                                        res.status(200).send({ message: response(0), resCode: 0 });

                                    }).catch(err => {
                                        Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashRequestorApproved');
                                        Logger.loggerInfo.info(`responseMesage - ${response(0)} :  ${err}, responseCode - 0`);
                                        res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification to the requestor.", resCode: 1 });
                                    })

                                }else{
                                    Logger.loggerInfo.addContext(('context', `CashRequestEscalationController - updateApproverStatus - getRequestorEmail`))
                                    Logger.loggerInfo.info(`NULL EMAIL - : Failed to notify requestor - Control No: ${element.controlNo}, Email: ${element.email}`)
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification to the requestor.", resCode: 1 });

                                }
                            })
                                .catch(reqErr => {

                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification to the requestor.", resCode: 3 });
                                    Logger.loggerInfo.addContext('context', 'CashRequestEscalationController - updateApproverStatus - SendEmailNotificationCashRequestorApproved');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${reqErr}, responseCode - 3`);
                                })

                        }else{

                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `CASH ADVANCE DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }

                    } else {
                        res.status(400).send({ message: response(3), resCode: 3 });
                        Logger.loggerError.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            default:
                res.status(404).send({ message: response(1), resCode: 1 });
                Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                Logger.loggerInfo.info(`Not Found - ${approver}`);
                break;
        }
    } catch (error) {
        res.status(500).send({ message: response(4), resCode: 4 });
        Logger.loggerFatal.addContext('context', `updateApproverStatus`);
        Logger.loggerFatal.fatal(`Method Error - ${error}`)
    }
}

module.exports = {
    // CASH ADVANCE
    requestStatus(req, res) {
        try {

            let controlNo = req.params.controlNo;
            let approver = req.params.approver;
            let comment = req.body.comment;
            let resp = req.body.response;
            let duration = req.body.duration;

            let approver_email = req.body.approver_email
            let next_approver_email = req.body.next_approver_email

            //   IF APPROVE IS CLICKED
            branchdbConnection.query(queries.CheckCashRequestStatus, (controlNo), (err, request, fields) => {
                if (!err) {
                    if (!request.length == 0) {
                        if (resp === 'approved') {
                            updateRequestStatus(approver, resp, controlNo, comment, res, duration, approver_email, next_approver_email)
                        } else if (resp === 'disapproved') {
                            updateRequestStatus(approver, resp, controlNo, comment, res, duration)
                        }
                    } else {
                        res.status(400).send({ message: response(1), resCode: 1 })
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE - requestStatus`);
                        Logger.loggerInfo.info(`Not Found - ${request.length}`)
                    }
                } else {
                    res.status(400).send({ message: response(2), resCode: 2 })
                    Logger.loggerError.addContext('context', `CASH ADVANCE - requestStatus`);
                    Logger.loggerError.error(`Sql Error - ${err}`)
                }
            })

        } catch (error) {
            Logger.loggerFatal.addContext('context', `CASH ADVANCE - requestStatus`);
            Logger.loggerFatal.fatal(`Method Error - ${error}`)
            res.status(400).send({ message: response(3), resCode: 3 })
        }
    },

}