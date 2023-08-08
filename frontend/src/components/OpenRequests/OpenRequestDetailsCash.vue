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
                    <h3 style="color: black;">OPEN REQUESTS/CASH ADVANCE</h3>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="m-auto mb-10 pb-13"
            style="background-color: white;border-radius: 13px; max-width: 85%;border: 2px solid #88888861;">
            <v-row justify="space-between" class="header">
                <v-col class="title" cols="8">
                    <h4 class="white--text">Cash Advance Request</h4>
                </v-col>
                <v-col cols="4" class="pl-0 pr-2">
                    <v-img src="../../assets/logo-ml.png" class="logo" max-width="350"></v-img>
                </v-col>
            </v-row>
            <v-col class="ml-3 advance--info mt-3 mb-5" cols="12">
                <v-row justify="space-between" class="mr-5">
                    <p class="font-weight-bold">Advance Information:</p>
                    <v-row dense justify="end">
                        <v-tooltip bottom color="amber lighten-4">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="amber lighten-4" class="ml-1 mr-1 white--text" rounded @click="EditRequest"
                                    small v-bind="attrs" v-on="on">
                                    <v-icon left color="#FF9100">mdi-pencil</v-icon>
                                    <span style="color:#FF9100;font-weight: 500;">Edit</span>
                                </v-btn>
                            </template>
                            <span style="color:#FF9100;">Update cash request information</span>
                        </v-tooltip>
                        <v-tooltip bottom color="#FF9100">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="#FF9100" class="ml-1 mr-1 white--text" rounded @click="CancelEdit" small
                                    :disabled="cancelRequestBtn" v-bind="attrs" v-on="on">
                                    <v-icon left color="amber lighten-4">mdi-minus-circle</v-icon>
                                    <span style="color:amber lighten-4;font-weight: 500;">Cancel Edit</span>
                                </v-btn>
                            </template>
                            <span style="color:amber lighten-4;">Drop or cancel editing this request</span>
                        </v-tooltip>
                    </v-row>
                </v-row>
            </v-col>
            <v-form v-model="isFormValid">
                <v-row class="mx-auto ml-10 mr-10">
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">ID Number:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.idNumber"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Requestor:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.author"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Job Title:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.jobTitle"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Branch:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.branch"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Area:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.area"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Region:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.region"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Zone Code:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.zonecode"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
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
                                        <v-text-field dense readonly v-model="data.controlNo"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="reqDate"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Inclusive Date Of Travel:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense :readonly="readOnly" v-model="data.travelDate"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"
                                            v-if="!isEdit"></v-text-field>
                                        <v-menu v-model="modal" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" offset-y min-width="auto" v-else>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="data.travelDate" v-bind="attrs" v-on="on" outlined
                                                    dense readonly ref="InclusiveDte"
                                                    :background-color="setBackground ? inputBackGround : ''"
                                                    v-on:change="observeChanges" :rules="[RequiredRules.dates]">
                                                    <v-icon slot="append" color="blue darken-2">
                                                        mdi-calendar-month-outline</v-icon>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker v-model="data.travelDate"
                                                @input="modal = false" @change="observeChanges"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Estimated Departure Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense :readonly="readOnly" v-model="data.departureDate"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            v-if="!isEdit"></v-text-field>
                                        <v-menu v-model="modal2" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" offset-y min-width="auto" v-else>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="data.departureDate" v-bind="attrs" v-on="on" outlined
                                                    dense readonly :background-color="setBackground ? inputBackGround : ''"
                                                    v-on:keyup="observeChanges" :rules="[RequiredRules.dates]">
                                                    <v-icon slot="append" color="blue darken-2">
                                                        mdi-calendar-month-outline</v-icon>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker v-model="data.departureDate"
                                                @input="modal2 = false" @change="observeChanges"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Estimated Arrival Date:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense :readonly="readOnly" v-model="data.arrivalDate"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            v-if="!isEdit"></v-text-field>
                                        <v-menu v-model="modal3" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" offset-y min-width="auto" v-else>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="data.arrivalDate" v-bind="attrs" v-on="on" outlined
                                                    dense readonly :background-color="setBackground ? inputBackGround : ''"
                                                    v-on:keyup="observeChanges" :rules="[RequiredRules.dates]">
                                                    <v-icon slot="append" color="blue darken-2">
                                                        mdi-calendar-month-outline</v-icon>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker v-model="data.arrivalDate"
                                                @input="modal3 = false" @change="observeChanges"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="6"><label for="">Amount:</label></v-col>
                                    <v-col cols="6" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense :readonly="readOnly" v-model="data.amount"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges" :min="1"
                                            @keydown="onkeydownAmount($event)" @change="amountChange"
                                            :rules="[RequiredRules.amount]"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-row class="mt-1">
                        <v-col cols="2"><label for="purpose">Purpose:</label></v-col>
                        <v-col style="padding-bottom: 0px; padding-top: 0px;">
                            <v-text-field :readonly="readOnly" v-model="data.purpose"
                                :rules="[RequiredRules.purpose, InputRules.purpose]"
                                :background-color="setBackground ? inputBackGround : ''" :outlined="setBackground"
                                v-on:keyup="observeChanges">
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
                        <v-col cols="3">
                            <v-text-field dense readonly v-model="data.author"
                                :background-color="setBackground ? inputBackGround : ''"
                                :outlined="setBackground"></v-text-field>
                            <label>Employee Name</label>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field dense readonly v-model="data.idNumber"
                                :background-color="setBackground ? inputBackGround : ''" :outlined="setBackground">
                            </v-text-field>
                            <label>ID Number</label>
                        </v-col>
                    </v-row>
                </v-col>
            </v-form>
            <br>
            <br>
            <br>
            <table style="border-collapse: collapse; width: 85%;margin:auto;">
                <thead>
                    <tr style="margin: auto;">
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
                            font-size: 14px;">
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
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="width:28.4%;font-weight: 400;border-bottom: none;border-top: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 8px;
                        font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{ data.region }})</p>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2" style="width:28.4%;word-wrap: break-word; word-break: break-all;font-weight: 400;border-top: none;border-bottom: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 6px 8px 6px 8px;
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
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
                            font-size: 14px;">
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
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="width:42.5%;font-weight: 400;border-bottom: none;border-top: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 8px;
                        font-size: 12px">
                            {{ approver.position }}
                            <p style="margin: 0px;">({{ data.region }})</p>

                        </td>
                    </tr>
                    <tr>
                        <td v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3" style="width:42.5%;word-wrap: break-word; word-break: break-all;font-weight: 400;border-top: none;border-bottom: 1px solid #b6b4b4;border-left: 1px solid #b6b4b4;border-right: 1px solid #b6b4b4; text-align: center;padding: 6px 8px 6px 8px;
                        font-size: 11px">
                            <p style="font-style:italic;text-transform:capitalize;">
                                <span style="color: red;" v-if="!approver.remarks == ''">*</span>
                                {{ approver.remarks }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <v-row justify="center">
                <v-btn color="#FF6D00" class="ml-1 mr-1 white--text" tile @click="dialog = true"
                    :disabled="!hasChange || !isFormValid || data.amount < 1">
                    <v-icon left>mdi-content-save</v-icon> Save changes
                </v-btn>
                <v-btn color="#FFAB00" class="ml-1 mr-1 white--text" tile @click="dialogCancel = true" :disabled="isEdit">
                    <v-icon left>mdi-minus-circle</v-icon> Cancel
                </v-btn>
            </v-row>
        </v-container>
        <v-col>
            <v-row justify="center" class="mt-8">
                <v-dialog v-model="dialogCancel" width="350" persistent>
                    <v-card class="pt-5 pb-5">
                        <v-card-title>
                            <p>Cancel Request?</p>
                        </v-card-title>
                        <v-card-text style="font-size: 15px;">
                            Are you sure you want to cancel your request?
                        </v-card-text>
                        <v-card-subtitle>
                            Note: The action is irreversible.
                        </v-card-subtitle>
                        <v-row dense justify="center" style="flex-direction: column;margin: 0px 20px;">
                            <v-btn height="32px" rounded small block color="primary" @click="CancelRequest"
                                :disabled="loading" class="mt-1 mb-2">
                                <div v-if="loading" class="spinner-border spinner-border-sm">
                                </div>
                                <span v-if="loading" class="px-1">Loading...</span>
                                <span v-else>Yes</span>
                            </v-btn>
                            <v-btn height="32px" rounded small block color="red darken-4" class="white--text mt-1 mb-2"
                                @click="dialogCancel = false" :disabled="loading">
                                No
                            </v-btn>
                        </v-row>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-col>
        <v-col>
            <v-row justify="center" class="mt-8">
                <v-dialog v-model="dialog" width="350" persistent>
                    <v-card class="pt-5 pb-5">
                        <v-card-title>
                            <p>Save Changes?</p>
                        </v-card-title>
                        <v-card-text style="font-size: 15px;">
                            Are you sure you want to make any changes to your request?
                        </v-card-text>
                        <v-row dense justify="center" style="flex-direction: column;margin: 0px 20px;">
                            <v-btn height="32px" rounded small block color="primary" @click="SaveChanges"
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
            </v-row>
        </v-col>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="40"
            class="snackBarSuccess" outlined>
            <div style="display: flex;align-items: center;">
                <div>
                    <v-icon color="red" size="50" left>mdi-alert-circle-outline</v-icon>
                </div>
                <div>
                    <h2>
                        {{ snackbar.message }}
                    </h2>
                </div>
            </div>
        </v-snackbar>
        <v-snackbar top elevation="0" :timeout="3500" v-model="snackbarSuccess.show" class="snackBarSuccess" outlined
            color="success">
            <div style="display: flex;align-items: center;">
                <div>
                    <v-icon color="green" size="50" left>mdi-check-circle-outline</v-icon>
                </div>
                <div>
                    <h2>
                        {{ snackbarSuccess.message }}
                    </h2>
                    <span style="font-size: 15px;color: black;">
                        {{ snackbarSuccess.details }}
                    </span>
                </div>
            </div>
        </v-snackbar>
    </div>
</template>
<script>
import router from '@/router/router'
import store from '@/store'

export default {
    data() {
        return {
            loading: false,
            snackbar: {
                message: "",
                show: false,
                color: '',
            },
            snackbarSuccess: {
                message: "",
                details: "",
                show: false,
            },
            inputBackGround: "grey lighten-2",
            data: {
                idNumber: "",
                author: "",
                jobTitle: "",
                branch: "",
                area: "",
                region: "",
                amount: "",
                controlNo: "",
                date: "",
                travelDate: "",
                departureDate: "",
                arrivalDate: "",
                zonecode: "",
                purpose: "",
            },
            approvers: [],
            readOnly: true,
            setBackground: false,
            hasChange: false,
            cancelRequestBtn: true,
            modal: false,
            modal2: false,
            modal3: false,
            isEdit: false,
            isFormValid: true,
            dialog: false,
            isSuccess: true,
            dialogCancel: false,
            RequiredRules: {
                amount: v => !!v || "Amount is required",
                travelDate: v => !!v || "Inclusive Date Of Travel is required",
                departureDate: v => !!v || "Estimated Departure Date is required",
                arrivalDate: v => !!v || "Estimated Arrival Date is required",
                purpose: v => !!v || "Purpose is required",
                dates: v => !!v || "This field is required",
            },
            InputRules: {
                purpose: v => (v || "").length <= 100 || "Purpose must be 100 characters or less",
            },
        };
    },
    computed: {
        reqDate() {
            let reqDate = new Date(this.data.date);
            let date = reqDate.getFullYear().toString() + "-" + (("0" + (reqDate.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + reqDate.getDate()).slice(-2).toString();
            return date;
        },
        allApprovers() {
            return this.approvers;
        }
    },
    created() {
        this.getRequestByControlNo();
    },
    methods: {
        dateDuration() {
            let dateInstance = new Date();

            let requestDate = new Date(this.data.date);


            let diffTime = Math.abs(dateInstance.valueOf() - requestDate.valueOf());

            let days = diffTime / (24 * 60 * 60 * 1000);
            let hours = (days % 1) * 24;
            let minutes = (hours % 1) * 60;

            if (days < 1) {
                this.duration = Math.floor(hours) + 'h' + ' ' + Math.floor(minutes) + 'm'
                return Math.floor(hours) + 'h' + ' ' + Math.floor(minutes) + 'm'
            } else {

                this.duration = Math.floor(days) + 'd'
                return Math.floor(days) + 'd'
            }
        },
        async getRequestByControlNo() {
            const response = await store.dispatch("getRequestByControlNoCash", { controlNo: this.$router.currentRoute.query.controlNo });
            if (response.status == 200) {
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch("userLogout");
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                }
                else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request;
                        const changedStatus = res.map(element => {
                            element.status = "OPEN";
                            return element;
                        });
                        const request = changedStatus[0];
                        this.data = {
                            idNumber: request.idNumber,
                            author: request.author.toUpperCase(),
                            jobTitle: request.jobTitle,
                            branch: request.branch,
                            area: request.area,
                            region: request.region,
                            amount: request.amount,
                            controlNo: request.controlNo,
                            date: request.date,
                            travelDate: request.travelDate,
                            departureDate: request.departureDate,
                            arrivalDate: request.arrivalDate,
                            zonecode: request.zonecode,
                            purpose: request.purpose,
                        };
                        this.approvers = response.data.approvers;
                    }
                    else {
                        this.snackbar = {
                            message: "No data found. Kindly refresh page",
                            show: true,
                            color: "red accent-2",
                        };
                    }
                }
            }
            else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: "red accent-2",
                };
            }
        },
        async CancelRequest() {

            this.loading = true;
            let controlNo = this.$router.currentRoute.query.controlNo;
            let duration = this.dateDuration();

            const res = await store.dispatch("CancelCashRequest", { controlNo: controlNo, duration: duration });
            if (res.status == 200) {
                if (res.data.resCode == 5) {
                    const response = await this.$store.dispatch("userLogout");
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                }
                else {
                    setTimeout(() => {

                        this.dialogCancel = false

                        this.loading = false
                        this.snackbarSuccess = {
                            message: "Success",
                            details: "Request has been cancelled.",
                            show: true,
                        }
                        setTimeout(() => {
                            router.push({ path: `/home/close-request` })
                            router.go()
                        }, 1500);

                    }, 2000);
                }
            }
            else {
                this.snackbar = {
                    message: res.data.message,
                    show: true,
                    color: "red lighten-2",
                };
            }
        },
        observeChanges() {
            this.hasChange = true;
        },
        EditRequest() {
            this.readOnly = false;
            this.setBackground = true;
            this.cancelRequestBtn = false;
            this.isEdit = true;
        },
        CancelEdit() {
            this.readOnly = true;
            this.setBackground = false;
            this.hasChange = false;
            this.cancelRequestBtn = true;
            this.isEdit = false;
            this.getRequestByControlNo();
        },
        amountChange() {
            let amount;
            if (this.data.amount == null || this.data.amount == "") {
                amount = this.data.amount;
            }
            else {
                amount = parseFloat(this.data.amount.replace(/,/g, ""));
            }
            this.data.amount = amount.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 });
        },
        onkeydownAmount(e) {
            let invalidInputs = ["e", "E", "+", "-"];
            let numbers = (/^[-+]?[0-9]*\.?[0-9]*$/.test(e.key));
            let isInclude = invalidInputs.includes(e.key);
            if (isInclude) {
                return e.preventDefault();
            }
            else if (numbers || e.key == "Backspace") {
                return e;
            }
            else {
                return e.preventDefault();
            }
        },
        async SaveChanges() {
            let changes = this.data;
            this.loading = true

            let controlNo = this.$router.currentRoute.query.controlNo;

            const res = await store.dispatch("UpdateCashRequestDetailsByControlNo",
                {
                    amount: changes.amount,
                    arrivalDate: changes.arrivalDate,
                    departureDate: changes.departureDate,
                    travelDate: changes.travelDate,
                    purpose: changes.purpose,
                    controlNo: changes.controlNo,
                });
            if (res.status == 200) {
                if (res.data.resCode == 5) {
                    const response = await this.$store.dispatch("userLogout");
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                }
                else {
                    setTimeout(() => {

                        this.dialog = false

                        this.loading = false
                        this.snackbarSuccess = {
                            message: "Success",
                            details: "Your changes have been saved.",
                            show: true,
                        }
                        setTimeout(() => {
                            router.push({ path: `/home/open-request/cash-advance?controlNo=${controlNo}` })
                            router.go()
                        }, 1000);

                    }, 2000);
                }
            }
            else {
                this.snackbar = {
                    message: res.data.message,
                    show: true,
                    color: "red lighten-2",
                };
            }

        }
    },
}
</script>
<style>
.approved,
.name,
.date {
    text-transform: uppercase;
    /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
}

.approved {
    font-weight: 600;
    /* color: #2E7D32; */
    font-size: 15px;
}

.name {
    font-weight: 500;
}

.date {
    font-weight: 400;
    word-spacing: 2px;
    letter-spacing: 1px;
}

.name,
.date {
    font-size: 15px;
}

.snackBarSuccess .v-snack__wrapper {
    border-left: 8px solid;
}
</style>