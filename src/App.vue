<template>
  <div>
    <NavBar />
  </div>
  <div class="pt-24 pl-12">
    <Router-View />
  </div>
  <div>
    <Footer />
  </div>
</template>
<script setup>
import NavBar from "./layouts/NavBar.vue";
import Footer from "./layouts/Footer.vue";
</script>
