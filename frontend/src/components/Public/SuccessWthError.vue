<template>
    <v-container class="container--back" fluid>
      <v-container class="mt-15">
        <v-card class="my-auto mx-auto text-center" width="640" height="450">
          <div class="d-flex" style="justify-content: center;">
            <v-img :src="image" max-height="150" max-width="130" class="mt-8" />
          </div>
          <div class="mt-3 mb-3">
            <h1>{{ messageHeader }}</h1>
            <v-card-text>
                <p style="margin: 0px 60px; ">{{ messageBody }}</p>
            </v-card-text>
            <p style="font-size: 18px;">Please contact your admin.</p>
          </div>
          <br>
          <div>
            <v-btn color="red darken-3" class="white--text mt-3" small tile to="/home/open-request">Go to Open Requests</v-btn>
          </div>
        </v-card>
      </v-container>
      <br>
    </v-container>
  </template>
  <script>
  export default {
    name: 'SuccessWthError',
    data(){
      return {
        image: require('../../assets/comperr.png'),
        messageHeader:'',
        messageBody:'',
      }
    },
    created(){
      this.getMessage();
    },
    methods:{
      getMessage(){
        let route = this.$router.currentRoute
  
        this.messageHeader = route.query.messageHeader
        this.messageBody = route.query.messageBody
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