<template>
    <div>
        <v-container class="m-auto mb-10 pb-13 mt-15"
            style="background-color: white;border-radius: 13px; max-width: 85%; border: 2px solid #88888861;">
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
            <v-form ref="data" v-model="isFormValid">
                <v-row class="mx-auto ml-10 mr-10">
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">ID Number:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense
                                            :rules="[RequiredRules.idNumber, RequiredRules.numOnly]"
                                            v-model="formData.idNumber" readonly
                                            :background-color="formData.idNumber ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Requestor:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense v-model="formData.author" readonly
                                            :background-color="formData.author ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Job Title:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense v-model="formData.jobTitle" readonly
                                            :background-color="formData.jobTitle ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Branch:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense readonly v-model="formData.branch"
                                            :background-color="formData.branch ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Area:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense readonly v-model="formData.area"
                                            :background-color="formData.area ? inputBackGround : ''">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Region:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense readonly v-model="formData.region"
                                            :background-color="formData.region ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Zone Code:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field outlined dense readonly v-model="formData.zonecode"
                                            :background-color="formData.zonecode ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row>
                                <!-- <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Email Address:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field outlined dense readonly v-model="formData.email"
                                            :background-color="formData.email ? inputBackGround : ''"></v-text-field>
                                    </v-col>
                                </v-row> -->
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Control No:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense readonly v-model="formData.controlNo"
                                            :background-color="formData.controlNo ? inputBackGround : ''"
                                            :rules="[RequiredRules.controlNo]">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 5px; padding-top: 0px;">
                                        <v-text-field outlined dense type="date" :rules="[RequiredRules.date]"
                                            v-model="formData.date" readonly
                                            :background-color="formData.date ? inputBackGround : ''">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Inclusive Date Of Travel:</label></v-col>

                                    <v-col>
                                        <v-menu v-model="modal" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="formData.travelDate" placeholder="Choose Date"
                                                    v-bind="attrs" v-on="on" outlined dense readonly
                                                    :background-color="formData.travelDate ? inputBackGround : ''"
                                                    :rules="[RequiredRules.dates]">
                                                    <v-icon slot="append" color="blue darken-2">
                                                        mdi-calendar-month-outline</v-icon>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="formData.travelDate" @input="modal = false"></v-date-picker>
                                            <!-- <v-date-picker :min="getStartDate" :max="getEndDate"
                                                v-model="formData.travelDate" @input="modal = false"></v-date-picker> -->
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Estimated Departure Date:</label></v-col>

                                    <v-col>
                                        <v-menu v-model="modal2" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="formData.departureDate" placeholder="Choose Date"
                                                    v-bind="attrs" v-on="on" outlined dense readonly
                                                    :background-color="formData.departureDate ? inputBackGround : ''"
                                                    :rules="[RequiredRules.dates]">
                                                    <v-icon slot="append" color="blue darken-2">
                                                        mdi-calendar-month-outline</v-icon>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="formData.departureDate"
                                                @input="modal2 = false"></v-date-picker>
                                            <!-- <v-date-picker :min="getStartDate" :max="getEndDate"
                                                v-model="formData.departureDate"
                                                @input="modal2 = false"></v-date-picker> -->
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Estimated Arrival Date:</label></v-col>

                                    <v-col>
                                        <v-menu v-model="modal3" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="formData.arrivalDate" placeholder="Choose Date"
                                                    v-bind="attrs" v-on="on" outlined dense readonly
                                                    :background-color="formData.arrivalDate ? inputBackGround : ''"
                                                    :rules="[RequiredRules.dates]">
                                                    <v-icon slot="append" color="blue darken-2">
                                                        mdi-calendar-month-outline</v-icon>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker 
                                                v-model="formData.arrivalDate" @input="modal3 = false"></v-date-picker>
                                            <!-- <v-date-picker 
                                            :min="getStartDate" :max="getEndDate"
                                                v-model="formData.arrivalDate" @input="modal3 = false"></v-date-picker> -->
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Amount:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 5px;padding-top: 0px;">
                                        <v-text-field outlined dense :rules="[RequiredRules.amount]"
                                            v-model="formData.amount" ref="amount"
                                            :background-color="formData.amount ? inputBackGround : ''" :min="1"
                                            @keydown="onkeydownAmount($event)"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-row class="flex-column mt-1">
                        <v-col id="col-label"><label for="purpose">Purpose: </label></v-col>
                        <v-col style="padding-bottom: 0px; padding-top: 0px;">
                            <v-textarea outlined dense :rules="[RequiredRules.purpose, InputRules.purpose]"
                                v-model="formData.purpose" :background-color="formData.purpose ? inputBackGround : ''"
                                placeholder="Please provide purpose...">
                            </v-textarea>
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
                            <v-checkbox id="checkbox" v-model="checkbox"></v-checkbox>
                            <v-col>
                                <label for="checkbox" style="cursor:pointer">This is to Authorized M Lhuillier Financial
                                    Services -
                                    HRMD Payroll Master to deduct from my salary the following amount of unliquidated
                                    cash advance 5 days after completion of the purpose of this cash advance.
                                </label>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-col>
                <v-col>
                    <v-row justify="end" class="mr-5 ml-5">
                        <v-col cols="4">
                            <v-text-field outlined dense readonly v-model="formData.employeeName"
                                :background-color="formData.employeeName ? inputBackGround : ''"></v-text-field>
                            <label for="">Employee Name</label>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field outlined dense readonly v-model="formData.idNumber"
                                :background-color="formData.idNumber ? inputBackGround : ''">
                            </v-text-field>
                            <label for="">ID Number</label>
                        </v-col>
                    </v-row>
                </v-col>
            </v-form>
            <v-col>
                <v-row justify="center" class="mt-8">
                    <v-dialog v-model="dialog" width="350" persistent>
                        <v-card class="pt-5">
                            <div class="d-flex" style="justify-content: center;">
                                <v-img src="../../assets/diamond.png" max-height="90" max-width="90"
                                    class="mt-3"></v-img>
                            </div>
                            <v-card-title style="justify-content: center;">
                                <p style="justify-content: center;">Do you want to submit?</p>
                            </v-card-title>
                            <v-card-actions class="pb-5" style="justify-content: center;">
                                <!-- <v-spacer></v-spacer> -->
                                <v-btn color="red darken-4" text @click="dialog = false" :disabled="loading">
                                    Cancel
                                </v-btn>
                                <v-btn color="primary" text @click="submitForm" :disabled="loading">
                                    <div v-if="loading" class="spinner-border spinner-border-sm">
                                    </div>
                                    <span v-if="loading" class="px-1">Loading...</span>
                                    <span v-else>Yes</span>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-btn class="white--text" color="red accent-4" width="17%" @click.prevent="dialog = true"
                        :disabled="!isFormValid || !checkbox || formData.amount < 1">Submit</v-btn>
                </v-row>
            </v-col>
            <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show"
                min-height="60" class="text-center">
                <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
