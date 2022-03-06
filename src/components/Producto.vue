<template>
  <v-form class="producto">
    <v-container>
      <div class="row">	
        <h1>Producto</h1>
      </div>
      <v-row>
        <v-col cols="12">	
          <v-form v-model="isValid" ref="form">
           <v-row>
              <v-autocomplete
                  :items="socies"
                  item-value="id"
                  item-text="codigo"
                  placeholder="Socie"
                  v-model="productoEdit.socie"
                  :disabled="this.$store.state.edit"
                  @change="getSocieById"
                  hint="Búsqueda por código de humane"
                  persistent-hint
                  >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.codigo }} <span v-show="data.item.codigo"> - </span> {{ data.item.nombre }}
                  </template>
                <template slot="item" slot-scope="data">
                  {{ data.item.codigo }} <span v-show="data.item.codigo"> - </span> {{ data.item.nombre }}
                </template>
              </v-autocomplete>
            </v-row>
            <v-row> 
              <v-text-field
                  :prefix="socie.codigo"
                  label="Código"
                  type="number"
                  :rules="codigoRules"
                  required
                  v-model="productoEdit.codigo"
                  v-show="!this.$store.state.edit"
                  ></v-text-field>
              <v-text-field
                v-model="productoEdit.codigo"
                v-show="this.$store.state.edit"
                disabled
              >
              </v-text-field>
            </v-row>
            <v-row>	 	
              <v-text-field
                  label="Nombre"
                  :rules="nombreRules"
                  required
                  v-model="productoEdit.nombre"
                  ></v-text-field>
            </v-row>

            <v-row>
              <v-select
                  :items="unidades"
                  label="Unidades"
                  item-text="unidad"
                  item-value="id"
                  hint="Unidades"
                  v-model="productoEdit.unidad"
                  persistent-hint
                  ></v-select>
            </v-row>
            <v-row>
              <v-textarea
                  label="Descripción"
                  required
                  :rules="descripcionRules"
                  v-model="productoEdit.descripcion"
                  ></v-textarea>
            </v-row>
            <v-row>	 	
              <v-text-field
                  label="Precio"
                  :rules="precioRules"
                  type="number"
                  required
                  v-model="productoEdit.precio"
                  prefix="$"
                  ></v-text-field>
            </v-row>

            <v-row>
              <v-select
                  :items="tipos"
                  hint="tipo"
                  item-text="name"
                  chips
                  multiple
                  attach
                  persistent-hint
                  v-model="productoEdit.tipo"
                  >  
              </v-select>
            </v-row>
            <v-row>
             <v-col
                  offset="4"
             >
              <v-btn
                  @click.prevent="cancelar()"
                  color="error"
                  >Cancelar</v-btn>
            </v-col>
           <v-col>
              <v-btn
                  @click.prevent="addProducto(productoEdit)"
                  :disabled="!isValid"
                  v-show="!this.$store.state.edit"
                  color="success"
                  >Añadir</v-btn>
              <v-btn
                  @click.prevent="updateProducto(productoEdit)"
                  :disabled="!isValid"
                  v-show="this.$store.state.edit"
                  color="success"
                  >Editar</v-btn>
            </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row> 
    </v-container>
  </v-form>
</template>
<script>
import { 
    mapActions,
    mapGetters 
} from 'vuex'


export default {

	data() {
		return {
			valid: false,
			codigoRules: [
				v => !!v || 'Escribí el Código del producto',
                v => (v && v.length <= 3) || 'Maximo 3 caracteres'
			],
            nombreRules: [
				v => !!v || 'Escribí el Nombre del producto',
			],
            descripcionRules: [
				v => !!v || 'Escribí la Descripción del producto',
			],
            precioRules: [
				v => !!v || 'Escribí el Precio del producto',
                v => (v && v.length <= 7) || 'Maximo 7 caracteres'
			],
            tipoRules: [
				v => !!v || 'Elegí uno o varios Tipo de Producto',
			],
			isSubmitted: false,
            isValid: true,
            radios: null

		}
	},
  methods: {
    ...mapActions('productos', [
      'cancelar',
      'addProducto',
      'updateProducto',
      'getSocieById'
    ]),
  },
    computed: {
        ...mapGetters('productos', [
            'productoEdit',
            'tipos',
            'unidades',
            'socie'
        ]),
        ...mapGetters('socies', [
            'socies'
        ])
    },
    mounted() {
        this.$store.dispatch('socies/getSocies')
        this.$store.dispatch('productos/getUnidades')
    },
}
</script>
<style>
.producto{
	padding:30px;
}
.select-input {
	display: block;
	width: 100%;
	padding:8px 0 8px;
	margin-bottom:1em;
	font-size: 16px;
	line-height: 1.5;
	color: rgba(0,0,0,0.6);
	background-color: #fff;
	background-clip: padding-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.38);
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	box-sizing: border-box;
}
.select-input::placeholder {
	opacity:1;
	border-color:red;
}
.select-input:hover {
	border-color:rgba(0, 0, 0, 0.87);
}
.select-input:focus {
	outline:none;
}
.icons {
padding: 0 .5em !important;

}
</style>
