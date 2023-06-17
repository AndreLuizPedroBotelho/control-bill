// Utilities
import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore("user", {
  state: () => ({
    item: {
      id: null,
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      oldPassword: ''
    }
  }),
  actions: {
    async save() {
      const token = localStorage.getItem('token');

      if (this.item.id) {
        const items = Object.fromEntries(Object.entries(this.item).filter(([_, v]) => v != null));

        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/${this.item.id}`, items, {
          headers: {
            Authorization: token
          }
        })
        return
      }

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, this.item, {
        headers: {
          Authorization: token
        }
      })
      return
    },

    async remove() {
      try {
        const token = localStorage.getItem('token');

        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${this.item.id}`, {
          headers: {
            Authorization: token
          }
        })

      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})




