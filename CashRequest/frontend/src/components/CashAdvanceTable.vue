<template>
    <v-container class="mt-5 m-auto pb-10">
        <v-data-table :search="search" :custom-filter="filter" :headers="headers" :items="cashTable" class="elevation-1"
            :items-per-page="5">
            <template v-slot:top>
                <v-row style="margin:10px 0px 15px 0px;" align="center">
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
                <v-btn @click="showDetails(item)" color="red darken-4" small class="white--text">show details</v-btn>
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
        }
    },
    computed: {
        cashTable() {
            return this.requests
        }
    },
    created() {
        this.getAllRequests()
    },
    methods: {
        filter(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLowerCase().indexOf(search) !== -1
        },
        async getAllRequests() {
            let localUser = JSON.parse(localStorage.getItem('requestor'));

            const response = await store.dispatch('getAllRequestsByEmailCash', { email: localUser.email, status: 'pending' })

            if (response.status == 200) {
                if (!response.data.length == 0) {
                    let res = response.data

                    const changedStatus = res.map(element => {

                        element.status = 'OPEN'

                        return element

                    });

                    this.requests = changedStatus

                } else {
                    this.requests = []
                }
            } else {
                this.snackbar = {
                    message: response.data.message,
                    show: true,
                    color: 'red lighten-2',

                }
            }
        },
        showDetails(item) {
            router.push({ path: '/home/open-request/cash-advance', query: { controlNo: item.controlNo } })
        }
    }
}
</script>
<style>

</style>