<template>
  <v-container class="container--back" fluid>
    <v-container class="mt-15">
      <v-card class="my-auto mx-auto text-center" width="640" height="430">
        <div class="d-flex" style="justify-content: center;">
          <v-img :src="image" max-height="150" max-width="130" class="mt-8" />
        </div>
        <div class="mt-3 mb-3">
          <h1>{{ message }}</h1>
          <br>
          <p style="font-size: 18px;">{{ message2 }}</p>
          <p style="font-size: 18px;">Please contact your technician.</p>
        </div>
        <div>
          <v-btn color="red darken-3" class="white--text mt-5" small tile @click="backtologin">Go to login</v-btn>
        </div>
      </v-card>
    </v-container>
    <br>
  </v-container>
</template>
<script>
export default {
  name: 'ErrorComponent',
  data(){
    return {
      image: require('../../assets/comperr.png'),
      message:'',
      message2:''
    }
  },
  created(){
    this.getMessage();
  },
  methods:{
    backtologin(){
      window.location.href = 'http://10.4.8.132/OnlineRequestSystem/mlhuillier-philippines-online-request'
    },
    getMessage(){
      let route = this.$router.currentRoute

      this.message = route.query.message
      this.message2 = route.query.message2
    }
  }
}

</script>
<style>
.container--back {
  /* background-image: url('../assets/ml-building.jpg'); */
  background: url('../../assets/ml-building.jpg');
  background-size: cover;
  height: 100vh;
  /* background: linear-gradient(rgba(0, 0, 0, 0.568), rgba(0, 0, 0, 0.616)), url('../assets/background.png'); */
}
</style>