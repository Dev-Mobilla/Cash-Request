<template>
    <v-container class="m-auto mt-16" fluid style="background-color: white;border-radius: 5px;">
        <getAllRequests/>
    </v-container>
</template>
<script>
import store from "@/store";
import getAllRequests from './AllRequest.vue'

export default {
    name: 'OpenRequestComponent',
    components:{
        getAllRequests
    },
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
        isApprover() {
            return store.getters.getIsApprover
        },
        isNotApprover() {
            return store.getters.getIsNotApprover
        }
    },
    methods: {
       
    }

}
</script>
<style>

</style>