<template>
    <!-- <v-container class="mt-5 pb-10"> -->
    <div class="ml-4 mr-4 pb-10 mt-5">
        <h2>OPEN REQUESTS</h2>
        <v-data-table :search="search" :custom-filter="filter" :headers="headers" :items="allRequest"
            :loading="Tableloading" class="elevation-0 mb-7" hide-default-footer :items-per-page="itemsPerPage"
            :page.sync="page" @page-count="pageCount = $event">
            <template v-slot:top>
                <v-row style="margin:10px 0px 0px 0px;" align="center">
                    <v-col style="padding: 0px;">
                        <label for="showEntries">Show entries</label>
                        <v-select v-model="itemsPerPage" :items="items" dense outlined solo id="showEntries"></v-select>
                    </v-col>
                    <!-- <div>
                        <v-text-field :value="itemsPerPage" label="Show entries" type="number" min="-1" max="15"
                            @input="itemsPerPage = parseInt($event, 10)"></v-text-field>
                    </div> -->
                    <v-spacer></v-spacer>
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
                    <td>
                        {{ item.amount }}
                    </td>
                    <td style="font-size: 12px;">
                        {{ item.region }}
                    </td>
                    <td style="font-size: 12px;">
                        {{ item.branch }}
                    </td>
                    <td style="font-size: 12px;overflow-x: hidden;">
                        {{ item.requestor }}
                    </td>
                    <td>
                        <v-chip color="amber lighten-4" class="white--text" small>
                            <span style="color:#FF9100;font-weight: 500;">{{ item.status }}</span>
                        </v-chip>
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
        <!-- </v-container> -->
    </div>
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
            itemsPerPage: 5,
            Tableloading: true,
            requestTypeColor: '',
            search: '',
            snackbar: {
                message: 'dsfsfs',
                show: false,
                color: null,
            },
            items: [5,10, 15, 25, 50, 100],
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

        this.getAllRequestsRevolving(),
            this.getAllRequestsCash()
        if (store.getters.getIsApprover) {
            setTimeout(() => {
                this.getAllRequestsForApprovalCash()
                this.getAllRequestsForApprovalRevolving()
            }, 1000);
        }

    },
    methods: {
        filter(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLowerCase().indexOf(search) !== -1
        },
        async getAllRequestsCash() {

            let getRequestor = store.getters.getRequestor;
            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const response = await store.dispatch('getAllRequestsByIdnumberCash', { idNumber: localUser.resId, status: 'pending' })

            if (response.status == 200) {
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.length == 0) {
                        let res = response.data

                        const changedStatus = res.map(element => {
                            element.requestType = 'Cash Advance'
                            element.status = 'OPEN'
                            element.requestor = element.author

                            return element

                        })

                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requestTypeColor = 'green accent-4'
                            this.requests.push(element)
                        });
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
        async getAllRequestsRevolving() {

            let getRequestor = store.getters.getRequestor;
            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const response = await store.dispatch('getAllRequestsByIdnumberRf', { idNumber: localUser.resId, status: 'pending' })
            if (response.status === 200) {
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.length == 0) {
                        let res = response.data

                        const changedStatus = res.map(element => {

                            element.requestType = 'Revolving Fund'
                            element.status = 'OPEN'
                            element.amount = element.cashOnHand

                            return element

                        })
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
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
        async getAllRequestsForApprovalCash() {

            const approver = store.getters.getApprover;
            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            if (approver == 'AREA MANAGER') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        fullname: localUser.fullname,
                        approver: 'area_approver',
                        status: 'am_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request

                        const changedStatus = res.map(element => {

                            element.requestType = 'Cash Advance For Approval'
                            element.status = 'OPEN'
                            element.requestor = element.author

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }

            } else if (approver == 'REGIONAL MAN') {

                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        fullname: localUser.fullname,
                        approver: 'regional_approver',
                        status: 'rm_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {

                    if (!response.data.request.length == 0) {
                        let res = response.data.request

                        const changedStatus = res.map(element => {

                            element.requestType = 'Cash Advance For Approval'
                            element.status = 'OPEN'
                            element.requestor = element.author

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            } else if (approver == 'RAM') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        fullname: localUser.fullname,
                        approver: 'ram_approver',
                        status: 'ram_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {

                    if (!response.data.request.length == 0) {
                        let res = response.data.request
                        const changedStatus = res.map(element => {

                            element.requestType = 'Cash Advance For Approval'
                            element.status = 'OPEN'
                            element.requestor = element.author

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            } else if (approver == 'GMO-ASTGENMAN') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        fullname: localUser.fullname,
                        approver: 'ass_vpo_approver',
                        status: 'ass_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request
                        const changedStatus = res.map(element => {

                            element.requestType = 'Cash Advance For Approval'
                            element.status = 'OPEN'
                            element.requestor = element.author

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            } else if (approver == 'GMO-GENMAN') {
                const response = await store.dispatch('getAllRequestsForApprovalCash',
                    {
                        fullname: localUser.fullname,
                        approver: 'vpo_approver',
                        status: 'vpo_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request
                        const changedStatus = res.map(element => {

                            element.requestType = 'Cash Advance For Approval'
                            element.status = 'OPEN'
                            element.requestor = element.author

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            }
        },
        async getAllRequestsForApprovalRevolving() {

            const approver = store.getters.getApprover;
            let getRequestor = store.getters.getRequestor;

            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            if (approver == 'AREA MANAGER') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        fullname: localUser.fullname,
                        approver: 'am_approver',
                        status: 'am_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {

                    if (!response.data.request.length == 0) {
                        let res = response.data.request

                        const changedStatus = res.map(element => {

                            element.requestType = 'Revolving Fund For Approval'
                            element.status = 'OPEN'
                            element.amount = element.cashOnHand

                            return element

                        });

                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            } else if (approver == 'REGIONAL MAN') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        fullname: localUser.fullname,
                        approver: 'rm_approver',
                        status: 'rm_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request

                        const changedStatus = res.map(element => {

                            element.requestType = 'Revolving Fund For Approval'
                            element.status = 'OPEN'
                            element.amount = element.cashOnHand

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }

            } else if (approver == 'RAM') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        fullname: localUser.fullname,
                        approver: 'ram_approver',
                        status: 'ram_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request
                        const changedStatus = res.map(element => {

                            element.requestType = 'Revolving Fund For Approval'
                            element.status = 'OPEN'
                            element.amount = element.cashOnHand

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            } else if (approver == 'GMO-ASTGENMAN') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        fullname: localUser.fullname,
                        approver: 'ass_vpo_approver',
                        status: 'ass_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request
                        const changedStatus = res.map(element => {

                            element.requestType = 'Revolving Fund For Approval'
                            element.status = 'OPEN'
                            element.amount = element.cashOnHand

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    }
                    else {
                        this.Tableloading = false
                    }
                }
            } else if (approver == 'GMO-GENMAN') {
                const response = await store.dispatch('getAllRequestsForApprovalRevolving',
                    {
                        fullname: localUser.fullname,
                        approver: 'vpo_approver',
                        status: 'vpo_status'
                    })
                if (response.data.resCode == 5) {
                    const response = await this.$store.dispatch('userLogout');
                    setTimeout(() => {
                        window.location.href = response;
                    }, 1000);
                } else {
                    if (!response.data.request.length == 0) {
                        let res = response.data.request
                        const changedStatus = res.map(element => {

                            element.requestType = 'Revolving Fund For Approval'
                            element.status = 'OPEN'
                            element.amount = element.cashOnHand

                            return element

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            }
        },

        showDetails(item) {
            if (item.requestType === 'Cash Advance') {
                router.push({ path: '/home/open-request/cash-advance', query: { controlNo: item.controlNo } })
            } else if (item.requestType === 'Revolving Fund') {
                router.push({ path: '/home/open-request/revolving-fund', query: { controlNo: item.controlNo } })
            } else if (item.requestType === 'Cash Advance For Approval') {
                router.push({ path: '/home/open-request/cash-advance/for-approval', query: { controlNo: item.controlNo } })
            } else if (item.requestType === 'Revolving Fund For Approval') {
                router.push({ path: '/home/open-request/revolving-fund/for-approval', query: { controlNo: item.controlNo } })
            }
        }
    }
}
</script>
<style>

</style>