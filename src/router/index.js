import Vue from 'vue'
import VueRouter from 'vue-router'
import ListaProductos from '../components/ListaProductos.vue'
import CajaDiaria from '../components/CajaDiaria.vue'
import ListaSocies from '../components/ListaSocies.vue'
import ListaVentas from '../components/ListaVentas.vue'
import Egresos from '../components/Egresos.vue'
import ListaEgresos from '../components/ListaEgresos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ListaProductos',
    name: 'ListaProductos',
    component: ListaProductos
  },
  {
    path: '/ListaSocies',
    name: 'ListaSocies',
    component: ListaSocies
  },
  {
    path: '/ListaVentas',
    name: 'ListaVentas',
    component: ListaVentas
  },
  {
    path: '/ListaEgresos',
    name: 'ListaEgresos',
    component: ListaEgresos
  },

  {
    path: '/CajaDiaria',
    name: 'CajaDiaria',
    component: CajaDiaria
  },
   {
    path: '/Egresos',
    name: 'Egresos',
    component: Egresos
  },
 {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
