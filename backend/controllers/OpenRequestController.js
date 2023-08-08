const dotenv = require('dotenv');
dotenv.config();
const branchdbConnection = require('../config/branchDBConnection');
const query = require('../config/queries');
const Logger = require('../logs/logger');
const { SendEmailNotificationCashNextApprover, SendEmailNotificationCashApproval, SendEmailNotificationRevApproval, SendEmailNotificationCashRequestorApproved, SendEmailNotificationNextRfApprover, SendEmailNotificationRevolvingRequestorApproved } = require('./EmailController');
const response = require('./resonseCodeMessages');
const { updateApproverEmailDate, updateApproverEmailDateRev } = require('./UpdateRequestsDBQuery');


const getAppValCashApprover = (element, status) => {
    let appVal;
    if (element.rm_status == status && element.ram_status == '') {
        appVal = 40
    }
    else if (element.ram_status == status && element.ass_status == '') {

        appVal = 60
    }
    else if (element.ass_status == status && element.vpo_status == '') {

        appVal = 80
    }
    else if (element.vpo_status == status) {

        appVal = 100
    } else {

        appVal = 0
    }

    return appVal
}
const getAppValCash = (element, status) => {
    let appVal;

    if (!element.area_approver == '' && element.am_status == status && element.rm_status == '') {
        appVal = 20
    }
    else if (!element.regional_approver == '' && element.rm_status == status && element.am_status == status && element.ram_status == '') {

        appVal = 40
    }
    else if (!element.ram_approver == '' && element.ram_status == status && element.am_status == status && element.rm_status == status && element.ass_status == '') {

        appVal = 60
    }
    else if (!element.ass_vpo_approver == '' && element.ass_status == status && element.am_status == status && element.rm_status == status && element.ram_status == status && element.vpo_status == '') {

        appVal = 80
    }
    else if (!element.ass_vpo_approver == '' && element.ass_status == status && element.am_status == status && element.rm_status == status && element.ram_status == status && element.vpo_status == status) {

        appVal = 100
    }
    else {

        appVal = 0
    }
    return appVal

}
const getAppValRevApprover = (element, status) => {
    let appVal;

    if (element.rm_status == status && element.ram_status == '') {
        appVal = 40
    }
    else if (element.ram_status == status && element.ass_status == '') {

        appVal = 60
    }
    else if (element.ass_status == status && element.vpo_status == '') {

        appVal = 80
    }
    else if (element.vpo_status == status) {

        appVal = 100
    } else {

        appVal = 0
    }
    return appVal
}
const getAppValRev = (element, status) => {
    let appVal

    if (!element.am_approver == '' && element.am_status == status && element.rm_status == '') {
        appVal = 20
    }
    else if (!element.rm_approver == '' && element.rm_status == status && element.am_status == status && element.ram_status == '') {
        appVal = 40
    }
    else if (!element.ram_approver == '' && element.ram_status == status && element.am_status == status && element.rm_status == status && element.ass_status == '') {
        appVal = 60
    }
    else if (!element.ass_vpo_approver == '' && element.ass_status == status && element.am_status == status && element.rm_status == status && element.ram_status == status && element.vpo_status == '') {
        appVal = 80
    } else {

        appVal = 0
    }
    return appVal
}


