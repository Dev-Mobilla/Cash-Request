const express = require('express');
const Router = express.Router();
const http = require('http');
const auth = require('../Middleware/auth');


const usersController = require('../controllers/usersController');
const mailController = require('../controllers/mailController');
const requestController = require('../controllers/requestController');
const OpenRequestController = require('../controllers/OpenRequestController');
const CashRequestEscalationController = require('../controllers/CashRequestEscalationController');
const RevRequestEscalationController = require('../controllers/RevolvingRequestEscalationController');


//USERS
Router.post('/login', usersController.userLogin);

//REVOLVING FUND
Router.get('/getRfMaxId', auth.verifyToken ,requestController.getRfMaxId);
Router.post('/rf_request', auth.verifyToken,OpenRequestController.postRfRequest);
Router.post('/rfRequestFlow/:controlNo/:approver',auth.verifyToken, RevRequestEscalationController.requestStatus);
Router.post('/getAllRequestsRf',auth.verifyToken, OpenRequestController.getAllRequestsRevFund);
Router.post('/getRequestByControlNoRf', auth.verifyToken,OpenRequestController.getRfRequestByControlNo);
Router.post('/cancelRevRequest',auth.verifyToken, requestController.cancelRevRequest);

//CASH ADVANCE
Router.get('/getMaxId',auth.verifyToken, requestController.getMaxId);
Router.post('/request',auth.verifyToken, OpenRequestController.postCashRequest);
Router.post('/requestStatus/:controlNo/:approver',auth.verifyToken, CashRequestEscalationController.requestStatus);
Router.post('/getAllRequestsCa',auth.verifyToken, OpenRequestController.getAllRequestsCash);
Router.post('/getRequestByControlNoCash',auth.verifyToken, OpenRequestController.getCashRequestByControlNo);
Router.post('/cancelCashRequest',auth.verifyToken, requestController.cancelCashRequest);

//USERS
Router.post('/isUserApproverByIdNumber',auth.verifyToken, usersController.isUserApproverByIdNumber);

//APPROVERS
Router.post('/getAllRequestsForApprovalCash',auth.verifyToken, OpenRequestController.getAllRequestsForApprovalCash)
Router.post('/getAllRequestsForApprovalRevolving',auth.verifyToken, OpenRequestController.getAllRequestsForApprovalRevolving);

Router.post('/getApprovedRequestMonthCash',auth.verifyToken, requestController.getApprovedRequestMonthCash);
Router.post('/getApprovedRequestMonthRevolving', auth.verifyToken,requestController.getApprovedRequestMonthRevolving);

module.exports = Router;