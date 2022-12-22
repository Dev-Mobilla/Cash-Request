<template>
    <div class="mt-15">
        <v-row justify="center" class="mt-15">
            <v-col cols="12" md="2" sm="4">
                <v-otp-input length="4" type="number" @finish="otpInput" v-model="mlpin" :disabled="loading">
                </v-otp-input>
            </v-col>
        </v-row>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate color="#D50000" size="95" width="8" style="margin-right:5px">
                <v-img src="../../assets/diamond.png" max-height="75" max-width="75"></v-img>
            </v-progress-circular>
        </v-overlay>
        <v-snackbar top elevation="0" :timeout="3000" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </div>
</template>
<script>
export default {
    name: 'MLPinLogin',
    data() {
        return {
            mlpin: '',
            loading: false,
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
        }
    },
    methods: {
        otpInput(otp) {
            console.log(otp);
            this.loading = true
            setTimeout(() => {
                this.snackbar = {
                    message: 'Successfully Logged in',
                    show: true,
                    color: 'success',

                }
                this.loading = false
            }, 3000);
        }
    }
}
</script>

<style>
.v-otp-input .v-input {
    padding: 0px 4px;
}

.v-text-field--outlined>.v-input__control>.v-input__slot {
    min-height: 45px;
}
</style>