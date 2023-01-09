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
                    <h3>OPEN REQUESTS/CASH ADVANCE/FOR APPROVAL</h3>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="m-auto mb-10 pb-13"
            style="background-color: white;border-radius: 5px; max-width: 85%;border: 2px solid #88888861;">
            <v-row justify="space-between">
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
                                        <v-text-field dense readonly v-model="data.requestor"></v-text-field>
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
                            <v-text-field dense readonly v-model="data.requestor"></v-text-field>
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
                        <th v-for="(approver, index) in cashApprovers" :key="index" v-show="index <= 2" style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 14px;">
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
                        <td v-for="(approver, index) in cashApprovers" :key="index" v-show="index <= 2" style="font-weight: 400;border: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{ data.region }})</p>
                        </td>
                        <!-- <td style="font-weight: 400;border: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px;">
                            Area Manager
                            <p style="margin: 0px;">({{data.area}} | {{data.region}})</p>
                        </td>
                        <td style="font-weight: 400;border: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            Regional Manager
                            <p style="margin: 0px;">({{data.region}})</p>
                        </td>
                        <td style="font-weight: 400;border: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            Regional Area Manager
                            <p style="margin: 0px;">({{data.region}})</p>
                        </td> -->
                    </tr>
                </tbody>
            </table>
            <table style="border-collapse: collapse; width: 85%;margin:auto;">
                <thead>
                    <tr style="margin: auto;">
                        <th v-for="(approver, index) in cashApprovers" :key="index" v-show="index >= 3" style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 14px;">
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
                        <td v-for="(approver, index) in cashApprovers" :key="index" v-show="index >= 3" style="font-weight: 400;border: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{ data.region }})</p>
                        </td>
                        <!-- <td style="border: 1px solid #b6b4b4;font-weight: 400; text-align: center;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            <span>Assistant to the COO | VPO</span>
                            <p style="margin: 0px;">({{data.region}})</p>
                        </td>
                        <td style="border: 1px solid #b6b4b4;font-weight: 400; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            <span>COO | VPO</span>
                            <p style="margin: 0px;">({{data.region}})</p>
                        </td> -->
                    </tr>
                </tbody>
            </table>
            <!-- <v-divider class="ml-15 mr-15" style="border-bottom: 1px solid #BDBDBD"></v-divider>
            <v-row class="mt-10 m-auto ml-10 mr-10" justify="center" align="end">
                <v-col cols="12" md="4" sm="4" v-for="(approver, index) in cashApprovers" :key="index">
                    <div style="text-align: center;">
                        <p class="approved mb-0" :style="{color: approver.status === 'approved'? 'green': approver.status === 'disapproved'? 'red': 'black'}">{{ approver.status }}</p>
                        <p class="date mb-1">{{ approver.date }}</p>
                        <p class="name mb-1">{{ approver.name }}</p>
                    </div>
                    <div style="text-align: center;border-top: 1px solid #dddddd;padding-top: 10px;">
                        <p v-if="approver.approver === 'area_approver'">Area Manager</p>
                        <p v-else-if="approver.approver === 'rm_approver'">Regional Manager</p>
                        <p v-else-if="approver.approver === 'ram_approver'">Regional Area Manager</p>
                        <p v-else-if="approver.approver === 'ass_approver'">Asst. to the COO | VPO</p>
                        <p v-else-if="approver.approver === 'vpo_approver'">VPO</p>
                    </div>
                </v-col>
            </v-row> -->
            <br>
            <br>
            <br>
            <v-row justify="center" v-if="statusButtons">
                <v-btn color="green" class="ml-1 mr-1 white--text" tile @click="approve">
                    <v-icon left>mdi-checkbox-marked-circle</v-icon> approved
                </v-btn>
                <v-btn color="red darken-1" class="ml-1 mr-1 white--text" tile @click="disapprove">
                    <v-icon left>mdi-cancel</v-icon> disapproved
                </v-btn>
            </v-row>
        </v-container>
        <v-dialog v-model="remarksDialog" width="500" persistent>
            <v-card class="pb-3 pt-3">
                <v-btn text plain style="float: right;" @click="remarksDialog = false" :disabled="loading">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-title style="margin-left: 15px">
                    Remarks for {{ textResponse }}:
                </v-card-title>
                <div style="margin: auto 35px;">
                    <v-textarea dense outlined rows="4" v-model="remarks" :disabled="loading">
                    </v-textarea>
                </div>
                <v-card-actions style="justify-content: center;">
                    <v-btn color="success" :disabled="remarks === '' ? true : false || loading" tile
                        @click="approverResponse">
                        <span v-if="loading" class="px-1">
                            <v-progress-circular indeterminate size="20"></v-progress-circular>
                            Loading...
                        </span>
                        <span v-else>submit</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </div>
</template>
<script>
import store from '@/store'
import router from '@/router/router'

