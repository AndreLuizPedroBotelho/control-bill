<template>
  <v-responsive class="align-center text-left ml-6 mt-3">
    <Datatable :canCreate="true" :storeProp="store" :openModalSave="openModalSave" title="Bill" icon="mdi-cash-clock">
      <template v-slot="{ item }">
        <tr>
          <td>{{ item.columns.name }}</td>
          <td>{{
            parseFloat(item.columns.amount).toLocaleString('pt-br', {
              style: 'currency', currency: 'BRL'
            })
          }}</td>
          <td>
            <v-chip label>
              {{ item.columns.recurrent ?
                'Yes' :
                'No'
              }}
            </v-chip>

          </td>

          <td>
            <v-chip label @click="router.push('typePayment')">
              {{ item.columns["typePayment"].name }}
            </v-chip>
          </td>

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

    <ModalSave v-model="dialogSave" :storeProp="store" :save="save" title="Bill" icon="mdi-cash-clock">
      <v-text-field label="Name*" :rules="[required]" v-model="store.item.name" required></v-text-field>

      <v-text-field label=" Amount*" v-maska:[options] :rules="[required]" v-model="store.item.amount"
        required></v-text-field>

      <v-select label="Type of Payment" :rules="[required]" v-model="store.item.typePaymentId" item-title="name"
        item-value="id" :items="typePayments"></v-select>

      <v-checkbox color="secondary" v-model="store.item.recurrent" label="Recurrent"></v-checkbox>
    </ModalSave>

  </v-responsive>
</template>

<script lang="ts" setup>
import Datatable from '@/components/Datatable.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import ModalSave from '@/components/ModalSave.vue';

import { useBillStore } from "../store/bill";
import { reactive, onMounted, ref } from 'vue';
import { vMaska } from "maska"
import { useTypePaymentStore } from "../store/typePayment";
import { useRouter } from 'vue-router';

const options = reactive({
  mask: "### ###,##",
  eager: false,
  reversed: true,
  onMaska: (detail: any) => console.log(detail)
})

const typePayments = ref([])

const dialogDelete = ref(false)
const dialogSave = ref(false)

const store = useBillStore();
const storeTpePayment = useTypePaymentStore();
const router = useRouter()

async function save(form: any) {
  if (!form) {
    return
  }

  store.item.amount = eval(String(store.item.amount).replace(",", '.').replace(" ", ''))

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

onMounted(async () => {
  const { items }: any = await storeTpePayment.get()

  typePayments.value = items
})


</script>
