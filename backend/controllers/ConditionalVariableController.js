module.exports = {

    getApproverQuery(approver) {
        let approverEmailDateColumn = "";

        switch (approver) {
            case "AM":
                approverEmailDateColumn = "am_email_date"
                break;
            case "RM":
                approverEmailDateColumn = "rm_email_date"
                break;
            case "RAM":
                approverEmailDateColumn = "ram_email_date"
                break;

            case "VPO Asst.":
                approverEmailDateColumn = "ass_email_date"
                break;

            case "VPO":
                approverEmailDateColumn = "vpo_email_date"
                break;

            default:
                break;
        }
        return approverEmailDateColumn;

    },
    getApprovers(request) {
        let approver = []

        request.map(element => {
            if (!element.am_approver == '') {
                approver.push(
                    {
                        name: element.am_approver,
                        status: element.am_status,
                        approver: 'am_approver',
                    }
                )
            }
            if (!element.rm_approver == '') {
                approver.push(
                    {
                        name: element.rm_approver,
                        status: element.rm_status,
                        approver: 'rm_approver',
                    }
                )
            }
            if (!element.ram_approver == '') {
                approver.push(
                    {
                        name: element.ram_approver,
                        status: element.ram_status,
                        approver: 'ram_approver',
                    }
                )
            }
            if (!element.ass_vpo_approver == '') {
                approver.push(
                    {
                        name: element.ass_vpo_approver,
                        status: element.ass_status,
                        approver: 'ass_approver',
                    }
                )
            }
            if (!element.vpo_approver == '') {
                approver.push(
                    {
                        name: element.vpo_approver,
                        status: element.vpo_status,
                        approver: 'vpo_approver',
                    }
                )
            }

        })
        return approver;
    },
    approverToFllwUp(requests) {
        let request = requests

        let req = request.map(request => {
            let approver = []

            if (!request.area_approver == '' && request.am_status == '') {
                approver.push(
                    {
                        status: request.am_status,
                        approver: 'area_approver',
                        position: 'AM',
                        date: request.am_email_date,
                        controlNo: request.controlNo,
                        email: request.am_email
                    }
                )
            }
            if (!request.regional_approver == '' && request.rm_status == '' && request.am_status == 'approved') {
                approver.push(
                    {
                        status: request.rm_status,
                        approver: 'rm_approver',
                        position: 'RM',
                        date: request.rm_email_date,
                        controlNo: request.controlNo,
                        email: request.rm_email

                    }
                )
            }
            if (!request.ram_approver == '' && request.ram_status == '' && request.rm_status == 'approved') {
                approver.push(
                    {
                        status: request.ram_status,
                        approver: 'ram_approver',
                        position: 'RAM',
                        date: request.ram_email_date,
                        controlNo: request.controlNo,
                        email: request.ram_email

                    }
                )
            }
            if (!request.ass_vpo_approver == '' && request.ass_status == '' && request.ram_status == 'approved') {
                approver.push(
                    {
                        status: request.ass_status,
                        approver: 'ass_approver',
                        position: 'VPO Asst.',
                        date: request.ass_email_date,
                        controlNo: request.controlNo,
                        email: request.ass_email

                    }
                )
            }
            if (!request.vpo_approver == '' && request.vpo_status == '' && request.ass_status == 'approved') {
                approver.push(
                    {
                        status: request.vpo_status,
                        approver: 'vpo_approver',
                        position: 'VPO',
                        date: request.vpo_email_date,
                        controlNo: request.controlNo,
                        email: request.vpo_email
                    }
                )
            }
            return approver
        })



        return req
    },
    approverToFllwUpApprover(requests) {
        let request = requests

        let req = request.map(request => {
            let approver = []
            let status = 'approved'

            if (!request.regional_approver == '' && request.rm_status == '') {
                approver.push(
                    {
                        status: request.rm_status,
                        approver: 'rm_approver',
                        position: 'RM',
                        date: request.rm_email_date,
                        controlNo: request.controlNo,
                        email: request.rm_email

                    }
                )
            }
            if (!request.ram_approver == '' && request.ram_status == '') {

                if (!request.regional_approver == '' && request.rm_status == status) {
                    approver.push(
                        {
                            status: request.ram_status,
                            approver: 'ram_approver',
                            position: 'RAM',
                            date: request.ram_email_date,
                            controlNo: request.controlNo,
                            email: request.ram_email

                        }
                    )
                }
                else if (request.regional_approver == '') {

                    approver.push(
                        {
                            status: request.ram_status,
                            approver: 'ram_approver',
                            position: 'RAM',
                            date: request.ram_email_date,
                            controlNo: request.controlNo,
                            email: request.ram_email

                        }
                    )

                }
            }
            if (!request.ass_vpo_approver == '' && request.ass_status == '') {
                if (!request.ram_approver == '' && request.ram_status == status) {

                    approver.push(
                        {
                            status: request.ass_status,
                            approver: 'ass_approver',
                            position: 'VPO Asst.',
                            date: request.ass_email_date,
                            controlNo: request.controlNo,
                            email: request.ass_email

                        }
                    )
                }
                else if (request.ram_approver == '') {

                    approver.push(
                        {
                            status: request.ass_status,
                            approver: 'ass_approver',
                            position: 'VPO Asst.',
                            date: request.ass_email_date,
                            controlNo: request.controlNo,
                            email: request.ass_email

                        }
                    )
                }
            }
            if (!request.vpo_approver == '' && request.vpo_status == '') {
                if (!request.ass_vpo_approver == '' && request.ass_status == status) {
                    approver.push(
                        {
                            status: request.vpo_status,
                            approver: 'vpo_approver',
                            position: 'VPO',
                            date: request.vpo_email_date,
                            controlNo: request.controlNo,
                            email: request.vpo_email

                        }
                    )
                }
                else if (request.ass_vpo_approver == '') {

                    approver.push(
                        {
                            status: request.vpo_status,
                            approver: 'vpo_approver',
                            position: 'VPO',
                            date: request.vpo_email_date,
                            controlNo: request.controlNo,
                            email: request.vpo_email

                        }
                    )
                }
            }

            return approver
        })

        return req
    },
    approverToFllwUpApprover_Revolving(requests) {
        let request = requests

        let req = request.map(request => {
            let approver = []
            let status = 'approved'

            if (!request.rm_approver == '' && request.rm_status == '') {
                approver.push(
                    {
                        status: request.rm_status,
                        approver: 'rm_approver',
                        position: 'RM',
                        date: request.rm_email_date,
                        controlNo: request.controlNo,
                        email: request.rm_email

                    }
                )
            }
            if (!request.ram_approver == '' && request.ram_status == '') {

                if (!request.rm_approver == '' && request.rm_status == status) {
                    approver.push(
                        {
                            status: request.ram_status,
                            approver: 'ram_approver',
                            position: 'RAM',
                            date: request.ram_email_date,
                            controlNo: request.controlNo,
                            email: request.ram_email

                        }
                    )
                }
                else if (request.rm_approver == '') {

                    approver.push(
                        {
                            status: request.ram_status,
                            approver: 'ram_approver',
                            position: 'RAM',
                            date: request.ram_email_date,
                            controlNo: request.controlNo,
                            email: request.ram_email

                        }
                    )

                }
            }
            if (!request.ass_vpo_approver == '' && request.ass_status == '') {
                if (!request.ram_approver == '' && request.ram_status == status) {

                    approver.push(
                        {
                            status: request.ass_status,
                            approver: 'ass_approver',
                            position: 'VPO Asst.',
                            date: request.ass_email_date,
                            controlNo: request.controlNo,
                            email: request.ass_email

                        }
                    )
                }
                else if (request.ram_approver == '') {

                    approver.push(
                        {
                            status: request.ass_status,
                            approver: 'ass_approver',
                            position: 'VPO Asst.',
                            date: request.ass_email_date,
                            controlNo: request.controlNo,
                            email: request.ass_email

                        }
                    )
                }
            }
            if (!request.vpo_approver == '' && request.vpo_status == '') {
                if (!request.ass_vpo_approver == '' && request.ass_status == status) {
                    approver.push(
                        {
                            status: request.vpo_status,
                            approver: 'vpo_approver',
                            position: 'VPO',
                            date: request.vpo_email_date,
                            controlNo: request.controlNo,
                            email: request.vpo_email

                        }
                    )
                }
                else if (request.ass_vpo_approver == '') {

                    approver.push(
                        {
                            status: request.vpo_status,
                            approver: 'vpo_approver',
                            position: 'VPO',
                            date: request.vpo_email_date,
                            controlNo: request.controlNo,
                            email: request.vpo_email

                        }
                    )
                }
            }

            return approver
        })

        return req
    },
    approverToFllwUp_Revolving(requests) {
        let request = requests

        let req = request.map(request => {
            let approver = []

            if (!request.am_approver == '' && request.am_status == '') {
                approver.push(
                    {
                        status: request.am_status,
                        approver: 'am_approver',
                        position: 'AM',
                        date: request.am_email_date,
                        controlNo: request.controlNo,
                        email: request.am_email
                    }
                )
            }
            if (!request.rm_approver == '' && request.rm_status == '' && request.am_status == 'approved') {
                approver.push(
                    {
                        status: request.rm_status,
                        approver: 'rm_approver',
                        position: 'RM',
                        date: request.rm_email_date,
                        controlNo: request.controlNo,
                        email: request.rm_email

                    }
                )
            }
            if (!request.ram_approver == '' && request.ram_status == '' && request.rm_status == 'approved') {
                approver.push(
                    {
                        status: request.ram_status,
                        approver: 'ram_approver',
                        position: 'RAM',
                        date: request.ram_email_date,
                        controlNo: request.controlNo,
                        email: request.ram_email

                    }
                )
            }
            if (!request.ass_vpo_approver == '' && request.ass_status == '' && request.ram_status == 'approved') {
                approver.push(
                    {
                        status: request.ass_status,
                        approver: 'ass_approver',
                        position: 'VPO Asst.',
                        date: request.ass_email_date,
                        controlNo: request.controlNo,
                        email: request.ass_email

                    }
                )
            }
            if (!request.vpo_approver == '' && request.vpo_status == '' && request.ass_status == 'approved') {
                approver.push(
                    {
                        status: request.vpo_status,
                        approver: 'vpo_approver',
                        position: 'VPO',
                        date: request.vpo_email_date,
                        controlNo: request.controlNo,
                        email: request.vpo_email
                    }
                )
            }
            return approver
        })

        return req
    },
    getAppEmailQuery(zone, approvers) {
        let myQuery = '';

        if (zone == 'VISMIN' || zone == 'VISAYAS') {

            myQuery = `CALL Get_Approvers_Email_Vismin('${approvers.amId}', '${approvers.rmId}', '${approvers.ramId}', '${approvers.asstId}', '${approvers.vpoId}')`
            

        } else if (zone == 'LUZON' || zone == 'NCR' || zone == 'LNCR') {

            myQuery = `CALL Get_Approvers_Email_Luzon('${approvers.amId}', '${approvers.rmId}', '${approvers.ramId}', '${approvers.asstId}', '${approvers.vpoId}')`
            
        }

        return myQuery
    },
    
}