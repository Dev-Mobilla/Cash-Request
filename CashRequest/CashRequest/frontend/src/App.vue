<template>
  <v-app style="background:none">
    <v-main>
      <ModalIdle v-if="isIdle" />
      <router-view />
    </v-main>
    <div class="mx-auto text-center mt-8">
      <p style="color:rgb(66 66 66);font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">M. LHUILLIER FINANCIAL SERVICES, INC.</p>
      <p style="color:rgb(66 66 66);font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Cash Request &copy; {{ year }}</p>
    </div>
  </v-app>
</template>

<script>
import ModalIdle from './components/Public/ModalIdle.vue';

export default {
  name: "App",
  data: () => ({
    year: new Date().getFullYear(),
  }),
  components: { ModalIdle },
  computed: {
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    }
  }
};
</script>
<style>

</style>
