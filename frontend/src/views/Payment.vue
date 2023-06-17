<template>
  <v-responsive class="align-center text-left ml-2 mt-3">
    <Datatable :canCreate="true" v-model:page="store.page" :storeProp="store" :openModalSave="openModalSave"
      title="Payment" icon="mdi-cash-clock">
      <template v-slot:filters>
        <v-row class="mx-1">
          <v-col cols="10">
            <v-text-field label="Name" v-model="store.filters.name" v-on:keyup.enter="store.get()"
              @click:clear="store.get()" clearable></v-text-field>
          </v-col>

          <v-col>
            <v-select label="Paid" v-model="store.filters.paid" :items="paids" clearable
              @update:modelValue="store.get()"></v-select>
          </v-col>
        </v-row>

        <v-row class="mx-1">
          <v-col>
            <v-select label="Month" v-model="store.filters.month" :items="months" @update:modelValue="store.get()"
              clearable />
          </v-col>
          <v-col>
            <v-text-field label=" Year*" v-model="store.filters.year" v-on:keyup.enter="store.get()"
              @click:clear="store.get()" clearable />
          </v-col>
          <v-col>
            <v-select label="Type of Payment" v-model="store.filters.typePaymentId" item-title="name" item-value="id"
              :items="typePayments" clearable @update:modelValue="store.get()" />
          </v-col>

          <v-col>
            <v-select label="Bill" v-model="store.filters.billId" item-title="name" item-value="id" :items="bills"
              clearable @update:modelValue="store.get()" />
          </v-col>

        </v-row>

      </template>

      <template v-slot="{ item }">
        <tr>
          <td>
            <v-chip @click="changePaid(item.selectable)">
              <v-icon :color="!Boolean(item.columns.paid) ?
                'red-darken-4' :
                'teal-darken-3'">
                {{ !Boolean(item.columns.paid) ?
                  'mdi-thumb-down-outline' :
                  'mdi-thumb-up-outline'
                }}
              </v-icon>
            </v-chip>
          </td>
          <td>{{ item.columns.name }}</td>
          <td>{{
            parseFloat(item.columns.amount).toLocaleString('pt-br', {
              style: 'currency', currency: 'BRL'
            })
          }}</td>
          <td>{{ item.columns.year }}</td>
          <td>{{ item.columns.month }}</td>


          <td>{{
            item.columns.dateConfirmPaid ? new Date(item.columns.dateConfirmPaid).toLocaleDateString('pt-BR')
            : '-' }}</td>

          <td>
            <v-chip label @click="router.push('typePayment')">
              {{ item.columns["typePayment"].name }}
            </v-chip>
          </td>

          <td>
            <v-chip label @click="router.push('bill')">
              {{ item.columns["bill"].name }}
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

    <ModalSave v-model="dialogSave" :storeProp="store" :save="save" title="Payment" icon="mdi-cash-clock">
      <v-text-field label="Name*" :rules="[required]" v-model="store.item.name" required></v-text-field>

      <v-text-field label=" Amount*" v-maska:[optionsMoney] :rules="[required]" v-model="store.item.amount"
        required></v-text-field>

      <v-select label=" Month*" :rules="[required]" v-model="store.item.month" :items="months"></v-select>

      <v-text-field label=" Year*" v-maska:[optionsYear] :rules="[required]" v-model="store.item.year"
        required></v-text-field>


      <v-select label="Type of Payment*" :rules="[required]" v-model="store.item.typePaymentId" item-title="name"
        item-value="id" :items="typePayments"></v-select>

      <v-select label="Bill*" :rules="[required]" v-model="store.item.billId" item-title="name" item-value="id"
        :items="bills">
        <template v-slot:selection="{ item }">
          <div class="d-flex justify-center align-center justify-space-between">
            {{ item.title }}

            <v-chip label @click="copyBill(item.raw)" class="ml-6">
              <v-icon>
                mdi-content-copy
              </v-icon>
            </v-chip>
          </div>

        </template>


      </v-select>

      <v-checkbox color="secondary" v-model="store.item.paid" label="Paid"></v-checkbox>
    </ModalSave>

  </v-responsive>
</template>

<script lang="ts" setup>
import Datatable from '@/components/Datatable.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import ModalSave from '@/components/ModalSave.vue';

import { reactive, onMounted, ref } from 'vue';
import { vMaska } from "maska"
import { useTypePaymentStore } from "../store/typePayment";
import { usePaymentStore } from "../store/payment";
import { useBillStore } from "../store/bill";

import { useRouter } from 'vue-router';

const months = Array.from({ length: 12 }, (_, i) => i + 1)
const paids = [
  {
    value: true,
    title: 'Yes'
  },
  {
    value: false,
    title: 'No'
  },
]

const optionsMoney = reactive({
  mask: "### ###,##",
  eager: false,
  reversed: true,
})

const optionsYear = reactive({
  mask: "####",
  eager: true,
  reversed: false,
})

const typePayments = ref([])
const bills = ref([])

const router = useRouter()

const dialogDelete = ref(false)
const dialogSave = ref(false)

const store = usePaymentStore();
const storeTypePayment = useTypePaymentStore();
const storeBill = useBillStore();

async function save(form: any) {
  if (!form) {
    return
  }

  store.item.amount = eval(String(store.item.amount).replace(",", '.').replace(" ", ''))

  await store.save()

  dialogSave.value = false

  return
}

function copyBill(item: any) {
  store.item = {
    ...store.item,
    name: item.name,
    amount: item.amount,
    typePaymentId: item.typePaymentId,
    billId: item.id,
  }
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


async function changePaid(item: any) {
  store.item = { ...item, paid: !item.paid };

  await store.save()

  return
}

function required(v: any) {
  return !!v || 'Field is required'
}

onMounted(async () => {
  const { items: itemsTypePayment }: any = await storeTypePayment.get()
  const { items: itemsBill }: any = await storeBill.get()

  typePayments.value = itemsTypePayment
  bills.value = itemsBill
})


</script>






