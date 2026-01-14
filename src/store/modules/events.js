import api from '@/services/api'

export default {
  namespaced: true,
  
  state: () => ({
    events: [],
    currentEvent: null,
    loading: false,
    error: null
  }),
  
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_CURRENT_EVENT(state, event) {
      state.currentEvent = event
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  
  actions: {
    async fetchEvents({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await api.get('/events')
        commit('SET_EVENTS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async fetchEventById({ commit }, eventId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await api.get(`/events/${eventId}`)
        commit('SET_CURRENT_EVENT', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  
  getters: {
    allEvents: state => state.events,
    currentEvent: state => state.currentEvent,
    isLoading: state => state.loading,
    error: state => state.error
  }
}
