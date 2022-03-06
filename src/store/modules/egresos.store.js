/* Módulo de Egresos */
import axios from 'axios'

const state = {
    egresos: [],
}

const getters = {
    egresos(state) {
        return state.egresos
    }
}

const actions = {
 getEgresos({ commit }) {
      axios.get('https://humano-backend-test.herokuapp.com/api/v1/salidas/')
          .then(response => {
              commit('SET_EGRESOS', response.data)
              // console.log("get", response.data)
            })
  },

// ADDS
   addNota({ commit  },nota){
       nota.humane = nota.humane.id
       nota.proveedor = nota.proveedor.id
       console.log("nota store", nota)
        axios.post('https://humano-backend-test.herokuapp.com/api/v1/salidas/', nota)
           .then(response => {
				commit('SET_ALERT', null, { root: true })
				console.log(response)
			},
            )
            .catch(function (error) {
                console.log(error);
                commit('SET_DIALOG', null, { root: true } )
			})

   },

}

const mutations = {
    SET_EGRESOS(state, egresos) {
        state.egresos = egresos
    },

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
