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
                    <h3>OPEN REQUESTS/REVOLVING FUND/FOR APPROVAL</h3>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="m-auto mb-10 pb-13"
            style="background-color: white;border-radius: 13px; max-width: 85%; border: 2px solid #88888861;">
            <v-row justify="space-between" class="header">
                <v-col class="title" cols="8">
                    <h4 class="white--text">Revolving Fund Liquidation</h4>
                </v-col>
                <v-col cols="4" class="pl-0 pr-2">
                    <v-img src="../../assets/logo-ml.png" class="logo" max-width="350"></v-img>
                </v-col>
            </v-row>
            <v-form>
                <v-row class="mx-auto ml-10 mr-10 mb-10">
                    <v-col cols="7">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">ID Number</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.idNumber"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Date:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.date"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Requestor:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.requestor"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Base Branch:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.branch"></v-text-field>
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
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.zonecode">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="5">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="5"><label for="">Control No:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.controlNo"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="5"><label for="">Period:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.period">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="5"><label for="">RF Allowance:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.rfAllowance"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="5"><label for="">Pending RF:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.pendingRf"></v-text-field>
                                    </v-col>
                                </v-row>
                                <!-- <v-row align="baseline" class="mt-0">
                                <v-col cols="5"><label for="">Total Expenses:</label></v-col>
                                <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                    <v-text-field dense readonly v-model="data.totalExpenses"></v-text-field>
                                </v-col>
                            </v-row> -->
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="5"><label for="">Cash on hand:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.cashOnHand"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="mx-auto ml-10 mr-7">
                    <v-col cols="7">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Transportation:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field readonly dense v-model="data.transpo"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Office Supplies:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field readonly dense v-model="data.officeSupplies"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Meals:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field readonly dense v-model="data.meals"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Others:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field readonly dense v-model="data.others"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Total Expenses:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.total"></v-text-field>
                                    </v-col>
                                </v-row>
                                <!-- <v-row align="baseline" class="mt-0">
                                <v-col cols="4"><label for="">Total Expenses:</label></v-col>
                                <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                    <v-text-field readonly dense v-model="data.total"></v-text-field>
                                </v-col>
                            </v-row> -->
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="5">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="5"><label for="">Purpose:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-textarea rows="0" auto-grow readonly dense v-model="data.purpose"
                                            style="overflow-wrap:break-word ;"></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
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
                                <!-- <p>{{ approver.position }}</p> -->
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
            <!-- <v-divider class="ml-15 mr-15" style="border-bottom: 1px solid #BDBDBD"></v-divider>
            <v-row class="mt-10 m-auto ml-10 mr-10" justify="center" align="end">
                <v-col cols="12" md="4" sm="4" v-for="(approver, index) in allApprovers" :key="index">
                    <div style="text-align: center;">
                        <p class="approved mb-0"
                            :style="{color: approver.status === 'approved'? 'green': approver.status === 'disapproved'? 'red': 'black'}">
                            {{ approver.status }}</p>
                        <p class="date">{{ approver.date }}</p>
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
            <v-row justify="center" v-if="approvalStatus">
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
                    <v-btn color="success" :disabled="remarks === ''? true:false || loading" tile
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
import router from '@/router/router'
import store from '@/store'

export default {
    data() {
        return {
            approvalStatus: true,
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
                branch: '',
                region: '',
                zonecode: '',
                controlNo: '',
                date: '',
                period: '',
                rfAllowance: '',
                pendingRf: '',
                cashOnHand: '',
                transpo: '',
                officeSupplies: '',
                meals: '',
                others: '',
                total: '',
                purpose: '',
            },
            approvers: [],
        }
    },
    computed: {
        allApprovers() {
            return this.approvers
        },
        rfResponse() {
            return this.response
        },
        
    },
    created() {
        this.getRequestByControlNo()
    },
    methods: {

        async getRequestByControlNo() {
            const response = await store.dispatch('getRequestByControlNoRf', { controlNo: this.$router.currentRoute.query.controlNo })

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
                        requestor: request.requestor.toUpperCase(),
                        branch: request.baseBranch,
                        region: request.region,
                        zonecode: request.zonecode,
                        controlNo: request.controlNo,
                        date: request.rfDate,
                        period: request.period.toUpperCase(),
                        rfAllowance: request.rfAllowance,
                        pendingRf: request.pendingRf.toUpperCase(),
                        cashOnHand: request.cashOnHand,
                        transpo: request.transportation,
                        officeSupplies: request.officeSupplies,
                        meals: request.meals,
                        others: request.others,
                        total: request.totalExpenses,
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
            
            if (response === 'approve') {
                if (approver === 'area_approver') {
                    approver = 'am_approver'
                }

                const res = await store.dispatch('ApprovalResponse',
                    {
                        controlNo: controlNo,
                        approver: approver,
                        comment: remarks,
                        approved: response,
                        disapproved: '',
                        requestType: 'revolvingFund'
                    })
                setTimeout(() => {

                    this.loading = false
                    this.remarksDialog = false
                    this.snackbar = {
                        message: `Successfully ${res.data.status}`,
                        show: true,
                        color: 'success',
                    }
                    setTimeout(() => {
                        router.push({ path: `/home/open-request/revolving-fund/for-approval??controlNo=${controlNo}` })
                        router.go()
                    }, 1000);
                }, 2000);
            } else if (response === 'disapprove') {
                if (approver === 'area_approver') {
                    approver = 'am_approver'
                }

                const res = await store.dispatch('ApprovalResponse',
                    {
                        controlNo: controlNo,
                        approver: approver,
                        comment: remarks,
                        approved: '',
                        disapproved: response,
                        requestType: 'revolvingFund'
                    })
                setTimeout(() => {

                    this.loading = false
                    this.remarksDialog = false
                    this.snackbar = {
                        message: `Successfully ${res.data.status}`,
                        show: true,
                        color: 'success',
                    }
                    setTimeout(() => {
                        router.push({ path: `/home/open-request/revolving-fund/for-approval?controlNo=${controlNo}` })
                        router.go()
                    }, 1000);
                }, 2000);
            }

        },
        async approve() {
            this.remarksDialog = true
            this.response = 'approve'
            this.textResponse = 'Approval'

        },
        async disapprove() {

            this.remarksDialog = true
            this.response = 'disapprove'
            this.textResponse = 'Disapproval'

        }
    }
}
</script>
<style>

</style>