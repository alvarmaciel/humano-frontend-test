/* Módulo de Ventas */
import axios from 'axios'
const state = {

    ventas: [],
    idVenta:''
}

const getters = {
    ventas(state) {
        return state.ventas
    }
}

const actions = {
 getVentas({ commit }) {
      commit('SET_PROGRESS', true, { root: true })
      axios.get('https://humano-backend-test.herokuapp.com/api/v1/ventas/')
          .then(response => {
              commit('SET_VENTAS', response.data)
                commit('SET_PROGRESS', false, { root: true })
             // console.log("get", response.data)
            })
  },
  addVenta({ commit }, venta){
       const info_venta = {
           cajere: 1,
           bonificacion: venta.bonificacion,
           recargo: venta.recargo,
           socie: venta.socie.id,
           tipo_de_venta: null,
           forma_de_pago: venta.forma_de_pago,
           monto_total: venta.monto_total,
           itemsVenta: venta.itemsVenta

       }
      const items = venta.itemsVenta
      axios.post('https://humano-backend-test.herokuapp.com/api/v1/ventas/', info_venta)
           .then( response =>{
              commit('SET_ALERT', null, { root: true })
              commit('SET_VENTA_ID', response.data.id),
              items.forEach( item =>
                   item.venta = state.idVenta,
              )
              items.forEach(item =>
                axios.post('https://humano-backend-test.herokuapp.com/api/v1/items-ventas/', item)
                  .then()
                    .catch(function (error) {
                        console.log(error)
                    })
              )
		state.socie = {}
             }
            )
           .catch(function (error) {
		commit('SET_DIALOG_ERROR')
               console.log(error)
           })
   },

}

const mutations = {
    SET_VENTAS(state, ventas) {
        state.ventas = ventas
    },
    SET_VENTA_ID(state, ventaID){
        console.log('done', ventaID),
        state.idVenta = ventaID
        console.log('ventaID', state.idVenta)
    },

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
