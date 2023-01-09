<template>
    <v-container class="m-auto">
        <v-row justify="center"
            style="margin: 0; position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">
            <v-btn @click="signin" color="aliceblue" class="text-center" tile
                style="padding: 20px;font-size: 17px;color: black;">Sign
                in
            </v-btn>
        </v-row>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </v-container>
</template>
<script>
export default {
    name: 'LoginComponent',
    data(){
        return{
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
        }
    },
    created() {
        this.userNotLogged();
    },
    methods: {
        userNotLogged(){
            if (localStorage.getItem('message')) {
                setTimeout(() => {
                    this.snackbar = {
                        show: true,
                        color: 'red darken-2',
                        message: localStorage.getItem('message'),
                    }
                    localStorage.removeItem('message')
                }, 1000);
            }
        },
        async signin() {
            const response = await this.$store.dispatch('signIn');

            if (response.status === 200) {
                window.location.href = response.data.url
            } else {
                this.snackbar = {
                    show: true,
                    color: 'red darken-2',
                    message: response.message,
                }
            }
        },
    }
}

</script>