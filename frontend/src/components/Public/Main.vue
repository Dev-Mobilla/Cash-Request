<template>
     <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="350">
            <v-card>
                <v-card-title class="text-h5">
                    Login
                </v-card-title>
                <v-card-text>Please proceed to Online Request Web Application to Login.</v-card-text>
                <v-card-text>Thank you.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="red darken-1" text @click="login" :disabled="loading">
                        <span v-if="loading">loading...</span>
                        <span v-else>ok</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    export default {
        name: "MainComponent",
        data(){
            return {
                dialog: true,
                loading:false
            }
        },
        methods:{
            login(){
                this.loading = true

                setTimeout(() => {
                    this.dialog = false 
                    this.loading = false
                    
                    // window.location.href = 'http://localhost:61746/mlhuillier-philippines-online-request';
                    window.location.href = 'http://10.4.8.132/OnlineRequestSystem/mlhuillier-philippines-online-request';
                    // window.location.href = 'http://10.0.10.44/OnlineRequestSystem/mlhuillier-philippines-online-request';
                }, 1500);
            }
        }
    }
</script>