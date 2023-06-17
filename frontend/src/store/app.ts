// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    alert: {
      show: false,
      text: '',
      type: ''
    }
  }),
})
