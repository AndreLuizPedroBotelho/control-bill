// Utilities
import axios from 'axios'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore("login", {
  actions: {
    async login(email: string, password: string): Promise<any> {
      const { data }: any = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email, password
        })

      const token = `Bearer ${data.token.token}`

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    logout() {
      localStorage.setItem('token', '')
    }

  },
})
