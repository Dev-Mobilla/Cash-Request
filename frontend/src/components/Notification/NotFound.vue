<template>
    <v-container class="mx-auto container--back" fluid>
        <v-container class="mt-15">
            <v-card class="my-auto mx-auto text-center pt-4" width="640" height="350">
                <p class="text-center" style="font-size: 80px;font-weight:800;color: #B71C1C;">
                    Oops!
                </p>
                <p class="text-center" style="font-size: 30px;font-weight:800;color: #D32F2F">
                    404 - Page Not Found
                </p>
                <p class="text-center" style="font-size: 17px;font-weight:500;color:#757575;">
                    Looks like the page you're trying to access doesn't exist.
                </p>
                <div>
                    <v-btn to="/home" color="red darken-3" class="white--text mt-5" small tile>Go to login</v-btn>
                </div>
                
            </v-card>
        </v-container>

    </v-container>
</template>

<script>
export default {
    name: 'CommentComponent',

}
</script>
<style>
.paragraph-text {
    font-size: 18px;
}

.container--back {
    /* background-image: url('../assets/ml-building.jpg'); */
    background: url('../../assets/ml-building.jpg');
    background-size: cover;
    height: 100vh;
    /* background: linear-gradient(rgba(0, 0, 0, 0.568), rgba(0, 0, 0, 0.616)), url('../assets/background.png'); */
}
</style>