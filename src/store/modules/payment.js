import api from '@/services/api'

export default {
  namespaced: true,
  
  state: () => ({
    loading: false,
    error: null,
    success: false,
    message: ''
  }),
  
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_SUCCESS(state, { success, message }) {
      state.success = success
      state.message = message
    },
    RESET_STATE(state) {
      state.loading = false
      state.error = null
      state.success = false
      state.message = ''
    }
  },
  
  actions: {
    async processPayment({ commit }, paymentData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await api.post('/payment', paymentData)
        commit('SET_SUCCESS', { 
          success: response.data.status === 'success', 
          message: response.data.message 
        })
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    resetPaymentState({ commit }) {
      commit('RESET_STATE')
    }
  },
  
  getters: {
    isLoading: state => state.loading,
    error: state => state.error,
    isSuccess: state => state.success,
    message: state => state.message
  }
}
