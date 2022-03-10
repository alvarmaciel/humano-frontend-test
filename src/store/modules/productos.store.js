/* Módulo de Productos */
import axios from 'axios'

const state = {
    productos: [],
    productoEdit: {},
    tipos: [],
    socie: {},
    unidades: []
}

const getters = {
    productos(state) {
        return state.productos
    },
    productoEdit(state){
        return state.productoEdit
    },
    tipos(state){
        return state.tipos
    },
    socie(state){
        return state.socie
    },
    unidades(state){
        return state.unidades
    }
}

const actions = { 
  getUnidades({ commit}){
    axios.get('https://humano-backend-test.herokuapp.com/api/v1/unidades/')
      .then(response => {
        commit('SET_UNIDADES', response.data)
      })
  },
  getProductos({ commit }) {
    commit('SET_PROGRESS', true, { root: true })
     axios.get('https://humano-backend-test.herokuapp.com/api/v1/productos/')
          .then(response => {
                commit('SET_PRODUCTOS', response.data)
                commit('SET_PROGRESS', false, { root: true })

            })
  },
  addProducto({ commit, dispatch }){
     const producto = state.productoEdit
     producto.socie = state.socie.id
     producto.codigo = state.socie.codigo + state.productoEdit.codigo	  
     commit('SET_EDIT', false, { root: true}) 
     axios.post('https://humano-backend-test.herokuapp.com/api/v1/productos/', producto)
          .then(response => {
            commit('SET_ALERT', null, { root: true } )
             console.log(response)
            dispatch('getProductos')
            },
            commit('SET_DIALOG', null, { root: true }),
            commit('CLEAR_PRODUCTO_EDIT') 
          )
            .catch(function (error) {
                console.log(error);
                commit('SET_DIALOG_ERROR', null, { root: true })
            })
  },
	updateProducto({ commit, dispatch }){
		const producto = state.productoEdit
        producto.socie = state.productoEdit.socie.id
        console.log('producto', producto)
		axios.patch('https://humano-backend-test.herokuapp.com/api/v1/productos/' + producto.id + '/ ', producto)
			.then(response => {
                commit('SET_ALERT', null, { root: true } )
				console.log(response)
				dispatch('getProductos')
				commit('CLEAR_PRODUCTO_EDIT')
				commit('SET_EDIT', false, { root: true } )
			},
				commit('SET_DIALOG', null, { root: true })
			)
			.catch(function (error) {
				console.log(error);
				console.log("Hay un error")
				commit('SET_DIALOG_ERROR', null, { root:true })
				commit('CLEAR_PRODUCTO_EDIT')
			})

	},
  editItem({ commit }, item) {
     commit('SET_EDIT', true, { root: true })
     //     console.log("ITEM ---->>>", item)
     axios.get('https://humano-backend-test.herokuapp.com/api/v1/productos/'+ item.id +'/')
          .then(response => {
              commit('SET_PRODUCTO_EDIT', response.data)
              console.log("Data get unidad", response.data.get_unidad)
              console.log("PRODUCTO EN LA STORE", state.productoEdit)
         })
         commit('SET_DIALOG', null, { root: true } )
  },
  getTipos({ commit }) {
      axios.get('https://humano-backend-test.herokuapp.com/api/v1/tipos/')
          .then(response => {
              commit('SET_TIPOS', response.data)
            })
  },
  getSocieById({ commit }, id) {
    console.log("GETSOCIEEEEEEEEE", id)
     axios.get('https://humano-backend-test.herokuapp.com/api/v1/socies/' + id )
          .then(response => {
              commit('SET_SOCIE_BY_ID', response.data)
            })
  },
  deleteItem({ dispatch, commit }, item) {
    axios.delete('https://humano-backend-test.herokuapp.com/api/v1/productos/' + item.id + '/')
          .then(response => {
              console.log("PROUCTO EDIT", response),
              dispatch('getProductos')
              commit('SET_ALERT', null, { root: true })
         })
  },
  cancelar({ commit }){
      commit('SET_DIALOG', null, { root: true })
      state.productoEdit = {}
      commit('SET_EDIT', false, { root: true } )
  },

}

const mutations = {
    SET_PRODUCTOS(state, productos) {
        state.productos = productos
    },
    SET_PRODUCTO_EDIT(state, productoEdit) {
        state.productoEdit = productoEdit
	console.log("PRODUCTO EDIT", productoEdit)
    },
    CLEAR_PRODUCTO_EDIT(state) {
        state.productoEdit = {}
    },
   SET_TIPOS(state, tipos) {
        state.tipos = tipos
    },
   SET_UNIDADES(state, unidades){
        state.unidades = unidades
        console.log("UNIDADES", unidades)
    },
    SET_SOCIE_BY_ID(state, socie) {
        state.socie = socie
  //      state.socie.codigo = socie.codigo.toString()
        state.productoEdit.socie = socie
        console.log("SOCIE", state.socie)
    },
    SET_COMMIT(){
        console.log("Set Commit")
    },

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
