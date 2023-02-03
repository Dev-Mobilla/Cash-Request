<template>
    <div>
        <v-container class="m-auto mt-5" style="max-width: 65%;">
            <v-card class="pb-5">
                <v-card-title>
                    <v-icon class="mr-2" color="green">mdi-check-circle</v-icon>
                    Approval Details - <span style="color:#1E88E5;font-size: 18px;margin-left: 10px;">{{ approver
                    }}</span>
                </v-card-title>
                <v-col class="pl-7 pr-7">
                    <v-card-subtitle><span style="color:#B71C1C">*</span> Remarks</v-card-subtitle>
                    <v-textarea outlined v-model="remarks"></v-textarea>
                    <v-btn class="ml-2 white--text" color="red darken-1" tile :disabled="remarks === '' ? true : false"
                        @click="disapproved_button">
                        Disapprove</v-btn>
                    <v-btn class="ml-2 white--text" color="green darken-1" tile @click="approved_button">Approve</v-btn>
                </v-col>
            </v-card>
        </v-container>
        <ApprovalDetailsCash :cashAdvance="cashAdvanceDetails" v-if="requestTypeCash" />
        <ApprovalDetailsRevolving v-if="requestTypeRevolving" />

        <v-dialog v-model="dialog" width="430" persistent>
            <v-card class="pt-5">
                <div class="d-flex" style="justify-content: center;">
                    <v-img src="../assets/diamond.png" max-height="90" max-width="90" class="mt-3"></v-img>
                </div>
                <v-card-title style="justify-content: center;">
                    <p style="justify-content: center;font-size: medium;">
                        Are you sure you want to {{ approvalResponse }}
                        this request?
                    </p>
                </v-card-title>
                <v-card-actions class="pb-5" style="justify-content: center;">
                    <!-- <v-spacer></v-spacer> -->
                    <v-btn color="red darken-4" text @click="dialog = false" :disabled="loading">
                        cancel
                    </v-btn>
                    <v-btn color="success" text @click="response" :disabled="loading">
                        <div v-if="loading" class="spinner-border spinner-border-sm">
                        </div>
                        <span v-if="loading" class="px-1">Loading...</span>
                        <span v-else>{{ approvalResponse}}</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
        <v-overlay :value="overlay" color="white" :opacity="1">
            <v-progress-circular indeterminate color="#D50000" size="95" width="8" style="margin-right:5px">
                <v-img src="../assets/diamond.png" max-height="75" max-width="75"></v-img>
            </v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
import router from '@/router/router';
import store from '@/store';
import CryptoJs from 'crypto-js';

import ApprovalDetailsCash from './ApprovalDetailsCash.vue';
import ApprovalDetailsRevolving from './ApprovalDetailsRevolving.vue';

