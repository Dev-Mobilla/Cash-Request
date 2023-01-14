<template>
    <v-container class="m-auto mb-10 pb-13 mt-15"
        style="background-color: white;border-radius: 13px; max-width: 65%; border: 2px solid #88888861;">
        <v-row justify="space-between" class="header">
            <v-col class="title" cols="8">
                <h4 class="white--text">Revolving Fund Liquidation</h4>
            </v-col>
            <v-col cols="4" class="pl-0 pr-2">
                <v-img src="../../assets/logo-ml.png" class="logo" max-width="300"></v-img>
            </v-col>
        </v-row>
        <v-form>
            <v-row class="mx-auto ml-10 mr-10 mb-10">
                <v-col cols="7">
                    <v-row>
                        <v-col style="padding:0px">
                            <!-- <v-row align="baseline" class="mt-0">
                                <v-col cols="4"><label for="">Position</label></v-col>
                                <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                    <v-text-field dense readonly v-model="data.type"></v-text-field>
                                </v-col>
                            </v-row> -->
                            <v-row align="baseline" class="mt-0">
                                <v-col cols="4"><label for="">Date:</label></v-col>
                                <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                    <v-text-field dense readonly v-model="data.rfDate"></v-text-field>
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
                                    <v-text-field dense readonly v-model="data.baseBranch"></v-text-field>
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
                                    <v-text-field readonly dense v-model="data.supplies"></v-text-field>
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
                                    <v-text-field dense readonly v-model="data.totalExpenses"></v-text-field>
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
        <v-overlay :z-index="zIndex" :value="overlay" :opacity="0.47">
            <v-dialog v-model="dialog" width="360" persistent>
                <v-card class="pt-5 pb-5">
                    <div class="d-flex" style="justify-content: center;">
                        <v-img src="../../assets/diamond.png" max-height="90" max-width="90" class="mt-3"></v-img>
                    </div>
                    <v-card-title style="justify-content: center;">
                        <p style="font-size: 15px;">
                            Your request is being processed.
                        </p>
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
    name: 'RF_successComponent',
    data() {
        return {
            dialog: true,
            overlay: true,
            zIndex: 0,
            data: {
                baseBranch: '',
                cashOnHand: '',
                controlNo: '',
                zonecode: '',
                meals: '',
                others: '',
                pendingRf: '',
                period: '',
                purpose: '',
                region: '',
                requestor: '',
                rfAllowance: '',
                rfDate: '',
                supplies: '',
                total: '',
                totalExpenses: '',
                transpo: '',
            }
        }
    },
    created() {
        setTimeout(() => {
            this.dialog = false
            this.overlay = false
        }, 2000);
        this.populateData();

    },
    methods: {
        async populateData() {
            const response = await store.dispatch('getRequestByControlNoRf', { controlNo: this.$route.query.controlNo });

            if (response.status == 200) {
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {

                        let request = response.data.request[0];

                        this.data = {
                            baseBranch: request.baseBranch,
                            cashOnHand: request.cashOnHand,
                            controlNo: request.controlNo,
                            zonecode: request.zonecode,
                            meals: request.meals,
                            others: request.others,
                            pendingRf: request.pendingRf,
                            period: request.period,
                            purpose: request.purpose,
                            region: request.region,
                            requestor: request.requestor,
                            rfAllowance: request.rfAllowance,
                            rfDate: request.rfDate,
                            supplies: request.officeSupplies,
                            total: request.total,
                            totalExpenses: request.totalExpenses,
                            transpo: request.transportation,
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