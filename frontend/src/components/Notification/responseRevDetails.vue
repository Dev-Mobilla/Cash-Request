<template>
    <v-container class="mb-10 mt-3 pb-13" style="background-color: white;border-radius: 13px;max-width: 65%;">
        <v-col>
            <v-form>
                <div class="mt-5 mb-10">
                    <div class="mb-8">
                        <h3>REQUESTOR DETAILS</h3>
                    </div>
                    <v-row>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.type" label="Position" outlined
                            dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.requestor" label="Requestor"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.baseBranch" label="Branch"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.region" label="Region" outlined
                            dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2" v-model="rfDetails.email" label="Email Address" outlined dense
                            readonly :background-color="inputBackGround">
                        </v-text-field>
                    </v-row>
                    <div class="mb-8 mt-5">
                        <h3>REQUEST DETAILS</h3>
                    </div>
                    <v-row>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.controlNo" label="Control No."
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.rfDate" label="Date & Time"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.period" label="Period" outlined
                            dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.rfAllowance" label="RF Allowance"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.pendingRf" label="Pending RF"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.cashOnHand" label="Cash on hand"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.transpo" label="Transportation"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.supplies" label="Office Supplies"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.meals" label="Meals" outlined
                            dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.others" label="Others" outlined
                            dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="rfDetails.totalExpenses"
                            label="Total Expenses" outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field class="ml-2 mr-2" v-model="rfDetails.purpose" label="Purpose" outlined dense
                            readonly :background-color="inputBackGround">
                        </v-text-field>
                    </v-row>
                </div>
                <v-divider></v-divider>
                <div class="mt-8">
                    <div class="mb-8">
                        <h3>APPROVER DETAILS</h3>
                    </div>
                    <v-row>
                        <v-col v-for="(item, index) in rfApprovers" :key="index" cols="12" md="6">
                            <div>
                                <h4>Name:
                                    <span
                                        style="text-transform: uppercase; font-weight: 400;margin-left: 8px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                        {{ item.name }}
                                    </span>
                                </h4>
                            </div>
                            <div>
                                <h4>Status:
                                    <span
                                        style="text-transform: uppercase;font-weight: 400;margin-left: 8px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                        {{ item.status }}
                                    </span>
                                </h4>
                            </div>
                            <div>
                                <h4>Date & Time:
                                    <span
                                        style="text-transform: uppercase;font-weight: 400;margin-left: 8px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                        {{ item.date }}
                                    </span>
                                </h4>
                            </div>
                            <div>
                                <h4>Remarks:</h4>
                                <v-col cols="12" md="8">
                                    <v-textarea dense :background-color="item.remarks ? inputBackGround : ''" readonly
                                        rows="3" outlined v-model="item.remarks"
                                        style="font-weight: 400;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                    </v-textarea>
                                </v-col>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-form>
        </v-col>
    </v-container>
</template>
<script>
import store from '@/store'

export default {
    name: 'responseRevDetails',
    data() {
        return {
            inputBackGround: 'grey lighten-3',
            FormData: {
                type: '',
                rfDate: '',
                requestor: '',
                baseBranch: '',
                region: '',
                email: '',
                controlNo: '',
                period: '',
                rfAllowance: '',
                pendingRf: '',
                cashOnHand: '',
                transpo: '',
                supplies: '',
                meals: '',
                others: '',
                totalExpenses: '',
                purpose: ''
            },
            approvers:[]
        }
    },
    ready: function () {
        this.revolvingDetails()
    },
    computed: {
        rfApprovers() {
            return this.approvers
        },
        rfDetails(){
            return this.FormData
        }
    },
    created() {
        setTimeout(() => {
            this.revolvingDetails()
        }, 1500);
        this.cashAdvance
    },
    methods: {
        revolvingDetails() {
            if (store.getters.getRequestByControlNoRevolving.length === 0) {

                this.snackbar = {
                    message: 'Not data found. Please Refresh page',
                    show: true,
                    color: 'red darken-3'
                }
                this.overlay = false

            } else {

                setTimeout(() => {
                    const revolvingDetails = store.getters.getRequestByControlNoRevolving.request[0]
                    const rfApprovers = store.getters.getRequestByControlNoRevolving.approvers
                    console.log(revolvingDetails);

                    this.FormData = {
                        type: revolvingDetails.type.toUpperCase(),
                        rfDate: revolvingDetails.rf_date,
                        requestor: revolvingDetails.requestor.toUpperCase(),
                        baseBranch: revolvingDetails.baseBranch,
                        region: revolvingDetails.region,
                        email: revolvingDetails.email,
                        controlNo: revolvingDetails.controlNo,
                        period: revolvingDetails.period.toUpperCase(),
                        rfAllowance: revolvingDetails.allowance,
                        pendingRf: revolvingDetails.pendingRf.toUpperCase(),
                        cashOnHand: revolvingDetails.cashOnHand,
                        transpo: revolvingDetails.transportation,
                        supplies: revolvingDetails.officeSupplies,
                        meals: revolvingDetails.meals,
                        others: revolvingDetails.others,
                        totalExpenses: revolvingDetails.totalExpenses,
                        purpose: revolvingDetails.purpose
                    }
                    this.overlay = false
                    this.approvers = rfApprovers

                }, 1000);
            }
        }
    }
}
</script>