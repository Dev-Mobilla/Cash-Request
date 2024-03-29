//KPUSERS
const getByBranchCodeZoneCode = "SELECT regionname, areaname, branchname FROM branches WHERE BranchCode = ? AND zonecode = ?";
const getUserById = "SELECT bu.BranchCode, bu.ZoneCode, bu.fullname,su.EmailAddress, su.RoleID FROM sysuseraccounts su INNER JOIN branchusers bu ON bu.ResourceID = su.ResourceID WHERE bu.ResourceID = ?";

//BRANCH_REQUEST
const postRequest = "INSERT INTO cash_advance_request (idNumber, author,jobTitle, branch,area, areaCode, region,zonecode,purpose,controlNo,date,travelDate,departureDate,arrivalDate,amount,area_approver,am_email, am_status,am_date,regional_approver,rm_email,rm_status,rm_date,ram_approver,ram_email,ram_status, ram_date,ass_vpo_approver,ass_email,ass_status,ass_date,vpo_approver,vpo_email,vpo_status,vpo_date,request_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
// const getRequestByControlNo = "SELECT ca.id AS id, ca.idNumber AS idNumber, ca.author AS author, ca.jobTitle AS jobTitle, ca.branch AS branch, ca.area AS area,ca.region AS region, ca.email AS email, ca.purpose AS purpose, ca.controlNo AS controlNo, ca.date AS `date`, ca.travelDate AS travelDate,ca.departureDate AS departureDate, ca.arrivalDate AS arrivalDate, ca.amount AS amount, ca.area_approver AS area_approver, ca.am_status AS am_status,ca.am_date AS am_date,ca.am_remarks AS am_remarks,ca.regional_approver AS regional_approver, ca.rm_status AS rm_status,ca.rm_date AS rm_date, ca.rm_remarks AS rm_remarks, ca.ram_approver AS ram_approver, ca.ram_status AS ram_status,ca.ram_date AS ram_date, ca.ram_remarks AS ram_remarks, ca.ass_vpo_approver AS ass_vpo_approver,ca.ass_status AS ass_status,ca.ass_date AS ass_date, ca.ass_remarks AS ass_remarks, ca.vpo_approver AS vpo_approver, ca.vpo_status AS vpo_status,ca.vpo_date AS vpo_date, ca.vpo_remarks AS vpo_remarks, ca.request_status AS request_status,am.fullname AS am_fullname, rm.fullname AS rm_fullname, ram.fullname AS ram_fullname, ass.fullname AS ass_fullname, vpo.fullname AS vpo_fullname FROM `branch_request`.`cash_advance_request` ca INNER JOIN `branch_request`.`am_approvers` am ON am.email = ca.area_approver INNER JOIN rm_approvers rm ON rm.email = ca.regional_approver INNER JOIN ram_approvers ram ON ram.email = ca.ram_approver INNER JOIN ass_vpo_approvers ass ON ass.email = ca.ass_vpo_approver INNER JOIN vpo_approver vpo ON vpo.email = ca.vpo_approver WHERE controlNo = ?"
const getMaxId = "SELECT id FROM cash_advance_request WHERE id = (SELECT MAX(id) FROM cash_advance_request)";
const deleteRequest = "DELETE FROM cash_advance_request WHERE controlNo = ?";
// const getRequestByControlNo = "SELECT ca.id AS id, ca.idNumber AS idNumber, ca.author AS author, ca.jobTitle AS jobTitle, ca.branch AS branch, ca.area AS `area`, ca.region AS region, ca.email AS email, ca.purpose AS purpose, ca.controlNo AS controlNo, ca.date AS `date`, ca.travelDate AS travelDate,ca.departureDate AS departureDate, ca.arrivalDate AS arrivalDate, ca.amount AS amount, ca.area_approver AS area_approver, ca.am_status AS am_status,ca.am_date AS am_date,ca.am_remarks AS am_remarks, ca.regional_approver AS regional_approver, ca.rm_status AS rm_status,ca.rm_date AS rm_date, ca.rm_remarks AS rm_remarks, ca.ram_approver AS ram_approver, ca.ram_status AS ram_status,ca.ram_date AS ram_date, ca.ram_remarks AS ram_remarks, ca.ass_vpo_approver AS ass_vpo_approver,ca.ass_status AS ass_status,ca.ass_date AS ass_date, ca.ass_remarks AS ass_remarks, ca.vpo_approver AS vpo_approver, ca.vpo_status AS vpo_status,ca.vpo_date AS vpo_date, ca.vpo_remarks AS vpo_remarks, ca.request_status AS request_status, (CASE WHEN (ca.area_approver = NULL) THEN NULL ELSE (SELECT fullname FROM am_approvers WHERE email = ca.area_approver) END ) AS am_fullname, (CASE WHEN (ca.regional_approver = NULL) THEN NULL ELSE (SELECT fullname FROM rm_approvers WHERE email = ca.regional_approver) END ) AS rm_fullname, (CASE WHEN (ca.ram_approver = NULL) THEN NULL ELSE (SELECT fullname FROM ram_approvers WHERE email = ca.ram_approver) END ) AS ram_fullname, (CASE WHEN (ca.ass_vpo_approver = NULL) THEN NULL ELSE (SELECT fullname FROM ass_vpo_approvers WHERE email = ca.ass_vpo_approver) END ) AS ass_fullname, (CASE WHEN (ca.vpo_approver = NULL) THEN NULL ELSE(SELECT fullname FROM vpo_approver WHERE email = ca.vpo_approver)END) AS vpo_fullname FROM cash_advance_request ca LEFT JOIN am_approvers am ON ca.area_approver = am.email LEFT JOIN rm_approvers rm ON ca.regional_approver  = rm.email LEFT JOIN ram_approvers ram ON ca.ram_approver = ram.email LEFT JOIN ass_vpo_approvers ass ON ca.ass_vpo_approver = ass.email LEFT JOIN vpo_approver vpo ON ca.vpo_approver  = vpo.email WHERE controlNo = ?"
const getRequestByControlNo = "SELECT * FROM cash_advance_request WHERE controlNo = ?"

