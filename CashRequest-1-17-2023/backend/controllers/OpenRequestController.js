const dotenv = require('dotenv');
dotenv.config();
const branchdbConnection = require('../config/branchDBConnection');
const query = require('../config/queries');
const Logger = require('../logs/logger');
const response = require('./resonseCodeMessages');

const vpo_status = (controlNo, requestType) => {
    let dateInstance = new Date();
    let date = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString() + "/" + ("0" + dateInstance.getDate()).slice(-2).toString() + "/" + dateInstance.getFullYear().toString();
    let time = dateInstance.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let dateTime = `${date} | ${time}`;
    let vpoQuery = '';

    if (requestType == 'cashAdvance') {

        vpoQuery = `UPDATE cash_advance_request 
                SET vpo_status = 'approved', vpo_remarks = '', vpo_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

    } else if (requestType == 'revolvingFund') {
        vpoQuery = `UPDATE revolving_fund_request 
                SET vpo_status = 'approved', vpo_remarks = '', vpo_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`
    }


    branchdbConnection.query(vpoQuery, (err, fields) => {
        if (!err) {
            Logger.loggerInfo.addContext('context', `${requestType.toUpperCase()} APPROVED - updateVpoStatus - `);
            Logger.loggerInfo.info(`Approver Status Updated - vpo_approver`);
            return response(0)
        } else {
            Logger.loggerInfo.addContext('context', `${requestType.toUpperCase()} APPROVED - updateVpoStatus - `);
            Logger.loggerInfo.info(`Failed to Update Status - vpo_approver`);
            return response(2)
        }
    })
}

module.exports = {

    async postCashRequest(req, res) {
        let data = req.body.data;
        let approvers = req.body.approvers;
        let requestStatus = '';

        try {

            if (data.jobTitle == 'GMO-GENMAN') {

                requestStatus = 'approved';

            } else {

                requestStatus = 'pending';

            }
            branchdbConnection.query(query.postRequest,
                [
                    data.idNumber, data.author, data.jobTitle,
                    data.branch, data.area, data.region, data.zonecode,
                    data.purpose, data.controlNo, data.date, data.travelDate,
                    data.departureDate, data.arrivalDate, data.amount,
                    approvers.amName, '', '', approvers.rmName, '', '', approvers.ramName,
                    '', '', approvers.asstName, '', '', approvers.vpoName, '', '', requestStatus
                ], (err, fields) => {
                    if (!err) {

                        Logger.loggerInfo.addContext('context', 'OpenRequestController - postCashRequest ');
                        Logger.loggerInfo.info(`responseMesage - ${response(0)}, responseCode - 0`);
                        res.status(200).send({ message: response(0), resCode: 0 });

                    } else {
                        Logger.loggerError.addContext('context', 'OpenRequestController - postCashRequest');
                        Logger.loggerError.error(`responseMesage - ${response(2)}, responseCode - 2`);
                        res.status(400).send({ message: response(2), resCode: 2 })
                    }
                })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'OpenRequestController - postCashRequest ');
            Logger.loggerFatal.fatal(`responseMesage - ${response(3)}, responseCode - 3`);
            res.status(500).send({ message: response(3), resCode: 3 })
        }
    },
    async postRfRequest(req, res) {
        let data = req.body.data;
        let approvers = req.body.approvers;
        let requestStatus = '';

        try {

            if (data.jobTitle == 'GMO-GENMAN') {

                requestStatus = 'approved';

            } else {

                requestStatus = 'pending';

            }

            branchdbConnection.query(query.postRfRequest,
                [
                    data.rfDate, data.idNumber, data.requestor, data.baseBranch, data.region, data.zonecode,
                    data.period, data.controlNo, data.rfAllowance, data.pendingRf,
                    data.totalExpenses, data.cashOnHand, data.transpo, data.supplies,
                    data.meals, data.others, data.purpose,
                    approvers.amName, '', '', approvers.rmName, '', '', approvers.ramName, '', '',
                    approvers.asstName, '', '', approvers.vpoName, '', '', requestStatus
                ], (err, fields) => {
                    if (!err) {

                        Logger.loggerInfo.addContext('context', 'OpenRequestController - postRfRequest ');
                        Logger.loggerInfo.info(`responseMesage - ${response(0)}, responseCode - 0`);
                        res.status(200).send({ message: response(0), resCode: 0 });

                    } else {
                        Logger.loggerError.addContext('context', 'OpenRequestController - postRfRequest');
                        Logger.loggerError.error(`responseMesage - ${response(2)}, responseCode - 2`);
                        res.status(400).send({ message: response(2), resCode: 2 })
                    }
                })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'OpenRequestController - postRequest ');
            Logger.loggerFatal.fatal(`responseMesage - ${response(3)}, responseCode - 3`);
            res.status(500).send({ message: response(3), resCode: 3 })
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

        try {
            branchdbConnection.query(query.getAllRequestsCa, [req.body.idNumber, req.body.status], (err, rows, fields) => {
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
    getAllRequestsRevFund(req, res) {
        try {
            branchdbConnection.query(query.getAllRequestsRf, [req.body.idNumber, req.body.status], (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        Logger.loggerInfo.addContext('context', 'getAllRequestsRevFund')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send(rows)
                    } else {
                        Logger.loggerInfo.addContext('context', 'getAllRequestsRevFund - No data found')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send(rows)
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
                            res.send({ request: rows })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - area_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${rows.length}`)
                        } else if (approver === 'regional_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];

                                if (element.am_status == 'approved' || element.area_approver == null || element.area_approver == '') {
                                    data.push(element)
                                }

                            }
                            res.send({ request: data })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - regional_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'ram_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.rm_status == 'approved' || element.regional_approver == null || element.regional_approver == '') {
                                    data.push(element)
                                }

                            }
                            res.send({ request: data })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - ram_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'ass_vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ram_status == 'approved' || element.ram_approver == null || element.ram_approver == '') {
                                    data.push(element)
                                }

                            }
                            res.send({ request: data })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - ass_vpo_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ass_status == 'approved' || element.ass_vpo_approver == null || element.ass_vpo_approver == '') {
                                    data.push(element)
                                }

                            }
                            res.send({ request: data })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalCash - vpo_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        }

                    } else {
                        res.send({ request: data })
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
                            res.send({ request: rows })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - am_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${rows.length}`)
                        } else if (approver === 'rm_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];

                                if (element.am_status == 'approved' || element.am_approver == null || element.am_approver == '') {
                                    data.push(element)
                                }

                            }
                            res.send({ request: data })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - rm_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'ram_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.rm_status == 'approved' || element.rm_approver == null || element.rm_approver == '') {
                                    data.push(element)
                                }
                            }
                            res.send({ request: data })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - ram_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'ass_vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ram_status == 'approved' || element.ram_approver == null || element.ram_approver == '') {
                                    data.push(element)
                                }
                            }
                            res.send({ request: data })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - ass_vpo_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        } else if (approver === 'vpo_approver') {
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                if (element.ass_status == 'approved' || element.ass_vpo_approver == null || element.ass_vpo_approver == '') {
                                    data.push(element)
                                }
                            }
                            res.send({ request: data })
                            Logger.loggerInfo.addContext('context', 'getAllRequestsForApprovalRevolving - vpo_approver')
                            Logger.loggerInfo.info(`Data Retrieved : ${data.length}`)
                        }
                    } else {
                        res.send({ request: rows })
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
}