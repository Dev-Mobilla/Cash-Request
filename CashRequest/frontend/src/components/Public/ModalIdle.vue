<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="350">
            <v-card>
                <v-card-title class="text-h5">
                    Session Timeout
                </v-card-title>
                <v-card-text>For Security reasons, your connection timeout after you've been inactive for a while.</v-card-text>
                <v-card-text>Click OK to Log in.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="red darken-1" text @click="logout" :disabled="loading">
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
    name:"ModalIdle",
    data(){
        return {
            dialog: true,
            loading:false
        }
    },
    methods:{
       async logout(){
        this.loading = true
           const response = await this.$store.dispatch('userLogout');

           setTimeout(() => {
                this.dialog = false
                window.location.href = response;
            }, 1000);
        }
    }
}
</script>