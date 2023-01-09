<template>
    <v-container class="mt-5 m-auto pb-10">
        <v-data-table :search="search" :custom-filter="filter" :headers="headersCash" :items="cashTable"
            class="elevation-0" :items-per-page="5">
            <template v-slot:top>
                <v-row style="margin:10px 0px 15px 0px;" align="center">
                    <h3>Cash Advance Request</h3>
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
            <template v-slot:[`item.select`]="{ item }">
                <v-btn @click="showDetailsCash(item)" color="red darken-4" small class="white--text">show details
                </v-btn>
            </template>
            <template v-slot:[`item.status`]="{ item }">
                <v-chip color="amber lighten-4" class="white--text" small>
                    <!-- <v-icon left small>
                        mdi-clipboard-text-clock
                    </v-icon> -->
                    <span style="color:#FF9100;font-weight: 500;">{{item.status}}</span>
                </v-chip>
            </template>
        </v-data-table>
        <br><br>
        <v-data-table :search="searchRf" :custom-filter="filter" :headers="headersRevolving" :items="revolvingTable"
            class="elevation-0" :items-per-page="5">
            <template v-slot:top>
                <v-row style="margin:10px 0px 15px 0px;" align="center">
                    <h3>Revolving Fund Request</h3>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="searchRf" append-icon="mdi-magnify" label="Search" single-line dense outlined
                        hide-details>
                    </v-text-field>
                </v-row>
            </template>
            <template v-slot:[`item.select`]="{ item }">
                <v-btn @click="showDetailsRevolving(item)" color="red darken-4" small class="white--text">show details
                </v-btn>
            </template>
            <template v-slot:[`item.status`]="{ item }">
                <v-chip color="amber lighten-4" class="white--text" small>
                    <!-- <v-icon left small>
                        mdi-clipboard-text-clock
                    </v-icon> -->
                    <span style="color:#FF9100;font-weight: 500;">{{item.status}}</span>
                </v-chip>
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

export default {
    name: 'CashAdvanceTable',
    data() {
        return {
            search: '',
            searchRf: '',
            snackbar: {
                message: 'dsfsfs',
                show: false,
                color: null,

            },
            cashRequests: [],
            revolvingRequest: [],
            headersCash: [
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
                    value: 'author',
                    class: 'grey lighten-2'
                },
                {
                    text: 'STATUS',
                    align: 'center',
                    value: 'status',
                    class: 'grey lighten-2'
                }
            ],
            headersRevolving: [
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
                    text: 'TOTAL EXPENSES',
                    align: 'center',
                    value: 'total',
                    class: 'grey lighten-2'
                },
                {
                    text: 'CASH ON HAND',
                    align: 'center',
                    value: 'cashOnHand',
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
        cashTable() {
            return this.cashRequests
        },
        revolvingTable() {
            return this.revolvingRequest
        }
    },
    created() {
        this.getAllRequestsForApprovalCash()
        this.getAllRequestsForApprovalRevolving()
    },
    methods: {
        filter(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLowerCase().indexOf(search) !== -1
        },
        async getAllRequestsForApprovalCash() {
            let localUser = JSON.parse(localStorage.getItem('requestor'));

            const approver = store.getters.getApprover;

            if (approver == 'area_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        email: localUser.email,
                        approver: approver,
                        status: 'am_status'
                    })
                let res = response.rows

                const changedStatus = res.map(element => {

                    element.status = 'OPEN'

                    return element

                });
                this.cashRequests = changedStatus

            } else if (approver == 'rm_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        email: localUser.email,
                        approver: 'regional_approver',
                        status: 'rm_status'
                    })
                let res = response.rows

                const changedStatus = res.map(element => {

                    element.status = 'OPEN'

                    return element

                });
                this.cashRequests = changedStatus
            } else if (approver == 'ram_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        email: localUser.email,
                        approver: approver,
                        status: 'ram_status'
                    })
                this.cashRequests = response
            } else if (approver == 'ass_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        email: localUser.email,
                        approver: 'ass_vpo_approver',
                        status: 'ass_status'
                    })
                this.cashRequests = response
            } else if (approver == 'vpo_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        email: localUser.email,
                        approver: approver,
                        status: 'vpo_status'
                    })
                this.cashRequests = response
            }
        },
        async getAllRequestsForApprovalRevolving() {
            let localUser = JSON.parse(localStorage.getItem('requestor'));

            const approver = store.getters.getApprover;

            if (approver == 'area_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        email: localUser.email,
                        approver: 'am_approver',
                        status: 'am_status'
                    })
                let res = response.rows

                const changedStatus = res.map(element => {

                    element.status = 'OPEN'

                    return element

                });
                this.revolvingRequest = changedStatus

            } else if (approver == 'rm_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        email: localUser.email,
                        approver: 'rm_approver',
                        status: 'rm_status'
                    })
                let res = response.rows

                const changedStatus = res.map(element => {

                    element.status = 'OPEN'

                    return element

                });
                this.revolvingRequest = changedStatus
            } else if (approver == 'ram_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        email: localUser.email,
                        approver: approver,
                        status: 'ram_status'
                    })
                this.revolvingRequest = response
            } else if (approver == 'ass_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        email: localUser.email,
                        approver: 'ass_vpo_approver',
                        status: 'ass_status'
                    })
                this.revolvingRequest = response
            } else if (approver == 'vpo_approver') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        email: localUser.email,
                        approver: approver,
                        status: 'vpo_status'
                    })
                this.revolvingRequest = response
            }
        },
        showDetailsCash(item) {
            router.push({ path: '/home/open-request/cash-advance/for-approval', query: { controlNo: item.controlNo } })
        },
        showDetailsRevolving(item) {
            router.push({ path: '/home/open-request/revolving-fund/for-approval', query: { controlNo: item.controlNo } })
        }
    }
}
</script>
<style>

</style>