import router from '@/router/router';
import store from '@/store';
import axios from '../../helper/axios';
import CryptoJs from 'crypto-js';
import AutoNumeric from "autonumeric";


export default {
    name: 'CashAdvanceComponent',
    mounted(){
        new AutoNumeric(this.$refs.amount.$refs.input);
    },
    data() {
        return {
            modal: false,
            modal2: false,
            modal3: false,
            dialog: false,
            zIndex: 0,
            checkbox: false,
            isFormValid: true,
            loading: false,
            inputBackGround: 'grey lighten-2',
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
            RequiredRules: {
                controlNo: v => !!v || "Control No. is required",
                idNumber: v => !!v || "ID Number is required",
                amount: v => !!v || "Amount is required",
                date: v => !!v || "Date is required",
                travelDate: v => !!v || "Inclusive Date Of Travel is required",
                departureDate: v => !!v || "Estimated Departure Date is required",
                arrivalDate: v => !!v || "Estimated Arrival Date is required",
                purpose: v => !!v || "Purpose is required",
                numOnly: v => (/^[-+]?[0-9]*\.?[0-9]*$/.test(v)) || "Numbers Only",
                dates: v => !!v || "This field is required",
            },
            InputRules: {
                purpose: v => (v || '').length <= 100 || 'Purpose must be 100 characters or less',
                

            },
            formData: {
                idNumber: '',
                author: '',
                jobTitle: '',
                branch: '',
                area: '',
                region: '',
                zonecode: '',
                amount: '',
                controlNo: '',
                date: '',
                travelDate: '',
                departureDate: '',
                arrivalDate: '',
                purpose: '',
                employeeName: '',
                type: ''
            },
            isLoggedIn: sessionStorage.getItem('to-hu')
        }

    },
    async created() {
        this.generateControlNo()
        this.generateDate()
        if (this.isLoggedIn) {
            this.encryptedUser()
        } else {
            const response = await this.$store.dispatch('userLogout');

            window.location.href = response;
        }
    },

    computed: {
        // getEndDate() {
        //     var numberOfDaysToAdd = 62; //number of days to add.
        //     var today = new Date(); //Today's Date
        //     var startDate = new Date(
        //         today.getFullYear(),
        //         today.getMonth(),
        //         today.getDate() + numberOfDaysToAdd
        //     );
        //     return startDate.toISOString().slice(0, 10);
        // },
        // getStartDate() {
        //     var numberOfDaysToAdd = 1; //number of days to add.
        //     var today = new Date(); //Today's Date
        //     var startDate = new Date(
        //         today.getFullYear(),
        //         today.getMonth(),
        //         today.getDate() + numberOfDaysToAdd
        //     );
        //     return startDate.toISOString().slice(0, 10);
        // }
    },
    methods: {
        // onInputAmount(e){
        //     let result = e.toString().replace(/\D/g, "")
        //         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //     this.formData.amount = result
        // },
        onkeydownAmount(e) {

            let invalidInputs = ["e", "E", "+", "-"];

            let isInclude = invalidInputs.includes(e.key);

            if (isInclude) {
                return e.preventDefault();
            } else {
                return e
            }

        },
        async generateControlNo() {

            let auth = store.getters.auth

            const res = await store.dispatch('getMaxIdCash', { auth: auth })

            if (res.status == 200) {
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

                        return this.formData.controlNo = `CA-${date}-${maxId}`
                    }
                }
            } else {
                this.snackbar = {
                    show: true,
                    color: 'red darken-2',
                    message: res.message,
                }
            }

            // axios.get('/getMaxId', {
            //     headers: {
            //         "Content-Type": "application/json",
            //         "accept": 'application/json',
            //         "x-access-token": auth
            //     }
            // }).then((res) => {
            //     console.log(res);
            //     if (res.data.resCode == 5) {
            //         this.$store.dispatch('userLogout').then(response => {
            //             setTimeout(() => {
            //                 window.location.href = response;
            //             }, 1000);
            //         });
            //     } else {
            //         if (res.data.id) {
            //             let dateInstance = new Date();
            //             let date = (dateInstance.getFullYear().toString()).substr(-2) + (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString() + ("0" + dateInstance.getDate()).slice(-2).toString();
            //             let maxId = (res.data.id + 1).toString().padStart(6, 0)

            //             return this.formData.controlNo = `CA-${date}-${maxId}`
            //         }
            //     }

            // }).catch(err => {
            //     this.snackbar = {
            //         show: true,
            //         color: 'red darken-2',
            //         message: err.message,
            //     }
            // })
        },
        generateDate() {
            let dateInstance = new Date();
            let date = dateInstance.getFullYear().toString() + '-' + (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + dateInstance.getDate()).slice(-2).toString();
            return this.formData.date = date
        },

        encryptedUser() {
            localStorage.setItem('success', JSON.stringify(false))

            setTimeout(() => {
                this.overlay = false

                let getRequestor = store.getters.getRequestor;
                const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
                const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

                let requestorBytes = JSON.parse(bytes)

                this.formData.idNumber = requestorBytes.resId;
                this.formData.author = requestorBytes.fullname.toUpperCase();
                this.formData.jobTitle = requestorBytes.jobTitle.toUpperCase();
                this.formData.branch = requestorBytes.bedrnm.toUpperCase(); // branchname
                this.formData.area = requestorBytes.area.toUpperCase();
                this.formData.region = requestorBytes.region.toUpperCase();
                this.formData.zonecode = requestorBytes.zonecode.toUpperCase();
                this.formData.employeeName = requestorBytes.fullname.toUpperCase();
                this.formData.type = store.getters.getIsApprover;

            }, 1000);

        },
        submitForm() {
            this.loading = true

            let auth = store.getters.auth

            let getApprovers = store.getters.getApprovers;
            const decToken = CryptoJs.enc.Base64.parse(getApprovers).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);
            let approverBytes = JSON.parse(bytes)

            axios.post('/request', { data: this.formData, approvers: approverBytes },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": 'application/json',
                        "x-access-token": auth
                    }
                }
            ).then((res) => {

                if (res.status == 200) {
                    if (res.data.resCode == 5) {
                        this.$store.dispatch('userLogout').then(response => {
                            setTimeout(() => {
                                window.location.href = response;
                            }, 1000);
                        });
                    } else {
                        setTimeout(() => {
                            this.loading = false;
                            this.dialog = false;
                            this.snackbar.show = true;
                            this.snackbar.color = 'success';
                            this.snackbar.message = `${res.data.message} submission!`;
                            setTimeout(() => {
                                localStorage.setItem('success', JSON.stringify(true))
                                sessionStorage.setItem('request', JSON.stringify(res.data.rows))
                                router.push({ name: 'CASH ADVANCE REQUEST RESULTS', query: { controlNo: this.formData.controlNo } })
                            }, 1000);
                        }, 2500)
                    }

                }
            }).catch(err => {
                setTimeout(() => {
                    this.loading = false
                    this.dialog = false
                    this.snackbar.show = true;
                    this.snackbar.color = 'red darken-2';
                    this.snackbar.message = err.response.data.message;
                }, 2000)
                this.$store.dispatch('userLogout').then(response => {
                    setTimeout(() => {
                        window.location.href = response;
                    }, 4000);
                });
            })

        },
    }
}
</script>
<style>
/* .header {
    margin: auto;
} */
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

.theme--light.v-input input {
    font-size: 13px;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 5px;
}

.v-btn.v-size--default {
    font-size: 1rem;
}

.title {
    padding-top: 5px;
    padding-bottom: 5px;
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

.mt-0 .col-4,
#col-label {
    max-width: 60%;
}

hr.horizontal--cash-advance {
    width: 97%;
    margin-top: 35px;
    border-top: 1px solid #3f3f3f67;

}
</style>