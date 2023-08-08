
const branchdbConnection = require('../config/branchDBConnection');
const queries = require('../config/queries');
const Logger = require('../logs/logger');
const { SendEmailNotificationNextRfApprover, SendEmailNotificationRevApproval, SendEmailNotificationRevolvingRequestorApproved } = require('./EmailController');
const { updateApproverEmailDateRev } = require('./UpdateRequestsDBQuery');
const { getRfRequestByControlNo, getRequestorEmail } = require('./getRequestsDBQuery')
const response = require('./resonseCodeMessages');


const updateRequestStatus = (approver, status, controlno, remarks, res, duration, appEmail, nextAppEmail) => {

    if (approver == 'vpo_approver') {

        branchdbConnection.query(queries.updateRfRequestStatus, [status,duration, controlno], (err, results, fields) => {
            if (!err) {

                Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED - updateRequestStatus - `);
                Logger.loggerInfo.info(`Request Status Updated - ${controlno}`);
                updateApproverStatus(approver, controlno, status, remarks, res)

            } else {
                Logger.loggerError.addContext('context', 'REVOLVING FUND APPROVAL -  updateRequestStatus - ');
                Logger.loggerError.error(`Error updating request status, ${err}`);
                res.status(400).send({ message: response(2), resCode: 2 })
            }
        })
    } else if (status === 'disapproved') {

        branchdbConnection.query(queries.updateRfRequestStatus, [status,duration, controlno], (err, results, fields) => {
            if (!err) {

                Logger.loggerInfo.addContext('context', `REVOLVING FUND DISAPPROVED - updateRequestStatus - `);
                Logger.loggerInfo.info(`Request Status Updated - ${controlno}`);
                updateApproverStatus(approver, controlno, status, remarks, res)

            } else {
                Logger.loggerError.addContext('context', 'REVOLVING FUND APPROVAL -  updateRequestStatus - ');
                Logger.loggerError.error(`Error updating request status, ${err}`);
                res.status(400).send({ message: response(2), resCode: 2 })
            }
        })
    } else {
        Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED - updateRequestStatus - `);
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
            case 'am_approver':

                let amQuery = `UPDATE revolving_fund_request 
                SET am_status = '${status}', am_remarks = '${remarks}', am_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(amQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            SendEmailNotificationNextRfApprover(controlNo, 'RM', nextAppEmail)
                                .then(resp => {
                                    SendEmailNotificationRevApproval(controlNo, 'RM', appEmail)
                                        .then(respo => {
                                            let approvalEmailDate = updateApproverEmailDateRev(controlNo, 'RM');
                                            return approvalEmailDate
                                        })
                                        .then(updateEmailDate => {

                                            if (updateEmailDate.sqlCode === 0) {

                                                return { result: updateEmailDate.result }
                                            } else if (updateEmailDate.sqlCode === 1) {

                                                return updateEmailDate.message
                                            }
                                        })
                                        .then(result => {
                                            Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                            res.status(200).send({ message: response(0), resCode: 0 });
                                        })
                                        .catch(err => {
                                            Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                            res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification  to the approver.", resCode: 1 });
                                        })

                                }).catch(err => {
                                    Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashNextApprover');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification  to the next approver.", resCode: 1 });
                                })
                        }else{
    
                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `REVOLVING FUND DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVAL - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            case 'rm_approver':

                let rmQuery = `UPDATE revolving_fund_request 
                SET rm_status = '${status}', rm_remarks = '${remarks}', rm_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(rmQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            SendEmailNotificationNextRfApprover(controlNo, 'RAM', nextAppEmail)
                                .then(resp => {
                                    SendEmailNotificationRevApproval(controlNo, 'RAM', appEmail)
                                        .then(respo => {
                                            let approvalEmailDate = updateApproverEmailDateRev(controlNo, 'RAM');
                                            return approvalEmailDate
                                        })
                                        .then(updateEmailDate => {

                                            if (updateEmailDate.sqlCode === 0) {

                                                return { result: updateEmailDate.result }
                                            } else if (updateEmailDate.sqlCode === 1) {

                                                return updateEmailDate.message
                                            }
                                        })
                                        .then(result => {
                                            Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                            res.status(200).send({ message: response(0), resCode: 0 });
                                        })
                                        .catch(err => {
                                            Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                            res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification  to the approver.", resCode: 1 });
                                        })

                                }).catch(err => {
                                    Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashNextApprover');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification  to the next approver.", resCode: 1 });
                                })
                        }else{
    
                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `REVOLVING FUND DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerError.addContext('context', `REVOLVING FUND APPROVAL - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            case 'ram_approver':

                let ramQuery = `UPDATE revolving_fund_request 
                SET ram_status = '${status}', ram_remarks = '${remarks}', ram_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(ramQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            SendEmailNotificationNextRfApprover(controlNo, 'VPO Asst', nextAppEmail)
                                .then(resp => {
                                    SendEmailNotificationRevApproval(controlNo, 'VPO Asst.', appEmail)
                                        .then(respo => {
                                            let approvalEmailDate = updateApproverEmailDateRev(controlNo, 'VPO Asst.');
                                            return approvalEmailDate
                                        })
                                        .then(updateEmailDate => {

                                            if (updateEmailDate.sqlCode === 0) {

                                                return { result: updateEmailDate.result }
                                            } else if (updateEmailDate.sqlCode === 1) {

                                                return updateEmailDate.message
                                            }
                                        })
                                        .then(result => {
                                            Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                            res.status(200).send({ message: response(0), resCode: 0 });
                                        })
                                        .catch(err => {
                                            Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                            res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification  to the approver.", resCode: 1 });
                                        })

                                }).catch(err => {
                                    Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashNextApprover');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification  to the next approver.", resCode: 1 });
                                })
                        }else{
    
                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `REVOLVING FUND DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerError.addContext('context', `REVOLVING FUND APPROVAL - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            case 'ass_vpo_approver':

                let assQuery = `UPDATE revolving_fund_request 
                SET ass_status = '${status}', ass_remarks = '${remarks}', ass_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(assQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            SendEmailNotificationRevApproval(controlNo, 'VPO', appEmail)
                                .then(respo => {
                                    let approvalEmailDate = updateApproverEmailDateRev(controlNo, 'VPO');
                                    return approvalEmailDate
                                })
                                .then(updateEmailDate => {

                                    if (updateEmailDate.sqlCode === 0) {

                                        return { result: updateEmailDate.result }
                                    } else if (updateEmailDate.sqlCode === 1) {

                                        return updateEmailDate.message
                                    }
                                })
                                .then(result => {
                                    Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                    Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                    res.status(200).send({ message: response(0), resCode: 0 });
                                })
                                .catch(err => {
                                    Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationCashApproval');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                })

                        }else{
    
                            res.status(200).send({ message: response(0), resCode: 0 });
                            Logger.loggerInfo.addContext('context', `REVOLVING FUND DISAPPROVED - updateApproverStatus - `);
                            Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerError.addContext('context', `REVOLVING FUND APPROVAL - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            case 'vpo_approver':

                let vpoQuery = `UPDATE revolving_fund_request 
                SET vpo_status = '${status}', vpo_remarks = '${remarks}', vpo_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(vpoQuery, (err, fields) => {
                    if (!err) {

                        if (status == 'approved') {
                            if (status == 'approved') {
                                getRfRequestByControlNo(controlNo).then(request => {
                                    if (!request.request.length == 0) {
    
                                        return { request: request.request[0] }
                                    } else {
    
                                        res.status(200).send({ messageHeader: response(3), message: "Request approved successfully but wasn't able to send email notification to the requestor." });
                                        Logger.loggerInfo.addContext('context', `CashRequestEscalationController - updateApproverStatus - getRequestByControlNo - `);
                                        Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                                    }
                                }).then(getReq => {
    
                                    let getReqEmail = getRequestorEmail(getReq.request.baseBranch);
    
                                    return getReqEmail
                                }).then(getEmail => {

                                    if (!getEmail.email.length == 0) {
                                        SendEmailNotificationRevolvingRequestorApproved(controlNo, getEmail.email[0].email).then(resp => {
                                            Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationRevolvingRequestorApproved');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${resp.accepted}, responseCode - 0`);
                                            res.status(200).send({ message: response(0), resCode: 0 });
            
                                        }).catch(err => {
                                            Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationRevolvingRequestorApproved');
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
                                        Logger.loggerInfo.addContext('context', 'RevolvingFundRequestEscalationController - updateApproverStatus - SendEmailNotificationRevolvingRequestorApproved');
                                        Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${reqErr}, responseCode - 3`);
                                    })
    
                            }else{
    
                                res.status(200).send({ message: response(0), resCode: 0 });
                                Logger.loggerInfo.addContext('context', `REVOLVING FUND DISAPPROVED - updateApproverStatus - `);
                                Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                            }
                            

                        }
                        // res.status(200).send({ message: response(0), resCode: 0 });
                        // Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED - updateApproverStatus - `);
                        // Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerError.addContext('context', `REVOLVING FUND APPROVAL - updateApproverStatus - `);
                        Logger.loggerError.error(`Failed to Update Status - ${err}`);
                    }
                })

                break;
            default:
                res.status(404).send({ message: response(1), resCode: 1 });
                Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVAL - updateApproverStatus - `);
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
    // REVOLVING FUND
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
            branchdbConnection.query(queries.CheckRevRequestStatus, (controlNo), (err, request, fields) => {
                if (!err) {
                    if (!request.length == 0) {
                        if (resp === 'approved') {
                            updateRequestStatus(approver, resp, controlNo, comment, res, duration, approver_email, next_approver_email)
                        } else if (resp === 'disapproved') {
                            updateRequestStatus(approver, resp, controlNo, comment, res, duration)
                        }
                    } else {
                        res.status(400).send({ message: response(1), resCode: 1 })
                        Logger.loggerInfo.addContext('context', `REVOLVING FUND - requestStatus`);
                        Logger.loggerInfo.info(`Not Found - ${request.length}`);
                    }
                } else {
                    res.status(400).send({ message: response(2), resCode: 2 })
                    Logger.loggerFatal.addContext('context', `CASH ADVANCE - requestStatus`);
                    Logger.loggerFatal.fatal(`Sql Error - ${err}`)
                }
            })

        } catch (error) {
            Logger.loggerFatal.addContext('context', `CASH ADVANCE - requestStatus`);
            Logger.loggerFatal.fatal(`Method Error - ${error}`)
            res.status(400).send({ message: response(3), resCode: 3 })
        }
    },

}