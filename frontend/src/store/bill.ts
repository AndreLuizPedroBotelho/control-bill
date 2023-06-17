// Utilities
import axios from 'axios'
import { defineStore } from 'pinia'

export const useBillStore = defineStore("bill", {
  state: () => ({
    items: [],
    total: 0,
    loading: false,
    headers: [
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
        title: 'Recurrent',
        align: 'start',
        sortable: false,
        key: 'recurrent',
      }, {
        title: 'TypePayment',
        align: 'start',
        sortable: false,
        key: 'typePayment',
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
      recurrent: false,
      amount: 0,
      typePaymentId: null
    }
  }),
  getters: {
    getBills(state) {
      return state.items
    }
  },
  actions: {
    async get(items: any = null) {
      try {
        const token = localStorage.getItem('token');

        const params = items ? { ...items } : {}

        this.loading = true

        const { data: response }: any = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/bill`, {
          params,
          headers: {
            Authorization: token
          }
        })

        this.loading = false

        this.items = response.data
        this.total = response.meta.total

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
          await axios.put(`${import.meta.env.VITE_BACKEND_URL}/bill/${this.item.id}`, this.item, {
            headers: {
              Authorization: token
            }
          })
          this.loading = false
          this.get()

          return
        }

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/bill`, this.item, {
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

        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/bill/${this.item.id}`, {
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
