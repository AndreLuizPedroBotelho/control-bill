// Utilities
import axios from 'axios'
import { defineStore } from 'pinia'

export const useTypePaymentStore = defineStore("typepayment", {
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
      },
      {
        title: 'Actions',
        align: 'center',
        key: 'actions',
        sortable: false
      },
    ],
    item: {
      id: null,
      name: ''
    }
  }),
  getters: {
    getTypePayments(state) {
      return state.items
    }
  },
  actions: {
    async get(items: any = null) {
      try {
        const token = localStorage.getItem('token');

        const params = items ? { ...items } : {}

        this.loading = true

        const { data: response }: any = await axios.get('http://localhost:3333/api/typePayment', {
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
          await axios.put(`http://localhost:3333/api/typePayment/${this.item.id}`, this.item, {
            headers: {
              Authorization: token
            }
          })
          this.loading = false
          this.get()

          return
        }

        await axios.post('http://localhost:3333/api/typePayment', this.item, {
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

        await axios.delete(`http://localhost:3333/api/typePayment/${this.item.id}`, {
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

















