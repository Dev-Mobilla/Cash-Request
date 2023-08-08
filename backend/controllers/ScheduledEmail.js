const { approverToFllwUpApprover, approverToFllwUp, approverToFllwUpApprover_Revolving, approverToFllwUp_Revolving } = require("./ConditionalVariableController");
const { getAllRequestsCaEmail, getAllRequestsRf_Email } = require("./getRequestsDBQuery");
const { SendEmailNotificationCashFollwup } = require('./EmailController')
const Logger = require('../logs/logger');

module.exports = {
    async CashRequestForEmailFollowUp() {

        let reqStatus = 'pending'

        try {
            let getAllRequestsCa = getAllRequestsCaEmail(reqStatus)

            getAllRequestsCa
                .then(getRequestCa => {

                    if (getRequestCa.sqlCode === 0) {

                        return { request: getRequestCa.request }

                    } else if (getRequestCa.sqlCode === 1) {

                        return getRequestCa.message

                    }
                })
                .then(getApproverToFollwUp => {
                    let request = getApproverToFollwUp.request

                    if (request.length == 0) {

                        // res.send({ request: request })
                        Logger.loggerInfo.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - `))
                        Logger.loggerInfo.info(`No request - ${request}`)


                    } else {
                        let isApproverArr = [];
                        let isNotApproverArr = [];

                        for (let index = 0; index < request.length; index++) {
                            const element = request[index];

                            let jobTitle = element.jobTitle

                            if (jobTitle == 'AREA MANAGER' || jobTitle == 'REGIONAL MAN' || jobTitle == 'RAM' || jobTitle == 'GMO-ASTGENMAN' || jobTitle == 'ADM ASS SR' || jobTitle == "GM'S STAFF" || jobTitle == 'GMO-GENMAN') {

                                isApproverArr.push(element);

                            } else {

                                isNotApproverArr.push(element)
                            }
                        }

                        return { request: { isApproverArr: isApproverArr, isNotApproverArr: isNotApproverArr } }
                    }
                })
                .then(sendFollowUpEmail => {
                    let request = []
                    let toFollowUp = []

                    let approvers = approverToFllwUpApprover(sendFollowUpEmail.request.isApproverArr)

                    request.push(approvers)

                    let notApprovers = approverToFllwUp(sendFollowUpEmail.request.isNotApproverArr)

                    request.push(notApprovers)

                    for (let index = 0; index < request.length; index++) {
                        // const resp = request[index][0];
                        const resp = request[index];

                        for (let i = 0; i < resp.length; i++) {
                            const element = resp[i][0];

                            let resDate = element.date

                            if (resDate !== null) {

                                let dateInstance = new Date();

                                let requestDate = new Date(resDate);

                                let diffTime = Math.abs(dateInstance.valueOf() - requestDate.valueOf());

                                let days = diffTime / (24 * 60 * 60 * 1000);

                                let hours = (days % 1) * 24;
                                // let minutes = (hours % 1) * 60;

                                let MathFloorDays = Math.floor(days)
                                // let MathFloorMin = Math.floor(minutes)
                                // let MathFloorHour = Math.floor(hours)

                                Logger.loggerInfo.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - `))
                                Logger.loggerInfo.info(`Request to follow up - Control No: ${element.controlNo}, Duration: ${MathFloorDays}, Day on Date: ${dateInstance.getDay}`)
                                
                                if (MathFloorDays % 3 == 0 && MathFloorDays != 0) {

                                    Logger.loggerInfo.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - `))
                                    Logger.loggerInfo.info(`Request to follow up - Control No: ${element.controlNo}, Duration: ${MathFloorDays}`)
                                    toFollowUp.push(element)

                                }
                                else {
                                    Logger.loggerInfo.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - `))
                                    Logger.loggerInfo.info(`No request to follow up - Control No: ${element.controlNo}, Duration: ${MathFloorDays}`)
                                    
                                }
                            }
                        }

                    };
                    return { req: toFollowUp }

                })
                .then(approver => {

                    let toFollowUp = approver.req

                    for (let index = 0; index < toFollowUp.length; index++) {
                        const element = toFollowUp[index];

                        if (element.email == null) {

                            Logger.loggerInfo.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - SendEmailNotificationCashFollwup`))
                            Logger.loggerInfo.info(`NULL EMAIL - : No request to follow up - Control No: ${element.controlNo}, Email: ${element.email}`)

                        } else {
                            SendEmailNotificationCashFollwup(element.controlNo, element.email).then(resp => {

                                if (!resp.accepted.length == 0) {

                                    Logger.loggerInfo.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - SendEmailNotificationCashFollwup`))
                                    Logger.loggerInfo.info(`SUCCESS - Follow up sent - Control No: ${element.controlNo}, Email: ${element.email}`)

                                } else {
                                    Logger.loggerInfo.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - SendEmailNotificationCashFollwup`))
                                    Logger.loggerInfo.info(`Follow up not sent - Control No: ${element.controlNo}, Email: ${element.email}`)
                                }
                            }).catch(err => {
                                Logger.loggerError.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - SendEmailNotificationCashFollwup`))
                                Logger.loggerError.error(`ERR - ${err}: Follow up error - Control No: ${element.controlNo}, Email: ${element.email}`)
                            })
                        }

                    }

                })
                .catch(err => {
                    Logger.loggerError.addContext(('context', `OpenRequestController - requestForEmailFollowUpD`))
                    Logger.loggerError.error(`Err - ${err}: Follow up error`)
                })

        } catch (error) {
            Logger.loggerFatal.addContext(('context', `OpenRequestController - requestForEmailFollowUpD`))
            Logger.loggerFatal.fatal(`Error - ${error}: Follow up error`)
        }
    },
    async RevolvingRequestForEmailFollowUp() {

        let reqStatus = 'pending'

        try {
            let getAllRequestsRf = getAllRequestsRf_Email(reqStatus)

            getAllRequestsRf
                .then(getRequestRf => {

                    if (getRequestRf.sqlCode === 0) {

                        return { request: getRequestRf.request }

                    } else if (getRequestRf.sqlCode === 1) {

                        return getRequestRf.message

                    }
                })
                .then(getApproverToFollwUp => {
                    let request = getApproverToFollwUp.request

                    if (request.length == 0) {

                        // res.send({ request: request })
                        Logger.loggerInfo.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp - `))
                        Logger.loggerInfo.info(`No request - ${request}`)


                    } else {
                        let isApproverArr = [];
                        let isNotApproverArr = [];

                        for (let index = 0; index < request.length; index++) {
                            const element = request[index];

                            let jobTitle = element.jobTitle

                            if (jobTitle == 'AREA MANAGER' || jobTitle == 'REGIONAL MAN' || jobTitle == 'RAM' || jobTitle == 'GMO-ASTGENMAN' || jobTitle == 'ADM ASS SR' || jobTitle == "GM'S STAFF" || jobTitle == 'GMO-GENMAN') {

                                isApproverArr.push(element);

                            } else {

                                isNotApproverArr.push(element)
                            }
                        }

                        return { request: { isApproverArr: isApproverArr, isNotApproverArr: isNotApproverArr } }
                    }
                })
                .then(sendFollowUpEmail => {
                    let request = []
                    let toFollowUp = []

                    let approvers = approverToFllwUpApprover_Revolving(sendFollowUpEmail.request.isApproverArr)

                    request.push(approvers)

                    let notApprovers = approverToFllwUp_Revolving(sendFollowUpEmail.request.isNotApproverArr)

                    request.push(notApprovers)

                    for (let index = 0; index < request.length; index++) {
                        // const resp = request[index][0];
                        const resp = request[index];

                        for (let i = 0; i < resp.length; i++) {
                            const element = resp[i][0];

                            let resDate = element.date

                            if (resDate !== null) {

                                let dateInstance = new Date();

                                let requestDate = new Date(resDate);

                                let diffTime = Math.abs(dateInstance.valueOf() - requestDate.valueOf());

                                let days = diffTime / (24 * 60 * 60 * 1000);

                                let hours = (days % 1) * 24;
                                let minutes = (hours % 1) * 60;

                                let MathFloorDays = Math.floor(days)

                                Logger.loggerInfo.addContext(('context', `OpenRequestController - requestForEmailFollowUpD - `))
                                Logger.loggerInfo.info(`Request to follow up - Control No: ${element.controlNo}, Duration: ${MathFloorDays}, Day on Date: ${dateInstance.getDay}`)

                                if (MathFloorDays % 3 == 0 && MathFloorDays != 0) {

                                    Logger.loggerInfo.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp - `))
                                    Logger.loggerInfo.info(`Request to follow up - Control No: ${element.controlNo}, Duration: ${MathFloorDays}`)
                                    toFollowUp.push(element)

                                }
                                else {
                                    Logger.loggerInfo.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp - `))
                                    Logger.loggerInfo.info(`No request to follow up - Control No: ${element.controlNo}, Duration: ${MathFloorDays}`)
                                    // return { req: [] }
                                }
                            }
                        }

                    };
                    return { req: toFollowUp }

                })
                .then(approver => {

                    let toFollowUp = approver.req

                    for (let index = 0; index < toFollowUp.length; index++) {
                        const element = toFollowUp[index];

                        if (element.email == null) {

                            Logger.loggerInfo.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp - SendEmailNotificationCashFollwup`))
                            Logger.loggerInfo.info(`NULL EMAIL - : No request to follow up - Control No: ${element.controlNo}, Email: ${element.email}`)

                        } else {
                            SendEmailNotificationCashFollwup(element.controlNo, element.email).then(resp => {

                                if (!resp.accepted.length == 0) {

                                    Logger.loggerInfo.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp - SendEmailNotificationCashFollwup`))
                                    Logger.loggerInfo.info(`SUCCESS - Follow up sent - Control No: ${element.controlNo}, Email: ${element.email}`)

                                } else {
                                    Logger.loggerInfo.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp - SendEmailNotificationCashFollwup`))
                                    Logger.loggerInfo.info(`Follow up not sent - Control No: ${element.controlNo}, Email: ${element.email}`)
                                }
                            }).catch(err => {
                                Logger.loggerError.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp - SendEmailNotificationCashFollwup`))
                                Logger.loggerError.error(`ERR - ${err}: Follow up error - Control No: ${element.controlNo}, Email: ${element.email}`)
                            })
                        }

                    }

                })
                .catch(err => {
                    Logger.loggerError.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp`))
                    Logger.loggerError.error(`Err - ${err}: Follow up error`)
                })

        } catch (error) {
            Logger.loggerFatal.addContext(('context', `OpenRequestController - RevolvingRequestForEmailFollowUp`))
            Logger.loggerFatal.fatal(`Error - ${error}: Follow up error`)
        }
    },
}