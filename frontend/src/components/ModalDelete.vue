<template>
  <v-dialog v-model="value" width="500">
    <v-card>
      <v-form @submit.prevent="remove">

        <v-card-title class="py-5">
          <span class="text-h5"><v-icon>mdi-delete</v-icon> Delete</span>
        </v-card-title>
        <v-card-text>
          Are you sure you want to permanently delete?

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="value = false">
            No
          </v-btn>
          <v-btn variant="text" :loading="loading" type="submit">
            Yes
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ref } from 'vue';

const props = defineProps(['value', 'storeProp'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const loading = ref(false)

async function remove() {
  loading.value = true

  await props.storeProp.remove()

  value.value = false
  loading.value = false
}

</script>
