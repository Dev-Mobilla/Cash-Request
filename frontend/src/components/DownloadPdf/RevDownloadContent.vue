<template>
    <div style="background-color: white;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin-top: 15px;">
        <div style="display: flex;justify-content: space-between;margin: 0px 15px;align-items: center;" class="pt-5">
            <img src="../../assets/ml-logo.png" alt="ml_logo"
                style="padding-right: 0;padding-left: 0px;width: 38%;height: 75px;">
            <div style="margin-right: 30px;">
                <p style="font: bold 20px Verdana">Revolving Fund Liquidation</p>
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
                        {{request.requestor}}
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
                        Base Branch:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.branch}}</td>
                </tr>
            </tbody>
        </table>
        <table
            style="border-collapse: collapse; width: 95%;margin:auto;border-bottom: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;border-top:none;">
            <tr>
                <td
                    style="width:15%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                    Region:
                </td>
                <td
                    style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                    {{ request.region }}
                </td>
                <td
                    style="width:20%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
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
                        style="width:10%;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Period:
                    </td>
                    <td
                        style="width:20%;font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.period}}</td>
                    <td
                        style="width:20%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        RF Allowance:
                    </td>
                    <td
                        style="width:12%;font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.rfAllowance}}
                    </td>
                    <td
                        style="width:20%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Pending RF:
                    </td>
                    <td
                        style="width:15%;font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.pendingRf}}</td>
                </tr>
                <tr>
                    <td
                        style="width:20%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Cash On Hand:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.cashOnHand}}</td>
                </tr>

            </tbody>
        </table>
        <table
            style="border-collapse: collapse; width: 95%;margin:auto;border-top: 1px solid black;border-left: 1px solid black;border-bottom: none;border-right: 1px solid black;">
            <tbody>
                <tr style="border-bottom: 1px solid black;">
                    <td
                        style="width:15%;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Transportation:
                    </td>
                    <td
                        style="width:35%font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.transpo}}</td>
                    <td
                        style="width:25%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Office Supplies:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.officeSupplies}}
                    </td>
                </tr>
            </tbody>
        </table>
        <table
            style="border-collapse: collapse; width: 95%;margin:auto;border-top: none;border-left: 1px solid black;border-bottom: none;border-right: 1px solid black;">
            <tr>
                    <td
                        style="width:10%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Meals:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.meals}}</td>
                    <td
                        style="width:10%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Others:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.others}}</td>
                    <td
                        style="width:25%;border-left: 1px solid black;font: bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;text-align: left;padding: 8px;">
                        Total Expenses:
                    </td>
                    <td
                        style="font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;word-wrap: break-word; word-break: break-all;padding: 5px;">
                        {{request.total}}</td>
                </tr>
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
                        style="text-transform:uppercase;text-align: center;padding: 8px;"
                        :style="{ fontWeight: 400, borderBottom: index == 3 ? 'none' : '1px solid black', borderTop: 'none', borderLeft: index == 0 ? 'none' : '1px solid black', borderRight: 'none', textAlign: 'center', padding: '8px', fontFamily: ['Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif'] }">
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
                        :style="{ fontWeight: 400, borderBottom: 'none', borderTop: 'none', borderLeft: index == 0 ? 'none' : '1px solid black', borderRight: 'none', textAlign: 'center', padding: '8px', fontFamily: ['Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif'] }">
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
                        style="text-transform:uppercase;text-align: center;padding: 8px;"
                        :style="{ fontWeight: 400, borderBottom: index == 2 ? 'none' : '1px solid black', borderTop: 'none', borderLeft: index == 4 ? 'none' : '1px solid black', borderRight: index > 4 ? 'none' : '1px solid black', textAlign: 'center', padding: '8px', fontFamily: ['Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif'] }">
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
                        :style="{ fontWeight: 400, borderBottom: index == 2 ? 'none' : '1px solid black', borderTop: 'none', borderLeft: index == 4 ? 'none' : '1px solid black', borderRight: index > 4 ? 'none' : '1px solid black', textAlign: 'center', padding: '8px', fontFamily: ['Segoe UI', Tahoma, Geneva, Verdana, 'sans-serif'] }">
                        <span style="font-size: 12px">{{ approver.position }}</span>
                        <p style="margin: 0px;font-size: 12px">({{ request.region }})</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
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
    },
    created(){
        console.log(this.requestContent);
    },
    methods:{
        sfsf(){
            console.log(this.requestContent);
        }
    }
}
</script>