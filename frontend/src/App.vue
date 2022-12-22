<template>
  <v-app style="background:none">
    <v-main>
      <router-view />
    </v-main>
      <div class="mx-auto text-center mt-8">
        <p style="color:#757575;">M Lhuillier Technology Group &copy; {{ year }}</p>
        <p style="color:#757575;">Cash Request</p>
      </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    year: new Date().getFullYear(),
  }),
};
</script>
<style>

</style>