//RF REQUEST
const getRfRequestByControlNo = "SELECT * FROM revolving_fund_request WHERE controlNo = ?";
const getRfMaxId = "SELECT id FROM revolving_fund_request WHERE id = (SELECT MAX(id) FROM revolving_fund_request)";
const postRfRequest = "INSERT INTO revolving_fund_request (rfDate, idNumber,requestor,baseBranch, area, areaCode, region,zonecode,period,controlNo,rfAllowance,pendingRf,totalExpenses,cashOnHand,transportation,officeSupplies,meals,others,purpose,am_approver,am_email, am_status, am_date, am_email_date, rm_approver,rm_email, rm_status, rm_date, rm_email_date,ram_approver,ram_email,ram_status, ram_date, ram_email_date,ass_vpo_approver,ass_email,ass_status,ass_date,ass_email_date ,vpo_approver,vpo_email ,vpo_status,vpo_date,vpo_email_date,request_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
// const getRfRequestByControlNo = "SELECT rf.id AS id, rf.type AS type, rf.rfDate AS rf_date, rf.requestor AS requestor, rf.baseBranch AS baseBranch, rf.region AS region,rf.email AS email,rf.period AS period, rf.controlNo AS controlNo, rf.rfAllowance AS allowance, rf.pendingRf AS pendingRf, rf.totalExpenses AS totalExpenses, rf.cashOnHand AS cashOnHand, rf.transportation AS transportation, rf.officeSupplies AS officeSupplies, rf.meals AS meals, rf.others AS others, rf.total AS total, rf.purpose AS purpose, rf.am_approver AS am_approver, rf.am_status AS am_status, rf.am_date AS am_date, rf.am_remarks AS am_remarks, rf.rm_approver AS rm_approver, rf.rm_status AS rm_status, rf.rm_date AS rm_date, rf.rm_remarks AS rm_remarks, rf.ram_approver AS ram_approver, rf.ram_status AS ram_status, rf.ram_remarks AS ram_remarks, rf.ram_date AS ram_date, rf.ass_vpo_approver AS ass_vpo_approver,rf.ass_status AS ass_status, rf.ass_date AS ass_date, rf.ass_remarks AS ass_remarks, rf.vpo_approver AS vpo_approver, rf.vpo_status AS vpo_status, rf.vpo_date AS vpo_date,rf.vpo_remarks AS vpo_remarks, rf.request_status AS request_status, (CASE WHEN (rf.am_approver = NULL) THEN NULL ELSE (SELECT fullname FROM am_approvers WHERE email = rf.am_approver) END ) AS am_fullname, (CASE WHEN (rf.rm_approver = NULL) THEN NULL ELSE (SELECT fullname FROM rm_approvers WHERE email = rf.rm_approver) END ) AS rm_fullname, (CASE WHEN (rf.ram_approver = NULL) THEN NULL ELSE (SELECT fullname FROM ram_approvers WHERE email = rf.ram_approver) END ) AS ram_fullname, (CASE WHEN (rf.ass_vpo_approver = NULL) THEN NULL ELSE (SELECT fullname FROM ass_vpo_approvers WHERE email = rf.ass_vpo_approver) END ) AS ass_fullname,(CASE WHEN (rf.vpo_approver = NULL) THEN NULL ELSE(SELECT fullname FROM vpo_approver WHERE email = rf.vpo_approver)END) AS vpo_fullname FROM revolving_fund_request rf LEFT JOIN am_approvers am ON am.email = rf.am_approver LEFT JOIN rm_approvers rm ON rm.email = rf.rm_approver LEFT JOIN ram_approvers ram ON ram.email = rf.ram_approver LEFT JOIN ass_vpo_approvers ass ON ass.email = rf.ass_vpo_approver LEFT JOIN vpo_approver vpo ON vpo.email = rf.vpo_approver WHERE controlNo = ?";
const updateRfRequestStatus = "UPDATE revolving_fund_request SET request_status = ? , duration = ? WHERE controlNo = ?";

