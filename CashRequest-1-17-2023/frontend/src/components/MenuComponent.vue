<template>
    <v-container class="m-auto d-flex mt-5"
        style=" max-width: 80%; height:90vh;">
        <v-row align-content-md="center" justify="space-around" style="margin: 0 auto;">
            <v-card width="40%" to="cash-advance"
                style="padding:20px 10px;cursor: pointer;display: flex;align-items:center;justify-content: center;flex-direction: column;">
                <div>
                    <v-img src="../assets/cash-advance.webp" max-width="120"></v-img>
                </div>
                <p style="font-size: 35px;font-weight: 600;">
                    CASH ADVANCE
                </p>
            </v-card>
            <v-card width="40%" to="revolving-fund"
                style="padding:15px 10px;cursor: pointer;display: flex;align-items:center;justify-content: center;flex-direction: column;">
                <div>
                    <v-img src="../assets/revolving-fund.webp" max-width="120"></v-img>
                </div>
                <p style="font-size: 35px;font-weight: 600;">
                    REVOLVING FUND
                </p>
            </v-card>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name:'MenuComponent',
    methods:{
        
    }

}
</script>
<style>

</style>