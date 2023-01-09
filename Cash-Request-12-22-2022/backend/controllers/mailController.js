const dotenv = require('dotenv')
dotenv.config()
const branchdbConnection = require('../config/branchDBConnection');
const setTransporter = require('../config/mailConfig');
const query = require('../config/queries');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { _createPdfStream, _streamToBuffer } = require('../utils/generatePdf');
const Logger = require('../logs/logger');
const CryptoJs = require('crypto-js');

const sendEmail = async (options) => {
  let gmailTransporter = await setTransporter();
  return await gmailTransporter.sendMail(options);
};

// CASH ADVANCE REQUEST
const updateApproverStatus = (res, status, controlno, approver_name, approver_status, approver_email, approver_fullname, next_approver, comment, approver_date, approver_remark) => {
  // APPROVED

  if (status === 'approved') {
    Logger.loggerInfo.addContext('context', 'CASH ADVANCE APPROVED  - ');
    Logger.loggerInfo.info(status, controlno, approver_name, approver_status, approver_email, approver_fullname, next_approver, comment, approver_date, approver_remark);
    let dateInstance = new Date();
    let date = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString() + "/" + ("0" + dateInstance.getDate()).slice(-2).toString() + "/" + dateInstance.getFullYear().toString();
    let time = dateInstance.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let dateTime = `${date} | ${time}`;
    branchdbConnection.query(`UPDATE cash_advance_request SET ${approver_status} = '${status}', ${approver_date} =  '${dateTime}', ${approver_remark} = '${comment}'  WHERE controlNo = '${controlno}'`, (err, fields) => {
      if (!err) {
        branchdbConnection.query(query.getRequestByControlNo, (controlno), (err, rows, fields) => {
          if (!err) {
            if (!rows.length == 0) {

              if (approver_status === 'vpo_status') {
                branchdbConnection.query(query.updateRequestStatus, [status, controlno], (err, fields) => {
                  if (!err) {

                    Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED - Report has been delivered to ${rows[0].email} - `);
                    Logger.loggerInfo.info(`Request Approved - ${controlno}`);

                    // res.redirect(`/response/${controlno}?status=approved`);
                  res.send({ status: status , rows: rows})

                  } else {
                    Logger.loggerError.addContext('context', 'CASH ADVANCE APPROVED -  updateApproverStatus - ');
                    Logger.loggerError.error(`Error updating request status, ${err}`);
                  }
                })
              } else {
                // setTimeout(() => {
                  sendEmail({
                    subject: `IMPORTANT! Cash Advance: ${controlno} For Approval`,
                    to: approver_email,
                    from: "'Cash Request <vpo-carf@mlhuillier.com>'",
                    template: "caButtons",
                    context: {
                      data: rows[0],
                      approver: approver_name,
                      controlNo: rows[0].controlNo,
                      link:`http://127.0.0.1:3000/cash-approval/${controlno}/${approver_name}`
                      // link:`http://cashrequest.mlhuillier.com:3000/cash-approval/${controlno}/${approver_name}`
                      // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/cash-advance/for-approval?controlNo=${controlno}&approver=${approver_name}`
                      // link: `http://127.0.0.1:8080/request-approval?approver=${approver_name}&controlNo=${encControlNo}&type=cashAdvance`
                    }
                  });

                  Logger.loggerInfo.addContext('context', `CASH ADVANCE APPROVED -  Request ${controlno} has been approved by ${approver_fullname} - `);
                  Logger.loggerInfo.info(`Request has been delivered to ${approver_email} for approval `);

                  // res.redirect(`/response/${controlno}?status=approved`);
                  res.send({ status: status , rows: rows})
                // }, 3000);
              }

            } else {
              Logger.loggerError.addContext('context', 'CASH ADVANCE APPROVED - updateApproverStatus -> getRequestByControlNo - ')
              Logger.loggerError.error(`No data retrieved with control no. ${controlno} - ${rows}`)
            }
          } else {
            Logger.loggerFatal.addContext('context', 'CASH ADVANCE APPROVED - updateApproverStatus -> getRequestByControlNo - ')
            Logger.loggerFatal.fatal(`Error retrieving data - ${err}`)
          }
        })
      } else {
        Logger.loggerFatal.addContext('context', `APPROVED - updateApproverStatus -> UPDATE cash_advance_request SET ${approver_status} = '${status}', ${approver_date} =  '${dateTime}' WHERE controlNo = '${controlno}'`)
        Logger.loggerFatal.fatal(`CASH ADVANCE ERROR - ${err}`);
      }
    })
    // DISAPPROVED
  } else if (status === 'disapproved') {
    Logger.loggerInfo.addContext('context', 'CASH ADVANCE DISAPPROVED  - ');
    Logger.loggerInfo.info(status, controlno, approver_name, approver_status, approver_email, approver_fullname, next_approver, comment, approver_date, approver_remark);

    let dateInstance = new Date();
    let date = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString() + "/" + ("0" + dateInstance.getDate()).slice(-2).toString() + "/" + dateInstance.getFullYear().toString();
    let time = dateInstance.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let dateTime = `${date} | ${time}`;

    branchdbConnection.query(`UPDATE cash_advance_request SET ${approver_status} = '${status}' WHERE controlNo = '${controlno}'`, (err, fields) => {
      if (!err) {
        branchdbConnection.query(query.updateRequestStatus, [status, controlno], (err, fields) => {
          if (!err) {
            branchdbConnection.query(`UPDATE cash_advance_request SET ${approver_date} =  '${dateTime}', ${approver_remark} = '${comment}' WHERE controlNo = '${controlno}'`, (err, resp, fields) => {
              if (!err) {
                branchdbConnection.query(query.getRequestByControlNo, (controlno), (err, rows, fields) => {
                  if (!err) {
                    if (!rows.length == 0) {

                      sendEmail({
                        subject: `Cash Advance ${controlno} REQUEST DISAPPROVED`,
                        to: rows[0].email,
                        from: "'Cash Request <vpo-carf@mlhuillier.com>'",
                        template: "disapproved",
                        context: {
                          data: rows[0],
                          time: `at ${time} | ${date}`,
                          comment: comment,
                          requestor: rows[0].author,
                          approver: approver_fullname,
                          status: rows[0].request_status,
                          color: 'rgb(136, 31, 40)',
                          bgColor: 'rgb(238, 210, 210)',
                        },

                      });
                      Logger.loggerInfo.addContext('context', `DISAPPROVED - Email was sent to ${rows[0].email} - `);
                      Logger.loggerInfo.info(`Request Disapproved - CASH ADVANCE ${controlno}`);
                      // res.redirect(`/response/${controlno}?status=disapproved`);
                    // res.send({ status: status })
                  res.send({ status: status , rows: rows})

                    } else {
                      Logger.loggerError.addContext('context', 'CASH ADVANCE DISAPPROVED - updateApproverStatus -> getRequestByControlNo - ')
                      Logger.loggerError.error(`No data retrieved with control no. ${controlno} - ${rows}`)
                    }
                  } else {
                    Logger.loggerFatal.addContext('context', 'CASH ADVANCE DISAPPROVED - updateApproverStatus -> getRequestByControlNo - ')
                    Logger.loggerFatal.fatal(`Error retrieving data - ${err}`)
                  }
                })
              }
              else {
                Logger.loggerError.addContext('context', 'CASH ADVANCE DISAPPROVED - updateApproverStatus -> update approval date - ')
                Logger.loggerError.error(`Can't update request approval date`)
              }
            })

          } else {
            Logger.loggerError.addContext('context', 'CASH ADVANCE DISAPPROVED - updateApproverStatus - ');
            Logger.loggerError.error(`Error updating request status - ${err}`);
          }
        })

      } else {
        Logger.loggerError.addContext('context', 'CASH ADVANCE DISAPPROVED - updateApproverStatus - ');
        Logger.loggerError.error(`Error updating ${approver_status} - ${err}`);
      }
    })
  }
}
// REVOLVING FUND REQUEST
const updateRfApproverStatus = (res, status, controlno, approver_name, approver_status, approver_email, approver_fullname, next_approver, comment, approver_date, approver_remark) => {
  // APPROVED
  const cipherUser = CryptoJs.AES.encrypt(controlno, process.env.SECRET).toString();
  const encControlNo = CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(cipherUser));
  
  if (status === 'approved') {
    Logger.loggerInfo.addContext('context', 'REVOLVING FUND APPROVED  - ');
    Logger.loggerInfo.info(status, controlno, approver_name, approver_status, approver_email, approver_fullname, next_approver, comment, approver_date, approver_remark);

    let dateInstance = new Date();
    let date = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString() + "/" + ("0" + dateInstance.getDate()).slice(-2).toString() + "/" + dateInstance.getFullYear().toString();
    let time = dateInstance.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let dateTime = `${date} | ${time}`;

    branchdbConnection.query(`UPDATE revolving_fund_request SET ${approver_status} = '${status}', ${approver_date} =  '${dateTime}', ${approver_remark} = '${comment}' WHERE controlNo = '${controlno}'`, (err, fields) => {
      if (!err) {
        branchdbConnection.query(query.getRfRequestByControlNo, (controlno), (err, rows, fields) => {
          if (!err) {
            if (!rows.length == 0) {
              if (approver_status === 'vpo_status') {
                branchdbConnection.query(query.updateRfRequestStatus, [status, controlno], (err, fields) => {
                  if (!err) {
                    let approvedTemplate = fs.readFileSync(path.join(__dirname, '..', 'views', 'templates', 'rfApproved_pdf.hbs'), 'utf-8');

                    let context = {
                      data: rows[0],
                      isNotVpo: true
                    }
                    let template = handlebars.compile(approvedTemplate);

                    let DOC = template(context);

                    _createPdfStream(DOC).then((stream) => {
                      _streamToBuffer(stream, function (err, buffer) {
                        if (err) {
                          throw new Error(err);
                        }
                        sendEmail({
                          subject: `Revolving Fund ${controlno} REQUEST APPROVED`,
                          to: rows[0].email,
                          from: "'Cash Request <vpo-carf@mlhuillier.com>'",
                          template: "rfApproved",
                          context: {
                            status: rows[0].request_status,
                            requestor: rows[0].requestor,
                            controlno: rows[0].controlNo
                          },
                          attachments: [{
                            filename: `REVOLVING FUND LIQUIDATION ${controlno}.pdf`,
                            content: buffer,
                            contentDisposition: 'application/pdf'
                          }]
                        });
                      });
                    });
                    // res.redirect(`/response/${controlno}?status=approved`);
                    res.send({ status: status, rows: rows })
                    Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED -  Request ${controlno} has been approved by ${approver_fullname} - `);
                    Logger.loggerInfo.info(`Request has been delivered to ${approver_email} for approval `);
                  } else {
                    Logger.loggerError.addContext('context', 'REVOLVING FUND APPROVED - updateApproverStatus - ');
                    Logger.loggerError.error('Error updating request status');
                  }
                })
              } else {
                setTimeout(() => {
                  sendEmail({
                    subject: `IMPORTANT! Revolving Fund: ${controlno} For Approval`,
                    to: approver_email,
                    from: "'Cash Request <vpo-carf@mlhuillier.com>'",
                    template: "rfButtons",
                    context: {
                      data: rows[0],
                      approver: approver_name,
                      controlNo: rows[0].controlNo,
                      link:`http://127.0.0.1:3000/rev-approval/${controlno}/${approver_name}`
                      // link:`http://cashrequest.mlhuillier.com:3000/rev-approval/${controlno}/${approver_name}`
                      // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/revolving-fund/for-approval?controlNo=${controlno}&approver=${approver_name}`
                      // link: `http://127.0.0.1:8080/request-approval?approver=${approver_name}&controlNo=${encControlNo}&type=revolvingFund`
                    }
                  });
                  Logger.loggerInfo.addContext('context', `REVOLVING FUND APPROVED -  Request ${controlno} has been approved by ${approver_fullname} - `);
                  Logger.loggerInfo.info(`Request has been delivered to ${approver_email} for approval`);
                  // res.redirect(`/response/${controlno}?status=approved`);
                  res.send({ status: status , rows:rows})
                }, 3000);
              }
            } else {
              Logger.loggerError.addContext('context', 'REVOLVING FUND APPROVED - updateApproverStatus -> getRequestByControlNo - ')
              Logger.loggerError.error(`No data retrieved with control no. ${controlno} - ${rows}`)
            }
          } else {
            Logger.loggerFatal.addContext('context', 'REVOLVING FUND APPROVED - updateApproverStatus -> getRequestByControlNo - ')
            Logger.loggerFatal.fatal(`Error retrieving data - ${err}`)
          }
        })
      } else {
        Logger.loggerError.addContext('context', 'REVOLVING FUND APPROVED - updateApproverStatus - ');
        Logger.loggerError.error(`Error updating ${approver_status} - ${err}`);
      }
    })
    // DISAPPROVED
  } else if (status === 'disapproved') {
    Logger.loggerInfo.addContext('context', 'REVOLVING FUND DISAPPROVED  - ');
    Logger.loggerInfo.info(status, controlno, approver_name, approver_status, approver_email, approver_fullname, next_approver, comment, approver_date, approver_remark);

    let dateInstance = new Date();
    let date = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString() + "/" + ("0" + dateInstance.getDate()).slice(-2).toString() + "/" + dateInstance.getFullYear().toString();
    let time = dateInstance.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let dateTime = `${date} | ${time}`;
    branchdbConnection.query(`UPDATE revolving_fund_request SET ${approver_status} = '${status}', ${approver_date} =  '${dateTime}', ${approver_remark} = '${comment}' WHERE controlNo = '${controlno}'`, (err, fields) => {
      if (!err) {
        branchdbConnection.query(query.updateRfRequestStatus, [status, controlno], (err, fields) => {
          if (!err) {
            branchdbConnection.query(query.getRfRequestByControlNo, (controlno), (err, rows, fields) => {
              if (!err) {
                if (!rows.length == 0) {
                  sendEmail({
                    subject: `Revolving Fund ${controlno} REQUEST DISAPPROVED`,
                    to: rows[0].email,
                    from: "'Cash Request <vpo-carf@mlhuillier.com>'",
                    template: "rfDisapproved",
                    context: {
                      data: rows[0],
                      time: `at ${time} | ${date}`,
                      comment: comment,
                      requestor: rows[0].requestor,
                      approver: approver_fullname,
                      status: rows[0].request_status,
                      color: 'rgb(136, 31, 40)',
                      bgColor: 'rgb(238, 210, 210)',
                    },

                  });

                  // res.redirect(`/response/${controlno}?status=disapproved`);
                  res.send({ status: status , rows: rows})
                  Logger.loggerInfo.addContext('context', `REVOLVING FUND DISAPPROVED - Email was sent to ${rows[0].email} - `);
                  Logger.loggerInfo.info(`Request Disapproved - ${controlno}`);
                } else {
                  Logger.loggerError.addContext('context', 'REVOLVING FUND DISAPPROVED - updateApproverStatus -> getRequestByControlNo - ')
                  Logger.loggerError.error(`No data retrieved with control no. ${controlno} - ${rows}`)
                }
              } else {
                Logger.loggerFatal.addContext('context', 'REVOLVING FUND DISAPPROVED - updateApproverStatus -> getRequestByControlNo - ')
                Logger.loggerFatal.fatal(`Error retrieving data with control no - ${err}`)
              }
            })
          } else {
            Logger.loggerError.addContext('context', 'REVOLVING FUND DISAPPROVED - updateApproverStatus - ');
            Logger.loggerError.error(`Error updating request status - ${err}`);

          }
        })

      } else {
        Logger.loggerError.addContext('context', 'REVOLVING FUND DISAPPROVED - updateApproverStatus - ');
        Logger.loggerError.error(`Error updating ${approver_status} - ${err}`);
      }
    })
  }
}


