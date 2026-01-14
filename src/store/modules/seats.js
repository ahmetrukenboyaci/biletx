import api from '@/services/api'

export default {
  namespaced: true,
  
  state: () => ({
    seats: [],
    selectedSeats: [],
    selectedCategory: null,
    loading: false,
    error: null
  }),
  
  mutations: {
    SET_SEATS(state, seats) {
      state.seats = seats
    },
    SET_SELECTED_CATEGORY(state, category) {
      state.selectedCategory = category
    },
    ADD_SELECTED_SEAT(state, seat) {
      if (!state.selectedSeats.find(s => s.id === seat.id)) {
        state.selectedSeats.push(seat)
      }
    },
    REMOVE_SELECTED_SEAT(state, seatId) {
      state.selectedSeats = state.selectedSeats.filter(s => s.id !== seatId)
    },
    CLEAR_SELECTED_SEATS(state) {
      state.selectedSeats = []
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  
  actions: {
    async fetchSeatPlan({ commit }, { eventId, categoryId }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await api.get(`/seat-plans/${eventId}/${categoryId}`)
        commit('SET_SEATS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    toggleSeatSelection({ commit, state }, seat) {
      const existingSeat = state.selectedSeats.find(s => s.id === seat.id)
      if (existingSeat) {
        commit('REMOVE_SELECTED_SEAT', seat.id)
      } else {
        commit('ADD_SELECTED_SEAT', seat)
      }
    },
    
    setSelectedCategory({ commit }, category) {
      commit('SET_SELECTED_CATEGORY', category)
    },
    
    clearSelection({ commit }) {
      commit('CLEAR_SELECTED_SEATS')
    }
  },
  
  getters: {
    allSeats: state => state.seats,
    selectedSeats: state => state.selectedSeats,
    selectedCategory: state => state.selectedCategory,
    selectedSeatIds: state => state.selectedSeats.map(s => s.id),
    totalPrice: state => {
      if (!state.selectedCategory) return 0
      return state.selectedSeats.length * state.selectedCategory.price
    },
    isLoading: state => state.loading,
    error: state => state.error
  }
}
