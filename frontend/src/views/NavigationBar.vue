<template>
    <v-col>
        <v-app-bar color="red darken-4" :elevation="5" class="white--text" fixed>
            <router-link to="/home">
                <v-img src="../assets/diamond.png" max-width="50" class="ml-5"></v-img>
            </router-link>

            <v-list style="display: inline-flex;padding: 0px;" class="ml-3 navList" color="red darken-4">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item v-bind="attrs" v-on="on">
                            <v-list-item-content>
                                <v-list-item-title>Create Request</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <v-list v-for="item in createRequest" :key="item.text" class="navList">
                        <v-list-item v-for="subItems in item.items" :key="subItems.text" :to="subItems.route">
                            <v-list-item-content>
                                <v-list-item-title style="color: black;">
                                    {{ subItems.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-list-item v-for="link in links" :key="link.text" :to="link.route">
                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-spacer></v-spacer>
            <v-list color="red darken-4" style="padding: 0px;">
                <v-list-item>
                    <h5 style="text-transform:uppercase;" class="white--text">
                        <v-icon class="mr-2" color="white">mdi-account-circle</v-icon> {{ requestor }}
                    </h5>
                    <!-- <v-btn plain text color="white" @click="dialog = true">
                        LOGOUT
                    </v-btn> -->
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text dark v-bind="attrs" v-on="on">
                                <v-icon class="mr-1" color="white">mdi-power</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="dialog = true">
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="backToOnlineReq">
                                <v-list-item-title>Back to Online Request</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item>
            </v-list>
        </v-app-bar>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
        <v-overlay :value="overlay" color="white" :opacity="1">
            <v-progress-circular indeterminate color="#D50000" size="95" width="8" style="margin-right:5px">
                <v-img src="../assets/diamond.png" max-height="75" max-width="75"></v-img>
            </v-progress-circular>
        </v-overlay>
        <v-col>
            <v-row justify="center" class="mt-8">
                <v-dialog v-model="dialog" width="350" persistent>
                    <v-card class="pt-5 pb-5">
                        <v-card-title>
                            <p>Logout?</p>
                        </v-card-title>
                        <v-card-text style="font-size: 15px;">
                            Are you sure you want to log out?
                        </v-card-text>
                        <v-row dense justify="center" style="flex-direction: column;margin: 0px 20px;">
                            <v-btn height="32px" rounded small block color="primary" @click="logout" class="mt-1 mb-2">
                                Yes
                            </v-btn>
                            <v-btn height="32px" rounded small block color="red darken-4" class="white--text mt-1 mb-2"
                                @click="dialog = false">
                                Cancel
                            </v-btn>
                        </v-row>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-col>
        <v-dialog v-model="dialogToLogout" persistent max-width="400">
            <v-card>
                <v-card-title class="text-h5">
                    User
                </v-card-title>
                <v-card-text>
                    The user has not yet been assigned an approver.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="red darken-1" text @click="logout" :disabled="BtnLoading">
                        <span v-if="BtnLoading">loading...</span>
                        <span v-else>ok</span>
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-col>
</template>
<script>
// import store from '@/store';
import CryptoJs from 'crypto-js';

import CloseRequest from '../components/CloseRequest/AllCloseRequest.vue'
import OpenRequest from "../components/OpenRequests/OpenRequest.vue";
export default {

    data() {
        return {
            dialog: false,
            dialogToLogout: false,
            BtnLoading: false,
            overlay: true,
            tab: null,
            links: [
                { id: 1, text: "Open Requests", content: OpenRequest, route: '/home/open-request' },
                { id: 2, text: "Closed Requests", content: CloseRequest, route: '/home/close-request' },
            ],
            createRequest: [
                {
                    id: 3, text: 'Create Request', route: '/home/create-request',
                    items: [
                        {
                            text: 'Cash Advance', route: '/home/create-request/cash-advance'
                        },
                        {
                            text: 'Revolving Fund', route: '/home/create-request/revolving-fund'
                        }
                    ]
                }
            ],
            requestor: ''
        }
    },
    created() {
        this.loading()
        // window.location.reload();
    },
    methods: {
        loading() {

            if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('approvers')) {
                let approverLength = sessionStorage.getItem('approvers');

                if (approverLength == 'false') {
                    setTimeout(() => {
                        this.overlay = false
                    }, 3000);

                    let getRequestor = sessionStorage.getItem('kai-tono');
                    const decToken = CryptoJs.enc.Base64.parse(getRequestor).toString(CryptoJs.enc.Utf8);
                    const bytes = CryptoJs.AES.decrypt(decToken, 'BoJunYiXiaoShiZhenDe').toString(CryptoJs.enc.Utf8);

                    let requestorBytes = JSON.parse(bytes)

                    this.requestor = requestorBytes.fullname

                    // setTimeout(() => {
                    //     this.$router.push({ path: '/home/open-request' })
                    // }, 1500);

                } else if (approverLength == 'true') { // if no approvers assigned
                    this.dialogToLogout = true

                }

            } else {
                this.dialogToLogout = true
            }
        },
        async logout() {
            this.dialog = false
            this.overlay = true
            this.BtnLoading = true

            const response = await this.$store.dispatch('userLogout');
            setTimeout(() => {
                window.location.href = response;
            }, 2000);

        },
        backToOnlineReq() {
            this.overlay = true
            sessionStorage.removeItem('kai-tono')
            sessionStorage.removeItem('to-hu');
            sessionStorage.removeItem('request');

            setTimeout(() => {
                this.overlay = false
                // window.location.href = 'http://10.0.10.44/OnlineRequestSystem/open-requests'
                window.location.href = 'http://10.4.8.132/OnlineRequestSystem/open-requests'
                // window.location.href = 'http://localhost:61746/open-requests'
            }, 1000);
        }
    }
}
</script>
<style>
.v-item-group {
    position: unset;
}

.v-list-item--link:before {
    /* background-color: none; */
    background: rgb(0, 0, 0);
}

.navList.v-list .v-list-item .v-list-item__title {
    color: white;
}

.navList.v-list .v-list-item {
    min-height: 62px;
}

/* .v-list .v-list-item--active {
    border-bottom: 3px solid white;
} */
</style>
