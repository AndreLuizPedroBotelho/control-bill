<template>
  <v-responsive class="d-flex align-start justify-center fill-height my-10" max-width="1000">
    <v-card>
      <v-form v-model="form" @submit.prevent="save">

        <v-card-title class="d-flex align-start mt-2">
          <v-icon>mdi-account</v-icon>Perfil
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name*" :rules="[required]" v-model="user.name" required />
          <v-text-field label="Email*" :rules="[required]" v-model="user.email" readonly />

          <v-divider></v-divider>

          <h3 class="my-4 mb-6"> Change Password</h3>
          <v-text-field label="Password" v-model="user.password" type="password" />
          <v-text-field label="Password Confirmation" type="password" v-model="user.passwordConfirmation" />

        </v-card-text>

        <v-card-actions class="d-flex justify-end mx-2 mb-2">
          <v-btn prepend-icon="mdi-content-save-edit" :loading="loading" :disabled="!form" variant="outlined"
            color="white" size="large" type="submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>

    </v-card>
  </v-responsive>
</template>

<script script lang="ts" setup>

import { ref } from 'vue';
import { useUserStore } from "../store/user";


const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};

const form = ref(false)
const loading = ref(false)

const store = useUserStore();

async function save() {
  console.log(user)

  if (!form.value) {
    return
  }
  loading.value = true

  store.item = user

  await store.save()

  loading.value = false

  return
}


function required(v: any) {
  return !!v || 'Field is required'
}


</script>























