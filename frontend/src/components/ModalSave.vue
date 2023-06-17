<template>
  <v-dialog v-model="value" persistent width="500">
    <v-card>
      <v-form v-model="form" @submit.prevent="save(form)">

        <v-card-title class="py-5">
          <span class="text-h5"><v-icon>{{ icon }}</v-icon> {{ title }}</span>
        </v-card-title>
        <v-card-text>
          <slot />
          <small>*indicates required field</small>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="value = false">
            Close
          </v-btn>
          <v-btn variant="text" type="submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ref } from 'vue';

const props = defineProps(['title', 'icon', 'save', 'value', 'storeProp'])
const emit = defineEmits(['update:modelValue'])

const form = ref()

const value = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>
