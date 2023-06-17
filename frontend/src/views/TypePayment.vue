<template>
  <v-responsive class="align-center text-left ml-6 mt-3">
    <Datatable :canCreate="true" :storeProp="store" :openModalSave="openModalSave" title="Type of payment"
      icon="mdi-credit-card-settings-outline">
      <template v-slot="{ item }">
        <tr>
          <td>{{ item.columns.name }}</td>
          <td class="text-center">
            <v-icon size=" small" class="me-2" @click="openModalSave(item.selectable)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click="openModalDelete(item.selectable)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </Datatable>

    <ModalDelete v-model="dialogDelete" :storeProp="store" />

    <ModalSave v-model="dialogSave" :storeProp="store" :save="save" title="Type of payment"
      icon="mdi-credit-card-settings-outline">
      <v-text-field label="Name*" :rules="[required]" v-model="store.item.name" required>
      </v-text-field>
    </ModalSave>

  </v-responsive>
</template>

<script script lang="ts" setup>
import Datatable from '@/components/Datatable.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import ModalSave from '@/components/ModalSave.vue';

import { ref } from 'vue';
import { useTypePaymentStore } from "../store/typePayment";

const dialogDelete = ref(false)
const dialogSave = ref(false)

const store = useTypePaymentStore();

async function save(form: any) {
  if (!form) {
    return
  }

  await store.save()

  dialogSave.value = false

  return
}

function openModalDelete(item: any) {
  store.item = { ...item };

  dialogDelete.value = true
  return
}

function openModalSave(item: any) {
  store.item = { ...item };

  dialogSave.value = true
  return
}

function required(v: any) {
  return !!v || 'Field is required'
}


</script>
