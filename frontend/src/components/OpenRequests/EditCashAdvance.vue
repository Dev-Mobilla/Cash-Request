<template>
    <div>
        <v-container class="m-auto mt-15 mb-3" style="max-width: 85%;">
            <v-row>
                <v-col cols="12" md="6" sm="6" align="start">
                    <v-btn text color="black" plain style="font-size: 16px;" to="/home/open-request/">
                        <v-icon class="mr-2">mdi-arrow-left-circle</v-icon> back
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" sm="6" align="end">
                    <h3 style="color: black;">OPEN REQUESTS/CASH ADVANCE</h3>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="m-auto mb-10 pb-13"
            style="background-color: white;border-radius: 13px; max-width: 85%;border: 2px solid #88888861;">
            <v-row justify="space-between" class="header">
                <v-col class="title" cols="8">
                    <h4 class="white--text">Cash Advance Request</h4>
                </v-col>
                <v-col cols="4" class="pl-0 pr-2">
                    <v-img src="../../assets/logo-ml.png" class="logo" max-width="350"></v-img>
                </v-col>
            </v-row>
            <v-col class="ml-3 advance--info">
                <p class="font-weight-bold">Advance Information:</p>
            </v-col>
            <v-form>
                <v-row class="mx-auto ml-10 mr-10">
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">ID Number:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.idNumber"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Requestor:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.author"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Job Title:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.jobTitle"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Branch:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.branch"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Area:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.area">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Region:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.region"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Zone Code:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.zonecode"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Control No:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.controlNo"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="reqDate"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Inclusive Date Of Travel:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.travelDate"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Estimated Departure Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.departureDate"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Estimated Arrival Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.arrivalDate"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Amount:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="request.amount"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-row class="mt-1">
                        <v-col cols="2"><label for="purpose">Purpose:</label></v-col>
                        <v-col style="padding-bottom: 0px; padding-top: 0px;">
                            <v-text-field readonly v-model="request.purpose">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-row>
                <v-col>
                    <hr class="horizontal--cash-advance">
                </v-col>
                <v-col>
                    <v-col>
                        <h3 class="text-center">AUTHORITY TO DEDUCT FROM PAYROLL</h3>
                        <h4 class="text-center">(Unliquidated Cash Advance Full Amount)</h4>
                    </v-col>
                    <v-col>
                        <v-row class="mr-5 ml-5 mt-2">
                            <v-col>
                                <label>This is to Authorized M Lhuillier Financial
                                    Services -
                                    HRMD Payroll Master to deduct from my salary the following amount of unliquidated
                                    cash advance 5 days after completion of the purpose of this cash advance.</label>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-col>
                <v-col>
                    <v-row justify="end" class="mr-5 ml-5">
                        <v-col cols="3">
                            <v-text-field dense readonly v-model="request.author"></v-text-field>
                            <label>Employee Name</label>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field dense readonly v-model="request.idNumber">
                            </v-text-field>
                            <label>ID Number</label>
                        </v-col>
                    </v-row>
                </v-col>
            </v-form>
            <br>
            <br>
            <br>
            <table style="border-collapse: collapse; width: 85%;margin:auto;">
                <thead>
                    <tr style="margin: auto;">
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
                        font-size: 14px;">
                            <div>
                                <p class="approved mb-0"
                                    :style="{ color: approver.status === 'approved' ? 'green' : approver.status === 'disapproved' ? 'red' : 'black' }">
                                    {{ approver.status }}</p>
                                <p style="text-transform:uppercase;">{{ approver.date }}</p>
                                <p>
                                    {{ approver.name }}
                                </p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="width:28.4%;font-weight: 400;border-bottom: none;border-top: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 8px;
                    font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{ request.region }})</p>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="width:28.4%;word-wrap: break-word; word-break: break-all;font-weight: 400;border-top: none;border-bottom: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 6px 8px 6px 8px;
                    font-size: 11px">
                            <p style="font-style:italic;text-transform:capitalize;
                            ">
                                <span style="color: red;" v-if="!approver.remarks == ''">*</span>
                                {{ approver.remarks }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table style="border-collapse: collapse; width: 85%;margin:auto;">
                <thead>
                    <tr style="margin: auto;">
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
                        font-size: 14px;">
                            <div>
                                <p class="approved mb-0"
                                    :style="{ color: approver.status === 'approved' ? 'green' : approver.status === 'disapproved' ? 'red' : 'black' }">
                                    {{ approver.status }}</p>
                                <p style="text-transform:uppercase;">{{ approver.date }}</p>
                                <p>
                                    {{ approver.name }}
                                </p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="width:42.5%;font-weight: 400;border-bottom: none;border-top: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 8px;
                    font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{ request.region }})</p>

                        </td>
                    </tr>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="width:42.5%;word-wrap: break-word; word-break: break-all;font-weight: 400;border-top: none;border-bottom: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 6px 8px 6px 8px;;
                    font-size: 11px">
                            <p style="font-style:italic;text-transform:capitalize;">
                                <span style="color: red;" v-if="!approver.remarks == ''">*</span>
                                {{ approver.remarks }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <v-row justify="center">
                <v-btn color="#FF6D00" class="ml-1 mr-1 white--text" tile @click="EditRequest">
                    <v-icon left>mdi-pencil</v-icon> Edit
                </v-btn>
                <v-btn color="#FFAB00" class="ml-1 mr-1 white--text" tile>
                    <v-icon left>mdi-minus-circle</v-icon> Cancel
                </v-btn>
            </v-row>
        </v-container>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </div>
</template>
<script>

export default {
    props: ['requestContent', 'approvers'],
    data() {
        return {
            loading: false,
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
        }
    },
    computed: {
        reqDate() {
            let reqDate = new Date(this.requestContent.date);
            let date = reqDate.getFullYear().toString() + '-' + (("0" + (reqDate.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + reqDate.getDate()).slice(-2).toString();
            return date
        },
        allApprovers() {

            return this.approvers
        },
        request() {
            return this.requestContent
        },
    },
    methods: {
        
        // EditRequest(){
        //     let controlNo = this.$router.currentRoute.query.controlNo
        //     console.log(controlNo);
        // }
    }
}
</script>
<style>
.approved,
.name,
.date {
    text-transform: uppercase;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.approved {
    font-weight: 600;
    /* color: #2E7D32; */
    font-size: 15px;
}

.name {
    font-weight: 500;
}

.date {
    font-weight: 400;
    word-spacing: 2px;
    letter-spacing: 1px;
}

.name,
.date {
    font-size: 15px;
}
</style>