export default {
    name: 'ApprovalComponent',
    components: {
        ApprovalDetailsCash,
        ApprovalDetailsRevolving,
    },
    data() {
        return {
            overlay: true,
            snackbar: {
                message: '',
                show: false,
                color: null,
            },
            cashAdvance: [],
            revolvingFund: [],
            buttonResponse: '',
            remarks: '',
            controlNo: '',
            approver: '',
            type: this.$route.query.type,
            dialog: false,
            loading: false,
        }
    },
    computed: {
        cashAdvanceDetails() {
            return this.cashAdvance
        },
        requestTypeCash() {
            return this.$route.query.type === 'cashAdvance' ? true : false
        },
        requestTypeRevolving() {
            return this.$route.query.type === 'revolvingFund' ? true : false
        },
        approvalResponse() {
            return this.buttonResponse
        }
    },
    created() {
        // this.getApprovalRequest();
        // this.getApprover()
        this.getApproverStatus()
    },
    methods: {
        async getApproverStatus() {
            const decControlNo = CryptoJs.enc.Base64.parse(this.$route.query.controlNo).toString(CryptoJs.enc.Utf8);

            const ControlNobytes = CryptoJs.AES.decrypt(decControlNo, 'SECRET').toString(CryptoJs.enc.Utf8);

            if (this.type === 'revolvingFund') {

                const response = await store.dispatch('getRequestByControlNoRf', {
                    controlNo: ControlNobytes,
                })
                const data = response.data.request[0]

                if (this.$route.query.approver === 'am_approver') {
                    if (!data.am_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.am_status } })
                    }
                } else if (this.$route.query.approver === 'rm_approver') {
                    if (!data.rm_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.rm_status } })
                    }
                } else if (this.$route.query.approver === 'ram_approver') {
                    if (!data.ram_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.ram_status } })
                    }
                } else if (this.$route.query.approver === 'ass_approver') {
                    if (!data.ass_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.ass_status } })
                    }
                } else if (this.$route.query.approver === 'vpo_approver') {
                    if (!data.vpo_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.vpo_status } })
                    }
                }


            } else if (this.type === 'cashAdvance') {

                const response = await store.dispatch('getRequestByControlNoCash', {
                    controlNo: ControlNobytes,
                })
                const data = response.data.rows[0]
                
                if (this.$route.query.approver === 'area_approver') {
                    if (!data.am_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.am_status } })
                    }
                } else if (this.$route.query.approver === 'regional_approver') {
                    if (!data.rm_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.rm_status } })
                    }
                } else if (this.$route.query.approver === 'ram_approver') {
                    if (!data.ram_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.ram_status } })
                    }
                } else if (this.$route.query.approver === 'ass_vpo_approver') {
                    if (!data.ass_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.ass_status } })
                    }
                } else if (this.$route.query.approver === 'vpo_approver') {
                    if (!data.vpo_status) {
                        this.getApprovalRequest()
                        this.getApprover()
                    } else {
                        router.push({ path: `/alert/${data.controlNo}`, query: { status: data.vpo_status } })
                    }
                }
            }
        },
        async getApprovalRequest() {
            const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

            const checkBase64 = base64regex.test(this.$route.query.controlNo)

            if (checkBase64) {

                const response = await store.dispatch('getApprovalRequest',
                    {
                        controlNo: this.$route.query.controlNo
                    })
                this.controlNo = response[0].controlNo

                setTimeout(() => {
                    this.overlay = false
                }, 2000);

            } else {
                this.snackbar = {
                    message: 'Invalid Request Control Number',
                    show: true,
                    color: 'red darken-3'
                }
                setTimeout(() => {
                    router.push({ name: 'Not Found' })
                }, 2000);
            }

        },
        getApprover() {
            if (this.$route.query.approver === 'area_approver' || this.$route.query.approver === 'am_approver') {
                this.approver = 'Area Manager'
            } else if (this.$route.query.approver === 'rm_approver' || this.$route.query.approver === 'regional_approver') {
                this.approver = 'Regional Manager'
            } else if (this.$route.query.approver === 'ram_approver') {
                this.approver = 'Regional Area Manager'
            } else if (this.$route.query.approver === 'ass_approver' || this.$route.query.approver === 'ass_vpo_approver') {
                this.approver = 'Asst. to the COO/VPO'
            } else if (this.$route.query.approver === 'vpo_approver') {
                this.approver = 'COO/VPO'
            }
        },
        disapproved_button() {
            this.dialog = true
            this.buttonResponse = 'disapprove'
        },
        approved_button() {
            this.dialog = true
            this.buttonResponse = 'approve'
        },
        async response() {
            this.loading = true

            if (this.buttonResponse === "approve") {
                const response = await store.dispatch('ApprovalResponse', {
                    controlNo: this.controlNo,
                    approver: this.$route.query.approver,
                    comment: this.remarks,
                    approved: this.buttonResponse,
                    disapproved: '',
                    requestType: this.type
                })
                setTimeout(() => {
                    this.loading = false
                    this.dialog = false

                    this.snackbar = {
                        message: `Successfully ${response.data.status}`,
                        show: true,
                        color: 'success'
                    }
                    setTimeout(() => {
                        router.push({ path: `/response/${this.controlNo}`, query: { status: response.data.status, type:this.type } })
                    }, 1000);
                }, 2000);
            }
            else if (this.buttonResponse === 'disapprove') {
                const response = await store.dispatch('ApprovalResponse', {
                    controlNo: this.controlNo,
                    approver: this.$route.query.approver,
                    comment: this.remarks,
                    approved: '',
                    disapproved: this.buttonResponse,
                    requestType: this.type
                })
                setTimeout(() => {
                    this.loading = false
                    this.dialog = false

                    this.snackbar = {
                        message: `Successfully ${response.data.status}`,
                        show: true,
                        color: 'success'
                    }
                    setTimeout(() => {
                        router.push({ path: `/response/${this.controlNo}`, query: { status: response.data.status, type:this.type } })
                    }, 1000);
                }, 2000);
            }
        },
    }
}
</script>