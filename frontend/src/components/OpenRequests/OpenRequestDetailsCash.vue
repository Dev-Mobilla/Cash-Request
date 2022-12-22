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
                                        <v-text-field dense readonly v-model="data.idNumber"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Requestor:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.author"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Job Title:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.jobTitle"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Branch:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.branch"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Area:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.area">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Region:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.region"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Zone Code:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.zonecode"></v-text-field>
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
                                        <v-text-field dense readonly v-model="data.controlNo"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.date"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Inclusive Date Of Travel:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.travelDate"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Estimated Departure Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.departureDate"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Estimated Arrival Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.arrivalDate"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Amount:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.amount"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-row class="mt-1">
                        <v-col cols="2"><label for="purpose">Purpose:</label></v-col>
                        <v-col style="padding-bottom: 0px; padding-top: 0px;">
                            <v-text-field readonly v-model="data.purpose">
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
                        <v-col cols="5">
                            <v-text-field dense readonly v-model="data.author"></v-text-field>
                            <label>Employee Name</label>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field dense readonly v-model="data.idNumber">
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
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 14px;">
                            <div>
                                <p class="approved mb-0"
                                    :style="{color: approver.status === 'approved'? 'green': approver.status === 'disapproved'? 'red': 'black'}">
                                    {{ approver.status }}</p>
                                <p style="text-transform:uppercase;">{{approver.date}}</p>
                                <p>
                                    {{approver.name}}
                                </p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="font-weight: 400;border: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{data.region}})</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table style="border-collapse: collapse; width: 85%;margin:auto;">
                <thead>
                    <tr style="margin: auto;">
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 14px;">
                            <div>
                                <p class="approved mb-0"
                                    :style="{color: approver.status === 'approved'? 'green': approver.status === 'disapproved'? 'red': 'black'}">
                                    {{ approver.status }}</p>
                                <p style="text-transform:uppercase;">{{approver.date}}</p>
                                <p>
                                    {{approver.name}}
                                </p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="font-weight: 400;border: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{data.region}})</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <!-- <v-row justify="center">
                <v-btn color="black" class="ml-1 mr-1 white--text" tile @click="cancelRequest" :disabled="loading">
                    <span v-if="loading" class="px-1">
                        <v-progress-circular indeterminate size="20"></v-progress-circular>
                        Cancelling...
                    </span>
                    <span v-else><v-icon left>mdi-minus-circle</v-icon> cancel request</span>
                    
                </v-btn>
            </v-row> -->
        </v-container>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </div>
</template>
<script>
import router from '@/router/router'
import store from '@/store'

export default {
    data() {
        return {
            loading: false,
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
            inputBackGround: 'grey lighten-2',
            data: {
                idNumber: '',
                author: '',
                jobTitle: '',
                branch: '',
                area: '',
                region: '',
                amount: '',
                controlNo: '',
                date: '',
                travelDate: '',
                departureDate: '',
                arrivalDate: '',
                zonecode: '',
                purpose: '',
            },
            approvers: [],
        }
    },
    computed: {
        allApprovers() {

            return this.approvers
        }
    },
    created() {
        this.getRequestByControlNo()
    },
    methods: {
        async getRequestByControlNo() {
            const response = await store.dispatch('getRequestByControlNoCash', { controlNo: this.$router.currentRoute.query.controlNo })
            console.log(response);
            if (response.status == 200) {
                if (!response.data.request.length == 0) {
                    let res = response.data.request

                    const changedStatus = res.map(element => {

                        element.status = 'OPEN'

                        return element

                    });
                    const request = changedStatus[0]
                    this.data = {
                        idNumber: request.idNumber,
                        author: request.author.toUpperCase(),
                        jobTitle: request.jobTitle,
                        branch: request.branch,
                        area: request.area,
                        region: request.region,
                        amount: request.amount,
                        controlNo: request.controlNo,
                        date: request.date,
                        travelDate: request.travelDate,
                        departureDate: request.departureDate,
                        arrivalDate: request.arrivalDate,
                        zonecode: request.zonecode,
                        purpose: request.purpose,
                    }
                    this.approvers = response.data.approvers;

                } else {
                    this.snackbar = {
                        message: 'No data found. Kindly refresh page',
                        show: true,
                        color: 'red lighten-1',

                    }
                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
            }
        },
        async cancelRequest() {

            this.loading = true
            let controlNo = this.$router.currentRoute.query.controlNo

            const res = await store.dispatch('CancelCashRequest', { controlNo: controlNo })

            if (res.status === 200) {
                setTimeout(() => {
                    this.snackbar = {
                        message: res.data.message,
                        show: true,
                        color: 'success',
                    }
                    setTimeout(() => {
                        this.loading = false
                        router.push({ path: '/home/close-request' })
                        router.go()
                    }, 1500);
                }, 1000);
            } else {
                this.snackbar = {
                    message: res.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
                this.loading = false
                setTimeout(() => {
                    router.push({ path: '/home/open-request' })
                    router.go()
                }, 1500);
            }
        }
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