// import dependency to handle HTTP request to our back end
import Vuex from 'vuex'
import Vue from 'vue'
import socies from './modules/socies.store'
import productos from './modules/productos.store'
import ventas from './modules/ventas.store'
import egresos from './modules/egresos.store'

Vue.use(Vuex);

//to handle state
const state = {
    dialog: false,
    dialog2: false,
    dialogError:false,
    alert: false,
    edit: false,
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  cancelar({ commit }){
      commit('SET_DIALOG')
      state.productoEdit = {}
      state.edit = false
  },

}

//to handle mutations
const mutations = {
    SET_DIALOG(state) {
        state.dialog = !state.dialog
    },
    SET_IDH(state, codigo){
        state.productoEdit.socie = codigo
    },
    SET_IDP(state, proveedor){
        state.productoEdit.proveedor_id = proveedor.id
        state.productoEdit.proveedor = proveedor
    },
    SET_DIALOG_ERROR() {
        console.log("MUTATIOOONNN")
        state.dialogError = true
    },
	SET_EDIT(state, value) {
		state.edit = value
		console.log("EDIT", state.edit)
	},
	SET_ALERT(state) {
		state.alert = true
	}
}

//export store module
export default new Vuex.Store ({
	state,
	getters,
	actions,
	mutations,
	modules: {
		socies,
        productos,
        ventas,
        egresos
	}
})
/** we have just created a boiler plate for our vuex store module**/
