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
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Date:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.rfDate]"
                                            v-model="dateNow" type="date" readonly
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
                                    <v-col cols="4"><label for="">Job Title:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense v-model="rfFormData.jobTitle" readonly
                                            :background-color="rfFormData.jobTitle ? inputBackGround : ''"></v-text-field>
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
                                            :background-color="rfFormData.controlNo ? inputBackGround : ''"
                                            :rules="[RequiredRules.controlNo]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">

                                    <v-col cols="4"><label for="">Period:</label></v-col>
                                    <v-col cols="4" style="padding-top: 0px;padding-right: 0px;">
                                        <v-select :items="periodMonth" dense outlined v-model="rfFormData.period.month"
                                            placeholder="Month"
                                            :background-color="rfFormData.period.month ? inputBackGround : ''"
                                            :rules="[RequiredRules.month]"></v-select>
                                    </v-col>
                                    <v-col cols="3"
                                        style="padding-bottom: 5px;padding-top: 0px;padding-left: 0px;margin-left: 15px;">
                                        <v-select :items="getPeriodYears" dense outlined
                                            v-model="rfFormData.period.year" placeholder="Year"
                                            :background-color="rfFormData.period.year ? inputBackGround : ''"
                                            :rules="[RequiredRules.year]"></v-select>
                                    </v-col>

                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">RF Allowance:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">

                                        <v-text-field outlined dense :rules="[RequiredRules.rfAllowance]"
                                            v-model="rfFormData.rfAllowance" ref="allowanc"
                                            :background-color="rfFormData.rfAllowance ? inputBackGround : ''"
                                            @keydown="onkeydownAmount($event)" @change="allowanceChange">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Pending RF:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.pendingRf]"
                                            v-model="rfFormData.pendingRf" placeholder="e.g. None"
                                            :background-color="rfFormData.pendingRf ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Cash on hand:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.cashOnHand]"
                                            v-model="rfFormData.cashOnHand" readonly
                                            :background-color="rfFormData.cashOnHand ? inputBackGround : ''"
                                            @keydown="onkeydownAmount($event)" ref="totalCashOnHand"></v-text-field>
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
                                            v-model="rfFormData.transpo" ref="transpo"
                                            :background-color="rfFormData.transpo ? inputBackGround : ''"
                                            @keydown="onkeydownAmount($event)" @change="transpoChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Office Supplies:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">

                                        <v-text-field outlined dense :rules="[RequiredRules.supplies]"
                                            v-model="rfFormData.supplies"
                                            :background-color="rfFormData.supplies ? inputBackGround : ''"
                                            @keydown="onkeydownAmount($event)" ref="supplies"
                                            @change="suppliesChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Meals:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">

                                        <v-text-field outlined dense :rules="[RequiredRules.meals]"
                                            v-model="rfFormData.meals"
                                            :background-color="rfFormData.meals ? inputBackGround : ''"
                                            @keydown="onkeydownAmount($event)" ref="meals"
                                            @change="mealsChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Others:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.others]"
                                            v-model="rfFormData.others"
                                            :background-color="rfFormData.others ? inputBackGround : ''"
                                            @keydown="onkeydownAmount($event)" ref="others"
                                            @change="othersChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Total Expenses:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense readonly :rules="[RequiredRules.totalExpenses]"
                                            v-model="rfFormData.totalExpenses"
                                            :background-color="rfFormData.totalExpenses ? inputBackGround : ''"
                                            @keydown="onkeydownAmount($event)" ref="totalExpensesRef">
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
                <v-row justify="center" class="mt-8">
                    <v-dialog v-model="dialog" width="350" persistent>
                        <v-card class="pt-5 pb-5">
                            <v-card-title>
                                <p>Submit Request?</p>
                            </v-card-title>
                            <v-card-text style="font-size: 15px;">
                                You are about to submit request: <p style="margin-top: 2px;font-weight: 500;">{{ rfFormData.controlNo }}</p>
                            </v-card-text>
                            <v-row dense justify="center" style="margin: 0px 20px;">
                                <v-btn height="32px" rounded small block color="primary" @click.prevent="submitForm"
                                    :disabled="loading" class="mt-1 mb-2">
                                    <div v-if="loading" class="spinner-border spinner-border-sm">
                                    </div>
                                    <span v-if="loading" class="px-1">Loading...</span>
                                    <span v-else>Yes</span>
                                </v-btn>
                                <v-btn height="32px" rounded small block color="red darken-4" class="white--text mt-1 mb-2"
                                    @click="dialog = false" :disabled="loading">
                                    No
                                </v-btn>
                            </v-row>
                        </v-card>
                    </v-dialog>
                    <v-btn class="white--text" color="red accent-4" width="17%" @click.prevent="dialog = true"
                        :disabled="!isFormValid || checkZeroInput">Submit</v-btn>
                </v-row>
            </v-col>
            <!-- <v-col>
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
                        :disabled="!isFormValid || checkZeroInput">Submit</v-btn>
                </v-row>
            </v-col> -->
            <v-snackbar top elevation="0" :timeout="5000" :color="snackbar.color" v-model="snackbar.show"
                min-height="60" class="text-center">
                <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
            </v-snackbar>
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
            year: 'ex.' + ' ' + (new Date().toLocaleString('default', { month: 'long' })).toString() + ' ' + new Date().getFullYear().toString(),
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
            periodMonth: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
            ],
            RequiredRules: {
                controlNo: v => !!v || "Control No. is required",
                rfDate: v => !!v || "Date is required",
                month: v => !!v || "Month is required",
                year: v => !!v || "Year is required",
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

            },
            InputRules: {
                purpose: v => (v || '').length <= 100 || 'Purpose must be 100 characters or less',
            },
            rfFormData: {
                zonecode: '',
                rfDate: '',
                idNumber: '',
                requestor: '',
                baseBranch: '',
                region: '',
                period: {
                    month: '',
                    year: ''
                },
                controlNo: '',
                rfAllowance: null,
                pendingRf: '',
                totalExpenses: null,
                cashOnHand: null,
                transpo: null,
                supplies: null,
                meals: null,
                others: null,
                purpose: '',
                jobTitle: ''
            },
            token: this.$route.query.token,
            isLoggedIn: sessionStorage.getItem('to-hu'),
        }
    },
    created() {
        this.generateControlNo()
        this.generateDate()
        if (this.isLoggedIn) {
            this.encryptedUser()
        }
    },
    mounted() {

        this.$watch(
            () => {

                let total;

                if (this.rfFormData.transpo == null || this.rfFormData.supplies == null || this.rfFormData.meals == null || this.rfFormData.others == null) {

                    total = 0;

                } else if (this.rfFormData.transpo == '' || this.rfFormData.supplies == '' || this.rfFormData.meals == '' || this.rfFormData.others == '') {

                    total = 0;
                }
                else {
                    total = parseFloat(this.rfFormData.transpo.replace(/,/g, '')) + parseFloat(this.rfFormData.supplies.replace(/,/g, '')) + parseFloat(this.rfFormData.meals.replace(/,/g, '')) + parseFloat(this.rfFormData.others.replace(/,/g, ''));

                }
                return total
            },
            (val) => {

                this.rfFormData.totalExpenses = val.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

            }
        )
        this.$watch(
            () => {

                let val

                if (this.rfFormData.rfAllowance == null || this.rfFormData.totalExpenses == null || this.rfFormData.totalExpenses <= 0 || this.rfFormData.rfAllowance <= 0) {

                    val = 0

                } else {
                    let parseAllowance = parseFloat(this.rfFormData.rfAllowance.replace(/,/g, ''));
                    let parseTotal = parseFloat(this.rfFormData.totalExpenses.replace(/,/g, ''));

                    val = parseAllowance - parseTotal

                }
                return val
            },
            (val) => {
                this.rfFormData.cashOnHand = val.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })
            }
        )

    },
    watch: {

    },
    computed: {
        dateNow() {
            let reqDate = this.rfFormData.rfDate;
            let date = reqDate.getFullYear().toString() + '-' + (("0" + (reqDate.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + reqDate.getDate()).slice(-2).toString();
            return date
        },
        getPeriodYears() {
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear()
            let previousYear = currentYear--
            return [previousYear, currentYear]
        },
        checkZeroInput() {

            let cashOnHand;

            if (this.rfFormData.cashOnHand == null || this.rfFormData.cashOnHand == "") {
                cashOnHand = this.rfFormData.cashOnHand
            } else {
                cashOnHand = parseFloat(this.rfFormData.cashOnHand.replace(/,/g, ''));
            }

            if (this.rfFormData.rfAllowance < 1 || cashOnHand < 0 || this.rfFormData.totalExpenses <= 0 || this.rfFormData.totalExpenses < 1) {

                return true
            } else if (this.rfFormData.rfAllowance == null || this.rfFormData.cashOnHand == null) {

                return true
            }

            return false
        },

    },
    methods: {
        allowanceChange() {
            let allowance;

            if (this.rfFormData.rfAllowance == null || this.rfFormData.rfAllowance == '') {
                allowance = this.rfFormData.rfAllowance
            } else {

                allowance = parseFloat(this.rfFormData.rfAllowance.replace(/,/g, ''))

            }
            this.rfFormData.rfAllowance = allowance.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        transpoChange() {
            let transpo;

            if (this.rfFormData.transpo == null || this.rfFormData.transpo == '') {
                transpo = this.rfFormData.transpo
            } else {

                transpo = parseFloat(this.rfFormData.transpo.replace(/,/g, ''))

            }
            this.rfFormData.transpo = transpo.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        suppliesChange() {
            let supplies;

            if (this.rfFormData.supplies == null || this.rfFormData.supplies == '') {
                supplies = this.rfFormData.supplies
            } else {

                supplies = parseFloat(this.rfFormData.supplies.replace(/,/g, ''))

            }
            this.rfFormData.supplies = supplies.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        mealsChange() {
            let meals;

            if (this.rfFormData.meals == null || this.rfFormData.meals == '') {
                meals = this.rfFormData.rfmeals
            } else {

                meals = parseFloat(this.rfFormData.meals.replace(/,/g, ''))

            }
            this.rfFormData.meals = meals.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        othersChange() {
            let others;

            if (this.rfFormData.others == null || this.rfFormData.others == '') {
                others = this.rfFormData.others
            } else {

                others = parseFloat(this.rfFormData.others.replace(/,/g, ''))

            }
            this.rfFormData.others = others.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        onkeydownAmount(e) {

            let invalidInputs = ["e", "E", "+", "-"];
            let numbers = (/^[-+]?[0-9]*\.?[0-9]*$/.test(e.key))


            let isInclude = invalidInputs.includes(e.key);

            if (isInclude) {
                return e.preventDefault();
            } else if (numbers || e.key == "Backspace") {
                return e
            } else {
                return e.preventDefault();
            }


            // let invalidInputs = ["e", "E", "+", "-"];

            // let isInclude = invalidInputs.includes(e.key);

            // if (isInclude) {
            //     return e.preventDefault();
            // } else {
            //     return e
            // }

        },

        generateDate() {
            let dateInstance = new Date();
            let date = dateInstance;

            return this.rfFormData.rfDate = date
            // let dateInstance = new Date();
            // let date = dateInstance.getFullYear().toString() + '-' + (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + dateInstance.getDate()).slice(-2).toString();
            // return this.rfFormData.rfDate = date
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
                    if (res.data.id == undefined) {
                        this.snackbar = {
                            show: true,
                            color: 'red darken-2',
                            message: res.data.message,
                        }

                    } else {
                        let dateInstance = new Date();
                        let date = (dateInstance.getFullYear().toString()).substr(-2) + (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString() + ("0" + dateInstance.getDate()).slice(-2).toString();
                        let maxId = (res.data.id + 1).toString().padStart(6, 0)

                        return this.rfFormData.controlNo = `RF-${date}-${maxId}`

                    }

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
                this.rfFormData.jobTitle = requestorBytes.jobTitle.toUpperCase();

            }, 1000);

        },

        submitForm() {
            this.loading = true

            let auth = store.getters.auth;

            let session = sessionStorage.getItem('kai-tono');// requestor

            const decData = CryptoJs.enc.Base64.parse(session).toString(CryptoJs.enc.Utf8);
            const dataBytes = CryptoJs.AES.decrypt(decData, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);
            let sesData = JSON.parse(dataBytes)

            this.rfFormData.areaCode = sesData.areaCode
            this.rfFormData.area = sesData.area

            let getApprovers = store.getters.getApprovers;
            const decToken = CryptoJs.enc.Base64.parse(getApprovers).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let approverBytes = JSON.parse(bytes)

            let getApproversEmail = store.getters.getApproversEmail;
            const decEmails = CryptoJs.enc.Base64.parse(getApproversEmail).toString(CryptoJs.enc.Utf8);
            const bytesAppEmail = CryptoJs.AES.decrypt(decEmails, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);
            let approverBytesEmail = JSON.parse(bytesAppEmail)

            let storedEmail = store.getters.getEmail;
            const decEmail = CryptoJs.enc.Base64.parse(storedEmail).toString(CryptoJs.enc.Utf8);
            const bytesEmail = CryptoJs.AES.decrypt(decEmail, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);
            let email = JSON.parse(bytesEmail)

            this.rfFormData.email = email;

            axios.post('/rf_request', 
            { 
                data: this.rfFormData, 
                approvers: approverBytes,
                approverEmails: approverBytesEmail 
            },
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
                    }else if(res.data.resCode == 0){
                        setTimeout(() => {
                            this.loading = false;
                            this.dialog = false;
                            this.snackbar.show = true;
                            this.snackbar.color = 'success';
                            this.snackbar.message = `${res.data.message} submission!`;
                            setTimeout(() => {
                                localStorage.setItem('success', JSON.stringify(true));
                                router.push({ name: 'REVOLVING FUND REQUEST RESULTS', query: { controlNo: this.rfFormData.controlNo } })
                            }, 1000);
                        }, 2500)
                    }else{
                        setTimeout(() => {
                            this.loading = false;
                            this.dialog = false;
                            setTimeout(() => {
                                sessionStorage.setItem('request', JSON.stringify(res.data.rows))
                                router.push({ name: 'Success Error', query: { messageHeader: res.data.messageHeader, messageBody: res.data.message } })
                            }, 700);
                        }, 2500)
                    }

                }

            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") {
                    setTimeout(() => {
                        this.loading = false
                        this.dialog = false
                        
                        router.push({ path: '/error', query: { message: err.response.data.message } })
                    }, 2000)
                    
                }else if (err.code == "ERR_NETWORK") {
                    setTimeout(() => {
                    this.loading = false
                    this.dialog = false
                   
                    router.push({ path: '/error', query: { message: err.message } })

                }, 2000)
               
                }
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