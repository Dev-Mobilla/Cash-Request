<template>
    <v-container class="mt-5 m-auto pb-10">
        <v-data-table :search="search" :custom-filter="filter" :headers="headers" :items="allRequest" :loading="Tableloading"
            class="elevation-0" :items-per-page="5">
            <template v-slot:top>
                <v-row style="margin:10px 0px 15px 0px;" align="center">
                    <h2>ALL CLOSED REQUESTS</h2>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line dense outlined
                        hide-details>
                    </v-text-field>
                </v-row>
            </template>
            <template v-slot:[`item`]="{ item }">
                <tr>
                    <td>
                        <v-btn @click="showDetails(item)" color="red darken-4" small class="white--text">show details
                        </v-btn>
                    </td>
                    <td style="font-size: 12px;">
                        {{ item.date }}
                    </td>
                    <td style="font-size: 12px;">
                        {{ item.controlNo }}
                    </td>
                    <td style="text-align: center;align-content: center;">
                        <v-chip :color="item.requestType === 'Cash Advance For Approval' ?
                'green darken-3' : item.requestType === 'Revolving Fund' ?
                    'amber accent-4' : item.requestType === 'Cash Advance' ?
                        'teal darken-3' : item.requestType === 'Revolving Fund For Approval' ? 'blue darken-3' : ''"
                            class="white--text" small>
                            <span style="font-weight: 500;">{{ item.requestType }}</span>
                        </v-chip>
                    </td>
                    <td style="font-size: 12px;">
                        {{ item.amount }}
                    </td>
                    <td style="font-size: 12px;">
                        {{ item.region }}
                    </td>
                    <td style="font-size: 12px;">
                        {{ item.branch }}
                    </td>
                    <td style="font-size: 12px;">
                        {{ item.requestor }}
                    </td>
                    <td style="text-align: center;align-content: center;">
                        <v-chip
                            :color="item.status === 'DISAPPROVED' ? 'red lighten-4' : item.status === 'CANCELLED' ? 'orange lighten-4' : item.status === 'CLOSED' ? 'green lighten-4' : ''"
                            class="white--text" small>
                            <span :style="{
                                color: item.status === 'DISAPPROVED' ? '#D50000' :
                                    item.status === 'CANCELLED' ? '#E65100' : item.status === 'CLOSED' ? '#1B5E20' : '', fontWeight: '600'
                            }">
                                {{ item.status }}
                            </span>
                        </v-chip>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </v-container>
</template>
<script>
import router from '@/router/router';
import store from '@/store';
import CryptoJs from 'crypto-js';

