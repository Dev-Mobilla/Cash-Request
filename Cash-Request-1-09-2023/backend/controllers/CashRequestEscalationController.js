
const branchdbConnection = require('../config/branchDBConnection');
const queries = require('../config/queries');
const Logger = require('../logs/logger');
const response = require('./resonseCodeMessages');


const updateRequestStatus = (approver, status, controlno, remarks, res) => {

    if (approver == 'vpo_approver') {

        branchdbConnection.query(queries.updateRequestStatus, [status, controlno], (err, results, fields) => {
            if (!err) {
                console.log(results);

                Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateRequestStatus - `);
                Logger.loggerInfo.info(`Request Status Updated - ${controlno}`);
                updateApproverStatus(approver, controlno, status, remarks, res)

            } else {
                console.log(err);
                Logger.loggerError.addContext('context', 'CASH ADVANCE APPROVED -  updateRequestStatus - ');
                Logger.loggerError.error(`Error updating request status, ${err}`);
                res.status(400).send({ message: response(2), resCode: 2 })
            }
        })
    } else if (status === 'disapproved') {

        branchdbConnection.query(queries.updateRequestStatus, [status, controlno], (err, results, fields) => {
            if (!err) {
                console.log(results);

                Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateRequestStatus - `);
                Logger.loggerInfo.info(`Request Status Updated - ${controlno}`);
                updateApproverStatus(approver, controlno, status, remarks, res)

            } else {
                console.log(err);
                Logger.loggerError.addContext('context', 'CASH ADVANCE APPROVED -  updateRequestStatus - ');
                Logger.loggerError.error(`Error updating request status, ${err}`);
                res.status(400).send({ message: response(2), resCode: 2 })
            }
        })
    } else {
        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateRequestStatus - `);
        Logger.loggerInfo.info(`Approver Status Updating - ${controlno}`);
        updateApproverStatus(approver, controlno, status, remarks, res)
    }


}

const updateApproverStatus = (approver, controlNo, status, remarks, res) => {
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
                        res.status(200).send({ message: response(0), resCode: 0 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        console.log(err);
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Failed to Update Status - ${approver}`);
                    }
                })

                break;
            case 'regional_approver':

                let rmQuery = `UPDATE cash_advance_request 
                SET rm_status = '${status}', rm_remarks = '${remarks}', rm_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(rmQuery, (err, fields) => {
                    if (!err) {
                        res.status(200).send({ message: response(0), resCode: 0 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Failed to Update Status - ${approver}`);
                    }
                })

                break;
            case 'ram_approver':

                let ramQuery = `UPDATE cash_advance_request 
                SET ram_status = '${status}', ram_remarks = '${remarks}', ram_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(ramQuery, (err, fields) => {
                    if (!err) {
                        res.status(200).send({ message: response(0), resCode: 0 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Failed to Update Status - ${approver}`);
                    }
                })

                break;
            case 'ass_vpo_approver':

                let assQuery = `UPDATE cash_advance_request 
                SET ass_status = '${status}', ass_remarks = '${remarks}', ass_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(assQuery, (err, fields) => {
                    if (!err) {
                        res.status(200).send({ message: response(0), resCode: 0 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Failed to Update Status - ${approver}`);
                    }
                })

                break;
            case 'vpo_approver':

                let vpoQuery = `UPDATE cash_advance_request 
                SET vpo_status = '${status}', vpo_remarks = '${remarks}', vpo_date = '${dateTime}'
                WHERE controlNo = '${controlNo}'`

                branchdbConnection.query(vpoQuery, (err, fields) => {
                    if (!err) {
                        res.status(200).send({ message: response(0), resCode: 0 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Approver Status Updated - ${approver}`);
                    } else {
                        res.status(400).send({ message: response(2), resCode: 2 });
                        Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - updateApproverStatus - `);
                        Logger.loggerInfo.info(`Failed to Update Status - ${approver}`);
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

            console.log(req.body);
            console.log(req.params);

            //   IF APPROVE IS CLICKED
            branchdbConnection.query(queries.CheckCashRequestStatus, (controlNo), (err, request, fields) => {
                if (!err) {
                    if (!request.length == 0) {
                        if (resp === 'approved') {
                            updateRequestStatus(approver, resp, controlNo, comment, res)
                        } else if (resp === 'disapproved') {
                            updateRequestStatus(approver, resp, controlNo, comment, res)
                        }
                    } else {
                        console.log(request);
                    }
                } else {
                    console.log(err);
                }
            })

        } catch (error) {
            console.log(error);
            Logger.loggerFatal.addContext('context', `requestStatus`);
            Logger.loggerFatal.fatal(`Method Error ${error}`)
        }
    },

}