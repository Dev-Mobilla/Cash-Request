const dotenv = require('dotenv');
dotenv.config();
const branchdbConnection = require('../config/branchDBConnection');
const query = require('../config/queries');
const Logger = require('../logs/logger');

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
    },
    getApprovedRequestMonthCash(req, res) {

        const fullname = req.body.fullname;
        const approver = req.body.approver;

        let status = '';
        let approverPosition = '';

        if (approver == 'AREA MANAGER') {
            approverPosition = 'area_approver',
                status = 'am_status'
        } else if (approver == 'REGIONAL MAN') {
            approverPosition = 'regional_approver',
                status = 'rm_status'

        } else if (approver == 'RAM') {
            approverPosition = 'ram_approver',
                status = 'ram_status'

        } else if (approver == 'GMO-ASTGENMAN') {
            approverPosition = 'ass_vpo_approver',
                status = 'ass_status'

        } else if (approver == 'GMO-GENMAN') {
            approverPosition = 'vpo_approver',
                status = 'vpo_status'

        }

        try {
            let totalThisMonth = 0;
            let totalOverAll = 0;
            let totalFinal = 0;

            let dateInstance = new Date();
            let monthNow = dateInstance.toLocaleString('default', { month: 'long' }).toString()


            branchdbConnection.query(`
            SELECT ca.amount AS amount, ca.date AS date FROM cash_advance_request ca 
            WHERE ${approverPosition} = '${fullname}' AND request_status = 'approved' OR request_status = 'pending' AND ${status} = 'approved'`, (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {

                        for (let index = 0; index < rows.length; index++) {
                            const element = rows[index];

                            let newdDteInstance = new Date(element.date);
                            let requestDateMonth = newdDteInstance.toLocaleString('default', { month: 'long' }).toString()

                            if (requestDateMonth == monthNow) {

                                let amount = parseFloat(element.amount.replace(/,/g, ''))

                                totalThisMonth += amount;

                            } else {
                                let total = parseFloat(element.amount.replace(/,/g, ''))

                                totalOverAll += total

                                totalThisMonth += 0
                            }
                        }

                        totalFinal = totalOverAll + totalThisMonth
                        res.send({ thisMonth: totalThisMonth, overAll: totalFinal })
                    } else {
                        res.send({ thisMonth: totalThisMonth, overAll: totalFinal })
                    }
                } else {
                    res.send({ message: 'Error retrieving requests' })
                }
            })
        } catch (error) {
            res.send({ message: 'Network Error' })
        }
    },
    getApprovedRequestMonthRevolving(req, res) {

        const fullname = req.body.fullname;
        const approver = req.body.approver;

        let status = '';
        let approverPosition = '';

        if (approver == 'AREA MANAGER') {
            approverPosition = 'am_approver',
                status = 'am_status'
        } else if (approver == 'REGIONAL MAN') {
            approverPosition = 'rm_approver',
                status = 'rm_status'

        } else if (approver == 'RAM') {
            approverPosition = 'ram_approver',
                status = 'ram_status'

        } else if (approver == 'GMO-ASTGENMAN') {
            approverPosition = 'ass_vpo_approver',
                status = 'ass_status'

        } else if (approver == 'GMO-GENMAN') {
            approverPosition = 'vpo_approver',
                status = 'vpo_status'

        }

        try {
            let totalThisMonth = 0;
            let totalOverAll = 0;
            let totalFinal = 0;

            let dateInstance = new Date();
            let monthNow = dateInstance.toLocaleString('default', { month: 'long' }).toString()


            branchdbConnection.query(`
            SELECT rf.rfDate AS date, rf.totalExpenses AS total FROM revolving_fund_request rf 
            WHERE ${approverPosition} = '${fullname}' AND request_status = 'approved' OR request_status = 'pending' AND ${status} = 'approved'`, (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {

                        for (let index = 0; index < rows.length; index++) {
                            const element = rows[index];

                            let newdDteInstance = new Date(element.date);
                            let requestDateMonth = newdDteInstance.toLocaleString('default', { month: 'long' }).toString()

                            if (requestDateMonth == monthNow) {

                                let totalExpenses = parseFloat(element.total.replace(/,/g, ''))

                                totalThisMonth += totalExpenses;

                            } else {

                                let total = parseFloat(element.total.replace(/,/g, ''))

                                totalOverAll += total

                                totalThisMonth += 0
                            }
                        }

                        totalFinal = totalOverAll + totalThisMonth
                        res.send({ thisMonth: totalThisMonth, overAll: totalFinal })

                    } else {
                        res.send({ thisMonth: totalThisMonth, overAll: totalFinal })
                    }
                } else {
                    res.send({ message: response(2), resCode: 2 })
                }
            })
        } catch (error) {
            res.send({ message: response(3), resCode: 3 })
        }
    }

}