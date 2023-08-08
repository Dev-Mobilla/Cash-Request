const { getRequestByControlNo, getRfRequestByControlNo } = require('./getRequestsDBQuery');
const response = require('./resonseCodeMessages');
const Logger = require('../logs/logger')

module.exports = {
    
    async getPendingRequestForm(req, res) {

        try {

            let approver = []
            let controlno = req.body.controlNo
            // let controlno = req.params.controlNo
    
            let getRequest = await getRequestByControlNo(controlno);

            if (!getRequest.request.length == 0) {

                let reqDate = getRequest.request[0].date

                let dateInstance = new Date(reqDate)
                let date = dateInstance.getFullYear().toString() + '-' + (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + dateInstance.getDate()).slice(-2).toString();
                
                getRequest.request[0].cashdate = date

                getRequest.request.map(element => {
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
                res.render('pending_form', {
                    request: getRequest.request[0],
                    approvers: approver,
                    year:  new Date().getFullYear()
                });
                Logger.loggerInfo.addContext('context', `GetFormViewController - getPendingRequestForm -`);
                Logger.loggerInfo.info(`Response: ${response(0)} - SqlCod: ${getRequest.sqlCode} , Message: View Rendered Successfully - Control No: ${controlno} `)
            }else{
                res.render('errorPage', {
                    messageHeader: response(1),
                    message: 'Request Not Found',
                    year:  new Date().getFullYear()
                });
                Logger.loggerInfo.addContext('context', `GetFormViewController - getPendingRequestForm -`);
                Logger.loggerInfo.info(`Response: ${response(1)} - SqlCod: ${getRequest.sqlCode} , Message: Request Not Found - Control No: ${controlno} `)
            }
        } catch (error) {
            Logger.loggerError.addContext('context', `GetFormViewController - getPendingRequestForm -`);
            Logger.loggerError.error(`Response: ${response(3)}, Message: Something went wrong with the server - ${error}`)
            res.render('errorPage', {
                messageHeader: response(3),
                message: 'Something went wrong',
                year:  new Date().getFullYear()
            });
        }
    },
    async getRfPendingRequestForm(req, res) {

        try {

            let approver = []
            let controlno = req.body.controlNo
            // let controlno = req.params.controlNo
            
            let getRequest = await getRfRequestByControlNo(controlno);
            
            if (!getRequest.request.length == 0) {
                let reqDate = getRequest.request[0].rfDate

                let dateInstance = new Date(reqDate)
                let date = dateInstance.getFullYear().toString() + '-' + (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + dateInstance.getDate()).slice(-2).toString();
                
                getRequest.request[0].date = date

                getRequest.request.map(element => {
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
                res.render('pendingRf_form', {
                    request: getRequest.request[0],
                    approvers: approver,
                    year:  new Date().getFullYear()
                });
                Logger.loggerInfo.addContext('context', `GetFormViewController - getRfPendingRequestForm -`);
                Logger.loggerInfo.info(`Response: ${response(0)} - SqlCod: ${getRequest.sqlCode} , Message: View Rendered Successfully - Control No: ${controlno} `)
            }else{
                res.render('errorPage', {
                    messageHeader: response(1),
                    message: 'Request Not Found',
                    year:  new Date().getFullYear()
                });
                Logger.loggerInfo.addContext('context', `GetFormViewController - getRfPendingRequestForm -`);
                Logger.loggerInfo.info(`Response: ${response(1)} - SqlCod: ${getRequest.sqlCode} , Message: Request Not Found - Control No: ${controlno} `)
            }
        } catch (error) {
            res.render('errorPage', {
                messageHeader: response(3),
                message: 'Something went wrong',
                year:  new Date().getFullYear()
            });
            Logger.loggerError.addContext('context', `GetFormViewController - getRfPendingRequestForm -`);
            Logger.loggerError.error(`Response: ${response(3)}, Message: Something went wrong with the server - ${error.message}`)
        }
    }
}