export default {
    name: 'CashAdvanceTable',
    data() {
        return {
            Tableloading: true,
            requestTypeColor: '',
            search: '',
            snackbar: {
                message: 'dsfsfs',
                show: false,
                color: null,
            },
            requests: [],
            headers: [
                {
                    text: 'SELECT',
                    align: 'center',
                    value: 'select',
                    class: 'grey lighten-2'
                },
                {
                    text: 'DATE',
                    align: 'center',
                    value: 'date',
                    class: 'grey lighten-2'
                },
                {
                    text: 'CONTROL NO.',
                    align: 'center',
                    value: 'controlNo',
                    class: 'grey lighten-2'
                },
                {
                    text: 'TYPE OF REQUEST',
                    align: 'center',
                    value: 'requestType',
                    class: 'grey lighten-2'
                },
                {
                    text: 'AMOUNT',
                    align: 'center',
                    value: 'amount',
                    class: 'grey lighten-2'
                },
                {
                    text: 'REGION',
                    align: 'center',
                    value: 'region',
                    class: 'grey lighten-2'
                },
                {
                    text: 'BRANCH',
                    align: 'center',
                    value: 'branch',
                    class: 'grey lighten-2'
                },
                {
                    text: 'REQUESTOR',
                    align: 'center',
                    value: 'requestor',
                    class: 'grey lighten-2'
                },
                {
                    text: 'STATUS',
                    align: 'center',
                    value: 'status',
                    class: 'grey lighten-2'
                }
            ],
        }
    },
    computed: {
        allRequest() {
            return this.requests
        }
    },
    created() {
        this.getAllDisapprovedRequestsCash()
        this.getAllDisapprovedRequestsRevolving()
        this.getAllApprovedRequestsCash()
        this.getAllApprovedRequestsRevolving()
        // this.getAllCancelledRequestsCash()
        // this.getAllCancelledRequestsRevolving()
    },
    methods: {
        filter(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLowerCase().indexOf(search) !== -1
        },
        async getAllDisapprovedRequestsCash() {

            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);
            // console.log(localUser);

            const response = await store.dispatch('getAllRequestsByIdnumberCash', { idNumber: localUser.resId, status: 'disapproved' })
            console.log(response);
            if (response.status == 200) {
                if (!response.data.length == 0) {
                    let res = response.data

                    const changedStatus = res.map(element => {
                        element.requestType = 'Cash Advance'
                        element.status = 'DISAPPROVED'
                        element.requestor = element.author

                        return element

                    })

                    changedStatus.forEach(element => {
                        this.requestTypeColor = 'green accent-4'
                        this.requests.push(element)
                    });
                    this.Tableloading = false
                }else{
                    this.Tableloading = false
                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
                this.Tableloading = false
            }
        },
        async getAllDisapprovedRequestsRevolving() {
            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const response = await store.dispatch('getAllRequestsByIdnumberRf', { idNumber: localUser.resId, status: 'disapproved' })
            if (response.status == 200) {
                if (!response.data.length == 0) {
                    let res = response.data

                    const changedStatus = res.map(element => {

                        element.requestType = 'Revolving Fund'
                        element.status = 'DISAPPROVED'
                        element.amount = element.cashOnHand

                        return element

                    })

                    changedStatus.forEach(element => {
                        this.requests.push(element)
                    });
                    this.Tableloading = false
                }else{
                    this.Tableloading = false
                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
                this.Tableloading = false
            }
        },
        async getAllApprovedRequestsCash() {
            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const response = await store.dispatch('getAllRequestsByIdnumberCash', { idNumber: localUser.resId, status: 'approved' })

            if (response.status == 200) {
                if (!response.data.length == 0) {
                    let res = response.data

                    const changedStatus = res.map(element => {
                        element.requestType = 'Cash Advance'
                        element.status = 'CLOSED'
                        element.requestor = element.author

                        return element

                    })

                    changedStatus.forEach(element => {
                        this.requestTypeColor = 'green accent-4'
                        this.requests.push(element)
                    });
                    this.Tableloading = false

                }else{
                    this.Tableloading = false
                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
                this.Tableloading = false
            }
        },
        async getAllApprovedRequestsRevolving() {
            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const response = await store.dispatch('getAllRequestsByIdnumberRf', { idNumber: localUser.resId, status: 'approved' })
            if (response.status == 200) {
                if (!response.data.length == 0) {
                    let res = response.data

                    const changedStatus = res.map(element => {

                        element.requestType = 'Revolving Fund'
                        element.status = 'CLOSED'
                        element.amount = element.cashOnHand

                        return element

                    })

                    changedStatus.forEach(element => {
                        this.requests.push(element)
                    });
                    this.Tableloading = false
                }else{
                    this.Tableloading = false
                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
                this.Tableloading = false
            }
        },

        async getAllCancelledRequestsCash() {
            let localUser = JSON.parse(localStorage.getItem('requestor'));

            const response = await store.dispatch('getAllRequestsByIdnumberCash', { email: localUser.email, status: 'cancelled' })

            if (response.status == 200) {
                if (!response.data.length == 0) {
                    let res = response.data

                    const changedStatus = res.map(element => {
                        element.requestType = 'Cash Advance'
                        element.status = 'CANCELLED'
                        element.requestor = element.author

                        return element

                    })

                    changedStatus.forEach(element => {
                        this.requestTypeColor = 'green accent-4'
                        this.requests.push(element)
                    });
                    this.Tableloading = false

                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
                this.Tableloading = false
            }
        },
        async getAllCancelledRequestsRevolving() {
            let localUser = JSON.parse(localStorage.getItem('requestor'));

            const response = await store.dispatch('getAllRequestsByEmailRf', { email: localUser.email, status: 'cancelled' })

            if (response.status == 200) {
                if (!response.data.length == 0) {
                    let res = response.data

                    const changedStatus = res.map(element => {

                        element.requestType = 'Revolving Fund'
                        element.status = 'CANCELLED'
                        element.amount = element.cashOnHand

                        return element

                    })

                    changedStatus.forEach(element => {
                        this.requests.push(element)
                    });
                    this.Tableloading = false
                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
                this.Tableloading = false
            }
        },

        showDetails(item) {
            if (item.requestType === 'Cash Advance') {
                router.push({ path: '/home/close-request/cash-advance', query: { controlNo: item.controlNo } })
            } else if (item.requestType === 'Revolving Fund') {
                router.push({ path: '/home/close-request/revolving-fund', query: { controlNo: item.controlNo } })
            }
        }
    }
}
</script>
<style>

</style>