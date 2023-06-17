// Utilities
import axios from 'axios'
import { defineStore } from 'pinia'

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    items: [],
    total: 0,
    loading: false,
    lastPage: 1,
    page: 1,
    headers: [
      {
        title: 'Paid',
        align: 'start',
        sortable: false,
        key: 'paid',
      },
      {
        title: 'Name',
        align: 'start',
        sortable: false,
        key: 'name',
      }, {
        title: 'Amount',
        align: 'start',
        sortable: false,
        key: 'amount',
      }, {
        title: 'Year',
        align: 'start',
        sortable: false,
        key: 'year',
      }, {
        title: 'Month',
        align: 'start',
        sortable: false,
        key: 'month',
      },
      {
        title: 'Date paid',
        align: 'start',
        sortable: false,
        key: 'dateConfirmPaid',
      },
      {
        title: 'TypePayment',
        align: 'start',
        sortable: false,
        key: 'typePayment',
      }, {
        title: 'Bill',
        align: 'start',
        sortable: false,
        key: 'bill',
      }, {
        title: 'Actions',
        align: 'center',
        key: 'actions',
        sortable: false
      },
    ],
    item: {
      id: null,
      name: '',
      amount: 0,
      year: 0,
      month: 0,
      paid: false,
      typePaymentId: null,
      billId: null
    },
    filters: {
      paid: null,
      name: null,
      month: (new Date()).getMonth() + 1,
      year: Number((new Date()).getUTCFullYear()),
      typePaymentId: null,
      billId: null
    }
  }),
  getters: {
    getPayments(state) {
      return state.items
    }
  },
  actions: {
    async get() {
      try {
        const token = localStorage.getItem('token');

        this.loading = true

        const { data: response }: any = await axios.get('http://localhost:3333/api/payment', {
          params: {
            page: this.page,
            filters: this.filters
          },
          headers: {
            Authorization: token
          }
        })

        this.loading = false

        this.items = response.data
        this.total = response.meta.total
        this.lastPage = response.meta.last_page

        return {
          items: this.items,
          total: this.total
        }
      }
      catch (error) {
        this.loading = false

        alert(error)
        console.log(error)
      }
    },

    async save() {
      try {
        const token = localStorage.getItem('token');
        this.loading = true

        if (this.item.id) {
          await axios.put(`http://localhost:3333/api/payment/${this.item.id}`, this.item, {
            headers: {
              Authorization: token
            }
          })
          this.loading = false
          this.get()

          return
        }

        await axios.post('http://localhost:3333/api/payment', this.item, {
          headers: {
            Authorization: token
          }
        })

        this.loading = false
        this.get()

        return

      }
      catch (error) {

        this.loading = false

        alert(error)
        console.log(error)
      }
    },

    async remove() {
      try {
        const token = localStorage.getItem('token');

        await axios.delete(`http://localhost:3333/api/payment/${this.item.id}`, {
          headers: {
            Authorization: token
          }
        })

        this.get()
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})
