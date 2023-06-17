<template>
  <v-snackbar :color="store.alert.type" v-model="store.alert.show" variant="tonal" location="top center" :timeout="10000">
    <h3>{{ store.alert.text }}</h3>
  </v-snackbar>
</template>


<script lang="ts" setup>
import { useAppStore } from "../store/app";

const store = useAppStore();



</script>
