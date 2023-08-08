const dotenv = require('dotenv');
dotenv.config()

const setTransporter = require('../mail/mailConfig');

//CONSTRUCTOR NODEMAILER
const SendEmail = async (options) => {
    let gmailTransporter = await setTransporter();
    return await gmailTransporter.sendMail(options);
};

//CASH ADVANCE EMAIL NEXT APPROVER PENDING REQUEST
const SendEmailNotificationCashNextApprover = async (controlNo, appName, nextAppEmail) => {

    let send = SendEmail(
        {
            subject: `Cash Request System Pending Approval: ${controlNo}`,
            to: nextAppEmail,
            from: "'M Lhuillier <vpo-carf@mlhuillier.com>'",
            template: "nextApprover",
            context: {
                approver: appName,
                controlNo: controlNo,
                // link: `${process.env.REQUEST_LINK}/#/home/open-request/cash-advance?controlNo=${controlNo}`,
            }
        }
    );
    return send
}

//REVOLVING FUND EMAIL NEXT APPROVER PENDING REQUEST
const SendEmailNotificationNextRfApprover = async (controlNo, appName, nextAppEmail) => {

    let send = SendEmail(
        {
            subject: `Cash Request System Pending Approval: ${controlNo}`,
            to: nextAppEmail,
            from: "'M Lhuillier <vpo-carf@mlhuillier.com>'",
            template: "nextApproverRf",
            context: {
                approver: appName,
                controlNo: controlNo,
                // link: `${process.env.REQUEST_LINK}/#/home/open-request/revolving-fund?controlNo=${controlNo}`,
                link: `${process.env.REQUEST_LINK}/api/getForm`,
            }
        }
    );
    return send
}

//CASH ADVANCE EMAIL APPROVED REQUEST
const SendEmailNotificationCashRequestorApproved = (controlNo, reqEmail) => {

    let send = SendEmail(
        {
            subject: `Cash Request System Approved: ${controlNo}`,
            to: reqEmail,
            from: "'M Lhuillier <vpo-carf@mlhuillier.com>'",
            template: "approved",
            context: {
                controlNo: controlNo,
                link: `${process.env.REQUEST_LINK}/#/home/close-request/cash-advance?controlNo=${controlNo}`,
            }
        }
    );
    return send
}

//REVOLVNG FUND EMAIL APPROVED REQUEST
const SendEmailNotificationRevolvingRequestorApproved = (controlNo, reqEmail) => {

    let send = SendEmail(
        {
            subject: `Cash Request System Approved: ${controlNo}`,
            to: reqEmail,
            from: "'M Lhuillier <vpo-carf@mlhuillier.com>'",
            template: "approved",
            context: {
                controlNo: controlNo,
                link: `${process.env.REQUEST_LINK}/#/home/close-request/revolving-fund?controlNo=${controlNo}`,
            }
        }
    );
    return send
}

//CASH ADVANCE EMAIL: REQUEST FOR APPROVAL
const SendEmailNotificationCashApproval = (controlNo, appName, appEmail) => {

    let send = SendEmail(
        {
            subject: `Cash Request System ${appName}: ${controlNo}`,
            to: appEmail,
            from: "'M Lhuillier <vpo-carf@mlhuillier.com>'",
            template: "approver",
            context: {
                controlNo: controlNo,
                link: `${process.env.REQUEST_LINK}/#/home/open-request/cash-advance/for-approval?controlNo=${controlNo}`,
            }
        }
    );
    return send

}

//REVOLVING FUND EMAIL: REQUEST FOR APPROVAL
const SendEmailNotificationRevApproval = (controlNo, appName, appEmail) => {

    let send = SendEmail(
        {
            subject: `Cash Request System ${appName}: ${controlNo}`,
            to: appEmail,
            from: "'M Lhuillier <vpo-carf@mlhuillier.com>'",
            template: "approver",
            context: {
                controlNo: controlNo,
                link: `${process.env.REQUEST_LINK}/#/home/open-request/revolving-fund/for-approval?controlNo=${controlNo}`,
            }
        }
    )

    return send

}

//CASH ADVANCE EMAIL: REQUEST FOR FOLLOW UP APPROVAL
const SendEmailNotificationCashFollwup = (controlNo, reqEmail) => {

    let send = SendEmail(
        {
            subject: `Cash Request System Follow up Approval: ${controlNo}`,
            to: reqEmail,
            from: "'M Lhuillier <vpo-carf@mlhuillier.com>'",
            template: "followUp",
            context: {
                controlNo: controlNo,
                link: `${process.env.REQUEST_LINK}/#/home/close-request/cash-advance?controlNo=${controlNo}`,
            }
        }
    );
    return send
}

//REVOLVING FUND EMAIL: REQUEST FOR FOLLOW UP APPROVAL
const SendEmailNotificationRevolvingFollwup = (controlNo, reqEmail) => {

    let send = SendEmail(
        {
            subject: `Cash Request System Follow up Approval: ${controlNo}`,
            to: reqEmail,
            from: "'M Lhuillier <vpo-carf@mlhuillier.com>'",
            template: "followUp",
            context: {
                controlNo: controlNo,
                link: `${process.env.REQUEST_LINK}/#/home/close-request/revolving-fund?controlNo=${controlNo}`,
            }
        }
    );
    return send
}

module.exports = {
    SendEmailNotificationCashRequestorApproved,
    SendEmailNotificationRevolvingRequestorApproved,
    SendEmailNotificationCashApproval,
    SendEmailNotificationRevApproval,
    SendEmailNotificationCashFollwup,
    SendEmailNotificationRevolvingFollwup,
    SendEmailNotificationCashNextApprover,
    SendEmailNotificationNextRfApprover
}