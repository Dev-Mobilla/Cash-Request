<template>
    <v-container class="m-auto mt-16" fluid style="background-color: white;border-radius: 5px;">
        <getAllRequests/>
    </v-container>
</template>
<script>
import getAllRequests from './AllCloseRequest.vue'

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
        
    },
    methods: {
       
    }

}
</script>
<style>
.openRequest.v-tab.v-tab {
    color: red;
}
</style>