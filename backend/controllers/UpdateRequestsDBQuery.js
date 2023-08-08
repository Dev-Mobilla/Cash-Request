const branchdbConnection = require("../config/branchDBConnection");
const { updateApproverEmailDate, updateApproverEmailDateRevolving } = require("./ConditionalDbQueryController");
const response = require("./resonseCodeMessages");

module.exports = {

    async updateApproverEmailDate(controlno, approver){

        let updateQuery = updateApproverEmailDate(controlno, approver);

        return new Promise((resolve, reject) => {
            branchdbConnection.query(updateQuery, (err, result, fields) => {
                if (!err) {
                    resolve({ result: result, sqlCode: 0})
                }else{
                    Logger.loggerError.addContext('context', 'UpdateRequestsDBQuery - updateApproverEmailDate CA')
                    Logger.loggerError.error(`${response(3)} : ${err.message}, resCode: 3`)
                    reject({ message: err, sqlCode: 1 })
                }
            })
        })
    },
    async updateApproverEmailDateRev(controlno, approver){

        let updateQuery = updateApproverEmailDateRevolving(controlno, approver);

        return new Promise((resolve, reject) => {
            branchdbConnection.query(updateQuery, (err, result, fields) => {
                if (!err) {
                    resolve({ result: result, sqlCode: 0})
                }else{
                    Logger.loggerError.addContext('context', 'UpdateRequestsDBQuery - updateApproverEmailDateRev')
                    Logger.loggerError.error(`${response(3)} : ${err.message}, resCode: 3`)
                    reject({ message: err, sqlCode: 1 })
                }
            })
        })
    }
}