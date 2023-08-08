<template>
    <v-container class="m-auto mb-10 pb-13 mt-15"
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
        <v-overlay :z-index="zIndex" :value="overlay" :opacity="0.47">
            <v-dialog v-model="dialog" width="380" persistent>
                <v-card class="pt-5 pb-5">
                    <div class="d-flex" style="justify-content: center;">
                        <v-img src="../../assets/diamond.png" max-height="90" max-width="90" class="mt-3"></v-img>
                    </div>
                    <v-card-title style="justify-content: center;">
                        <p style="font-size: 15px;">
                            Your request is being processed.
                        </p>
                        <p style="font-size: 13px;">Application is for approval, we will be in touch with you within five to seven business days</p>
                    </v-card-title>
                </v-card>
            </v-dialog>
        </v-overlay>
    </v-container>
</template>
<script>

import router from '@/router/router';
import store from '@/store';

export default {
    name: 'CA_successComponent',
    data() {
        return {
            dialog: true,
            overlay: true,
            zIndex: 0,
            data: {
                idNumber: '',
                author: '',
                jobTitle: '',
                branch: '',
                area: '',
                region: '',
                zonecode: '',
                controlNo: '',
                date: '',
                travelDate: '',
                departureDate: '',
                arrivalDate: '',
                amount: '',
                purpose: ''
            }
        }
    },
    created() {

        this.getData();
        setTimeout(() => {
            this.dialog = false
            this.overlay = false
        }, 3000);

    },
    methods: {
        async getData() {
            const response = await store.dispatch('getRequestByControlNoCash', { controlNo: this.$route.query.controlNo });

            if (response.status == 200) {
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {

                        let request = response.data.request[0];

                        let reqDate = new Date(request.date);
                        let date = reqDate.getFullYear().toString() + '-' + (("0" + (reqDate.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + reqDate.getDate()).slice(-2).toString();

                        this.data = {
                            idNumber: request.idNumber,
                            author: request.author,
                            jobTitle: request.jobTitle,
                            branch: request.branch,
                            area: request.area,
                            region: request.region,
                            zonecode: request.zonecode,
                            controlNo: request.controlNo,
                            date: date,
                            travelDate: request.travelDate,
                            departureDate: request.departureDate,
                            arrivalDate: request.arrivalDate,
                            amount: request.amount,
                            purpose: request.purpose
                        }
                    }
                }
            } else {
                router.push({ path: '/home' })
            }
        }
    }
}
</script>
<style>
.mt-1 .col-2 {
    max-width: 15%;
}
</style>