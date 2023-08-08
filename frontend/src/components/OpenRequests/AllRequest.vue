<template>
    <div class="ml-4 mr-4 pb-10 mt-5">
        <h2>OPEN REQUESTS</h2>
        <div style="display: flex;justify-content: space-between;" class="mt-3" v-if="IsApprover">
            <div style="display: flex;">
                <v-col cols="6">
                    <div style="display: flex;">
                        <v-col cols="4" style="padding: 7px 0px 0px 0px">
                            <k-progress :percent="100" :color="['#4DB6AC', '#26A69A', 'teal', '#00796B', '#00695C']"
                                :color-flow="false" :border="true" :line-height="12" :show-text="false"
                                class="legendKProgress">
                            </k-progress>
                        </v-col>
                        <span style="font-size: small;">Cash Advance</span>
                    </div>
                    <div style="display: flex;">
                        <v-col cols="4" style="padding: 7px 0px 0px 0px">
                            <k-progress :percent="100" :color="['#FFECB3', '#FFE082', '#FFB300', '#FFA000', '#FF8F00']"
                                :color-flow="false" :border="true" :line-height="12" :show-text="false"
                                class="legendKProgress">
                            </k-progress>
                        </v-col>
                        <span style="font-size: small;">Revolving Fund</span>
                    </div>
                </v-col>
                <v-col cols="10">
                    <div style="display: flex;">
                        <v-col cols="2" style="padding: 7px 0px 0px 0px">
                            <k-progress :percent="100" :color="['#A5D6A7', '#81C784', '#388E3C', 'green', '#2E7D32']"
                                :color-flow="false" :border="true" :line-height="12" :show-text="false"
                                class="legendKProgress">
                            </k-progress>
                        </v-col>
                        <span style="font-size: small;">Cash Advance For Approval</span>
                    </div>
                    <div style="display: flex;">
                        <v-col cols="2" style="padding: 7px 0px 0px 0px">
                            <k-progress :percent="100" :color="['#BBDEFB', '#90CAF9', '#1E88E5', '#1976D2', 'blue']"
                                :color-flow="false" :border="true" :line-height="12" :show-text="false"
                                class="legendKProgress">
                            </k-progress>
                        </v-col>
                        <span style="font-size: small;">Revolving Fund For Approval</span>
                    </div>
                </v-col>
            </div>
            <v-col>
                <TotalApprovedAmount v-if="IsApprover" />
            </v-col>
        </div>
        <div style="display: flex;justify-content: end;" v-else>
            <v-col cols="3">
                <div style="display: flex;align-items: center;justify-content: end;">
                    <span style="font-size: small;margin-right: 5px;">Cash Advance</span>
                    <v-col cols="2" style="padding: 7px 0px 0px 0px">
                        <k-progress :percent="100" :color="['#4DB6AC', '#26A69A', 'teal', '#00796B', '#00695C']"
                            :color-flow="false" :border="true" :line-height="12" :show-text="false" class="legendKProgress">
                        </k-progress>
                    </v-col>
                </div>
                <div style="display: flex;align-items: center;justify-content: end;">
                    <span style="font-size: small;margin-right: 5px;">Revolving Fund</span>
                    <v-col cols="2" style="padding: 7px 0px 0px 0px">
                        <k-progress :percent="100" :color="['#FFECB3', '#FFE082', '#FFB300', '#FFA000', '#FF8F00']"
                            :color-flow="false" :border="true" :line-height="12" :show-text="false" class="legendKProgress">
                        </k-progress>
                    </v-col>
                </div>
            </v-col>
        </div>
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
                    <v-text-field v-model="search" @input="onSearch" append-icon="mdi-magnify" label="Search" single-line
                        dense outlined hide-details>
                    </v-text-field>
                </v-row>
            </template>
            <template v-slot:[`item`]="{ item }">
                <tr>
                    <td style="padding: 0px;text-align: center;">
                        <v-btn @click="showDetails(item)" color="red darken-4" small class="white--text">show details
                        </v-btn>
                    </td>
                    <td style="font-size: 12px;padding: 0px;">
                        {{ reqDate(item) }}
                    </td>
                    <td style="font-size: 11px;padding: 0px;">
                        {{ item.controlNo }}
                    </td>
                    <td style="font-size: 11px;text-align: center;align-content: center;padding: 0px;">
                        <!-- <v-chip :color="item.requestType === 'Cash Advance For Approval' ?
                            'green darken-3' : item.requestType === 'Revolving Fund' ?
                                'amber accent-4' : item.requestType === 'Cash Advance' ?
                                    'teal darken-3' : item.requestType === 'Revolving Fund For Approval' ? 'blue darken-3' : ''"
                                        class="white--text" small>
                                        <span style="font-weight: 500;font-size: 11px">{{ item.requestType }}</span>
                                    </v-chip> -->
                        <!-- <v-progress-linear height="18" rounded :value="item.appVal" class="white--text"
                            :color="progressColorCash(item.appVal)" v-if="item.requestType === 'Cash Advance'">
                            <span style="text-transform: uppercase;"><strong>{{ item.requestType }}</strong></span>
                        </v-progress-linear> -->
                        <k-progress :percent="item.appVal" :color="progressColorCashArr(item.appVal)" :color-flow="false"
                            v-if="item.requestType === 'Cash Advance'" :border="true" :line-height="12"
                            :bg-color="item.appVal == 0 ? '#E0F2F1' : '#ebeef5'">
                        </k-progress>
                        <k-progress :percent="item.appVal" :color="progressColorRevArr(item.appVal)" :color-flow="false"
                            v-else-if="item.requestType === 'Revolving Fund'" :border="true" :line-height="12"
                            :bg-color="item.appVal == 0 ? '#FFF8E1' : '#ebeef5'">
                        </k-progress>
                        <k-progress :percent="item.appVal" :color="progressColorCashApprvlArr(item.appVal)"
                            :color-flow="false" v-else-if="item.requestType === 'Cash Advance For Approval'" :border="true"
                            :line-height="12" :bg-color="item.appVal == 0 ? '#E8F5E9' : '#ebeef5'">
                        </k-progress>
                        <k-progress :percent="item.appVal" :color="progressColorRevApprvlArr(item.appVal)"
                            :color-flow="false" v-else-if="item.requestType === 'Revolving Fund For Approval'" :border="true"
                            :line-height="12" :bg-color="item.appVal == 0 ? '#BBDEFB' : '#ebeef5'">
                        </k-progress>
                        <!-- <v-progress-linear height="18" rounded :value="item.appVal" class="white--text"
                            :color="progressColorRev(item.appVal)" v-else-if="item.requestType === 'Revolving Fund'">
                            <span style><strong>{{ item.requestType }}</strong></span>
                        </v-progress-linear> -->
                    </td>
                    <td style="font-size: 12px;text-align: center;padding: 0px;">
                        {{ item.amount }}
                    </td>
                    <td style="font-size: 10px;padding: 0px;">
                        {{ item.region }}
                    </td>
                    <td style="font-size: 10px;padding: 0px;">
                        {{ item.branch }}
                    </td>
                    <td style="font-size: 10px;overflow-x: hidden;padding: 0px;">
                        {{ item.requestor }}
                    </td>
                    <td style="padding: 0px;text-align: center;">
                        <v-chip color="amber lighten-4" class="white--text" small>
                            <span style="color:#FF9100;font-weight: 500;font-size: 10px;">{{ item.status }}</span>
                        </v-chip>
                    </td>
                    <td style="font-size: 12px;text-align: center;padding: 0px;">
                        {{ dateDuration(item) }}
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
</template>
<script>
import router from '@/router/router';
import store from '@/store';
import CryptoJs from 'crypto-js';
import TotalApprovedAmount from '@/components/OpenRequests/TotalApprovedAmount.vue'

