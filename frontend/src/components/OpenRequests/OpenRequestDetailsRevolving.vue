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
                    <h3>OPEN REQUESTS/REVOLVING FUND</h3>
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
            <v-col class="mt-3 mb-8" cols="12">
                <v-row justify="space-between" class="mr-13">
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
                <v-row class="mx-auto ml-10 mb-10">
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">ID Number</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.idNumber"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Date:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="reqDate"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Requestor:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.requestor"
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
                                    <v-col cols="4"><label for="">Base Branch:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.branch"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
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
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.zonecode"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground">
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
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.controlNo"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Period:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;" v-if="!isEdit">
                                        <v-text-field dense :readonly="readOnly" v-model="getPeriod"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges">
                                        </v-text-field>
                                    </v-col>
                                    <v-col v-else>
                                        <div style="display: flex;">
                                            <v-col cols="6" style="padding: 0px;">
                                                <v-select :items="periodMonth" dense :readonly="readOnly"
                                                    v-model="data.period.month"
                                                    :background-color="setBackground ? inputBackGround : ''"
                                                    :outlined="setBackground" v-on:change="observeChanges"
                                                    :rules="[RequiredRules.month]"></v-select>
                                            </v-col>
                                            <v-col cols="4" style="margin-left: 10px;padding: 0px;">
                                                <v-select :items="getPeriodYears" dense v-model="data.period.year"
                                                    :readonly="readOnly"
                                                    :background-color="setBackground ? inputBackGround : ''"
                                                    :outlined="setBackground" v-on:change="observeChanges"
                                                    :rules="[RequiredRules.year]"></v-select>
                                            </v-col>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">RF Allowance:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense :readonly="readOnly" v-model="data.rfAllowance"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.rfAllowance]" @keydown="onkeydownAmount($event)"
                                            @change="allowanceChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Pending RF:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense :readonly="readOnly" v-model="data.pendingRf"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.pendingRf]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Cash on hand:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.cashOnHand"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.cashOnHand]" @keydown="onkeydownAmount($event)"
                                            ref="totalCashOnHand"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="mx-auto ml-10">
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Transportation:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field :readonly="readOnly" dense v-model="data.transpo"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.transpo]" @keydown="onkeydownAmount($event)"
                                            @change="transpoChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Office Supplies:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field :readonly="readOnly" dense v-model="data.officeSupplies"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.supplies]" @keydown="onkeydownAmount($event)"
                                            ref="supplies" @change="suppliesChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Meals:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field :readonly="readOnly" dense v-model="data.meals"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.meals]" @keydown="onkeydownAmount($event)" ref="meals"
                                            @change="mealsChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Others:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px;padding-top: 0px;">
                                        <v-text-field :readonly="readOnly" dense v-model="data.others"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.others]" @keydown="onkeydownAmount($event)" ref="others"
                                            @change="othersChange"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Total Expenses:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-text-field dense readonly v-model="data.total"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.total]" @keydown="onkeydownAmount($event)"
                                            ref="totalExpensesRef"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col style="padding:0px">
                                <v-row align="baseline" class="mt-0">
                                    <v-col cols="4"><label for="">Purpose:</label></v-col>
                                    <v-col cols="7" style="padding-bottom: 0px; padding-top: 0px;">
                                        <v-textarea rows="0" auto-grow :readonly="readOnly" dense v-model="data.purpose"
                                            style="overflow-wrap:break-word ;"
                                            :background-color="setBackground ? inputBackGround : ''"
                                            :outlined="setBackground" v-on:keyup="observeChanges"
                                            :rules="[RequiredRules.purpose]"></v-textarea>
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
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index <= 2"
                            style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
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
                        <th v-for="(approver, index) in allApprovers" :key="index" v-show="index >= 3"
                            style="text-transform:uppercase;border: 1px solid #b6b4b4;font-weight: 500;text-align: center;padding: 8px;
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
            <v-row justify="center">
                <v-btn color="#FF6D00" class="ml-1 mr-1 white--text" tile @click.prevent="dialog = true"
                    :disabled="!hasChange || !isFormValid || checkZeroInput">
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
        <v-snackbar top elevation="0" :timeout="3500" v-model="snackbar.show" class="snackBarSuccess" outlined
            color="success">
            <div style="display: flex;align-items: center;">
                <div>
                    <v-icon color="green" size="50" left>{{ snackbar.icon }}</v-icon>
                </div>
                <div>
                    <h2>
                        {{ snackbar.message }}
                    </h2>
                    <span style="font-size: 15px;color: black;">
                        {{ snackbar.details }}
                    </span>
                </div>
            </div>
        </v-snackbar>
    </div>