// const getAllRequestsCa = "SELECT date, controlNo, amount, region, branch, author, request_status AS status, duration AS duration FROM cash_advance_request WHERE idNumber = ? AND request_status = ?";
const getAllRequestsCa = "SELECT * FROM cash_advance_request WHERE idNumber = ? AND request_status = ?";

const getAllRequestsCaByStatus = "SELECT * FROM cash_advance_request WHERE request_status = ?";

const getAllRequestsRfByStatus = "SELECT * FROM revolving_fund_request WHERE request_status = ?";

const getAllRequestsRf = "SELECT * FROM revolving_fund_request WHERE idNumber = ? AND request_status = ?";
// const getAllRequestsRf = "SELECT rfDate AS `date`, controlNo, totalExpenses AS total, cashOnHand , region, baseBranch AS branch, requestor, request_status AS `status`, duration AS duration FROM revolving_fund_request WHERE idNumber = ? AND request_status = ?";

const getUserRole = "SELECT email AS am_approver FROM `am_approvers` WHERE email = ? UNION SELECT email AS rm_approver FROM `rm_approvers` WHERE email = ? UNION SELECT email AS ram_approver FROM `ram_approvers` WHERE email = ? UNION SELECT email AS ass_vpo_approver FROM `ass_vpo_approvers` WHERE email = ? UNION SELECT email AS vpo_approver FROM `vpo_approver` WHERE email = ?"

const CheckCashRequestStatus = "SELECT * FROM cash_advance_request WHERE request_status = 'pending' AND controlNo = ?"

const updateRequestStatus = "UPDATE cash_advance_request SET request_status = ?, duration = ? WHERE controlNo = ?";

const CheckRevRequestStatus = "SELECT * FROM revolving_fund_request WHERE request_status = 'pending' AND controlNo = ?"

const UpdateRequestDetailsByControlNo = "UPDATE cash_advance_request SET amount = ?, arrivalDate = ?, departureDate = ?, travelDate = ?, purpose = ?  WHERE controlNo = ?"

const getRequestorEmailVisayas = "SELECT email FROM `branch_requestor` WHERE branch = ? AND zone IN ('VISAYAS', 'VISMIN', 'LUZON', 'NCR', 'LNCR', 'SHOWROOM')";

// const getRequestorEmailLuzon = "SELECT email FROM `branch_requestor` WHERE branch = ? AND zone IN ('LUZON', 'NCR', LNCR)";
// const getRequestorEmailShowroom = "SELECT email FROM `branch_requestor` WHERE branch = ? AND zone in ('SHOWROOM')";

module.exports = {
    getUserById,
    getByBranchCodeZoneCode,
    getRequestByControlNo,
    postRequest,
    getMaxId,
    deleteRequest,
    getRfMaxId,
    postRfRequest,
    getRfRequestByControlNo,
    updateRequestStatus,
    updateRfRequestStatus,
    getAllRequestsCa,
    getAllRequestsRf,
    getUserRole,
    CheckCashRequestStatus,
    CheckRevRequestStatus,
    UpdateRequestDetailsByControlNo,
    getRequestorEmailVisayas,
    getAllRequestsCaByStatus,
    getAllRequestsRfByStatus,
}