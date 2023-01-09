<template>
    <div>
        <v-dialog v-model="dialog" width="430" persistent>
            <v-card class="pt-5">
                <div class="d-flex" style="justify-content: center;">
                    <v-img src="../../assets/diamond.png" max-height="90" max-width="90" class="mt-3"></v-img>
                </div>
                <v-card-title style="justify-content: center;">
                    <p style="justify-content: center;font-size: medium;">
                        Are you sure you want to
                        <span v-if="approved_button" style="text-transform: lowercase;">
                            {{ $route.query.approved_button }}
                        </span>
                        <span v-if="disapproved_button" style="text-transform:lowercase;">
                            {{ $route.query.disapproved_button }}
                        </span>
                        this request?
                    </p>
                </v-card-title>
                <v-card-actions class="pb-5" style="justify-content: center;">
                    <!-- <v-spacer></v-spacer> -->
                    <v-btn color="red darken-4" text @click="dialog = false" :disabled="loading">
                        cancel
                    </v-btn>
                    <v-btn color="success" text @click="response" :disabled="loading">
                        <span v-if="approved_button">
                            {{ $route.query.approved_button }}
                        </span>
                        <span v-if="disapproved_button">
                            {{ $route.query.disapproved_button }}
                        </span>
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
import router from '@/router/router'
import store from '@/store'

export default {
    name: 'ConfirmationComponent',
    data() {
        return {
            dialog: null,
            loading: false,
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
        }
    },
    computed: {
        approved_button() {
            return this.$route.query.approved_button === 'undefined' ? false : this.loading ? false : true
        },
        disapproved_button() {
            return this.$route.query.disapproved_button === 'undefined' ? false : this.loading ? false : true
        }
    },
    created() {
        if (this.$route.query.controlno) {
            this.dialog = true
        } else {
            this.dialog = false
            this.snackbar = {
                message: 'Unauthorized Approver',
                show: true,
                color: 'red darken-3'
            }
            setTimeout(() => {
                router.push('/home/open-request')
            }, 2000);
        }
    },
    methods: {
        async response() {
            this.loading = true

            const response = await store.dispatch('ApprovalResponse',
                {
                    controlNo: this.$route.query.controlno,
                    approver: this.$route.query.approver,
                    comment: this.$route.query.comment,
                    approved: this.$route.query.approved_button,
                    disapproved: this.$route.query.disapproved_button
                }
            )
            if (response.data.response === 'Progress') {
                this.snackbar = {
                    message: `Successfully ${response.data.status}`,
                    show: true,
                    color: 'success'
                }
                setTimeout(() => {
                    this.loading = false
                    router.push({ path: `/response/${response.data.controlNo}?status=${response.data.status}` })
                }, 2000);

            }
            else if (response.data.response === 'Done') {
                router.push({ path: `/alert/${response.data.controlNo}?status=${response.data.status}` })
            }
            else if (response.data.response === 'Pending') {
                router.push({ path: `/alert-comment/${response.data.controlNo}` })
            }
        },
    }
}
</script>