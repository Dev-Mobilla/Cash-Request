<template>
    <!-- <v-container class="mt-5 m-auto pb-10"> -->
    <div class="ml-4 mr-4 pb-10 mt-5">
        <h2>ALL CLOSED REQUESTS</h2>
        <v-data-table :search="search" :custom-filter="filter" :headers="headers" :items="allRequest"
            :loading="Tableloading" class="elevation-0 mb-7" hide-default-footer :items-per-page="itemsPerPage"
            :page.sync="page" @page-count="pageCount = $event">
            <template v-slot:top>
                <v-row style="margin:10px 0px 0px 0px;" align="center">
                    <v-col style="padding: 0px;">
                        <label for="showEntries">Show entries</label>
                        <v-select @change="selectedChange($event)" v-model="selectedItem" :items="items" dense outlined solo
                            id="showEntries"></v-select>
                    </v-col>
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
                    <td style="padding: 0px;text-align: center;">
                        <v-btn @click="showDetails(item)" color="red darken-4" small class="white--text">show details
                        </v-btn>
                    </td>
                    <td style="font-size: 12px;padding: 0px 0px 0px 5px;">
                        {{ reqDate(item) }}
                    </td>
                    <td style="font-size: 11px;padding: 0px;">
                        {{ item.controlNo }}
                    </td>
                    <td style="font-size: 11px;text-align: center;align-content: center;padding: 0px;">
                        <v-chip
                            :color="item.requestType === 'Cash Advance For Approval' ?
                                'green darken-3' : item.requestType === 'Revolving Fund' ?
                                    'amber accent-4' : item.requestType === 'Cash Advance' ?
                                        'teal darken-3' : item.requestType === 'Revolving Fund For Approval' ? 'blue darken-3' : ''"
                            class="white--text" small>
                            <span style="font-weight: 500;font-size: 11px;">{{ item.requestType }}</span>
                        </v-chip>
                    </td>
                    <td style="font-size: 12px;text-align: right;">
                        {{ item.amount }}
                    </td>
                    <td style="font-size: 10px;">
                        {{ item.region }}
                    </td>
                    <td style="font-size: 10px;">
                        {{ item.branch }}
                    </td>
                    <td style="font-size: 10px;">
                        {{ item.requestor }}
                    </td>
                    <td style="align-content: center;text-align: center;">
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
                    <td style="font-size: 12px;text-align: center;padding: 0px;">
                        {{ item.duration }}
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-row justify="end" class="mt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </v-row>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </div>
    <!-- </v-container> -->
</template>
<script>
import router from '@/router/router';
import store from '@/store';
import CryptoJs from 'crypto-js';

