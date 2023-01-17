<template>
    <div>
        <v-container class="m-auto mb-10 pb-13 mt-15"
            style="background-color: white;border-radius: 13px; max-width: 85%;border: 2px solid #88888861;">
            <v-row justify="space-between" class="header">
                <v-col class="title" cols="8">
                    <h4 class="white--text">Revolving Fund Liquidation</h4>
                </v-col>
                <v-col cols="4" class="pl-0 pr-2">
                    <v-img src="../../assets/logo-ml.png" class="logo" max-width="350"></v-img>
                </v-col>
            </v-row>
            <v-form ref="data" v-model="isFormValid" class="mt-7">
                <v-row class="mx-auto ml-10 mr-5 mb-10">
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <!-- <v-row align="baseline" class="mt-0">
                                <v-col cols="4"><label for="">Position:</label></v-col>
                                <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                    <v-select :items="requestorType" readonly dense outlined v-model="rfFormData.type"
                                        :background-color="rfFormData.type ? inputBackGround : ''"
                                        :rules="[RequiredRules.type]"></v-select>
                                </v-col>
                            </v-row> -->
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Date:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.rfDate]"
                                            v-model="rfFormData.rfDate" type="date" readonly
                                            :background-color="rfFormData.rfDate ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">ID Number:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense v-model="rfFormData.idNumber"
                                            :background-color="rfFormData.idNumber ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Requestor:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense v-model="rfFormData.requestor" readonly
                                            :background-color="rfFormData.requestor ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Base Branch:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense v-model="rfFormData.baseBranch"
                                            placeholder="ex. ML LANGIHAN" readonly
                                            :background-color="rfFormData.baseBranch ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Region:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense v-model="rfFormData.region"
                                            placeholder="ex. CEBU NORTH A" readonly
                                            :background-color="rfFormData.region ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Zone Code:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense v-model="rfFormData.zonecode" readonly
                                            :background-color="rfFormData.zonecode ? inputBackGround : ''">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <!-- <v-row align="baseline" class="mt-0">
                                <v-col cols="4"><label for="">Email Address:</label></v-col>
                                <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                    <v-text-field outlined dense :rules="[RequiredRules.email]"
                                        v-model="rfFormData.email" readonly
                                        :background-color="rfFormData.email ? inputBackGround : ''">
                                    </v-text-field>
                                </v-col>
                            </v-row> -->
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Control No:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense readonly v-model="rfFormData.controlNo"
                                            :background-color="rfFormData.controlNo ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Period:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.period]"
                                            v-model="rfFormData.period"
                                            :background-color="rfFormData.period ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">RF Allowance:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense type="number" :rules="[RequiredRules.rfAllowance]"
                                            v-model="rfFormData.rfAllowance"
                                            :background-color="rfFormData.rfAllowance ? inputBackGround : ''">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Pending RF:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.pendingRf]"
                                            v-model="rfFormData.pendingRf"
                                            :background-color="rfFormData.pendingRf ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Cash on hand:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.cashOnHand]"
                                            v-model="rfFormData.cashOnHand" type="number"
                                            :background-color="rfFormData.cashOnHand ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <!-- SECOND ROW -->
                <v-row class="mx-auto ml-10 mr-5">
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Transportation:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.transpo]"
                                            v-model="rfFormData.transpo" type="number"
                                            :background-color="rfFormData.transpo ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Office Supplies:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.supplies]"
                                            v-model="rfFormData.supplies" type="number"
                                            :background-color="rfFormData.supplies ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Meals:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense type="number" :rules="[RequiredRules.meals]"
                                            v-model="rfFormData.meals"
                                            :background-color="rfFormData.meals ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Others:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense type="number" :rules="[RequiredRules.others]"
                                            v-model="rfFormData.others"
                                            :background-color="rfFormData.others ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Total Expenses:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense type="number"
                                            :rules="[RequiredRules.totalExpenses]" v-model="rfFormData.totalExpenses"
                                            :background-color="rfFormData.totalExpenses ? inputBackGround : ''">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Purpose: </label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-textarea outlined dense :rules="[RequiredRules.purpose, InputRules.purpose]"
                                            v-model="rfFormData.purpose" placeholder="Please provide purpose..."
                                            :background-color="rfFormData.purpose ? inputBackGround : ''"></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-form>
            <v-col>
                <v-row justify="center" class="mt-10">
                    <v-dialog v-model="dialog" width="350" persistent>
                        <v-card class="pt-5">
                            <div class="d-flex" style="justify-content: center;">
                                <v-img src="../../assets/diamond.png" max-height="90" max-width="90"
                                    class="mt-3"></v-img>
                            </div>
                            <v-card-title style="justify-content: center;">
                                <p>Do you want to submit?</p>
                            </v-card-title>
                            <v-card-actions class="pb-5" style="justify-content: center;">
                                <!-- <v-spacer></v-spacer> -->
                                <v-btn color="red darken-4" text @click="dialog = false" :disabled="loading">
                                    CANCEL
                                </v-btn>
                                <v-btn color="primary" text @click.prevent="submitForm" :disabled="loading">
                                    <div v-if="loading" class="spinner-border spinner-border-sm">
                                    </div>
                                    <span v-if="loading" class="px-1">Loading...</span>
                                    <span v-else>Yes</span>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-btn class="white--text" color="red accent-4" width="17%" @click.prevent="dialog = true"
                        :disabled="!isFormValid">Submit</v-btn>
                </v-row>
            </v-col>
            <v-snackbar top elevation="0" :timeout="5000" :color="snackbar.color" v-model="snackbar.show"
                min-height="60" class="text-center">
                <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
            </v-snackbar>
            <!-- <v-overlay :z-index="zIndex" :value="overlay" :opacity="0.47">
            <v-dialog :value="dialog_signin" persistent width="350">
                <v-card max-width="350" height="350">
                    <div class="d-flex" style="justify-content: center;">
                        <v-img src="../assets/diamond.png" max-height="100" max-width="100" class="mt-5"></v-img>
                    </div>
                    <v-card-title style="justify-content: center;" class="mt-n3">
                        <p
                            style="color:#757575;font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 25px;font-weight: 500;">
                            Cash Request
                        </p>
                    </v-card-title>
                    <v-card-text class="text-center mt-2">
                        <p style="font-size: 15px; color: #616161;">Sign in to complete Cash Request Form</p>
                    </v-card-text>
                    <v-card-actions style="justify-content: center;flex-direction: column;" class="mt-n6">
                        <div>
                            <v-btn color="blue darken-2" class="white--text text-center" tile @click="signin">Sign in
                            </v-btn>
                        </div>
                        <div class="mt-5">
                            <v-btn text style="font-size: 12px;" color="grey darken-2" plain to="/">Back to home</v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-overlay> -->
            <!-- <v-overlay :value="overlay" color="white" :opacity="1">
            <v-progress-circular indeterminate color="#D50000" size="95" width="8" style="margin-right:5px">
                <v-img src="../assets/diamond.png" max-height="75" max-width="75"></v-img>
            </v-progress-circular>
        </v-overlay> -->
        </v-container>
    </div>
