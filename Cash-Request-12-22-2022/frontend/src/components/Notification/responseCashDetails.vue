<template>
    <v-container class="mb-10 mt-3 pb-13" style="background-color: white;border-radius: 13px; max-width: 65%;">
        <v-col>
            <v-form>
                <div class="mt-5 mb-10">
                    <div class="mb-8">
                        <h3>REQUESTOR DETAILS</h3>
                    </div>
                    <v-row>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.idNumber"
                            label="ID Number" outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.author"
                            label="Requestor" outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.jobTitle"
                            label="Job Title" outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.branch"
                            label="Branch Name" outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.area" label="Area"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.region"
                            label="Region" outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2" v-model="cashAdvanceFormDetails.email" label="Email Address"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.controlNo"
                            label="Control No." outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                    </v-row>
                    <div class="mb-8 mt-5">
                        <h3>REQUEST DETAILS</h3>
                    </div>
                    <v-row>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.date" label="Date"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.travelDate"
                            label="Inclusive Date Of Travel" outlined dense readonly
                            :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.departureDate"
                            label="Estimated Departure Date" outlined dense readonly
                            :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.arrivalDate"
                            label="Estimated Arrival Date" outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field class="ml-2 mr-2 text-field" v-model="cashAdvanceFormDetails.amount"
                            label="Amount" outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                        <v-text-field class="ml-2 mr-2" v-model="cashAdvanceFormDetails.purpose" label="Purpose"
                            outlined dense readonly :background-color="inputBackGround">
                        </v-text-field>
                    </v-row>
                </div>
                <v-divider></v-divider>
                <div class="mt-8">
                    <div class="mb-4">
                        <h3>APPROVER DETAILS</h3>
                    </div>
                    <!-- <v-col> -->
                    <v-row>
                        <v-col v-for="(item, index) in cashApprovers" :key="index" cols="12" md="6">
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
                    <!-- </v-col> -->
                    <br>
                </div>
            </v-form>
        </v-col>
    </v-container>

</template>
<script>
import store from '@/store'



export default {
    name: 'responseCashDetails',
    data() {
        return {
            inputBackGround: 'grey lighten-3',
            formData: {
                idNumber: '',
                author: '',
                jobTitle: '',
                branch: '',
                area: '',
                region: '',
                email: '',
                controlNo: '',
                date: '',
                travelDate: '',
                departureDate: '',
                arrivalDate: '',
                amount: '',
                purpose: ''
            },
            approvers: [],
        }
    },
    ready: function () {
        this.cashDetails()
    },
    computed: {
        cashAdvanceFormDetails() {
            return this.formData
        },
        cashApprovers() {
            return this.approvers
        }
    },
    created() {
        setTimeout(() => {
            this.cashDetails()
        }, 1500);
        this.cashAdvance
    },
    methods: {
        cashDetails() {

            if (store.getters.getRequestByControlNoCash.length === 0) {

                this.snackbar = {
                    message: 'Not data found. Please Refresh page',
                    show: true,
                    color: 'red darken-3'
                }

            } else {

                setTimeout(() => {
                    const cashDetails = store.getters.getRequestByControlNoCash.rows[0];
                    const cashapprovers = store.getters.getRequestByControlNoCash.approvers;

                    this.formData = {
                        idNumber: cashDetails.idNumber,
                        author: cashDetails.author.toUpperCase(),
                        jobTitle: cashDetails.jobTitle,
                        branch: cashDetails.branch,
                        area: cashDetails.area,
                        region: cashDetails.region,
                        email: cashDetails.email,
                        controlNo: cashDetails.controlNo,
                        date: cashDetails.date,
                        travelDate: cashDetails.travelDate,
                        departureDate: cashDetails.departureDate,
                        arrivalDate: cashDetails.arrivalDate,
                        amount: cashDetails.amount,
                        purpose: cashDetails.purpose
                    }
                    this.approvers = cashapprovers;
                }, 1000);
            }
        }
    }

}
</script>