</template>
<script>
import store from '@/store'
import router from '@/router/router';
import CryptoJs from 'crypto-js';

export default {
    data() {
        return {
            loading: false,
            snackbar: {
                message: "",
                details: "",
                show: false,
                icon: ''
            },
            inputBackGround: 'grey lighten-2',
            data: {
                idNumber: '',
                requestor: '',
                branch: '',
                region: '',
                zonecode: '',
                controlNo: '',
                date: '',
                period: {
                    month: '',
                    year: ''
                },
                rfAllowance: '',
                pendingRf: '',
                cashOnHand: '',
                transpo: '',
                officeSupplies: '',
                meals: '',
                others: '',
                total: '',
                purpose: '',
                amFullName: '',
                amDate: '',
                amStatus: '',
                rmFullName: '',
                rmDate: '',
                rmStatus: '',
                ramFullName: '',
                ramDate: '',
                ramStatus: '',
                assFullName: '',
                assDate: '',
                assStatus: '',
                vpoFullName: '',
                vpoDate: '',
                vpoStatus: '',
                jobTitle: '',
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
                month: v => !!v || "Month is required",
                year: v => !!v || "Year is required",
                rfAllowance: v => !!v || "RF Allowance is required",
                pendingRf: v => !!v || "Pending RF is required",
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
            periodMonth: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
            ],
        }
    },
    mounted() {

        this.$watch(
            () => {

                let total;

                if (this.data.transpo == null || this.data.officeSupplies == null || this.data.meals == null || this.data.others == null) {

                    total = 0;

                } else if (this.data.transpo == '' || this.data.officeSupplies == '' || this.data.meals == '' || this.data.others == '') {

                    total = 0;
                }
                else {
                    total = parseFloat(this.data.transpo.replace(/,/g, '')) + parseFloat(this.data.officeSupplies.replace(/,/g, '')) + parseFloat(this.data.meals.replace(/,/g, '')) + parseFloat(this.data.others.replace(/,/g, ''));

                }
                return total
            },
            (val) => {

                this.data.total = val.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

            }
        )
        this.$watch(
            () => {

                let val

                if (this.data.rfAllowance == null || this.data.total == null || this.data.total <= 0 || this.data.rfAllowance <= 0) {

                    val = 0

                } else {
                    let parseAllowance = parseFloat(this.data.rfAllowance.replace(/,/g, ''));
                    let parseTotal = parseFloat(this.data.total.replace(/,/g, ''));

                    val = parseAllowance - parseTotal

                }
                return val
            },
            (val) => {
                this.data.cashOnHand = val.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })
            }
        )

    },
    computed: {
        allApprovers() {
            return this.approvers
        },
        reqDate() {
            let reqDate = new Date(this.data.date);
            let date = reqDate.getFullYear().toString() + "-" + (("0" + (reqDate.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + reqDate.getDate()).slice(-2).toString();
            return date;
        },
        getPeriodYears() {
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear()
            let previousYear = currentYear--
            return [previousYear.toString(), currentYear.toString()]
        },
        getPeriod() {
            return this.data.period.month + ' ' + this.data.period.year
        },
        checkZeroInput() {

            let cashOnHand;

            if (this.data.cashOnHand == null || this.data.cashOnHand == "") {
                cashOnHand = this.data.cashOnHand
            } else {
                cashOnHand = parseFloat(this.data.cashOnHand.replace(/,/g, ''));
            }

            if (this.data.rfAllowance < 1 || cashOnHand < 0 || this.data.total <= 0 || this.data.total < 1) {

                return true
            } else if (this.data.rfAllowance == null || this.data.cashOnHand == null) {

                return true
            }

            return false
        },
    },
    created() {
        this.getRequestByControlNo()
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
                        const request = changedStatus[0]

                        let getRequestor = store.getters.getRequestor;
                        const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
                        const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

                        let requestorBytes = JSON.parse(bytes)

                        let Arrayperiod = request.period.split(" ");


                        this.data = {
                            idNumber: request.idNumber,
                            requestor: request.requestor.toUpperCase(),
                            branch: request.baseBranch.toUpperCase(),
                            region: request.region.toUpperCase(),
                            zonecode: request.zonecode.toUpperCase(),
                            controlNo: request.controlNo,
                            date: request.rfDate.toUpperCase(),
                            period: {
                                month: Arrayperiod[0],
                                year: Arrayperiod[1]
                            },
                            rfAllowance: request.rfAllowance,
                            pendingRf: request.pendingRf.toUpperCase(),
                            cashOnHand: request.cashOnHand,
                            transpo: request.transportation,
                            officeSupplies: request.officeSupplies,
                            meals: request.meals,
                            others: request.others,
                            total: request.totalExpenses,
                            purpose: request.purpose,
                            amFullName: request.am_fullname,
                            amDate: request.am_date,
                            amStatus: request.am_status,
                            rmFullName: request.rm_fullname,
                            rmDate: request.rm_date,
                            rmStatus: request.rm_status,
                            ramFullName: request.ram_fullname,
                            ramDate: request.ram_date,
                            ramStatus: request.ram_status,
                            assFullName: request.ass_fullname,
                            assDate: request.ass_date,
                            assStatus: request.ass_status,
                            vpoFullName: request.vpo_fullname,
                            vpoDate: request.vpo_date,
                            vpoStatus: request.vpo_status,
                            jobTitle: requestorBytes.jobTitle.toUpperCase()
                        }
                        this.approvers = response.data.approvers;

                    } else {
                        this.snackbar = {
                            message: 'No data found. Kindly refresh page',
                            show: true,
                            color: 'red lighten-1',
                            icon: 'mdi-alert-circle-outline'

                        }
                    }
                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',
                    icon: 'mdi-alert-circle-outline'
                }
            }
        },
        async CancelRequest() {
            this.loading = true

            let controlNo = this.$router.currentRoute.query.controlNo
            let duration = this.dateDuration();

            const res = await store.dispatch('CancelRevRequest', { controlNo: controlNo, duration: duration })

            if (res.status === 200) {
                if (res.data.resCode == 5) {
                    const response = await this.$store.dispatch("userLogout");
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    
                    setTimeout(() => {
                        this.loading = false
                        this.dialogCancel = false
                        this.snackbar = {
                            message: res.data.message,
                            show: true,
                            color: 'success',
                            icon: 'mdi-check-circle-outline',
                            details: 'Request has been cancelled.'
                        }
                        setTimeout(() => {
                            router.push({ path: '/home/close-request' })
                            router.go()
                        }, 1500);
                    }, 2000);
                }
            } else {
                this.snackbar = {
                    message: res.data.message,
                    show: true,
                    color: 'red lighten-2',
                    icon: 'mdi-alert-circle-outline'
                }
                this.loading = false
                setTimeout(() => {
                    router.push({ path: '/home/open-request' })
                    router.go()
                }, 1500);
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
        async SaveChanges() {
            let changes = this.data;
            this.loading = true

            let controlNo = this.$router.currentRoute.query.controlNo;

            const res = await store.dispatch("UpdateRevolvingRequestDetailsByControlNo",
                {
                    period: {
                        month: changes.period.month,
                        year: changes.period.year
                    },
                    rfAllowance: changes.rfAllowance,
                    pendingRf: changes.pendingRf,
                    cashOnHand: changes.cashOnHand,
                    transpo: changes.transpo,
                    officeSupplies: changes.officeSupplies,
                    meals: changes.meals,
                    others: changes.others,
                    total: changes.total,
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
                        this.snackbar = {
                            message: "Success",
                            details: "Your changes have been saved.",
                            show: true,
                            icon:'mdi-check-circle-outline'
                        }
                        setTimeout(() => {
                            router.push({ path: `/home/open-request/revolving-fund?controlNo=${controlNo}` })
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
                    icon: 'mdi-alert-circle-outline'
                };
            }

        },
        allowanceChange() {
            let allowance;

            if (this.data.rfAllowance == null || this.data.rfAllowance == '') {
                allowance = this.data.rfAllowance
            } else {

                allowance = parseFloat(this.data.rfAllowance.replace(/,/g, ''))

            }
            this.data.rfAllowance = allowance.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        transpoChange() {
            let transpo;

            if (this.data.transpo == null || this.data.transpo == '') {
                transpo = this.data.transpo
            } else {

                transpo = parseFloat(this.data.transpo.replace(/,/g, ''))

            }
            this.data.transpo = transpo.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        suppliesChange() {
            let supplies;

            if (this.data.officeSupplies == null || this.data.officeSupplies == '') {
                supplies = this.data.officeSupplies
            } else {

                supplies = parseFloat(this.data.officeSupplies.replace(/,/g, ''))

            }
            this.data.officeSupplies = supplies.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        mealsChange() {
            let rfMeals;

            if (this.data.meals == null || this.data.meals == '') {
                rfMeals = this.data.rfmeals
            } else {

                rfMeals = parseFloat(this.data.meals.replace(/,/g, ''))

            }
            this.data.meals = rfMeals.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

        },
        othersChange() {
            let others;

            if (this.data.others == null || this.data.others == '') {
                others = this.data.others
            } else {

                others = parseFloat(this.data.others.replace(/,/g, ''))

            }
            this.data.others = others.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })

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

        },
    }
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
    font-size: 18px;
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
</style>