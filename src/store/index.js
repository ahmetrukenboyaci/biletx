import { createStore } from 'vuex'
import events from './modules/events'
import seats from './modules/seats'
import payment from './modules/payment'

export default createStore({
  modules: {
    events,
    seats,
    payment
  }
})