export default {
    name: 'CashAdvanceTable',
    components: {
        TotalApprovedAmount
    },
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
            sortBy: 'date',
            sortDesc: 'true',
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
        },
        IsApprover() {
            let IsApprover = sessionStorage.getItem('umg-uny-azi');

            return IsApprover == "true" ? true : false
        },



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
        progressColorCashArr(val) {
            return val == 80 ? ['#4DB6AC', '#26A69A', 'teal', '#00796B', '#00695C']
                : val == 60 ? ['#4DB6AC', '#26A69A', 'teal', '#00796B']
                    : val == 40 ? ['#4DB6AC', '#26A69A', 'teal'] : val == 20 ? ['#4DB6AC', '#26A69A'] : '#4DB6AC'
        },
        progressColorRevArr(val) {
            return val == 80 ? ['#FFECB3', '#FFE082', '#FFB300', '#FFA000', '#FF8F00']
                : val == 60 ? ['#FFECB3', '#FFE082', '#FFB300', '#FFA000']
                    : val == 40 ? ['#FFECB3', '#FFE082', '#FFB300'] : val == 20 ? ['#FFECB3', '#FFE082'] : 'black'
        },
        progressColorCashApprvlArr(val) {
            return val == 80 ? ['#A5D6A7', '#81C784', '#388E3C', 'green', '#2E7D32']
                : val == 60 ? ['#A5D6A7', '#81C784', '#388E3C', 'green']
                    : val == 40 ? ['#A5D6A7', '#81C784', '#388E3C',] : val == 20 ? ['#A5D6A7', '#81C784',] : '#A5D6A7'
        },
        progressColorRevApprvlArr(val) {
            return val == 80 ? ['#BBDEFB', '#90CAF9', '#1E88E5', '#1976D2', 'blue']
                : val == 60 ? ['#BBDEFB', '#90CAF9', '#1E88E5', '#1976D2']
                    : val == 40 ? ['#BBDEFB', '#90CAF9', '#1E88E5'] : val == 20 ? ['#BBDEFB', '#90CAF9'] : '#BBDEFB'
        },

        reqDate(item) {
            let reqDate = new Date(item.date);
            let date = reqDate.getFullYear().toString() + '-' + (("0" + (reqDate.getMonth() + 1)).slice(-2)).toString() + "-" + ("0" + reqDate.getDate()).slice(-2).toString();
            return date
        },
        dateDuration(item) {
            let dateInstance = new Date();

            let requestDate = new Date(item.date);


            let diffTime = Math.abs(dateInstance.valueOf() - requestDate.valueOf());

            let days = diffTime / (24 * 60 * 60 * 1000);
            let hours = (days % 1) * 24;
            let minutes = (hours % 1) * 60;

            if (days < 1) {
                return Math.floor(hours) + 'h' + ' ' + Math.floor(minutes) + 'm'
            } else {
                return Math.floor(days) + 'd' + ' ' + Math.floor(hours) + 'h';
            }
        },
        onSearch(e) {
            this.search = e

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
        async getAllRequestsCash() {

            let getRequestor = store.getters.getRequestor;
            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            let getIsApprover = sessionStorage.getItem('umg-uny-azi');

            let IsApprover = getIsApprover == "true" ? true : false;


            const response = await store.dispatch('getAllRequestsByIdnumberCash', { idNumber: localUser.resId, status: 'pending', IsApprover: IsApprover })

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
                            items.status = 'OPEN'
                            items.requestor = items.author
                            items.appVal = element[1]

                            return element

                        })

                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requestTypeColor = 'green accent-4'
                            this.requests.push(element[0])
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

            let getIsApprover = sessionStorage.getItem('umg-uny-azi');

            let IsApprover = getIsApprover == "true" ? true : false;

            const response = await store.dispatch('getAllRequestsByIdnumberRf', { idNumber: localUser.resId, status: 'pending', IsApprover: IsApprover })
            // console.log(response);
            if (response.status === 200) {
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
                            items.status = 'OPEN'
                            items.amount = items.totalExpenses
                            items.date = items.rfDate
                            items.branch = items.baseBranch
                            items.appVal = element[1]

                            return items

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

            // let getIsApprover = sessionStorage.getItem('umg-uny-azi');

            // let IsApprover = getIsApprover == "true" ? true : false;

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
                            let items = element[0]

                            items.requestType = 'Cash Advance For Approval'
                            items.status = 'OPEN'
                            items.requestor = items.author
                            items.appVal = element[1]

                            return items

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

                            let items = element[0]

                            items.requestType = 'Cash Advance For Approval'
                            items.status = 'OPEN'
                            items.requestor = items.author
                            items.appVal = element[1]

                            return items

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

                            let items = element[0]

                            items.requestType = 'Cash Advance For Approval'
                            items.status = 'OPEN'
                            items.requestor = items.author
                            items.appVal = element[1]

                            return items

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            } else if (approver == 'GMO-ASTGENMAN' || approver == 'ADM ASS SR' || approver == "GM'S STAFF") {
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

                            let items = element[0]

                            items.requestType = 'Cash Advance For Approval'
                            items.status = 'OPEN'
                            items.requestor = items.author
                            items.appVal = element[1]

                            return items

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

                            let items = element[0]

                            items.requestType = 'Cash Advance For Approval'
                            items.status = 'OPEN'
                            items.requestor = items.author
                            items.appVal = element[1]

                            return items

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

                            let items = element[0]

                            items.requestType = 'Revolving Fund For Approval'
                            items.status = 'OPEN'
                            items.amount = items.total
                            items.appVal = element[1]

                            return items

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

                            let items = element[0]

                            items.requestType = 'Revolving Fund For Approval'
                            items.status = 'OPEN'
                            items.amount = items.total
                            items.appVal = element[1]

                            return items

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

                            let items = element[0]

                            items.requestType = 'Revolving Fund For Approval'
                            items.status = 'OPEN'
                            items.amount = items.total
                            items.appVal = element[1]

                            return items

                        });
                        this.Tableloading = false

                        changedStatus.forEach(element => {
                            this.requests.push(element)
                        });
                    } else {
                        this.Tableloading = false
                    }
                }
            } else if (approver == 'GMO-ASTGENMAN' || approver == 'ADM ASS SR' || approver == "GM'S STAFF") {
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

                            let items = element[0]

                            items.requestType = 'Revolving Fund For Approval'
                            items.status = 'OPEN'
                            items.amount = items.total
                            items.appVal = element[1]

                            return items

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

                            let items = element[0]

                            items.requestType = 'Revolving Fund For Approval'
                            items.status = 'OPEN'
                            items.amount = items.total
                            items.appVal = element[1]

                            return items

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
        },

    }
}
</script>
<style>
.k-progress.legendKProgress .k-progress-outer {
    padding-right: 0px;
}
</style>