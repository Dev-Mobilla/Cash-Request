<template>
    <div style="display: flex;justify-content: end;">
        <v-col cols="12" style="text-align: end;">
            <h4>Approved this Month: </h4>
            <h4>OVERALL: </h4>
        </v-col>
        <v-col style="text-align: baseline;">
            <h4 ref="approvedThisMonth">{{ approvedThisMonthVal == null ? approvedThisMonthVal :
            approvedThisMonthVal.toLocaleString() }}</h4>
            <h4 ref="totalApproved">{{ approvedTotalVal == null ? approvedTotalVal : approvedTotalVal.toLocaleString()
            }}</h4>
        </v-col>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </div>

</template>
<script>

import store from '@/store';
import CryptoJs from 'crypto-js';

export default {
    name: 'TotalApprovedAmount',
    data() {
        return {
            approvedThisMonthVal: null,
            approvedTotalVal: null,
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
        }
    },
    created() {
        this.approvedThisMonthCash();
        this.approvedThisMonthRevolving();
    },
    methods: {
        approvedThisMonthCash() {

            let getRequestor = store.getters.getRequestor;
            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const approver = store.getters.getApprover;

            store.dispatch('getApprovedRequestMonthCash', {
                fullname: localUser.fullname,
                approver: approver,
                status: approver,
            }).then(res => {
                if (res.status == 200) {
                    if (res.data.resCode == 5) {
                        this.$store.dispatch('userLogout').then(response => {
                            setTimeout(() => {
                                window.location.href = response;
                            }, 1000);
                        });
                    } else {
                        this.approvedThisMonthVal += res.data.thisMonth
                        this.approvedTotalVal += res.data.overAll
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
            })

        },
        approvedThisMonthRevolving() {
            let getRequestor = store.getters.getRequestor;
            const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
            const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

            let localUser = JSON.parse(bytes);

            const approver = store.getters.getApprover;

            store.dispatch('getApprovedRequestMonthRevolving', {
                fullname: localUser.fullname,
                approver: approver,
                status: approver,
            }).then(res => {
                if (res.status == 200) {
                    if (res.data.resCode == 5) {
                        this.$store.dispatch('userLogout').then(response => {
                            setTimeout(() => {
                                window.location.href = response;
                            }, 1000);
                        });
                    } else {
                        this.approvedThisMonthVal += res.data.thisMonth
                        this.approvedTotalVal += res.data.overAll
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

            })

        },
    }
}
</script>