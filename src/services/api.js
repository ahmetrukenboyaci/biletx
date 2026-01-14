import axios from 'axios'
import { mockEvents, generateSeatPlan, mockPaymentResponse } from '@/data/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || false

const api = axios.create({
  baseURL: 'https://d706d748-0586-4c2b-9d30-288f5d3b0630.mock.pstmn.io',
  headers: {
    'Content-Type': 'application/json'
  }
})

const mockApi = {
  get: (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url === '/events') {
          resolve({ data: mockEvents })
        } else if (url.startsWith('/events/')) {
          const id = parseInt(url.split('/')[2])
          const event = mockEvents.find(e => e.id === id)
          resolve({ data: event })
        } else if (url.startsWith('/seat-plans/')) {
          const parts = url.split('/')
          const eventId = parseInt(parts[2])
          const categoryId = parseInt(parts[3])
          resolve({ data: generateSeatPlan(eventId, categoryId) })
        }
      }, 300)
    })
  },
  post: (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url === '/payment') {
          resolve({ data: mockPaymentResponse })
        }
      }, 500)
    })
  }
}

export default USE_MOCK ? mockApi : api