export default {
    name: 'CashAdvanceTable',
    data() {
        return {
            page: 1,
            pageCount: 1,
            itemsPerPage: 10,
            selectedItem: 10,
            Tableloading: true,
            requestTypeColor: '',
            search: '',
            snackbar: {
                message: 'dsfsfs',
                show: false,
                color: null,
            },
            items: [10, 25, 50, 100, 'ALL'],
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
                    align: 'left',
                    value: 'date',
                    class: 'grey lighten-2'
                },
                {
                    text: 'CONTROL NO.',
                    align: 'left',
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
                    align: 'left',
                    value: 'region',
                    class: 'grey lighten-2'
                },
                {
                    text: 'BRANCH',
                    align: 'left',
                    value: 'branch',
                    class: 'grey lighten-2'
                },
                {
                    text: 'REQUESTOR',
                    align: 'left',
                    value: 'requestor',
                    class: 'grey lighten-2'
                },
                {
                    text: 'STATUS',
                    align: 'center',
                    value: 'status',
                    class: 'grey lighten-2'
                },
                {
                    text: 'DURATION',
                    align: 'left',
                    value: 'duration',
                    class: 'grey lighten-2'
                }
            ],
        }
    },
    computed: {
        allRequest() {
            let requests = this.requests;

            let sortedRequest = requests.sort((a, b) => {
                if (a.date > b.date) {
                    return -1
                } else if (a.date < b.date) {
                    return 1
                } else {
                    0
                }
                // if (a.date > b.date && a.controlNo > b.controlNo) {
                //     return -1
                // } else if (a.date < b.date && a.controlNo < b.controlNo) {
                //     return 1
                // } else {
                //     0
                // }
            })
            return sortedRequest
        }
    },
    created() {
        this.getAllDisapprovedRequestsCash()
        this.getAllDisapprovedRequestsRevolving()
        this.getAllApprovedRequestsCash()
        this.getAllApprovedRequestsRevolving()
        this.getAllCancelledRequestsCash()
        this.getAllCancelledRequestsRevolving()
    },
    methods: {
        reqDate(item) {
            let reqDate = new Date(item.date);
            let date = reqDate.getFullYear().toString() + '-' + (("0" + (reqDate.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + reqDate.getDate()).slice(-2).toString();
            return date
        },
        selectedChange(event) {

            if (event === 'ALL') {
                let requestLength = this.requests.length
                this.itemsPerPage = requestLength
                this.selectedItem = event

            } else {
                this.itemsPerPage = event
                this.selectedItem = event
            }
        },
        filter(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
        },
        async getAllDisapprovedRequestsCash() {

            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const response = await store.dispatch('getAllRequestsByIdnumberCash', { idNumber: localUser.resId, status: 'disapproved' })

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

                            let items = element[0];

                            items.requestType = 'Cash Advance'
                            items.status = 'DISAPPROVED'
                            items.requestor = items.author

                            return items

                        })

                        changedStatus.forEach(element => {
                            this.requestTypeColor = 'green accent-4'
                            this.requests.push(element)
                        });
                        this.Tableloading = false
                    } else {
                        this.Tableloading = false
                    }
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
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request

                        const changedStatus = res.map(element => {
                            let items = element[0]

                            items.requestType = 'Revolving Fund'
                            items.status = 'DISAPPROVED'
                            items.amount = items.totalExpenses
                            items.date = items.rfDate
                            items.branch = items.baseBranch

                            return items

                        })

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                        this.Tableloading = false
                    } else {
                        this.Tableloading = false
                    }
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
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request

                        const changedStatus = res.map(element => {
                            let items = element[0]

                            items.requestType = 'Cash Advance'
                            items.status = 'CLOSED'
                            items.requestor = items.author

                            return items

                        })

                        changedStatus.forEach(element => {
                            this.requestTypeColor = 'green accent-4'
                            this.requests.push(element)
                        });
                        this.Tableloading = false

                    } else {
                        this.Tableloading = false
                    }
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
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request

                        const changedStatus = res.map(element => {
                            let items = element[0]

                            items.requestType = 'Revolving Fund'
                            items.status = 'CLOSED'
                            items.amount = items.totalExpenses
                            items.date = items.rfDate
                            items.branch = items.baseBranch

                            return items

                        })

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                        this.Tableloading = false
                    } else {
                        this.Tableloading = false
                    }
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

            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const response = await store.dispatch('getAllRequestsByIdnumberCash', { idNumber: localUser.resId, status: 'cancelled' })
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
                            let items = element[0]

                            items.requestType = 'Cash Advance'
                            items.status = 'CANCELLED'
                            items.requestor = items.author

                            return items

                        })

                        changedStatus.forEach(element => {
                            this.requestTypeColor = 'green accent-4'
                            this.requests.push(element)
                        });
                        this.Tableloading = false

                    }
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
            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const response = await store.dispatch('getAllRequestsByIdnumberRf', { idNumber: localUser.resId, status: 'cancelled' })

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
                            let items = element[0]

                            items.requestType = 'Revolving Fund'
                            items.status = 'CANCELLED'
                            items.amount = items.totalExpenses
                            items.date = items.rfDate
                            items.branch = items.baseBranch

                            return items

                        })

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                        this.Tableloading = false
                    }
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
        },
        IsApprover() {
            let getIsApprover = sessionStorage.getItem('umg-uny-azi');

            return getIsApprover == "true" ? true : false;
        }
    }
}
</script>
<style></style>