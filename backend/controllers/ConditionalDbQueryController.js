const branchdbConnection = require("../config/branchDBConnection");
const { getApproverQuery, getAppEmailQuery } = require("./ConditionalVariableController")

module.exports = {
    updateApproverEmailDate(controlNo,approver){
        let currentApproverEmailDate = getApproverQuery(approver);

        let date = new Date();

        let Query = `UPDATE cash_advance_request SET ${currentApproverEmailDate} = '${date}' WHERE controlNo = '${controlNo}'`
        
        return Query
    },
    updateApproverEmailDateRevolving(controlNo,approver){
        let currentApproverEmailDate = getApproverQuery(approver);

        let date = new Date();

        let Query = `UPDATE revolving_fund_request SET ${currentApproverEmailDate} = '${date}' WHERE controlNo = '${controlNo}'`
        
        return Query
    },
    getApproversEmail(zone, approvers){

        let myQuery = getAppEmailQuery(zone, approvers)

        return new Promise((resolve, reject) => {
            branchdbConnection.query(myQuery, (err, result, fields) => {
                if (!err) {
                    resolve({ result: result[0], sqlCode: 0})
                }else{
                    reject({ message: err, sqlCode: 1 })
                }
            })
        })
    }
}