module.exports = {

    async postCashRequest(req, res) {
        let data = req.body.data;
        let approvers = req.body.approvers;
        let approverEmail = req.body.approverEmails;

        let requestStatus = '';

        let appName = '';
        let appEmail = '';
        let nextAppEmail = '';

        try {

            if (data.jobTitle == 'AREA MANAGER') {

                appName = "RM"
                appId = approvers.rmId
                appEmail = approverEmail.rm_email
                nextAppId = approvers.ramId
                nextAppEmail = approverEmail.ram_email
                requestStatus = 'pending';

            } else if (data.jobTitle == 'REGIONAL MAN') {

                appName = "RAM"
                appId = approvers.ramId
                appEmail = approverEmail.ram_email
                nextAppId = approvers.asstId
                nextAppEmail = approverEmail.ass_email
                requestStatus = 'pending';

            } else if (data.jobTitle == 'RAM') {

                appName = "VPO Asst."
                appId = approvers.asstId
                appEmail = approverEmail.ass_email
                nextAppId = approvers.vpoId
                nextAppEmail = approverEmail.vpo_email
                requestStatus = 'pending';

            } else if (data.jobTitle == 'GMO-ASTGENMAN' || data.jobTitle == 'ADM ASS SR' || data.jobTitle == "GM'S STAFF") {

                appName = "VPO"
                appId = approvers.vpoId
                appEmail = approverEmail.vpo_email
                requestStatus = 'pending';

            } else if (data.jobTitle == 'GMO-GENMAN') {

                requestStatus = 'approved';

            } else {
                appName = "AM"
                appId = approvers.amId
                appEmail = approverEmail.am_email
                nextAppId = approvers.rmId
                nextAppEmail = approverEmail.rm_email
                requestStatus = 'pending';
            }

            branchdbConnection.query(query.postRequest,
                [
                    data.idNumber, data.author, data.jobTitle,
                    data.branch, data.area, data.areaCode, data.region, data.zonecode,
                    data.purpose, data.controlNo, data.date, data.travelDate,
                    data.departureDate, data.arrivalDate, data.amount,
                    approvers.amName, approverEmail.am_email, '', '', approvers.rmName, approverEmail.rm_email, '', '', approvers.ramName, approverEmail.ram_email,
                    '', '', approvers.asstName, approverEmail.ass_email, '', '', approvers.vpoName, approverEmail.vpo_email, '', '', requestStatus
                ], (err, fields) => {
                    if (!err) {
                        if (data.jobTitle == 'GMO-GENMAN') {
                            SendEmailNotificationCashRequestorApproved(data.controlNo, data.email).then(resp => {
                                Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - SendEmailNotificationCashRequestorApproved');
                                Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${resp.accepted}, responseCode - 0`);
                                res.status(200).send({ message: response(0), resCode: 0 });

                            }).catch(err => {
                                Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - SendEmailNotificationCashRequestorApproved');
                                Logger.loggerInfo.info(`responseMesage - ${response(0)} :  ${err}, responseCode - 0`);
                                res.status(200).send({ message: 'Unable to send approved request email to the requestor', resCode: 1 });
                            })

                        } else if (data.jobTitle == 'GMO-ASTGENMAN' || data.jobTitle == 'ADM ASS SR' || data.jobTitle == "GM'S STAFF") {
                            SendEmailNotificationCashApproval(data.controlNo, appName, appEmail)
                                .then(respo => {
                                    let approvalEmailDate = updateApproverEmailDate(data.controlNo, appName);
                                    return approvalEmailDate
                                })
                                .then(updateEmailDate => {

                                    if (updateEmailDate.sqlCode === 0) {

                                        Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - updateApproverEmailDateRev');
                                        Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${updateEmailDate.result.info}, responseCode - 0`);
                                        return { result: updateEmailDate.result }

                                    } else if (updateEmailDate.sqlCode === 1) {

                                        Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - updateApproverEmailDateRev');
                                        Logger.loggerInfo.info(`responseMesage - ${response(2)}: ${updateEmailDate.message}, responseCode - 0`);
                                        return updateEmailDate.message
                                    }
                                })
                                .then(result => {
                                    Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - SendEmailNotificationCashApproval');
                                    Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                    res.status(200).send({ message: response(0), resCode: 0 });
                                })
                                .catch(err => {
                                    Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - SendEmailNotificationCashApproval');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request submitted successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                })
                        } else {

                            SendEmailNotificationCashNextApprover(data.controlNo, appName, nextAppEmail)
                                .then(resp => {
                                    SendEmailNotificationCashApproval(data.controlNo, appName, appEmail)
                                        .then(respo => {
                                            let approvalEmailDate = updateApproverEmailDate(data.controlNo, appName);
                                            return approvalEmailDate
                                        })
                                        .then(updateEmailDate => {

                                            if (updateEmailDate.sqlCode === 0) {

                                                Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - updateApproverEmailDateRev');
                                                Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${updateEmailDate.result.info}, responseCode - 0`);
                                                return { result: updateEmailDate.result }

                                            } else if (updateEmailDate.sqlCode === 1) {

                                                Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - updateApproverEmailDateRev');
                                                Logger.loggerInfo.info(`responseMesage - ${response(2)}: ${updateEmailDate.message}, responseCode - 0`);
                                                return updateEmailDate.message
                                            }
                                        })
                                        .then(result => {
                                            Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                            res.status(200).send({ message: response(0), resCode: 0 });
                                        })
                                        .catch(err => {
                                            Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - SendEmailNotificationCashApproval');
                                            Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                            res.status(200).send({ messageHeader: response(3), message: "Request submitted successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                        })

                                }).catch(err => {
                                    Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest - SendEmailNotificationCashNextApprover');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request submitted successfully but wasn't able to send notification email to the next approver.", resCode: 1 });
                                })

                        }

                    } else {
                        Logger.loggerError.addContext('context', 'OpenRequestController - postCashRequest');
                        Logger.loggerError.error(`responseMesage - ${response(3)} - ${err.message}, responseCode - 3`);
                        res.status(400).send({ message: response(3), resCode: 3 })
                    }
                })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'OpenRequestController - postCashRequest ');
            Logger.loggerFatal.fatal(`responseMesage - ${response(4)}, responseCode - 4`);
            res.send({ message: response(4), resCode: 4 })
        }
    },
    async postRfRequest(req, res) {
        let data = req.body.data;
        let approvers = req.body.approvers;

        let approverEmail = req.body.approverEmails;

        let requestStatus = '';

        let periodMonth = data.period.month;
        let periodYear = data.period.year.toString();

        let period = periodMonth + ' ' + periodYear;

        let appName = '';
        let appEmail = '';
        let nextAppEmail = '';

        try {

            if (data.jobTitle == 'AREA MANAGER') {

                appName = "RM"
                appId = approvers.rmId
                appEmail = approverEmail.rm_email
                nextAppId = approvers.ramId
                nextAppEmail = approverEmail.ram_email
                requestStatus = 'pending';

            } else if (data.jobTitle == 'REGIONAL MAN') {

                appName = "RAM"
                appId = approvers.ramId
                appEmail = approverEmail.ram_email
                nextAppId = approvers.asstId
                nextAppEmail = approverEmail.ass_email
                requestStatus = 'pending';

            } else if (data.jobTitle == 'RAM') {

                appName = "VPO Asst."
                appId = approvers.asstId
                appEmail = approverEmail.ass_email
                nextAppId = approvers.vpoId
                nextAppEmail = approverEmail.vpo_email
                requestStatus = 'pending';

            } else if (data.jobTitle == 'GMO-ASTGENMAN' || data.jobTitle == 'ADM ASS SR' || data.jobTitle == "GM'S STAFF") {

                appName = "VPO"
                appId = approvers.vpoId
                appEmail = approverEmail.vpo_email
                requestStatus = 'pending';

            } else if (data.jobTitle == 'GMO-GENMAN') {

                requestStatus = 'approved';

            } else {
                appName = "AM"
                appId = approvers.amId
                appEmail = approverEmail.am_email
                nextAppId = approvers.rmId
                nextAppEmail = approverEmail.rm_email
                requestStatus = 'pending';
            }

            branchdbConnection.query(query.postRfRequest,
                [
                    data.rfDate, data.idNumber, data.requestor, data.baseBranch, data.area, data.areaCode, data.region, data.zonecode,
                    period, data.controlNo, data.rfAllowance, data.pendingRf,
                    data.totalExpenses, data.cashOnHand, data.transpo, data.supplies,
                    data.meals, data.others, data.purpose,
                    approvers.amName, approverEmail.am_email, '', '', '', approvers.rmName, approverEmail.rm_email, '', '', '',
                    approvers.ramName, approverEmail.ram_email, '', '', '',
                    approvers.asstName, approverEmail.ass_email, '', '', '', approvers.vpoName, approverEmail.vpo_email, '', '', '', requestStatus
                ], (err, fields) => {
                    if (!err) {

                        if (data.jobTitle == 'GMO-GENMAN') {
                            SendEmailNotificationRevolvingRequestorApproved(data.controlNo, data.email).then(resp => {

                                Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest ');
                                Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${resp.accepted}, responseCode - 0`);
                                res.status(200).send({ message: response(0), resCode: 0 });

                            }).catch(err => {
                                Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest ');
                                Logger.loggerInfo.info(`responseMesage - ${response(0)} :  ${err}, responseCode - 0`);
                                res.status(200).send({ message: response(0), resCode: 0 });
                            })

                        } else if (data.jobTitle == 'GMO-ASTGENMAN' || data.jobTitle == 'ADM ASS SR' || data.jobTitle == "GM'S STAFF") {
                            SendEmailNotificationRevApproval(data.controlNo, appName, appEmail)
                                .then(respo => {

                                    let approvalEmailDate = updateApproverEmailDateRev(data.controlNo, appName);
                                    return approvalEmailDate
                                })
                                .then(updateEmailDate => {

                                    if (updateEmailDate.sqlCode === 0) {

                                        Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - updateApproverEmailDateRev');
                                        Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${updateEmailDate.result.info}, responseCode - 0`);
                                        return { result: updateEmailDate.result }
                                    } else if (updateEmailDate.sqlCode === 1) {

                                        Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - updateApproverEmailDateRev');
                                        Logger.loggerInfo.info(`responseMesage - ${response(2)}: ${updateEmailDate.message}, responseCode - 0`);

                                        return updateEmailDate.message
                                    }
                                })
                                .then(result => {
                                    Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - SendEmailNotificationRevApproval');
                                    Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                    res.status(200).send({ message: response(0), resCode: 0 });
                                })
                                .catch(err => {
                                    Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - SendEmailNotificationRevApproval');
                                    Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                    res.status(200).send({ messageHeader: response(3), message: "Request submitted successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                })
                        } else {

                            SendEmailNotificationNextRfApprover(data.controlNo, appName, nextAppEmail).then(resp => {

                                SendEmailNotificationRevApproval(data.controlNo, appName, appEmail)
                                    .then(respo => {

                                        let approvalEmailDate = updateApproverEmailDateRev(data.controlNo, appName);
                                        return approvalEmailDate
                                    })
                                    .then(updateEmailDate => {

                                        if (updateEmailDate.sqlCode === 0) {

                                            Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - updateApproverEmailDateRev');
                                            Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${updateEmailDate.result.info}, responseCode - 0`);
                                            return { result: updateEmailDate.result }
                                        } else if (updateEmailDate.sqlCode === 1) {

                                            Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - updateApproverEmailDateRev');
                                            Logger.loggerInfo.info(`responseMesage - ${response(2)}: ${updateEmailDate.message}, responseCode - 0`);

                                            return updateEmailDate.message
                                        }
                                    })
                                    .then(result => {
                                        Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - SendEmailNotificationRevApproval');
                                        Logger.loggerInfo.info(`responseMesage - ${response(0)}: ${result}, responseCode - 0`);
                                        res.status(200).send({ message: response(0), resCode: 0 });
                                    })
                                    .catch(err => {
                                        Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - SendEmailNotificationRevApproval');
                                        Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.message.sqlMessage}, responseCode - 1`);
                                        res.status(200).send({ messageHeader: response(3), message: "Request submitted successfully but wasn't able to send notification email to the approver.", resCode: 1 });
                                    })

                            }).catch(err => {
                                Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest - SendEmailNotificationNextRfApprover');
                                Logger.loggerInfo.info(`responseMesage - ${response(3)} :  ${err.accepted}, responseCode - 0`);
                                res.status(200).send({ messageHeader: response(3), message: "Request submitted successfully but wasn't able to send notification email to the next approver.", resCode: 1 });
                            })

                        }

                    } else {
                        Logger.loggerError.addContext('context', 'OpenRequestController - postRfRequest');
                        Logger.loggerError.error(`responseMesage - ${response(3)} - ${err.message}, responseCode - 2`);
                        res.status(400).send({ message: response(3), resCode: 3 })
                    }
                })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'OpenRequestController - postRfRequest ');
            Logger.loggerFatal.fatal(`responseMesage - ${response(4)}, responseCode - 3`);
            res.send({ message: response(4), resCode: 4 })
        }
    },
    getCashRequestByControlNo(req, res) {
        try {
            const approver = [];

            branchdbConnection.query(query.getRequestByControlNo, req.body.controlNo, (err, request, fields) => {
                if (!err) {
                    if (!request.length == 0) {
                        request.map(element => {
                            if (!element.area_approver == '') {
                                approver.push(
                                    {
                                        name: element.area_approver,
                                        status: element.am_status,
                                        date: element.am_date,
                                        remarks: element.am_remarks,
                                        approver: 'area_approver',
                                        position: 'Area Manager'
                                    }
                                )
                            }
                            if (!element.regional_approver == '') {
                                approver.push(
                                    {
                                        name: element.regional_approver,
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
                                        name: element.ram_approver,
                                        status: element.ram_status,
                                        date: element.ram_date,
                                        remarks: element.ram_remarks,
                                        approver: 'ram_approver',
                                        position: 'Regional Audit Manager'
                                    }
                                )
                            }
                            if (!element.ass_vpo_approver == '') {
                                approver.push(
                                    {
                                        name: element.ass_vpo_approver,
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
                                        name: element.vpo_approver,
                                        status: element.vpo_status,
                                        date: element.vpo_date,
                                        remarks: element.vpo_remarks,
                                        approver: 'vpo_approver',
                                        position: 'COO | VPO'
                                    }
                                )
                            }

                        })
                        Logger.loggerInfo.addContext('context', 'OpenRequestController - getCashRequestByControlNo ');
                        Logger.loggerInfo.info(`responseMesage - ${response(0)}, responseCode - 0`);
                        res.status(200).send({ request: request, approvers: approver });
                    } else {
                        Logger.loggerInfo.addContext('context', 'OpenRequestController - getCashRequestByControlNo ');
                        Logger.loggerInfo.info(`responseMesage - ${response(1)}, responseCode - 1`);
                        res.status(404).send({ request: request, approvers: approver })
                    }
                } else {
                    Logger.loggerError.addContext('context', 'OpenRequestController - getCashRequestByControlNo');
                    Logger.loggerError.error(`responseMesage - ${response(2)}, responseCode - 2`);
                    res.status(400).send({ message: response(2), resCode: 2 })

                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'OpenRequestController - getCashRequestByControlNo ');
            Logger.loggerFatal.fatal(`responseMesage - ${response(3)}, responseCode - 3`);
            res.status(500).send({ message: response(3), resCode: 3 })
        }

    },
    getRfRequestByControlNo(req, res) {
        try {
            const approver = [];

            branchdbConnection.query(query.getRfRequestByControlNo, req.body.controlNo, (err, request, fields) => {
                if (!err) {
                    if (!request.length == 0) {
                        request.map(element => {
                            if (!element.am_approver == '') {
                                approver.push(
                                    {
                                        name: element.am_approver,
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
                                        name: element.rm_approver,
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
                                        name: element.ram_approver,
                                        status: element.ram_status,
                                        date: element.ram_date,
                                        remarks: element.ram_remarks,
                                        approver: 'ram_approver',
                                        position: 'Regional Audit Manager'
                                    }
                                )
                            }
                            if (!element.ass_vpo_approver == '') {
                                approver.push(
                                    {
                                        name: element.ass_vpo_approver,
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
                                        name: element.vpo_approver,
                                        status: element.vpo_status,
                                        date: element.vpo_date,
                                        remarks: element.vpo_remarks,
                                        approver: 'vpo_approver',
                                        position: 'COO | VPO'
                                    }
                                )
                            }

                        })
                        Logger.loggerInfo.addContext('context', 'OpenRequestController - getRfRequestByControlNo ');
                        Logger.loggerInfo.info(`responseMesage - ${response(0)}, responseCode - 0`);
                        res.status(200).send({ request: request, approvers: approver });
                    } else {
                        Logger.loggerInfo.addContext('context', 'OpenRequestController - getRfRequestByControlNo ');
                        Logger.loggerInfo.info(`responseMesage - ${response(1)}, responseCode - 1`);
                        res.status(404).send({ request: request, approvers: approver })
                    }
                } else {
                    Logger.loggerError.addContext('context', 'OpenRequestController - getRfRequestByControlNo');
                    Logger.loggerError.error(`responseMesage - ${response(2)}, responseCode - 2`);
                    res.status(400).send({ message: response(2), resCode: 2 })

                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'OpenRequestController - getRfRequestByControlNo ');
            Logger.loggerFatal.fatal(`responseMesage - ${response(3)}, responseCode - 3`);
            res.status(500).send({ message: response(3), resCode: 3 })
        }
    },
    getAllRequestsCash(req, res) {
        const requests = [];
        try {
            branchdbConnection.query(query.getAllRequestsCa, [req.body.idNumber, req.body.status], (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        for (let index = 0; index < rows.length; index++) {
                            const element = rows[index];

                            //USER IS AN APPROVER
                            if (req.body.IsApprover) {
                                //APPROVED STATUS
                                if (req.body.status == "approved") {
                                    let AppValCash = getAppValCashApprover(element, 'approved')
                                    requests.push([element, AppValCash])
                                }
                                //DISAPPROVED STATUS
                                else if (req.body.status == "disapproved") {

                                    let AppValCash = getAppValCashApprover(element, 'disapproved')
                                    requests.push([element, AppValCash])
                                }
                                //PENDING STATUS
                                else {
                                    let AppValCash = getAppValCashApprover(element, 'approved')
                                    requests.push([element, AppValCash])
                                }
                            }
                            //USER IS NOT AN APPROVER
                            else {
                                //APPROVED STATUS
                                if (req.body.status == "approved") {

                                    let AppValCash = getAppValCash(element, 'approved')

                                    requests.push([element, AppValCash])

                                }
                                //DISAPPROVED STATUS
                                else if (req.body.status == "disapproved") {

                                    let AppValCash = getAppValCash(element, 'disapproved')

                                    requests.push([element, AppValCash])

                                }
                                //PENDING STATUS
                                else {

                                    let AppValCash = getAppValCash(element, 'approved')

                                    requests.push([element, AppValCash])
                                }
                            }
                        }
                        Logger.loggerInfo.addContext('context', 'getAllRequestsCash')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send({ request: requests })
                    } else {
                        Logger.loggerInfo.addContext('context', 'getAllRequestsCash - No data found')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send({ request: requests })
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
    getAllRequestsRevFund(req, res) {
        const requests = [];

        try {
            branchdbConnection.query(query.getAllRequestsRf, [req.body.idNumber, req.body.status], (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        for (let index = 0; index < rows.length; index++) {
                            const element = rows[index];

                            //USER IS AN APPROVER
                            if (req.body.IsApprover) {
                                //REQ STATUS APPROVED
                                if (req.body.status == "approved") {

                                    let AppValRev = getAppValRevApprover(element, 'approved')
                                    requests.push([element, AppValRev])

                                }
                                //REQ STATUS DISAPPROVED
                                else if (req.body.status == "disapproved") {

                                    let AppValRev = getAppValRevApprover(element, 'disapproved')
                                    requests.push([element, AppValRev])

                                }
                                //REQ STATUS PENDING
                                else {

                                    let AppValRev = getAppValRevApprover(element, 'approved')
                                    requests.push([element, AppValRev])

                                }
                            }
                            //USER IS NOT AN APPROVER
                            else {
                                //REQ STATUS APPROVED
                                if (req.body.status == "approved") {

                                    let AppValRev = getAppValRev(element, 'approved')
                                    requests.push([element, AppValRev])

                                }
                                //REQ STATUS DISAPPROVED
                                else if (req.body.status == "disapproved") {

                                    let AppValRev = getAppValRev(element, 'disapproved')
                                    requests.push([element, AppValRev])

                                }
                                //REQ STATUS PENDING
                                else {
                                    let AppValRev = getAppValRev(element, 'approved')
                                    requests.push([element, AppValRev])
                                }
                            }
                        }
                        Logger.loggerInfo.addContext('context', 'getAllRequestsRevFund')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send({ request: requests })
                    } else {
                        Logger.loggerInfo.addContext('context', 'getAllRequestsRevFund - No data found')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send({ request: requests })
                    }
                } else {
                    Logger.loggerError.addContext('context', 'getAllRequestsRevFund')
                    Logger.loggerError.error(`Error : ${JSON.stringify(err)}`)
                    res.send({ message: 'Error retrieving requests' })
                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'getAllRequestsRevFund');
            Logger.loggerFatal.fatal(`Error : ${JSON.stringify(error)}`)
            res.send(error)
        }
    },
    getAllRequestsForApprovalCash(req, res) {
        const fullname = req.body.fullname;
        const status = req.body.status;
        const approver = req.body.approver;

        try {
            let data = []
            let request = []

            branchdbConnection.query(`
                SELECT ca.id AS id, ca.idNumber AS idNumber, ca.author AS author, ca.jobTitle AS jobTitle, ca.branch AS branch, ca.area AS AREA ,
                ca.region AS region, ca.zonecode AS zonecode, ca.purpose AS purpose, ca.controlNo AS controlNo, ca.date AS date, ca.travelDate AS travelDate,
                ca.departureDate AS departureDate, ca.arrivalDate AS arrivalDate, ca.amount AS amount, ca.area_approver AS area_approver, 
                ca.am_status AS am_status,ca.am_date AS am_date, ca.am_remarks AS am_remarks,ca.regional_approver AS regional_approver, 
                ca.rm_status AS rm_status,ca.rm_date AS rm_date, ca.rm_remarks AS rm_remarks, ca.ram_approver AS ram_approver, 
                ca.ram_status AS ram_status,ca.ram_date AS ram_date, ca.ram_remarks AS ram_remarks, ca.ass_vpo_approver AS ass_vpo_approver,
                ca.ass_status AS ass_status,ca.ass_date AS ass_date, ca.ass_remarks AS ass_remarks, ca.vpo_approver AS vpo_approver, 
                ca.vpo_status AS vpo_status,ca.vpo_date AS vpo_date, ca.vpo_remarks AS vpo_remarks, ca.request_status AS request_status
                FROM cash_advance_request ca 
                WHERE ${approver} = '${fullname}' AND request_status = 'pending' AND ${status} = ''`, (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        if (approver === 'area_approver') {

                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];

                                let AppValCash = getAppValCash(element, 'approved')
                                request.push([element, AppValCash])
                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - area_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${rows.length}`)
                        } else if (approver === 'regional_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];

                                if (element.am_status == 'approved' || element.area_approver == null || element.area_approver == '') {
                                    // data.push(element)
                                    let AppValCash = getAppValCash(element, 'approved')
                                    request.push([element, AppValCash])
                                }

                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - regional_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'ram_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.rm_status == 'approved' || element.regional_approver == null || element.regional_approver == '') {
                                    // data.push(element)
                                    let AppValCash = getAppValCashApprover(element, 'approved')
                                    request.push([element, AppValCash])
                                }

                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - ram_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'ass_vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ram_status == 'approved' || element.ram_approver == null || element.ram_approver == '') {
                                    // data.push(element)
                                    let AppValCash = getAppValCashApprover(element, 'approved')
                                    request.push([element, AppValCash])
                                }

                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - ass_vpo_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ass_status == 'approved' || element.ass_vpo_approver == null || element.ass_vpo_approver == '') {
                                    // data.push(element)
                                    let AppValCash = getAppValCashApprover(element, 'approved')
                                    request.push([element, AppValCash])
                                }

                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - vpo_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        }

                    } else {
                        res.send({ request: request })
                        Logger.loggerInfo.addContext('context', `getAllRequestsForApprovalCash - ${approver}`)
                        Logger.loggerInfo.info(`No Data Retrieved : ${data.length}`)
                    }
                } else {
                    res.send({ message: 'Error retrieving requests' })
                    Logger.loggerError.addContext('context', `getAllRequestsForApprovalCash - ${approver}`)
                    Logger.loggerError.error(`responseMesage - ${response(2)}, responseCode - 2`)
                }
            })
        } catch (error) {
            res.send(error)
            Logger.loggerError.addContext('context', `getAllRequestsForApprovalCash - ${approver}`)
            Logger.loggerError.error(`responseMesage - ${response(3)}, responseCode - 3`)
        }
    },
    getAllRequestsForApprovalRevolving(req, res) {
        const fullname = req.body.fullname;
        const status = req.body.status;
        const approver = req.body.approver;


        try {
            let data = []
            let request = []

            branchdbConnection.query(`
            SELECT rf.id AS id, rf.idNumber AS idNumber, rf.rfDate AS date, rf.requestor AS requestor, rf.baseBranch AS branch, 
            rf.region AS region, rf.controlNo AS controlNo, rf.totalExpenses AS total, rf.cashOnHand AS cashOnHand, 
            rf.zonecode AS zonecode, rf.am_approver AS am_approver, rf.am_status AS am_status, 
            rf.rm_approver AS rm_approver, rf.rm_status AS rm_status,
            rf.ram_approver AS ram_approver, rf.ram_status AS ram_status, 
            rf.ass_vpo_approver AS ass_vpo_approver,rf.ass_status AS ass_status,
            rf.vpo_approver AS vpo_approver, rf.vpo_status AS vpo_status,
            rf.request_status AS request_status
            FROM revolving_fund_request rf 
            WHERE ${approver} = '${fullname}' AND request_status = 'pending' AND ${status} = ''`, (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        if (approver === 'am_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];

                                let AppValRev = getAppValRev(element, 'approved')
                                request.push([element, AppValRev])
                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - am_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${rows.length}`)
                        } else if (approver === 'rm_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];

                                if (element.am_status == 'approved' || element.am_approver == null || element.am_approver == '') {
                                    // data.push(element)
                                    let AppValRev = getAppValRev(element, 'approved')
                                    request.push([element, AppValRev])
                                }

                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - rm_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'ram_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.rm_status == 'approved' || element.rm_approver == null || element.rm_approver == '') {
                                    // data.push(element)
                                    let AppValRev = getAppValRevApprover(element, 'approved')
                                    request.push([element, AppValRev])
                                }
                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - ram_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'ass_vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ram_status == 'approved' || element.ram_approver == null || element.ram_approver == '') {
                                    // data.push(element)
                                    let AppValRev = getAppValRevApprover(element, 'approved')
                                    request.push([element, AppValRev])
                                }
                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - ass_vpo_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ass_status == 'approved' || element.ass_vpo_approver == null || element.ass_vpo_approver == '') {
                                    // data.push(element)
                                    let AppValRev = getAppValRevApprover(element, 'approved')
                                    request.push([element, AppValRev])
                                }
                            }
                            res.send({ request: request })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - vpo_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        }
                    } else {
                        res.send({ request: request })
                        Logger.loggerInfo.addContext('context', `getAllRequestsForApprovalRevolving - ${approver}`)
                        Logger.loggerInfo.info(`No Data Retrieved : ${data.length}`)
                    }
                } else {
                    res.send({ message: 'Error retrieving requests' })
                    Logger.loggerError.addContext('context', `getAllRequestsForApprovalRevolving - ${approver}`)
                    Logger.loggerError.error(`responseMesage - ${response(2)}, responseCode - 2`)
                }
            })
        } catch (error) {
            res.send(error)
            Logger.loggerError.addContext('context', `getAllRequestsForApprovalRevolving - ${approver}`)
            Logger.loggerError.error(`responseMesage - ${response(3)}, responseCode - 3`)
        }
    },
    updateRequestCashDetails(req, res) {
        try {

            let data = req.body;

            let updateQuery = `UPDATE cash_advance_request 
            SET amount = '${data.amount}', arrivalDate = '${data.arrivalDate}', departureDate = '${data.departureDate}', travelDate = '${data.travelDate}', purpose = '${data.purpose}'
            WHERE controlNo = '${data.controlNo}'`

            branchdbConnection.query(updateQuery, (err, fields) => {
                if (!err) {
                    res.status(200).send({ message: response(0), resCode: 0 });
                    Logger.loggerInfo.addContext('context', `CASH ADVANCE UPDATED - updateRequestCashDetails - `);
                    Logger.loggerInfo.info(`Request Updated - ${data.controlNo}`);
                } else {
                    res.status(400).send({ message: response(2), resCode: 2 });
                    Logger.loggerError.addContext('context', `CASH ADVANCE UPDATED - updateRequestCashDetails - `);
                    Logger.loggerError.error(`Failed to Update Request - ${err}`);
                }
            })
        } catch (error) {
            res.send(error)
            Logger.loggerError.addContext('context', `updateRequestCashDetails - ${data.controlNo}`)
            Logger.loggerError.error(`responseMesage - ${response(3)}, responseCode - 3`)
        }
    },
    updateRequestRevolvingDetails(req, res) {
        try {

            let data = req.body;

            let periodMonth = data.period.month;
            let periodYear = data.period.year.toString();

            let period = periodMonth + ' ' + periodYear;

            let updateQuery = `UPDATE revolving_fund_request 
            SET period = '${period}', rfAllowance = '${data.rfAllowance}', pendingRf = '${data.pendingRf}', 
            cashOnHand = '${data.cashOnHand}', transportation = '${data.transpo}', 
            officeSupplies = '${data.officeSupplies}', meals = '${data.meals}', others = '${data.others}', 
            totalExpenses = '${data.total}', purpose = '${data.purpose}'
            WHERE controlNo = '${data.controlNo}'`

            branchdbConnection.query(updateQuery, (err, fields) => {
                if (!err) {
                    res.status(200).send({ message: response(0), resCode: 0 });
                    Logger.loggerInfo.addContext('context', `REVOLVING FUND UPDATED - updateRequestRevolvingDetails - `);
                    Logger.loggerInfo.info(`Request Updated - ${data.controlNo}`);
                } else {
                    res.status(400).send({ message: response(2), resCode: 2 });
                    Logger.loggerError.addContext('context', `REVOLVING FUND UPDATED - updateRequestRevolvingDetails - `);
                    Logger.loggerError.error(`Failed to Update Request - ${err}`);
                }
            })
        } catch (error) {
            res.send(error)
            Logger.loggerError.addContext('context', `updateRequestRevolvingDetails - ${data.controlNo}`)
            Logger.loggerError.error(`responseMesage - ${response(3)}, responseCode - 3`)
        }
    },
    cancelCashRequest(req, res) {
        let controlno = req.body.controlNo
        let duration = req.body.duration

        try {
            branchdbConnection.query(`UPDATE cash_advance_request SET request_status = 'cancelled', duration = '${duration}' 
            WHERE controlNo = '${controlno}'`, (err, result, fields) => {
                if (!err) {
                    res.send({ message: 'Successfully cancelled' })
                    Logger.loggerInfo.addContext('context', `CASH ADVANCE CANCELLED - cancelCashRequest - `);
                    Logger.loggerInfo.info(`Request Cancelled - ${controlno}`)
                } else {
                    res.send({ message: 'Cancellation failed. Please refresh page' })
                    Logger.loggerError.addContext('context', 'CASH ADVANCE CANCELLED - cancelCashRequest -  ');
                    Logger.loggerError.error(`Failed to cancel request ${controlno}`);
                }
            })
        } catch (error) {
            res.send({ message: 'Network Error' })
            Logger.loggerFatal.addContext('context', 'CASH ADVANCE CANCELLATION - cancelCashRequest - ');
            Logger.loggerFatal.fatal(`responseMesage - ${response(3)}, responseCode - 3`);
        }
    },
    cancelRevRequest(req, res) {
        let controlno = req.body.controlNo
        let duration = req.body.duration

        try {
            branchdbConnection.query(`UPDATE revolving_fund_request SET request_status = 'cancelled', duration = '${duration}'  
            WHERE controlNo = '${controlno}'`, (err, result, fields) => {

                if (!err) {
                    res.send({ message: 'Successfully cancelled' })
                    Logger.loggerInfo.addContext('context', `REVOLVING FUND CANCELLED - cancelRevRequest - `);
                    Logger.loggerInfo.info(`Request Cancelled - ${controlno}`)
                } else {
                    res.send({ message: 'Cancellation failed. Please refresh page' });
                    Logger.loggerError.addContext('context', 'REVOLVING FUND CANCELLED - cancelRevRequest -  ');
                    Logger.loggerError.error(`Failed to cancel request ${controlno}`);
                }
            })
        } catch (error) {
            res.send({ message: 'Network Error' });
            Logger.loggerFatal.addContext('context', 'REVOLVING FUND CANCELLATION - cancelRevRequest - ');
            Logger.loggerFatal.fatal(`responseMesage - ${response(3)}, responseCode - 3`);
        }
    }


}