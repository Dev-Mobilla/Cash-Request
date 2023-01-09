<template>
    <v-row style="margin: 0px;">
        <v-container fluid style="height: 60vh; margin-bottom: 30px;" class="pb-15 container--back">
            <div class="d-flex" style="justify-content:space-between ;">
                <router-link to="/home/menu">
                    <v-img src="../assets/logo-ml.png" max-height="200" max-width="250" class="mt-2 ml-5"></v-img>
                </router-link>
                <!-- <v-btn text plain color="white" class="mt-3" to="/home/menu" v-if="returnToHome"></v-btn> -->
                <v-btn text plain color="white" class="mt-3" v-if="returnToHome" @click="logout">logout &#8594;</v-btn>
            </div>
            <div class="mt-10 mb-15">
                <v-col>
                    <hr class="horizontal">
                </v-col>
                <v-col class="mt-2 mb-5">
                    <p class="text-center white--text" style="font-size:55px;font-weight: 600;">{{ $route.name }}</p>
                </v-col>
            </div>
        </v-container>
        <v-overlay :value="overlay" color="white" :opacity="1">
            <v-progress-circular indeterminate color="#D50000" size="95" width="8" style="margin-right:5px">
                <v-img src="../assets/diamond.png" max-height="75" max-width="75"></v-img>
            </v-progress-circular>
        </v-overlay>
        <v-spacer></v-spacer>
        <router-view></router-view>
        <v-snackbar top elevation="0" :timeout="3500" :color="snackbar.color" v-model="snackbar.show" min-height="60"
            class="text-center">
            <span class="white--text font-weight-bold" style="font-size: 15px;"> {{ snackbar.message }} </span>
        </v-snackbar>
    </v-row>
</template>
<script>

export default {
    name: "MainView",
    data() {
        return {
            overlay: false,
            snackbar: {
                message: '',
                show: false,
                color: null,

            },
            isLoggedIn: localStorage.getItem('token')

        }
    },
    created() {
        // this.storeLoggedUser();
        this.overlayOnMount();

    },
    computed: {
        returnToHome() {
            return this.$route.path === '/home/menu' ? true : false
        }
    },
    methods: {
        overlayOnMount() {
            this.overlay = true

            setTimeout(() => {
                this.overlay = false
            }, 3000);
        },
        // async storeLoggedUser() {
        //     localStorage.setItem('success', false);
        //     this.overlay = true

        //     if (this.isLoggedIn) {
        //         setTimeout(() => {
        //             this.overlay = false
        //         }, 2000);
        //     } else {
        //         const response = await this.$store.dispatch('storeLoggedUser', { user: this.$route.query.user, token: this.$route.query.token });
        //         console.log(response);
        //         if (response.data.rows.length === 0) {
        //             this.overlay = false
        //             setTimeout(() => {
        //                 this.snackbar = {
        //                     show: true,
        //                     color: 'red darken-2',
        //                     message: response.data.message,
        //                 }
        //                 this.$router.push({ path: '/' })
        //             }, 2000);
        //         } else {
        //             if (localStorage.getItem('token')) {
        //                 setTimeout(() => {
        //                     this.overlay = false;
        //                 }, 2000);
        //             } else {
        //                 this.$router.push({ path: '/' })
        //             }

        //         }

        //     }

        // },

        async logout() {
            this.overlay = true

            const response = await this.$store.dispatch('userLogout');

            if (response.status === 200) {
                setTimeout(() => {
                    this.overlay = false
                }, 2500);
                setTimeout(() => {
                    this.snackbar.show = true;
                    this.snackbar.color = 'success';
                    this.snackbar.message = response.data.message;
                    this.$router.push({ path: '/' })
                }, 3000);

            } else {
                setTimeout(() => {
                    this.overlay = false
                }, 2500);
                this.snackbar = {
                    show: true,
                    color: 'red darken-2',
                    message: response.data.message,
                }
                this.$router.push({ name: 'BRANCH REQUEST' })
            }
        }
    }
}
</script>

<style>
hr.horizontal {
    width: 75%;
    margin: auto;
    border-top: 2px solid #ebe9e9;
    /* border-top: 2px solid #0000008f; */
}

.container--back {
    /* background-image: url('../assets/ml-building.jpg'); */
    background: linear-gradient(rgba(0, 0, 0, 0.568), rgba(0, 0, 0, 0.616)), url('../assets/ml-building.jpg');
    background-size: cover;
    /* background: linear-gradient(rgba(0, 0, 0, 0.568), rgba(0, 0, 0, 0.616)), url('../assets/background.png'); */
}
</style>