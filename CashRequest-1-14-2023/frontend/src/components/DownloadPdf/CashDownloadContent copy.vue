<template>
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin:0px 0px 0px 0px;font-size: 14px;">
        <div>
            <div style="padding-left: 15px;padding-top: 7px;padding-bottom: 10px;background-color: #cc0404;width: 65%;">
                <h4
                    style="margin: auto;font-size: 15px;color: white;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    Cash Advance Request</h4>
            </div>
            <img src="../../assets/logo-ml.png" alt="ml_logo"
                style="margin-top:-40px;padding-right: 0;padding-left: 0px;width: 35%;height: 60px;float:right">
        </div>
        <div class="container m-auto mb-10 pb-13" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <v-col class="ml-3 advance--info mb-5">
                <p class="font-weight-bold">Advance Information:</p>
            </v-col>
            <br>
            <table style="border-collapse: collapse; width: 95%;margin:auto;">
                <tbody>
                    <tr>
                        <td style="width:15%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">ID Number:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.idNumber}}</td>
                        <td style="width:20%;font-weight: 500; text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Control No:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.controlNo}}</td>
                    </tr>

                    <tr>
                        <td style="width:15%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Requestor:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.author}}</td>
                        <td style="width:20%;font-weight: 500;text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Date:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.date}}</td>
                    </tr>
                    <tr>
                        <td style="width:15%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Job Title:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.jobTitle}}</td>
                        <td style="width:20%;font-weight: 500; text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Inclusive Date Of Travel:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.travelDate}}</td>
                    </tr>
                    <tr>
                        <td style="width:15%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Branch:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.branch}}</td>
                        <td style="width:20%;font-weight: 500; text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Estimated Departure Date:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.departureDate}}</td>
                    </tr>
                    <tr>
                        <td style="width:15%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Area:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.area}}</td>
                        <td style="width:20%;font-weight: 500; text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;;">Estimated Arrival Date:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.arrivalDate}}</td>
                    </tr>
                    <tr>
                        <td style="width:15%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Region:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.region}}</td>
                        <td style="width:20%;font-weight: 500;text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Amount:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.amount}}</td>
                    </tr>
                    <tr>
                        <td style="width:15%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:12px;">Zone Code:</td>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:10px;">{{request.zonecode}}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="border-collapse: collapse; width: 95%;margin:auto;">
                <tbody>
                    <tr>
                        <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Purpose:</td>
                    </tr>
                    <tr>
                        <td style="width:27%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.purpose}}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <table style="border-collapse: collapse; width: 95%;margin:auto;">
                <thead>
                    <tr style="margin: auto;">
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="text-transform:uppercase;border: 1px solid #dddddd;font-weight: 500;text-align: center;padding: 8px;
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                            <div>
                                <p class="approved"
                                    :style="{color: approver.status === 'approved'? 'green': approver.status === 'disapproved'? 'red': 'black', fontSize:'12px'}">
                                    {{ approver.status }}</p>
                                <p style="text-transform:uppercase;font-size: 12px;">{{approver.date}}</p>
                                <p style="font-size: 12px;margin-top: 10px">
                                    {{approver.name}}
                                </p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="font-weight: 400;border: 1px solid #dddddd; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    ">
                            <span style="font-size: 10px">{{ approver.position }}</span>
                            <p style="margin: 0px;font-size: 10px">({{request.region}})</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="border-collapse: collapse; width: 95%;margin:auto;">
                <thead>
                    <tr style="margin: auto;">
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="text-transform:uppercase;border: 1px solid #dddddd;font-weight: 500;text-align: center;padding: 8px;
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                            <div>
                                <p class="approved"
                                    :style="{color: approver.status === 'approved'? 'green': approver.status === 'disapproved'? 'red': 'black', fontSize:'12px'}">
                                    {{ approver.status }}</p>
                                <p style="text-transform:uppercase;font-size: 12px;">{{approver.date}}</p>
                                <p style="font-size: 12px;margin-top: 10px">
                                    {{approver.name}}
                                </p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="font-weight: 400;border: 1px solid #dddddd; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    ">
                            <span style="font-size: 10px">{{ approver.position }}</span>
                            <p style="margin: 0px;font-size: 10px">({{request.region}})</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <hr style="border-bottom: 1px solid #dddddd;margin: 0px 15px 0px 15px;">
            <div style="margin-top:13px;">
                <div style="text-align: center;">
                    <h5
                        style="font-size:10px;font-weight:600 ;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                        AUTHORITY TO DEDUCT FROM PAYROLL</h5>
                    <p
                        style="margin-top:-1px;font-size: 10px;font-weight:500 ;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                        (Unliquidated Cash Advance Full Amount)</p>
                </div>
                <br>
                <div style="width: 95%;margin: auto;" class="mt-2">
                    <p
                        style="font-weight:400 ;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 9px;">
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
                        style="font-size: 10px;text-transform:uppercase;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-align: center;padding:5px 2px; border-radius: 3px; border-top:none;border-right:none;border-left:none;border-bottom: 1px solid #dddddd;">
                       {{ request.author }}
                    </p>

                    <p style="font-weight:400;font-size: 12px;text-transform:capitalize;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-align: center;padding:3px 1px; border: none;">
                        Employee
                    </p>
                </div>
                <div>
                    <p
                        style="font-size: 10px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: center;
                padding:5px 0px;border-radius: 3px;border-top:none;border-right:none;border-left:none;border-bottom: 1px solid #dddddd;">
                        {{ request.idNumber }}
                    </p>
                    <p style="font-weight:400;font-size: 12px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: center;
                padding:3px 0px;border: none;">ID Number</p>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div id="pageFooter" style="text-align: center;margin-top: 10px;">
            <span
                style="font-size:8px;color: red;font-style:italic;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">**This
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