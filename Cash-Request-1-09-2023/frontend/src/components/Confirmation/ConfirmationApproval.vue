<template>
    <div>
        <v-dialog v-model="dialog" width="430" persistent>
            <v-card class="pt-5">
                <div class="d-flex" style="justify-content: center;">
                    <v-img src="../assets/diamond.png" max-height="90" max-width="90" class="mt-3"></v-img>
                </div>
                <v-card-title style="justify-content: center;">
                    <p style="justify-content: center;font-size: medium;">
                        Are you sure you want to {{ approvalResponse }}
                        this request?
                    </p>
                </v-card-title>
                <v-card-actions class="pb-5" style="justify-content: center;">
                    <!-- <v-spacer></v-spacer> -->
                    <v-btn color="red darken-4" text @click="dialog = false" :disabled="loading">
                        cancel
                    </v-btn>
                    <v-btn color="success" text @click="response" :disabled="loading">
                        <div v-if="loading" class="spinner-border spinner-border-sm">
                        </div>
                        <span v-if="loading" class="px-1">Loading...</span>
                        <span v-else>{{ approvalResponse}}</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </div>
</template>
<script>
// import router from '@/router/router'
import store from '@/store'

export default {
    name: 'ConfirmationComponent',
    props: [
        'data'
    ],
    data() {
        return {
            dialog: true,
            loading: false,
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
        }
    },
    computed: {
        approvalResponse() {
            return this.data.buttonResponse
        }
    },
    created() {
        this.data
    },
    methods: {
        async response() {
            this.loading = true

            if (this.data.buttonResponse === "approve") {
                
                const response = await store.dispatch('ApprovalResponse',
                    {
                        controlNo: this.data.controlNo,
                        approver: this.data.approver,
                        comment: this.data.remarks,
                        approved: this.data.buttonResponse,
                        disapproved: '',
                        requestType:this.data.type
                    }
                )
                this.dialog = false
                // this.snackbar = {
                //     message: `Successfully ${response.data.status}`,
                //     show: true,
                //     color: 'success'
                // }
            } else if (this.data.buttonResponse === 'disapprove') {
                const response = await store.dispatch('ApprovalResponse',
                    {
                        controlNo: this.data.controlNo,
                        approver: this.data.approver,
                        comment: this.data.remarks,
                        approved: '',
                        disapproved: this.data.buttonResponse,
                        requestType:this.data.type
                    }
                )
            }

            // setTimeout(() => {
            //     router.push({ path: `/response/${this.$route.query.controlno}` })
            // }, 2000);
        },
    }
}
</script>