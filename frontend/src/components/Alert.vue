<template>
  <v-snackbar multi-line elevation="24" :color="store.alert.type" height="50" v-model="store.alert.show" variant="tonal"
    location="top right" :timeout="2000">
    <div class="d-flex align-center ">
      <v-icon :icon="getIcon()" class="mr-2" />
      <h3>{{ store.alert.text }}</h3>
    </div>

  </v-snackbar>
</template>


<script lang="ts" setup>
import { useAppStore } from "../store/app";

const store = useAppStore();


function getIcon() {
  const icon: any = {
    default: 'mdi-information',
    success: "mdi-check-circle",
    error: "mdi-alert-circle",
  }

  return icon[store.alert.type] || icon['default']
}


</script>