module.exports = {
  updateRfApproverStatus,
  sendMail(rows, type) {

    if (type === '') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Cash Advance: ${rows[0].controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows[0].area_approver,
          from: "'Cash Request <vpo-carf@mlhuillier.com>'",
          template: "caButtons",
          context: {
            data: rows[0],
            approver: 'area_approver',
            controlNo: rows[0].controlNo,
            link:`http://127.0.0.1:3000/cash-approval/${rows[0].controlNo}/area_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/cash-approval/${controlno}/area_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/cash-advance/for-approval?controlNo=${rows[0].controlNo}&approver=area_approver`
            // link: `http://127.0.0.1:8080/request-approval?approver=area_approver&controlNo=${encControlNo}&type=cashAdvance`
          }
        });
        return (send)
    }else if (type === 'area_approver') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Cash Advance: ${rows[0].controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows[0].regional_approver,
          from: "'Cash Request <vpo-carf@mlhuillier.com>'",
          template: "caButtons",
          context: {
            data: rows[0],
            approver: 'regional_approver',
            controlNo: rows[0].controlNo,
            link:`http://127.0.0.1:3000/cash-approval/${rows[0].controlNo}/regional_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/cash-approval/${controlno}/regional_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/cash-advance/for-approval?controlNo=${rows[0].controlNo}&approver=regional_approver`
            // link: `http://127.0.0.1:8080/request-approval?approver=area_approver&controlNo=${encControlNo}&type=cashAdvance`
          }
        });
        return (send)
    }else if (type === 'rm_approver') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Cash Advance: ${rows[0].controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows[0].ram_approver,
          from: "'Cash Request <vpo-carf@mlhuillier.com>'",
          template: "caButtons",
          context: {
            data: rows[0],
            approver: 'ram_approver',
            controlNo: rows[0].controlNo,
            link:`http://127.0.0.1:3000/cash-approval/${rows[0].controlNo}/ram_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/cash-approval/${controlno}/ram_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/cash-advance/for-approval?controlNo=${rows[0].controlNo}&approver=ram_approver`
            // link: `http://127.0.0.1:8080/request-approval?approver=area_approver&controlNo=${encControlNo}&type=cashAdvance`
          }
        });
        return (send)
    }else if (type === 'ram_approver') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Cash Advance: ${rows[0].controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows[0].ass_vpo_approver,
          from: "'Cash Request <vpo-carf@mlhuillier.com>'",
          template: "caButtons",
          context: {
            data: rows[0],
            approver: 'ass_vpo_approver',
            controlNo: rows[0].controlNo,
            link:`http://127.0.0.1:3000/cash-approval/${rows[0].controlNo}/ass_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/cash-approval/${controlno}/ass_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/cash-advance/for-approval?controlNo=${rows[0].controlNo}&approver=ass_approver`
            // link: `http://127.0.0.1:8080/request-approval?approver=area_approver&controlNo=${encControlNo}&type=cashAdvance`
          }
        });
        return (send)
    }else if (type === 'ass_approver') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Cash Advance: ${rows[0].controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows[0].vpo_approver,
          from: "'Cash Request <vpo-carf@mlhuillier.com>'",
          template: "caButtons",
          context: {
            data: rows[0],
            approver: 'vpo_approver',
            controlNo: rows[0].controlNo,
            link:`http://127.0.0.1:3000/cash-approval/${rows[0].controlNo}/vpo_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/cash-approval/${controlno}/vpo_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/cash-advance/for-approval?controlNo=${rows[0].controlNo}&approver=vpo_approver`
            // link: `http://127.0.0.1:8080/request-approval?approver=area_approver&controlNo=${encControlNo}&type=cashAdvance`
          }
        });
        return (send)
    }

  },
  sendEmailNotificationRequestor(request_rows) {

    let controlNo = request_rows[0].controlNo;

    let send = sendEmail(
      {
        subject: `Cash Advance ${controlNo} For Approval`,
        to: request_rows[0].email,
        from: "'Cash Request <vpo-carf@mlhuillier.com>'",
        template: "requestor",
        context: {
          message: 'Your request has been delivered to the approvers.',
          requestor: request_rows[0].author,
          status: request_rows[0].request_status
        }
      }
    );
    return send
  },
  // CASH ADVANCE
  requestStatus(req, res) {
    try {
      
      let controlNo = req.params.controlNo;
      let approver = req.params.approver;
      let comment = req.body.comment;
      

      // IF APPROVE IS CLICKED
      if (req.body.approved) {
        branchdbConnection.query(query.getRequestByControlNo, (controlNo), (err, request, fields) => {
          if (!err) {
            if (!request.length == 0 && request[0].request_status === 'pending') {

                if (approver === 'area_approver' && request[0].am_status === '') {
                  updateApproverStatus(res, 'approved', controlNo, 'regional_approver', 'am_status', request[0].regional_approver, request[0].am_fullname, request[0].rm_fullname, comment, 'am_date', 'am_remarks')
                  Logger.loggerInfo.addContext('context', `area_approver - ${request[0].am_status}`);
                  Logger.loggerInfo.info(`${request[0].am_fullname} approving...`);
                  
                } else if (approver === 'regional_approver' && request[0].rm_status === '') {
                  updateApproverStatus(res, 'approved', controlNo, 'ram_approver', 'rm_status', request[0].ram_approver, request[0].rm_fullname, request[0].ram_fullname, comment, 'rm_date', 'rm_remarks')
                  Logger.loggerInfo.addContext('context', `regional_approver - ${request[0].rm_status}`);
                  Logger.loggerInfo.info(`${request[0].rm_fullname} approving...`);
                 
                } else if (approver === 'ram_approver' && request[0].ram_status === '') {
                  updateApproverStatus(res, 'approved', controlNo, 'ass_vpo_approver', 'ram_status', request[0].ass_vpo_approver, request[0].ram_fullname, request[0].ass_fullname, comment, 'ram_date', 'ram_remarks')
                  Logger.loggerInfo.addContext('context', `ram_approver - ${request[0].ram_status}`);
                  Logger.loggerInfo.info(`${request[0].ram_fullname} approving...`);
                  
                } else if (approver === 'ass_vpo_approver' && request[0].ass_status === '') {
                  updateApproverStatus(res, 'approved', controlNo, 'vpo_approver', 'ass_status', request[0].vpo_approver, request[0].ass_fullname, request[0].vpo_fullname, comment, 'ass_date', 'ass_remarks')
                  Logger.loggerInfo.addContext('context', `ass_vpo_approver - ${request[0].ass_vpo_status}`);
                  Logger.loggerInfo.info(`${request[0].ass_vpo_fullname} approving...`);
                  
                } else if (approver === 'vpo_approver' && request[0].vpo_status === '') {
                  updateApproverStatus(res, 'approved', controlNo, 'vpo_approver', 'vpo_status', request[0].email, request[0].vpo_fullname, '', comment, 'vpo_date', 'vpo_remarks')
                  Logger.loggerInfo.addContext('context', `vpo_approver - ${request[0].vpo_status}`);
                  Logger.loggerInfo.info(`${request[0].vpo_fullname} approving`);
                  
                }
            } else {
              Logger.loggerError.addContext('context', `approved requestStatus -> getRequestByControlNo`);
              Logger.loggerError.error(`No data found ${request}`);
            }
          }
          else {
            Logger.loggerError.addContext('context', 'approved requestStatus -> getRequestByControlNo - ');
            Logger.loggerError.error(`Error retrieving data with contol no ${controlNo} - ${err}`);
          }
        })
        // IF DISAPPROVE IS CLICKED
      } else if (req.body.disapproved) {
        branchdbConnection.query(query.getRequestByControlNo, (controlNo), (err, request, fields) => {
          if (!err) {
            if (!request.length == 0 && request[0].request_status === "pending") {
              
                  if (approver === 'area_approver' && request[0].am_status === '') {
                    updateApproverStatus(res, 'disapproved', controlNo, 'regional_approver', 'am_status', request[0].regional_approver, request[0].am_fullname, request[0].rm_fullname, comment, 'am_date', 'am_remarks')
                    Logger.loggerInfo.addContext('context', `area_approver - ${request[0].am_status}`);
                    Logger.loggerInfo.info(`${request[0].am_fullname} disapproving...`);
                    
                  } else if (approver === 'regional_approver' && request[0].rm_status === '') {
                    updateApproverStatus(res, 'disapproved', controlNo, 'ram_approver', 'rm_status', request[0].ram_approver, request[0].rm_fullname, request[0].ram_fullname, comment, 'rm_date', 'rm_remarks')
                    Logger.loggerInfo.addContext('context', `regional_approver - ${request[0].rm_status}`);
                    Logger.loggerInfo.info(`${request[0].rm_fullname} disapproving...`);
                    
                  } else if (approver === 'ram_approver' && request[0].ram_status === '') {
                    updateApproverStatus(res, 'disapproved', controlNo, 'ass_vpo_approver', 'ram_status', request[0].ass_vpo_approver, request[0].ram_fullname, request[0].ass_fullname, comment, 'ram_date', 'ram_remarks')
                    Logger.loggerInfo.addContext('context', `ram_approver - ${request[0].ram_status}`);
                    Logger.loggerInfo.info(`${request[0].ram_fullname} disapproving...`);
                    
                  } else if (approver === 'ass_vpo_approver' && request[0].ass_status === '') {
                    updateApproverStatus(res, 'disapproved', controlNo, 'vpo_approver', 'ass_status', request[0].vpo_approver, request[0].ass_fullname, request[0].vpo_fullname, comment, 'ass_date', 'ass_remarks')
                    Logger.loggerInfo.addContext('context', `ass_vpo_approver - ${request[0].ass_status}`);
                    Logger.loggerInfo.info(`${request[0].ass_fullname} disapproving...`);
                
                  } else if (approver === 'vpo_approver' && request[0].vpo_status === '') {
                    updateApproverStatus(res, 'disapproved', controlNo, 'vpo_approver', 'vpo_status', request[0].email, request[0].vpo_fullname, '', comment, 'vpo_date', 'vpo_remarks')
                    Logger.loggerInfo.addContext('context', `vpo_approver - ${request[0].vpo_status}`);
                    Logger.loggerInfo.info(`${request[0].vpo_fullname} disapproving...`);
                  }
            }
            else {
              Logger.loggerError.addContext('context', `disapproved requestStatus -> getRequestByControlNo`);
              Logger.loggerError.error(`No data found ${request}`);
            }
          }
          else {
            Logger.loggerError.addContext('context', 'disapproved requestStatus -> getRequestByControlNo - ');
            Logger.loggerError.error(`Error retrieving data with contol no ${controlNo} - ${err}`);
          }
        })
      }
    } catch (error) {
      Logger.loggerFatal.addContext('context', `requestStatus`);
      Logger.loggerFatal.fatal(`Method Error ${error}`)
    }
  },

  //REVOLVING FUND REQUEST
  sendRfRequestor(rows, approver) {
    let send = sendEmail(
      {
        subject: `Revolving Fund: ${rows.controlNo} For Approval`,
        text: 'Your approval is required for a request to proceed with its execution.',
        to: rows.email,
        from: "'Cash Request <jonalyn.mobilla@mlhuillier>'",
        template: "requestor",
        context: {
          message: 'Your request has been delivered to the approvers.',
          requestor: rows.requestor,
          approver: approver,
          status: rows.request_status,
        }
      }
    );
    return (send)
  },

  sendEmailRf(rows) {

    if (rows.type === 'Branch Manager') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Revolving Fund: ${rows.controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows.am_approver,
          from: "'Cash Request <jonalyn.mobilla@mlhuillier>'",
          template: "rfButtons",
          context: {
            // data: rows,
            approver: 'am_approver',
            controlNo: rows.controlNo,
            link:`http://127.0.0.1:3000/rev-approval/${rows.controlNo}/area_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/rev-approval/${rows.controlNo}/area_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/revolving-fund/for-approval?controlNo=${rows.controlNo}&approver=area_approver`
          }
        }
      );
      return (send)
    } else if (rows.type === 'Area Manager') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Revolving Fund: ${rows.controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows.rm_approver,
          from: "'Cash Request <jonalyn.mobilla@mlhuillier>'",
          template: "rfButtons",
          context: {
            data: rows,
            approver: 'rm_approver',
            controlNo: rows.controlNo,
            link:`http://127.0.0.1:3000/rev-approval/${rows.controlNo}/rm_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/rev-approval/${rows.controlNo}/rm_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/revolving-fund/for-approval?controlNo=${rows.controlNo}&approver=rm_approver`
          }
        }
      );
      return (send)
    } else if (rows.type === 'Regional Manager') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Revolving Fund: ${rows.controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows.ram_approver,
          from: "'Cash Request <jonalyn.mobilla@mlhuillier>'",
          template: "rfButtons",
          context: {
            data: rows,
            approver: 'ram_approver', 
            controlNo: rows.controlNo,
            link:`http://127.0.0.1:3000/rev-approval/${rows.controlNo}/ram_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/rev-approval/${rows.controlNo}/ram_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/revolving-fund/for-approval?controlNo=${rows.controlNo}&approver=ram_approver`
          }
        }
      );
      return (send)
    } else if (rows.type === 'Regional Area Manager') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Revolving Fund: ${rows.controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows.ass_vpo_approver,
          from: "'Cash Request <jonalyn.mobilla@mlhuillier>'",
          template: "rfButtons",
          context: {
            data: rows,
            approver: 'ass_approver',
            controlNo: rows.controlNo,
            link:`http://127.0.0.1:3000/rev-approval/${rows.controlNo}/ass_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/rev-approval/${rows.controlNo}/ass_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/revolving-fund/for-approval?controlNo=${rows.controlNo}&approver=ass_approver`
          }
        }
      );
      return (send)
    } else if (rows.type === 'Asst. to Vpo | Coo') {
      let send = sendEmail(
        {
          subject: `IMPORTANT! Revolving Fund: ${rows.controlNo} For Approval`,
          text: 'Your approval is required for a request to proceed with its execution.',
          to: rows.vpo_approver,
          from: "'Cash Request <jonalyn.mobilla@mlhuillier>'",
          template: "rfButtons",
          context: {
            data: rows,
            approver: 'vpo_approver',
            controlNo: rows.controlNo,
            link:`http://127.0.0.1:3000/rev-approval/${rows.controlNo}/vpo_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/rev-approval/${rows.controlNo}/vpo_approver`
            // link:`http://cashrequest.mlhuillier.com:3000/%23/home/open-request/revolving-fund/for-approval?controlNo=${rows.controlNo}&approver=vpo_approver`
          }
        }
      );
      return (send)
    }
  },

  rfRequestFlow(req, res) {
    try {

      let controlNo = req.params.controlNo;
      let approver = req.params.approver;
      let comment = req.body.comment;

      // IF APPROVE IS CLICKED
      if (req.body.approved) {
        Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow -`);
        Logger.loggerInfo.info(`req.body.approved : ${req.body.approved}`);
        branchdbConnection.query(query.getRfRequestByControlNo, (controlNo), (err, request, fields) => {
          if (!err) {
            if (!request.length == 0 && request[0].request_status === 'pending') {

                Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow -`);
                Logger.loggerInfo.info(`request_status: ${request[0].request_status}`);
                if (approver === 'am_approver' && request[0].am_status === '') {
                  updateRfApproverStatus(res, 'approved', controlNo, 'rm_approver', 'am_status', request[0].rm_approver, request[0].am_fullname, request[0].rm_fullname, comment, 'am_date', 'am_remarks')
                  Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - ${req.body.approved} - area_approver - ${request[0].am_status}`);
                  Logger.loggerInfo.info(`${request[0].am_fullname} approving...`);
                  
                } else if (approver === 'rm_approver' && request[0].rm_status === '') {
                  updateRfApproverStatus(res, 'approved', controlNo, 'ram_approver', 'rm_status', request[0].ram_approver, request[0].rm_fullname, request[0].ram_fullname, comment, 'rm_date', 'rm_remarks')
                  Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - ${req.body.approved} - rm_approver - ${request[0].rm_status}`);
                  Logger.loggerInfo.info(`${request[0].rm_fullname} approving...`);
                 
                } else if (approver === 'ram_approver' && request[0].ram_status === '') {
                  updateRfApproverStatus(res, 'approved', controlNo, 'ass_approver', 'ram_status', request[0].ass_vpo_approver, request[0].ram_fullname, request[0].ass_fullname, comment, 'ram_date', 'ram_remarks')
                  Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - ${req.body.approved} -  ram_approver - ${request[0].ram_status}`);
                  Logger.loggerInfo.info(`${request[0].ram_fullname} approving...`);
                  
                } else if (approver === 'ass_approver' && request[0].ass_status === '') {
                  updateRfApproverStatus(res, 'approved', controlNo, 'vpo_approver', 'ass_status', request[0].vpo_approver, request[0].ass_fullname, request[0].vpo_fullname, comment, 'ass_date', 'ass_remarks')
                  Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - ${req.body.approved} - ass_approver - ${request[0].ass_status}`);
                  Logger.loggerInfo.info(`${request[0].ass_fullname} approving...`);
                  
                } else if (approver === 'vpo_approver' && request[0].vpo_status === '') {
                  updateRfApproverStatus(res, 'approved', controlNo, 'vpo_approver', 'vpo_status', request[0].email, request[0].vpo_fullname, '', comment, 'vpo_date', 'vpo_remarks')
                  Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - ${req.body.approved} - vpo_approver - ${request[0].vpo_status}`);
                  Logger.loggerInfo.info(`${request[0].vpo_fullname} approving...`);
                  
                }

            }
            else {
              Logger.loggerError.addContext('context', `mailController - rfRequestFlow - getRfRequestByControlNo - ${req.body.approved} -`);
              Logger.loggerError.error(`No data found ${request}`);
            }
          }
          else {
            Logger.loggerError.addContext('context', `mailController - rfRequestFlow - getRfRequestByControlNo - ${req.body.approved} -`);
            Logger.loggerError.error(`Error retrieving data ${err}`);
          }
        })
        // IF DISAPPROVE IS CLICKED
      } else if (req.body.disapproved) {
        Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow -`);
        Logger.loggerInfo.info(`req.body.disapproved : ${req.body.disapproved}`);
        branchdbConnection.query(query.getRfRequestByControlNo, (controlNo), (err, request, fields) => {
          if (!err) {
            if (!request.length == 0 && request[0].request_status === "pending") {
                Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow -`);
                Logger.loggerInfo.info(`request_status: ${request[0].request_status}`);
                  if (approver === 'am_approver' && request[0].am_status === '') {
                    updateRfApproverStatus(res, 'disapproved', controlNo, 'rm_approver', 'am_status', request[0].rm_approver, request[0].am_fullname, request[0].rm_fullname, comment, 'am_date', 'am_remarks')
                    Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - am_approver - ${request[0].am_status}`);
                    Logger.loggerInfo.info(`${request[0].am_fullname} disapproving...`);
                    
                  } else if (approver === 'rm_approver' && request[0].rm_status === '') {
                    updateRfApproverStatus(res, 'disapproved', controlNo, 'ram_approver', 'rm_status', request[0].ram_approver, request[0].rm_fullname, request[0].ram_fullname, comment, 'rm_date', 'rm_remarks')
                    Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - rm_approver - ${request[0].rm_status}`);
                    Logger.loggerInfo.info(`${request[0].rm_fullname} disapproving...`);
                    
                  } else if (approver === 'ram_approver' && request[0].ram_status === '') {
                    updateRfApproverStatus(res, 'disapproved', controlNo, 'ass_approver', 'ram_status', request[0].ass_vpo_approver, request[0].ram_fullname, request[0].ass_fullname, comment, 'ram_date', 'ram_remarks')
                    Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - ram_approver - ${request[0].ram_status}`);
                    Logger.loggerInfo.info(`${request[0].ram_fullname} disapproving...`);
                    
                  } else if (approver === 'ass_approver' && request[0].ass_status === '') {
                    updateRfApproverStatus(res, 'disapproved', controlNo, 'vpo_approver', 'ass_status', request[0].vpo_approver, request[0].ass_fullname, request[0].vpo_fullname, comment, 'ass_date', 'ass_remarks')
                    Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - ass_approver - ${request[0].ass_status}`);
                    Logger.loggerInfo.info(`${request[0].ass_fullname} disapproving...`);
                    
                  } else if (approver === 'vpo_approver' && request[0].vpo_status === '') {
                    updateRfApproverStatus(res, 'disapproved', controlNo, 'vpo_approver', 'vpo_status', request[0].email, request[0].vpo_fullname, '', comment, 'vpo_date', 'vpo_remarks')
                    Logger.loggerInfo.addContext('context', `mailController - rfRequestFlow - vpo_approver - ${request[0].vpo_status}`);
                    Logger.loggerInfo.info(`${request[0].vpo_fullname} disapprving...`);
                    
                  }

            }
            else {
              Logger.loggerError.addContext('context', `mailController - rfRequestFlow - getRfRequestByControlNo - ${req.body.disapproved} -`);
              Logger.loggerError.error(`No data found ${request}`);
            }
          }
          else {
            Logger.loggerError.addContext('context', `mailController - rfRequestFlow - getRfRequestByControlNo - ${req.body.disapproved} -`);
            Logger.loggerError.error(`Error retrieving data ${err}`);
          }
        })
      }
    } catch (error) {
      Logger.loggerFatal.addContext('context', `rfRequestFlow`);
      Logger.loggerFatal.fatal(`Method Error ${error}`)
    }
  },

  // FOR TESTING
  getComment(req, res) {
    res.redirect('http://localhost:8080/cash-advance')
  },
  send(req, res) {
    sendEmail({
      subject: 'Exploring Gmail API',
      text: 'Hello welcome to my blog',
      to: 'jonalyn.mobilla@mlhuillier.com',
      from: '"Cash Request"<cashrequest@mlhuillier.com>',
      template: 'requestor',
    }).then(resp => {
      console.log(resp);
      res.send(resp)
    }).catch(err => {
      console.log(err);
      res.send(err)
    })
  },
  testing(req, res) {
    try {
      let isNotVpo;
      let controlno = 'RF-221014-000005';
      branchdbConnection.query(query.getRfRequestByControlNo, (controlno), (err, result, field) => {
        if (!err) {
          if (!result.length == 0) {
            console.log(result[0]);
            if (result[0].type === 'Vpo') {
              isNotVpo = false
            } else {
              isNotVpo = true
            }
            let approvedTemplate = fs.readFileSync(path.join(__dirname, '..', 'views', 'templates', 'approved_pdf.hbs'), 'utf-8');

            let context = {
              data: result[0],
              isNotVpo: isNotVpo
            }
            let template = handlebars.compile(approvedTemplate);

            let DOC = template(context);

            _createPdfStream(DOC).then((stream) => {
              _streamToBuffer(stream, function (err, buffer) {
                if (err) {
                  throw new Error(err);
                }
                let namePDF = "Control No";
                res.setHeader('Content-disposition', "inline; filename*=UTF-8''" + namePDF);
                res.setHeader('Content-type', 'application/pdf');
                // sendEmail({
                //   subject: `Revolving Fund ${controlno} REQUEST APPROVED`,
                //   to: result[0].email,
                //   from: "'Cash Request <vpo-carf@mlhuillier.com>'",
                //   template: "rfApproved",
                //   context: {
                //     data: result[0],
                //   },
                //   attachments: [{
                //     filename: `REVOLVING FUND LIQUIDATION ${controlno}.pdf`,
                //     content: buffer,
                //     contentDisposition: 'application/pdf'
                //   }]
                // });
                return res.send(buffer);
              });
            });


          } else {
            console.log(`NO DATA FOUND ${result.length}`);
          }
        } else {
          console.log(`ERROR RETRIEVING DATA ${err}`);
        }
      })
    } catch (error) {
      res.json({ err: error });
    }
  },

}