export default {
    data() {
        return {
            approvalStatus: false,
            closeDialog: '',
            remarks: '',
            textResponse: '',
            remarksDialog: false,
            user: '',
            response: '',
            loading: false,
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
            inputBackGround: 'grey lighten-3',
            data: {
                idNumber: '',
                requestor: '',
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
        cashApprovers() {
            return this.approvers
        },
        cashResponse() {
            return this.response
        },
        statusButtons() {
            return this.approvalStatus
        }
    },
    created() {
        this.getRequestByControlNo()
        setTimeout(() => {
            this.statusForButtons()
        }, 1000);
    },
    methods: {

        statusForButtons() {
            for (let index = 0; index < this.approvers.length; index++) {
                const element = this.approvers[index];

                let position = element.position;

                if (position == 'Area Manager') {
                    position = 'AREA MANAGER'
                } else if (position == 'Regional Manager') {
                    position = 'REGIONAL MAN'
                } else if (position == 'Regional Audit Manager') {
                    position = 'RAM'
                } else if (position == 'Asst. to the COO | VPO') {
                    position = 'GMO-ASTGENMAN'
                } else if (position == 'COO | VPO') {
                    position = 'GMO-GENMAN'
                }

                let getApprover = store.getters.getApprover

                if (position == getApprover) {
                    if (element.status === '') {
                        this.approvalStatus = true
                    } else {
                        this.approvalStatus = false
                    }
                }
            }
        },
        async getRequestByControlNo() {
            const response = await store.dispatch('getRequestByControlNoCash', { controlNo: this.$router.currentRoute.query.controlNo })

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
                        requestor: request.author.toUpperCase(),
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
                    this.user = store.getters.getApprover
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
        async approverResponse() {
            this.loading = true

            let controlNo = this.data.controlNo
            let approver = store.getters.getApprover
            let remarks = this.remarks
            let response = this.response


            if (response === 'approved') {
                if (approver === 'AREA MANAGER') {
                    approver = 'area_approver'
                }
                if (approver === 'REGIONAL MAN') {
                    approver = 'regional_approver'
                }
                if (approver == 'RAM') {
                    approver = 'ram_approver'
                }
                if (approver === 'GMO-ASTGENMAN') {
                    approver = 'ass_vpo_approver'
                }
                if (approver == 'GMO-GENMAN') {
                    approver = 'vpo_approver'
                }

                const res = await store.dispatch('ApprovalResponse',
                    {
                        controlNo: controlNo,
                        approver: approver,
                        comment: remarks,
                        response: response,
                        requestType: 'cashAdvance'
                    })
                if (res.data.resCode == 0) {
                    setTimeout(() => {

                        this.loading = false
                        this.remarksDialog = false
                        this.snackbar = {
                            message: `${res.data.message}fully Approved!`,
                            show: true,
                            color: 'success',
                        }
                        setTimeout(() => {
                            this.approvalStatus = false
                            router.push({ path: `/home/open-request/cash-advance/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                } else if (res.data.resCode == 2) {
                    setTimeout(() => {

                        this.loading = false
                        this.remarksDialog = false
                        this.snackbar = {
                            message: `${res.data.message}`,
                            show: true,
                            color: 'success',
                        }
                        setTimeout(() => {
                            this.approvalStatus = false
                            router.push({ path: `/home/open-request/cash-advance/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                } else {
                    setTimeout(() => {

                        this.loading = false
                        this.remarksDialog = false
                        this.snackbar = {
                            message: `${res.data.message}`,
                            show: true,
                            color: 'success',
                        }
                        setTimeout(() => {
                            this.approvalStatus = false
                            router.push({ path: `/home/open-request/cash-advance/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                }

            } else if (response === 'disapproved') {
                if (approver === 'AREA MANAGER') {
                    approver = 'area_approver'
                }
                if (approver === 'REGIONAL MAN') {
                    approver = 'regional_approver'
                }
                if (approver == 'RAM') {
                    approver = 'ram_approver'
                }
                if (approver === 'GMO-ASTGENMAN') {
                    approver = 'ass_vpo_approver'
                }
                if (approver == 'GMO-GENMAN') {
                    approver = 'vpo_approver'
                }

                const res = await store.dispatch('ApprovalResponse',
                    {
                        controlNo: controlNo,
                        approver: approver,
                        comment: remarks,
                        response: response,
                        requestType: 'cashAdvance'
                    })
                if (res.data.resCode == 0) {
                    setTimeout(() => {

                        this.loading = false
                        this.remarksDialog = false
                        this.snackbar = {
                            message: `${res.data.message}fully disapproved!`,
                            show: true,
                            color: 'success',
                        }
                        setTimeout(() => {
                            this.approvalStatus = false
                            router.push({ path: `/home/open-request/cash-advance/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                } else if (res.data.resCode == 2) {
                    setTimeout(() => {

                        this.loading = false
                        this.remarksDialog = false
                        this.snackbar = {
                            message: `${res.data.message}`,
                            show: true,
                            color: 'success',
                        }
                        setTimeout(() => {
                            this.approvalStatus = false
                            router.push({ path: `/home/open-request/cash-advance/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                } else {
                    setTimeout(() => {

                        this.loading = false
                        this.remarksDialog = false
                        this.snackbar = {
                            message: `${res.data.message}`,
                            show: true,
                            color: 'success',
                        }
                        setTimeout(() => {
                            this.approvalStatus = false
                            router.push({ path: `/home/open-request/cash-advance/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                }
            }
        },

        async approve() {
            this.remarksDialog = true
            this.response = 'approved'
            this.textResponse = 'Approval'
    
        },
        async disapprove() {
            this.remarksDialog = true
            this.response = 'disapproved'
            this.textResponse = 'Disapproval'
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
    font-size: 18px;
}

.name {
    font-weight: 500;
    word-spacing: 2px;
    letter-spacing: 1px;
}

.date {
    font-weight: 400;
}

.name,
.date {
    font-size: 15px;
}
</style>