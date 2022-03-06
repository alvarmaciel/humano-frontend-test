/* Módulo de Socies */
import axios from 'axios'

const state = {
	socies: [],
    socieEdit: {
		proveedor:false,
		activo:false,
		adherente:true,
    },
    socie: {},
	sociesH: [],
	sociesP: [],	
    tiendas:[],
}

const getters = {
	socies(state) {
		return state.socies
	},
    sociesH(state) {
        return state.sociesH
    },
    sociesP(state){
        return state.sociesP
    },
	socieEdit(state) {
		return state.socieEdit
	},
	tiendas(state){
		return state.tiendas
	},
    socie(state){
        return state.socie
    }
	
}

const actions = {
    getSocies({ commit }) {
      axios.get('https://humano-backend-test.herokuapp.com/api/v1/socies/')
          .then(response => {
              commit('SET_SOCIES', response.data)
            })
   },
    addSocie({ commit, dispatch }){
		const socie = state.socieEdit
        // Permite enviar vacios estos campos (sino el backend no los acepta)
		if(!socie.emprendimiento){
			socie.emprendimiento = ''
		}
		if(!socie.descripcion){
			socie.descripcion = ''
		}
		console.log("STORE", socie)
        commit('SET_EDIT', false, { root: true } )	
		axios.post('https://humano-backend-test.herokuapp.com/api/v1/socies/', socie)
			.then(response => {
                commit('SET_ALERT', null, { root: true })	
				console.log("CREADO", response)
				dispatch('getSocies')
				dispatch('getSocieById', response.data.id)
                console.log("SOCIE ID", response.data.id)
            },
				state.socieEdit = {
					proveedor:false,
					activo: false,
					adherente:true,
				},
				commit('SET_DIALOG', null, { root: true } ),
				)
			.catch(function (error) {
				console.log(error);
				commit('SET_DIALOG_ERROR', null, { root: true } )
				state.socieEdit = {
					proveedor:false,
					adherente: true,
					activo:false,
				}
			})
	},
  getSocieById({ commit }, id) {
    console.log("GETSOCIEEEEEEEEE", id)
     axios.get('https://humano-backend-test.herokuapp.com/api/v1/socies/' + id )
          .then(response => {
              commit('SET_SOCIE_BY_ID', response.data)
            })
  },

  editSocie({ commit }, item) {
     commit('SET_EDIT', true, { root: true } )
     axios.get('https://humano-backend-test.herokuapp.com/api/v1/socies/'+ item.id +'/')
          .then(response => {
              commit('SET_SOCIE_EDIT', response.data)
         })
         commit('SET_DIALOG', null, { root: true} )
  },
/*  getTiendas({ commit }) {
      axios.get('https://humano-backend-test.herokuapp.com/api/v1/tiendas/')
          .then(response => {
              commit('SET_TIENDAS', response.data)
         console.log("SOCIE EN STORE", state.socieEdit)
            })
  },*/
  updateSocie({ commit, dispatch }) {
		const socie = state.socieEdit
       console.log("SOCIE EN EL UPDATE", socie)
		axios.patch('https://humano-backend-test.herokuapp.com/api/v1/socies/' + socie.id + '/ ', socie)
			.then(response => {
				commit('SET_ALERT', null, { root: true })
                commit('SET_EDIT', false, { root: true })
                state.socieEdit = {
					activo: false,
					proveedor: false,
					adherente: true
				},
				console.log(response)
				dispatch('getSocies')
			},
				commit('SET_DIALOG', null, { root: true } ),
            )
			.catch(function (error) {
				console.log(error);
				commit('SET_EDIT', false, { root: true } )
				state.socieEdit = {
                    activo: false,
					proveedor: false,
					adherente: true
				},
					commit('SET_DIALOG_ERROR', null, { root: true })
			})
  },

  cancelar({ commit }){
      commit('SET_DIALOG', null, { root: true })
      commit('SET_EDIT', false, { root: true })
      state.socieEdit = []
      state.socieEdit = {
        activo: false,
        proveedor: false,
        adherente: true
      },
      state.socie = {}
  },

}

const mutations = {
	SET_SOCIES(state, socies) {
			state.socies = socies
			for(let i = 0; i < state.socies.length; i++){
					if(state.socies[i].activo === true){
							state.sociesH.push(state.socies[i])
					}
			}
			for(let i = 0; i < state.socies.length; i++){
					if(state.socies[i].proveedor === true){
							state.sociesP.push(state.socies[i])
					}
			}
		},
	SET_SOCIE_EDIT(state, socieEdit) {
        state.socieEdit = socieEdit
    },
    SET_TIENDAS(state, tiendas){
        state.tiendas = tiendas
    },
	CLEAR_SOCIE() {
		state.socieEdit = []
	},
    SET_SOCIE_BY_ID(state, socie) {
        state.socie = socie
  //      state.socie.codigo = socie.codigo.toString()
     //   state.productoEdit.socie = socie
        console.log("SOCIE", state.socie)
    },

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
