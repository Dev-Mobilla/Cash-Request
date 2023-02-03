<template>
    <div style="margin:0px 0px 0px 0px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div>
            <div style="padding-left: 15px;padding-top: 7px;padding-bottom: 10px;background-color: #cc0404;width: 65%;">
                <h4
                    style="margin: auto;font-size: 15px;color: white;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    Revolving Fund Liquidation</h4>
            </div>
            <img src="../../assets/logo-ml.png" alt="ml_logo"
                style="margin-top:-40px;padding-right: 0;padding-left: 0px;width: 35%;height: 60px;float:right">
        </div>
        <!-- okay na bawbaw -->
        <!-- second--col -->
        <br>
        <br>
        <table style="border-collapse: collapse; width: 95%;margin:auto;">
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">ID Number:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.idNumber}}</td>
                <td style="width:20%;font-weight: 500; text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Control No:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.controlNo}}</td>
            </tr>

            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Date: </td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.date}}</td>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Period:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.period}}</td>
            </tr>
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Requestor:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.requestor}}</td>
                <td style="width:20%;font-weight: 500; text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">RF Allowance:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.rfAllowance}}</td>
            </tr>
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Base Branch:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.branch}}</td>
                <td style="width:20%;font-weight: 500; text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Pending RF:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.pendingRf}}</td>
            </tr>
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Region:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.region}}</td>
            </tr>
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Zone Code:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.zonecode}}</td>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Cash On Hand:
                </td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.cashOnHand}}</td>
            </tr>
        </table>
        <br>
        <br>
        <table style="border-collapse: collapse; width: 95%;margin:auto;">
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Transportation:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.transpo}}</td>
                <td style="margin-left: 5px;width:20%;font-weight: 500; text-align: left;padding: 8px 8px 8px 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Purpose:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.purpose}}</td>
            </tr>
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Office Supplies: </td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.officeSupplies}}</td>
            </tr>
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Meals:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.meals}}</td>
            </tr>
            <tr>
                <td style="width:20%;font-weight: 500;text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Others: </td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.others}}</td>
            </tr>
            <tr>
                <td style="width:20%;font-weight: 500; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;">Total Expenses:</td>
                <td style="width:30%;font-weight: 400;border-top:none;border-left:none;border-right:none; border-bottom: 1px solid #dddddd; text-align: left;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;">{{request.total}}</td>
            </tr>
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
                                <p style="font-size: 12px;margin-top: 10px;">
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
                                <p style="font-size: 12px;margin-top: 10px;">
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
        <br>
        <div id="pageFooter" style="text-align: center;">
            <span
                style="font-size:8px;color: red;font-style:italic;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">**This
                document is computer generated and does not require any signature to be considered valid**</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RevDownloadContent',
    props: ['requestContent', 'approvers'],
    data() {
        return {
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