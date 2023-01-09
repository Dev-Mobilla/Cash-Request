<template>
    <div>
        <v-container>
            <v-card width="75%" class="mx-auto pb-3 mt-10"
                style="border-left: 13px solid red;border-radius:6px 6px 0px 0px">
                <div class="ml-5 pt-5 mb-3">
                    <p style="font-size: 30px;font-weight: 500;">
                        Request <span style="text-transform:capitalize;">{{ $router.currentRoute.query.status }}</span>
                    </p>
                </div>
            </v-card>
        </v-container>
        <ResponseCashDetails v-if="type === 'cashAdvance'" />
        <ResponseRevDetails v-if="type === 'revolvingFund'" />
        <div style="width:14%" class="mx-auto mt-7">
            <v-btn to="/home/open-request" text plain color="red darken-3" class="white--text pt-5 pb-5"
                style="font-size: 18px;">
                Back Home
            </v-btn>
        </div>
        <v-overlay :value="overlay" color="white" :opacity="1">
            <v-progress-circular indeterminate color="#D50000" size="95" width="8" style="margin-right:5px">
                <v-img src="../../assets/diamond.png" max-height="75" max-width="75"></v-img>
            </v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import store from '@/store';
import ResponseCashDetails from './responseCashDetails.vue';
import ResponseRevDetails from './responseRevDetails.vue';

export default {
    name: 'NotifComponent',
    components: {
        ResponseCashDetails,
        ResponseRevDetails
    },
    data() {
        return {
            type: '',
            overlay: true,
        }
    },
    created() {
        this.responseDetails()
    },
    methods: {
        async responseDetails() {
            this.type = this.$route.query.type
            this.controlNo = this.$route.params.controlNo

            if (this.type === 'revolvingFund') {

                await store.dispatch('getRequestByControlNoRf', {
                    controlNo: this.controlNo,
                })
                setTimeout(() => {
                    this.overlay = false
                }, 2500);

            } else if (this.type === 'cashAdvance') {
                await store.dispatch('getRequestByControlNoCash', {
                    controlNo: this.controlNo,
                })
                setTimeout(() => {
                    this.overlay = false
                }, 2500);

            }
        }
    }
}
</script>