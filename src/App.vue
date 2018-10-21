<template>
  <div id="app">
  <v-app>
    <router-view/>
  </v-app>
  </div>
</template>

<script>
import navBar from "@/components/navbar";
export default {
  name: "app"
};
</script>