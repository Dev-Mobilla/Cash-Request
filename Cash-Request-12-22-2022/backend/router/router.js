const express = require('express');
const Router = express.Router();
const http = require('http');
const auth = require('../Middleware/auth');


const usersController = require('../controllers/usersController');
const mailController = require('../controllers/mailController');
const requestController = require('../controllers/requestController');
const OpenRequestController = require('../controllers/OpenRequestController');
const RequestEscalationController = require('../controllers/RequestEscalationController');


//USERS
Router.get('/login/:userId', usersController.userLogin);

//REVOLVING FUND
// Router.get('/getRequestByControlNoRf/:controlNo', requestController.getRequestByControlNoRf);
Router.get('/getRfMaxId', auth.verifyToken ,requestController.getRfMaxId);
Router.post('/rf_request', auth.verifyToken,OpenRequestController.postRfRequest);
Router.post('/rfRequestFlow/:controlNo/:approver',auth.verifyToken, mailController.rfRequestFlow);
Router.post('/getAllRequestsRf',auth.verifyToken, OpenRequestController.getAllRequestsRevFund);
Router.post('/getRequestByControlNoRf', auth.verifyToken,OpenRequestController.getRfRequestByControlNo);
Router.post('/cancelRevRequest',auth.verifyToken, requestController.cancelRevRequest);

//CASH ADVANCE
// Router.post('/getUserById', usersController.getUserById);
// Router.post('/request', requestController.postRequest);
// Router.get('/getRequestByControlNoCash/:controlNo', requestController.getRequestByControlNoCash);
Router.get('/getMaxId',auth.verifyToken, requestController.getMaxId);
Router.post('/request',auth.verifyToken, OpenRequestController.postCashRequest);
Router.post('/requestStatus/:controlNo/:approver',auth.verifyToken, RequestEscalationController.requestStatus);
Router.post('/getAllRequestsCa',auth.verifyToken, OpenRequestController.getAllRequestsCash);
Router.post('/getRequestByControlNoCash',auth.verifyToken, OpenRequestController.getCashRequestByControlNo);
Router.post('/cancelCashRequest',auth.verifyToken, requestController.cancelCashRequest);

//USERS
Router.post('/isUserApproverByIdNumber',auth.verifyToken, usersController.isUserApproverByIdNumber);
Router.post('/getUserRole',auth.verifyToken, usersController.getUserRole);

//APPROVERS
// Router.get('/confirm-approval/:controlNo/:approver', mailController.requestStatus);
Router.post('/getAllRequestsForApprovalCash',auth.verifyToken, OpenRequestController.getAllRequestsForApprovalCash)
Router.post('/getAllRequestsForApprovalRevolving',auth.verifyToken, OpenRequestController.getAllRequestsForApprovalRevolving);


module.exports = Router;