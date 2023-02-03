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
                                    <v-col cols="4"><label for="">Job Title:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field dense v-model="data.jobTitle" readonly></v-text-field>
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
                        <td v-for="(approver, index) in cashApprovers" :key="index" v-show="index <= 2" style="idth:28.4%;font-weight: 400;border-bottom: none;border-top: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{ data.region }})</p>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="(approver, index) in cashApprovers" :key="index" v-show="index <= 2" style="width:28.4%;word-wrap: break-word; word-break: break-all;font-weight: 400;border-top: none;border-bottom: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 6px 8px 6px 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
                        <td v-for="(approver, index) in cashApprovers" :key="index" v-show="index >= 3" style="width:42.5%;font-weight: 400;border-bottom: none;border-top: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 8px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{ data.region }})</p>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="(approver, index) in cashApprovers" :key="index" v-show="index >= 3" style="width:42.5%;word-wrap: break-word; word-break: break-all;font-weight: 400;border-top: none;border-bottom: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 6px 8px 6px 8px;;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
                <v-btn text plain style="float: right;" @click="closeIcon" :disabled="loading">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-title style="margin-left: 15px">
                    Remarks for {{ textResponse }}:
                </v-card-title>
                <div style="margin: auto 35px;">
                    <v-form ref="remarks" v-model="isFormValid">
                        <v-textarea dense outlined rows="4" v-model="remarks" :disabled="loading"
                            :rules="[RequiredRules.remarks, InputRules.remarks]">
                        </v-textarea>
                    </v-form>
                </div>
                <v-card-actions style="justify-content: center;">
                    <v-btn color="success" :disabled="!isFormValid || loading" tile @click="approverResponse">
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
import store from '@/store';
import CryptoJs from 'crypto-js';

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
            RequiredRules: {
                remarks: v => !!v || "This is a required field",
            },
            InputRules: {
                remarks: v => (v || '').length <= 100 || 'Description must be 100 characters or less'
            },
            isFormValid: true,
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
                jobTitle: '',
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
        closeIcon() {
            this.remarksDialog = false
            this.$refs.remarks.reset()
        },
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
            const response = await store.dispatch('getRequestByControlNoRf', { controlNo: this.$router.currentRoute.query.controlNo })

            if (response.status == 200) {
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request

                        const changedStatus = res.map(element => {

                            element.status = 'OPEN'

                            return element

                        });
                        let getRequestor = store.getters.getRequestor;
                        const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
                        const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

                        let requestorBytes = JSON.parse(bytes)

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
                            jobTitle: requestorBytes.task.toUpperCase()
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
                    approver = 'am_approver'
                }
                if (approver === 'REGIONAL MAN') {
                    approver = 'rm_approver'
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
                        requestType: 'revolvingFund'
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
                            router.push({ path: `/home/open-request/revolving-fund/for-approval?controlNo=${controlNo}` })
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
                            router.push({ path: `/home/open-request/revolving-fund/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                } else if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                }
                else {
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
                            router.push({ path: `/home/open-request/revolving-fund/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                }

            } else if (response === 'disapproved') {
                if (approver === 'AREA MANAGER') {
                    approver = 'am_approver'
                }
                if (approver === 'REGIONAL MAN') {
                    approver = 'rm_approver'
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
                        requestType: 'revolvingFund'
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
                            router.push({ path: `/home/open-request/revolving-fund/for-approval?controlNo=${controlNo}` })
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
                            router.push({ path: `/home/open-request/revolving-fund/for-approval?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                } else if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                }
                else {
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
                            router.push({ path: `/home/open-request/revolving-fund/for-approval?controlNo=${controlNo}` })
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

</style>