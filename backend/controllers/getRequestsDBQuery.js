const branchdbConnection = require("../config/branchDBConnection");
const { getAllRequestsCaByStatus, getAllRequestsRfByStatus, getRequestByControlNo, getRfRequestByControlNo, getRequestorEmailVisayas } = require("../config/queries");
const response = require("./resonseCodeMessages");
const Logger = require('../logs/logger')

module.exports = {

    async getAllRequestsCaEmail(Status){

        let reqStatus = Status;

        return new Promise((resolve, reject) => {
            branchdbConnection.query(getAllRequestsCaByStatus, (reqStatus), (err, request, fields) => {
                if (!err) {
                    resolve({ request: request, sqlCode: 0})
                }else{
                    Logger.loggerError.addContext('context', 'getRequestsDBQuery - getAllRequestsCaEmail')
                    Logger.loggerError.error(`${response(3)} : ${err.message}, resCode: 3`)
                    reject({ message: response(3), sqlCode: 1 })
                }
            })
        })
    },
    async getAllRequestsRf_Email(Status){

        let reqStatus = Status;

        return new Promise((resolve, reject) => {
            branchdbConnection.query(getAllRequestsRfByStatus, (reqStatus), (err, request, fields) => {
                if (!err) {
                    resolve({ request: request, sqlCode: 0})
                }else{
                    Logger.loggerError.addContext('context', 'getRequestsDBQuery - getAllRequestsRf_Email')
                    Logger.loggerError.error(`${response(3)} : ${err.message}, resCode: 3`)
                    reject({ message: response(3), sqlCode: 1 })
                }
            })
        })
    },
    async getRequestByControlNo(controlNo){
        return new Promise((resolve, reject) => {
            branchdbConnection.query(getRequestByControlNo, (controlNo), (err, request, fields) => {
                if (!err) {
                    resolve({ request: request, sqlCode: 0})
                }else{
                    Logger.loggerError.addContext('context', 'getRequestsDBQuery - getRequestByControlNo')
                    Logger.loggerError.error(`${response(3)} : ${err.message}, resCode: 3`)
                    reject({ message: response(3), sqlCode: 1 })
                }
            })
        })
    },
    async getRfRequestByControlNo(controlNo){
        return new Promise((resolve, reject) => {
            branchdbConnection.query(getRfRequestByControlNo, (controlNo), (err, request, fields) => {
                if (!err) {
                    resolve({ request: request, sqlCode: 0})
                }else{
                    Logger.loggerError.addContext('context', 'getRequestsDBQuery - getRequestByControlNo')
                    Logger.loggerError.error(`${response(3)} : ${err.message}, resCode: 3`)
                    reject({ message: response(3), sqlCode: 1 })
                }
            })
        })
    },
    async getRequestorEmail(branch){
        return new Promise((resolve, reject) => {

            branchdbConnection.query(getRequestorEmailVisayas, (branch), (err, email, fields) => {
                if (!err) {
                    resolve({ email: email, sqlCode: 0})
                }else{
                    Logger.loggerError.addContext('context', 'getRequestsDBQuery - getRequestByControlNo')
                    Logger.loggerError.error(`${response(3)} : ${err.message}, resCode: 3`)
                    reject({ message: response(3), sqlCode: 1 })
                }
            })
        })
    }
}