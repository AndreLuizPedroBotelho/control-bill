<template>
  <v-app>
    <v-main class="bg-blue-grey-darken-2">
      <Alert />

      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Alert from '@/components/Alert.vue';

</script>
