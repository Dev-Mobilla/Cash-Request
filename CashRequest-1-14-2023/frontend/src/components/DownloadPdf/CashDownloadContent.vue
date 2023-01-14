<template>
    <div style="background-color: white;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-top: 15px;">
        <div style="display: flex;justify-content: space-between;margin: 0px 15px;align-items: center;" class="pt-5">
            <img src="../../assets/ml-logo.png" alt="ml_logo"
                style="padding-right: 0;padding-left: 0px;width: 38%;height: 75px;">
            <div style="margin-right: 30px;">
                <p style="font: bold 20px Verdana">Cash Advance Request</p>
            </div>
        </div>
        <div
            style="display: flex;justify-content: space-between;align-items: center;margin-top: 20px;margin-bottom: 15px;">
            <div style="display: flex;margin-left: 30px;align-items: center;">
                <p style="font: bold 18px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-right: 10px;">Control
                    No.:</p>
                <p style="font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">{{ request.controlNo }}</p>
            </div>
            <div style="display: flex;margin-right: 45px;align-items: center;">
                <p style="font: bold 18px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-right: 10px;">Date
                    Requested
                    :</p>
                <p style="font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">{{ request.date }}</p>
            </div>
        </div>
        <!-- REQUESTOR DETAILS TABLE -->
        <table
            style="border-collapse: collapse; width: 95%;margin:auto;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;border-bottom:none;">
            <thead>
                <tr>
                    <th
                        style="text-transform:uppercase;font: bold 17px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: center;padding: 8px;">
                        Requestor Details
                    </th>
                </tr>
            </thead>
        </table>
        <!-- DETAILS TABLE -->
        <table style="border-collapse: collapse; width: 95%;margin:auto;border: 1px solid black;">
            <tbody>
                <tr style="border-bottom: 1px solid black;">
                    <td
                        style="width:17%;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        ID Number:
                    </td>
                    <td
                        style="width:12%;font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{ request.idNumber }}
                    </td>
                    <td
                        style="width:10%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Name:
                    </td>
                    <td style="width:25%;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{ request.author }}
                    </td>
                </tr>
                <tr>
                    <td
                        style="width:17%;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Job Title:
                    </td>
                    <td
                        style="width:12%;font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{ request.jobTitle }}</td>
                    <td
                        style="width:10%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Branch:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{ request.branch }}</td>
                </tr>
            </tbody>
        </table>
        <table
            style="border-collapse: collapse; width: 95%;margin:auto;border-bottom: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;border-top:none;">
            <tr>
                <td
                    style="width:10%;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                    Area:
                </td>
                <td
                    style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                    {{ request.area }}</td>
                <td
                    style="width:10%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                    Region:
                </td>
                <td
                    style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                    {{ request.region }}
                </td>
                <td
                    style="width:15%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                    Zone Code:
                </td>
                <td
                    style="width:16%;font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                    {{ request.zonecode }}</td>
            </tr>
        </table>
        <br>
        <table
            style="border-collapse: collapse; width: 95%;margin:auto;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;border-bottom:none;">
            <thead>
                <tr>
                    <th
                        style="text-transform:uppercase;font: bold 17px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: center;padding: 8px;">
                        Request Details
                    </th>
                </tr>
            </thead>
        </table>
        <table
            style="border-collapse: collapse; width: 95%;margin:auto;border-top: 1px solid black;border-left: 1px solid black;border-bottom: none;border-right: 1px solid black;">
            <tbody>
                <tr style="border-bottom: 1px solid black;">
                    <td
                        style="width:25%;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Inclusive Date of travel:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{ request.travelDate }}</td>
                    <td
                        style="width:28%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Estimated Departure Date:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{ request.departureDate }}
                    </td>
                </tr>
                <tr>
                    <td
                        style="width:25%;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Estimated Arrival Date:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{ request.arrivalDate }}</td>
                    <td
                        style="width:25%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Amount:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        PHP {{ request.amount }}</td>
                </tr>

            </tbody>
        </table>
        <table
            style="border-collapse: collapse; width: 95%;margin:auto;border-bottom: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;border-top:1px solid black;">
            <tr>
                <td
                    style="font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                    Purpose:
                </td>
                <td
                    style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                    {{ request.purpose }}
                </td>
            </tr>
        </table>
        <br>
        <!-- APPROVERS TABLE -->
        <table style="border-collapse: collapse; width: 95%;margin:auto;border: 1px solid black;">
            <thead>
                <tr style="margin: auto;">
                    <th v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2"
                        style="text-transform:uppercase;text-align: center;padding: 8px;" :style="{fontWeight: 400,borderBottom: index == 3 ? 'none': '1px solid black',borderTop: 'none',borderLeft: index == 0 ? 'none': '1px solid black',borderRight: 'none', textAlign: 'center',padding: '8px',fontFamily:['Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif']}">
                        <div>
                            <p
                                style="font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-bottom: 0px;">
                                {{ approver.status }}</p>
                            <p style="font: bold 12px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                {{ approver.date }}</p>
                            <p style="font: bold 12px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-top: 10px">
                                {{ approver.name }}
                            </p>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" 
                    :style="{fontWeight: 400,borderBottom: 'none',borderTop: 'none',borderLeft: index == 0 ? 'none': '1px solid black',borderRight: 'none', textAlign: 'center',padding: '8px',fontFamily:['Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif']}">
                        <span style="font-size: 12px">{{ approver.position }}</span>
                        <p style="margin: 0px;font-size: 12px">({{ request.region }})</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <table style="border-collapse: collapse; width: 95%;margin:auto;">
            <thead>
                <tr>
                    <th v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3"
                        style="text-transform:uppercase;text-align: center;padding: 8px;" :style="{fontWeight: 400,borderBottom: index == 2 ? 'none': '1px solid black',borderTop: 'none',borderLeft: index == 4 ? 'none': '1px solid black',borderRight: index > 4 ? 'none': '1px solid black', textAlign: 'center',padding: '8px',fontFamily:['Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif']}">
                        <div>
                            <p
                                style="font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-bottom: 0px;">
                                {{ approver.status }}</p>
                            <p style="font: bold 12px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                {{ approver.date }}</p>
                            <p style="font: bold 12px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-top: 10px">
                                {{ approver.name }}
                            </p>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" 
                        :style="{fontWeight: 400,borderBottom:  index == 2 ? 'none': '1px solid black',borderTop: 'none',borderLeft: index == 4 ? 'none': '1px solid black',borderRight: index > 4 ? 'none': '1px solid black', textAlign: 'center',padding: '8px',fontFamily:['Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif']}">
                        <span style="font-size: 12px">{{ approver.position }}</span>
                        <p style="margin: 0px;font-size: 12px">({{ request.region }})</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
        <br>
        <hr style="border-bottom: 1px solid black;margin: 0px 15px 0px 15px;">
        <div style="margin-top:13px;">
            <div style="text-align: center;">
                <h5 style="font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    AUTHORITY TO DEDUCT FROM PAYROLL</h5>
                <p style="margin-top:-1px;font: 600 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    (Unliquidated Cash Advance Full Amount)</p>
            </div>
            <br>
            <div style="width: 95%;margin: auto;margin-top:-9px;">
                <p style="font: 600 13px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    This is to authorized M.Lhuillier Financial Services -
                    HRMD Payroll Master to deduct from my salary the following amount of
                    unliquidated cash advance 5 days after completion of the purpose of
                    this cash advance.</p>
            </div>
        </div>
        <br>
        <br>
        <div style="text-align:center;justify-content:end;margin-right:50px" class="row">
            <div style="margin-right:10px">
                <p
                    style="font-size: 13px;text-transform:uppercase;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-align: center;padding:5px 2px; border-top:none;border-right:none;border-left:none;border-bottom: 1px solid black;">
                    {{ request.author }}
                </p>

                <p style="font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-transform:capitalize;
                text-align: center;padding:3px 1px; border: none;">
                    Employee
                </p>
            </div>
            <div>
                <p style="font-size: 13px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: center;
                padding:5px 0px;border-top:none;border-right:none;border-left:none;border-bottom: 1px solid black;">
                    {{ request.idNumber }}
                </p>
                <p style="font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: center;
                padding:3px 0px;border: none;">ID Number</p>
            </div>
        </div>
        <br>
        <br>
        <div id="pageFooter" style="text-align: center;margin-top: 0px;">
            <span
                style="font-size:11px;color: red;font-style:italic;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">**This
                document is computer generated and does not require any signature to be considered valid**</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DownloadContent',
    props: ['requestContent', 'approvers'],
    data() {
        return {
            // data: {
            //     idNumber: "",
            //     author: "",
            //     jobTitle: "",
            //     branch: "",
            //     area: "",
            //     region: "",
            //     amount: "",
            //     controlNo: "",
            //     date: "",
            //     travelDate: "",
            //     departureDate: "",
            //     arrivalDate: "",
            //     email: "",
            //     purpose: "",
            //     status: ""
            // },
        }
    },
    computed: {
        request() {
            return this.requestContent
        },
        allApprovers() {
            return this.approvers
        }
    }
}
</script>
<style>
#pageFooter {
    bottom: 0px;
}

.pdf-header {
    justify-content: space-between;
}

.pdf-header--title {
    background-color: #cc0404;
    padding-top: 10px;
    /* padding-bottom: 10px; */
    padding-left: 25px;
}

.pdf-header--title h4 {
    font-size: 23px;
}

.pdf-header--logo {
    padding-top: 10px;
    padding-right: 20px;
}

.row.content {
    justify-content: space-around;
    margin: 0px 0px;
}

.row.content .row input {
    font-size: 12px;
    padding: 3px 0px 2px 6px;
    border: none;
    border-bottom: 1px solid #0808087e;
    outline: none;
}

.row.content .first-row {
    justify-content: space-between;
    margin: 15px 0px;
}

.row.content .first-row .col {
    padding: 0px;
    margin-right: 10px;
}

.row.content .first-row .col p {
    font-weight: 500;
}
</style>