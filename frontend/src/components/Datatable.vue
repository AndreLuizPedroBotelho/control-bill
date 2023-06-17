<template>
  <v-responsive class="align-start text-center fill-height ma-10">
    <v-card>
      <v-data-table-server fixed-header stick density="compact" theme="dark" :headers="storeProp.headers"
        :items-length="storeProp.total" :items="storeProp.items" :loading="storeProp.loading"
        class="elevation-1 text-left" item-value="name">

        <template v-slot:top>
          <v-toolbar flat class="bg-blue-grey-lighten-1 text-start mb-4 pa-2">
            <v-toolbar-title>
              <span class="text-h5"><v-icon>{{ props.icon }}</v-icon> {{ props.title }}</span>
            </v-toolbar-title>
            <v-btn v-if="canCreate" @click="openModalSave()" prepend-icon="mdi-plus" variant="outlined" color="white"
              size="large">
              Create
            </v-btn>
          </v-toolbar>

          <slot name="filters" />

        </template>



        <template v-slot:item="{ item }">
          <slot :item="item" />
        </template>


        <template v-slot:bottom>
          <div class="pt-10 d-flex text-center align-start justify-end w-100">
            <div style="width:150px" class="mt-2">
              <v-select max-width="20" v-if="itemPerPage" variant="underlined" v-model="itemPerPage"
                label="Items per page:" :items="itemsPerPage" density="compact" />
            </div>

            <div>
              <v-pagination v-model="page" @change="props.storeProp.get()" :length="storeProp.lastPage" :total-visible="7"
                prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
            </div>



          </div>
        </template>

      </v-data-table-server>
    </v-card>
  </v-responsive>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { computed } from 'vue'

const props = defineProps(['title', 'icon', 'storeProp', 'openModalSave', 'page', 'itemPerPage', 'canCreate'])

const itemsPerPage = ref([5, 10, 20])

const emit = defineEmits(['update:itemPerPage', 'update:page'])

const page = computed({
  get() {
    return props.page
  },
  set(value) {
    emit('update:page', value)
  }
})

const itemPerPage = computed({
  get() {
    return props.itemPerPage
  },
  set(value) {
    emit('update:itemPerPage', value)
  }
})

watch(page, async () => {
  await props.storeProp.get()
})

watch(itemPerPage, async () => {
  await props.storeProp.get()
})

onMounted(async () => {
  await props.storeProp.get()
});

</script>
