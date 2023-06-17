<template>
  <v-responsive class="d-flex align-start justify-center fill-height my-10" max-width="1000">
    <v-card>
      <v-form v-model="form" @submit.prevent="save">

        <v-card-title class="d-flex align-start mt-2">
          <v-icon>mdi-account</v-icon>Perfil
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name*" :rules="[required]" v-model="store.item.name" required />
          <v-text-field label="Email*" :rules="[required]" v-model="store.item.email" readonly />

          <v-divider></v-divider>

          <h3 class="my-4 mb-6"> Change Password</h3>
          <v-text-field autocomplete="off" label="Old Password" v-model="store.item.oldPassword" type="password"
            clearable />
          <v-text-field autocomplete="off" label="New Password" type="password" v-model="store.item.password" clearable />
          <v-text-field autocomplete="off" label="Password Confirmartion" v-model="store.item.passwordConfirmation"
            type="password" clearable />

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
import { useAppStore } from '../store/app';

const form = ref(false)
const loading = ref(false)

const store = useUserStore();
const storeApp = useAppStore();

store.item = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};

async function save() {

  if (!form.value) {
    return
  }

  if (store.item.password && store.item.password !== store.item.passwordConfirmation) {
    alert("The Password not match with confirmation")
  }


  loading.value = true

  await store.save()
  localStorage.setItem('user', JSON.stringify({ email: store.item.email, name: store.item.name, id: store.item.id }))

  loading.value = false
  storeApp.alert = {
    show: true,
    text: 'User successfully saved',
    type: 'success',
  }

  return
}


function required(v: any) {
  return !!v || 'Field is required'
}
</script>























