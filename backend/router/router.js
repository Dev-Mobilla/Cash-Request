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
const getFormViewController = require('../controllers/getFormViewController');


//USERS
Router.post('/login', usersController.userLogin);

//REVOLVING FUND
Router.get('/getRfMaxId', auth.verifyToken ,requestController.getRfMaxId);
Router.post('/rf_request', auth.verifyToken,OpenRequestController.postRfRequest);
Router.post('/rfRequestFlow/:controlNo/:approver',auth.verifyToken, RevRequestEscalationController.requestStatus);
Router.post('/getAllRequestsRf',auth.verifyToken, OpenRequestController.getAllRequestsRevFund);
Router.post('/getRequestByControlNoRf', auth.verifyToken,OpenRequestController.getRfRequestByControlNo);
Router.post('/cancelRevRequest',auth.verifyToken, OpenRequestController.cancelRevRequest);
Router.post('/UpdateRevolvingRequestDetailsByControlNo', auth.verifyToken, OpenRequestController.updateRequestRevolvingDetails);

//CASH ADVANCE
Router.get('/getMaxId', requestController.getMaxId);
Router.post('/request',auth.verifyToken, OpenRequestController.postCashRequest);
Router.post('/requestStatus/:controlNo/:approver',auth.verifyToken, CashRequestEscalationController.requestStatus);
Router.post('/getAllRequestsCa',auth.verifyToken, OpenRequestController.getAllRequestsCash);
Router.post('/getRequestByControlNoCash',auth.verifyToken, OpenRequestController.getCashRequestByControlNo);
Router.post('/cancelCashRequest',auth.verifyToken, OpenRequestController.cancelCashRequest);
Router.post('/updateCashRequestDetailsByControlNo', auth.verifyToken, OpenRequestController.updateRequestCashDetails);

//USERS
Router.post('/isUserApproverByIdNumber',auth.verifyToken, usersController.isUserApproverByIdNumber);

//APPROVERS
Router.post('/getAllRequestsForApprovalCash',auth.verifyToken, OpenRequestController.getAllRequestsForApprovalCash)
Router.post('/getAllRequestsForApprovalRevolving',auth.verifyToken, OpenRequestController.getAllRequestsForApprovalRevolving);

Router.post('/getApprovedRequestMonthCash',auth.verifyToken, requestController.getApprovedRequestMonthCash);
Router.post('/getApprovedRequestMonthRevolving', auth.verifyToken,requestController.getApprovedRequestMonthRevolving);

// Router.post('/', OpenRequestController.requestForEmailFollowUp);

Router.post('/getAllApproversEmail', auth.verifyToken, usersController.getAllApproverEmail);

Router.post('/getCashForm', getFormViewController.getPendingRequestForm);
Router.post('/getRfForm', getFormViewController.getRfPendingRequestForm);


Router.get('/getRequest/:controlNo', getFormViewController.getPendingRequestForm);


module.exports = Router;