</template>

<script>
import axios from '../../helper/axios';
import router from '@/router/router';
import store from '@/store';
import CryptoJs from 'crypto-js';

export default {
    name: 'RevolvingFundComponent',
    data() {
        return {
            // overlay: true,
            zIndex: 0,
            dialog: false,
            checkbox: false,
            isFormValid: true,
            loading: false,
            inputBackGround: 'grey lighten-2',
            snackbar: {
                message: '',
                show: false,
                color: null,
            },
            // requestorType: [
            //     'Branch Manager',
            //     'Area Manager',
            //     'Regional Manager',
            //     'Regional Area Manager',
            //     'Asst. to Vpo | Coo',
            //     'Vpo'
            // ],
            RequiredRules: {
                // type: v => !!v || "Requestor Type is required",
                rfDate: v => !!v || "Date is required",
                // requestor: v => !!v || "Requestor is required",
                // baseBranch: v => !!v || "Base Branch is required",
                // region: v => !!v || "Region is required",
                period: v => !!v || "Period is required",
                rfAllowance: v => !!v || "RF Allowance is required",
                pendingRf: v => !!v || "Pending RF is required",
                totalExpenses: v => !!v || "Total Expenses is required",
                cashOnHand: v => !!v || "Cash on hand is required",
                transpo: v => !!v || "Transportation is required",
                supplies: v => !!v || "Office Supplies is required",
                meals: v => !!v || "Meals is required",
                others: v => !!v || "Others is required",
                total: v => !!v || "Total Expenses is required",
                purpose: v => !!v || "Purpose is required",
                // numOnly: v => (/^[-+]?[0-9]*\.?[0-9]*$/.test(v)) || "Numbers Only",

            },
            InputRules: {
                purpose: v => (v || '').length <= 100 || 'Purpose must be 100 characters or less'
            },
            rfFormData: {
                zonecode: '',
                rfDate: '',
                idNumber: '',
                requestor: '',
                baseBranch: '',
                region: '',
                // email: '',
                period: '',
                controlNo: '',
                rfAllowance: '',
                pendingRf: '',
                totalExpenses: '',
                cashOnHand: '',
                transpo: '',
                supplies: '',
                meals: '',
                others: '',
                purpose: '',
                jobTitle: ''
            },
            token: this.$route.query.token,
            isLoggedIn: sessionStorage.getItem('to-hu')
        }
    },
    created() {
        this.generateControlNo()
        this.generateDate()
        if (this.isLoggedIn) {
            this.encryptedUser()
        }
    },
    methods: {

        generateDate() {
            let dateInstance = new Date();
            let date = dateInstance.getFullYear().toString() + '-' + (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + dateInstance.getDate()).slice(-2).toString();
            return this.rfFormData.rfDate = date
        },
        generateControlNo() {

            let auth = store.getters.auth

            axios.get('/getRfMaxId', {
                headers: {
                    'Accept': 'application/json',
                    "x-access-token": auth
                }
            }).then((res) => {
                if (res.data.resCode == 5) {
                    this.$store.dispatch('userLogout').then(response => {
                        setTimeout(() => {
                            window.location.href = response;
                        }, 1000);
                    });
                } else {
                    let dateInstance = new Date();
                    let date = (dateInstance.getFullYear().toString()).substr(-2) + (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString() + ("0" + dateInstance.getDate()).slice(-2).toString();
                    let maxId = (res.data.id + 1).toString().padStart(6, 0)

                    return this.rfFormData.controlNo = `RF-${date}-${maxId}`
                }

            }).catch(err => {
                this.snackbar = {
                    show: true,
                    color: 'red darken-2',
                    message: err.response.data.message
                }
            })
        },
        encryptedUser() {
            localStorage.setItem('success', JSON.stringify(false))

            setTimeout(() => {
                this.overlay = false

                let getRequestor = store.getters.getRequestor;
                const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
                const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

                let requestorBytes = JSON.parse(bytes)

                this.rfFormData.idNumber = requestorBytes.resId;
                this.rfFormData.baseBranch = requestorBytes.bedrnm.toUpperCase();
                this.rfFormData.region = requestorBytes.region.toUpperCase();
                this.rfFormData.zonecode = requestorBytes.zonecode.toUpperCase();
                this.rfFormData.requestor = requestorBytes.fullname.toUpperCase();
                this.rfFormData.jobTitle = requestorBytes.task.toUpperCase();

            }, 1000);

        },

        submitForm() {
            this.loading = true

            let auth = store.getters.auth;

            let getApprovers = store.getters.getApprovers;
            const decToken = CryptoJs.enc.Base64.parse(getApprovers).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let approverBytes = JSON.parse(bytes)

            axios.post('/rf_request', { data: this.rfFormData, approvers: approverBytes },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "x-access-token": auth
                    }
                }
            ).then(res => {
                if (res.status === 200) {
                    if (res.data.resCode == 5) {
                        this.$store.dispatch('userLogout').then(response => {
                            setTimeout(() => {
                                window.location.href = response;
                            }, 1000);
                        });
                    } else {
                        setTimeout(() => {
                            this.loading = false
                            this.dialog = false
                            this.snackbar.show = true;
                            this.snackbar.color = 'success';
                            this.snackbar.message = `${res.data.message} submission!`;
                            setTimeout(() => {
                                localStorage.setItem('success', JSON.stringify(true));
                                router.push({ name: 'REVOLVING FUND REQUEST RESULTS', query: { controlNo: this.rfFormData.controlNo } })
                            }, 1000);
                        }, 3000)
                    }

                }

            }).catch(err => {
                setTimeout(() => {
                    this.loading = false
                    this.dialog = false
                    this.snackbar.show = true;
                    this.snackbar.color = 'red darken-2';
                    this.snackbar.message = err.response.data.message;

                }, 3000)
                this.$store.dispatch('userLogout').then(response => {
                    setTimeout(() => {
                        window.location.href = response;
                    }, 4000);
                });
            })

        }
    }
}
</script>
<style>
::-webkit-input-placeholder {
    font-style: italic;
}

:-moz-placeholder {
    font-style: italic;
}

::-moz-placeholder {
    font-style: italic;
}

:-ms-input-placeholder {
    font-style: italic;
}

.v-input {
    font-size: 14px;
}

.v-btn.v-size--default {
    font-size: 1rem;
}

.title {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 40px;
    background-color: #cc0404;
    border-radius: 13px 0px 0px;
}

.title .white--text {
    font-size: 23px;
}

.logo {
    padding-right: 0;
    padding-left: 0px;
    margin-top: -10px;
}

.cash-advance--input {
    width: 98%;
}

.cash-advance--input label,
.advance--info p {
    font-weight: 700;
    font-size: 19px;
}

.cash-advance--input p {
    font-weight: 500;
    margin-left: 20px;
}

.cash-advance {
    /* margin-left: 7px; */
    border-top: none;
    border-left: none;
    border-right: none;
}

.mt-0 label,
.flex-column label {
    font-size: 14px;
}

.mt-0 .col-4 {
    max-width: 30%;
}

hr.horizontal--cash-advance {
    width: 97%;
    margin-top: 35px;
    border-top: 1px solid #3f3f3f67;

}
</style>