import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/events'
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../views/EventsView.vue')
  },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: () => import('../views/EventDetailView.vue')
  },
  {
    path: '/seat-plan/:eventId/:categoryId',
    name: 'SeatPlan',
    component: () => import('../views/SeatPlanView.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/PaymentView.vue')
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: () => import('../views/PaymentSuccessView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
