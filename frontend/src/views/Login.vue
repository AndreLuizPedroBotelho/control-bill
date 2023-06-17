<template>
  <v-responsive class="align-center text-center fill-height bg-blue-grey-darken-2">
    <v-card variant="tonal" class="mx-auto px-6 py-8 rounded" max-width="500">
      <v-form v-model="form" @submit.prevent="onSubmit">

        <v-card-title>
          <h2 class="text-white font-weight-bold font-italic">Control Bill</h2>
        </v-card-title>

        <v-card-text class=" mt-8">
          <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" label="Email"
            append-inner-icon="mdi-email"></v-text-field>

          <v-text-field v-model="password" :readonly="loading" :rules="[required]" label="Password"
            @click:append-inner="show = !show" :type="show ? 'text' : 'password'" placeholder="Enter your password"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"></v-text-field>
          <br>

        </v-card-text>
        <v-card-actions class="mx-2">
          <v-btn :disabled="!form" :loading="loading" variant="outlined" block color="white" size="large" type="submit">
            Login
          </v-btn>
        </v-card-actions>
      </v-form>

    </v-card>
  </v-responsive>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useLoginStore } from "../store/login";

const router = useRouter()

const form = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)
const show = ref(false)

const store = useLoginStore();

async function onSubmit() {
  if (!form.value) return

  try {
    loading.value = true

    await store.login(email.value, password.value)


    router.push('/')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false

  }

}

function required(v: any) {
  return !!v || 'Field is required'
}
</script>
