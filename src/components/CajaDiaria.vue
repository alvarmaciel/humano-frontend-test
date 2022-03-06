<template>
  <v-container>
    <v-row>
      <v-col
          cols="8"    
          >
          <v-row>
            <div class="text-h5 mt-10">Añadir Productos</div>
          </v-row>
          <v-form
                 v-model="valid"
                 ref="form"    
                 >
                 <v-row>
                   <v-col
                       style="line-height:3.5em;"
                       >
                       <vue-single-select
                           :options="productos"
                           option-label="nombre" 
                           option-key="codigo"
                           value="id"
                           placeholder="Productos"
                           v-model="producto"
                           :rules="productoRules"
                           :classes = "{
                                       input:'select-input',
                                       dropdown:'dropdown',
                                       icons:'icons',
                                       wrapper:'single-select-wrapper',
                                       activeClass: 'active',
                                       required: 'required',
                                       }"

                           ></vue-single-select>
                   </v-col>
                     <v-col cols="3">
                       <v-text-field
                           :value="producto.precio"
                           type="number"
                           hint="Precio"
                           persistent-hint
                           disabled
                           ></v-text-field>
                     </v-col>
            <v-col cols="3">
              <v-text-field
                  type="number"
                  hint="cantidad"
                  persistent-hint
                  v-model.number="cantidad"
                  ></v-text-field>
            </v-col>
            <v-col>
                <v-checkbox
                    label="Es devolución"
                    v-model="devolucion"
                >
                </v-checkbox>
              </v-col>
                 </v-row>
          </v-form>
          <v-row>
            <v-col
                offset-md="10"    
                >
                <v-btn 
                color="#C66D6C"
                class="mb-2"
                dark
                @click="addProducto()"
                fab
                >
                <v-icon>
                  mdi-plus
                </v-icon>
                </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <div class="text-h5">Información de Venta</div>
          </v-row>
          <v-form
            ref="form2"
            v-model="valid2"
          >
          <v-row>
                <v-col>
                    <v-text-field
                        hint="Cajere"
                        persistent-hint
                        v-model="cajere"
                    ></v-text-field>
                </v-col>

              <v-col>
                <v-autocomplete
                    :items="socies"
                    item-text="dni"
                    item-value="id"
                    hint="Socie - búsqueda por DNI"
                    persistent-hint
                    v-model="socie"
                    @change="getSocieById"
                    :rules="socieRules"
                    >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.nombre }} {{ data.item.apellido }}
                  </template>
                <template slot="item" slot-scope="data">
                     <strong>{{ data.item.nombre }} {{ data.item.apellido }}</strong> - DNI {{ data.item.dni }}
                </template>
               </v-autocomplete>
              </v-col>
              <v-col
                  cols="1"
                  >
                  <v-dialog
                      v-model="$store.state.dialog"
                      max-width="500px"
                      transition="dialog-bottom-transition"
                      persistent
                      >  
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="blue-grey"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click.prevent=""
                            x-small
                            fab
                            >
                            <v-icon>mdi-plus</v-icon> 
                        </v-btn>
                      </template> 
                <v-card>
                  <Socie></Socie> 
                </v-card>
                  </v-dialog>

              </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  :items="mediosDePago"
                  hint="Medio de Pago" 
                  persistent-hint
                  v-model="medioDePago"
                  ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                  type="number"
                  hint="Bonificación"
                  persistent-hint
                  v-model="bonificacion"
                  ></v-text-field>
            </v-col>
             <v-col>
              <v-text-field
                  type="number"
                  hint="Recargo"
                  persistent-hint
                  v-model="recargo"
                  ></v-text-field>
            </v-col>
         </v-row>
         </v-form>
          <v-row>
            <v-col
                offset-md="8"
                >
                <v-dialog 
                v-model="dialog"
                max-width="60%"
                persistent
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                          color="success"
                          @click="preVenta()"
                          class="mb-30"
                          v-bind="attrs"
                          v-on="on"
                          :disabled="!valid2"
                          >Finalizar Venta</v-btn>
                </template>
                  <v-card>
                    <v-card-title>Finalizar Venta</v-card-title>
                    <v-card-text>
                      <div>
                       <p><strong>Humano Mutual</strong></p>
                       <p><strong>Ruta 14 - San Javier</strong></p>
                       <p><strong>03544-568024</strong></p>
                       <p><strong>humanosanjavier@gmail.com</strong></p>
                       <p><strong>Fecha:</strong> {{ venta.creado_el }}</p>
                       <p><strong>N° Ticket:</strong> 001-0000</p>
                       <p><strong>Socie: </strong> {{ socie.nombre }} - DNI {{ socie.dni }}</p>
                        <p><strong>Forma de Pago:</strong> {{ venta.forma_de_pago }}</p>
                       <p><strong>Productos</strong></p>
                        <v-list>
                          <v-list-item :key="item.id" v-for="item in items"> - {{ item.producto.nombre }}</v-list-item >
                        </v-list>
                       <p v-if="venta.recargo"><strong>Recargo:</strong> {{ venta.recargo }}%</p>
                       <p v-if="venta.bonificacion"><strong>Descuento:</strong> {{ venta.bonificacion }}%</p>
                        <h2>Total:{{ venta.monto_total }}</h2>
                      </div>   
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                          color="success"
                          @click="addVenta(venta), closeModal()"
                          >Aceptar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-col>
          </v-row>
      </v-col>
      <v-col
          cols="4"
          >
          <v-row>
            <v-col
                cols="10"
                offset="4"
                >
                <v-card>
                  <v-card-text>
                    <div class="text-h6">Monto Total</div>
                    <div class="text-h4">${{ montoTotal }}</div>

                  </v-card-text>
                </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="12"
                offset="2" 
                >
                <v-data-table 
                v-show="items != ''"
                dense
                :headers="headers"
                :items="items"
                item-key="name"
                class="elevation-1"
                v-model="selected"
                hide-default-footer
                >
                <template v-slot:item.action="{ item }">
                  <v-icon
                      small
                      @click="deleteItem(item)"
                      >
                      mdi-delete
                  </v-icon>
                </template>
                </v-data-table>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { 
    mapActions,
    mapGetters
 } from 'vuex'
import Socie from '../components/Socie.vue'
import VueSingleSelect from 'vue-single-select'

export default {
    data: () => ({
        valid: false,
        valid2:true,
        dialog: false,
        medioDePago: 'Efectivo',
        producto:[],
        productoRules: [
            v => !!v || 'Elegí un producto'
        ],
        socieRules: [
            v => Boolean(Object.keys(v || {})[0]) || 'Elegí o creá un socie'
        ],
        mediosDePago: ['Efectivo', 'Moneda Par', 'Tarjeta', 'Débito', 'Transferencia', 'Humane'],
        cantidad: '1',
        devolucion: false, 
        bonificacion: '0',
        recargo:'0',
        items: [],
        item: [],
        itemsVenta: [],
        itemVenta: [],
        selected: [],
        venta: [],
        monto: '',
        cajere: 'admin',
        montoTotal: '',
        headers: [
            { text: 'Producto' , value: 'producto.nombre' },
            { text: 'Precio', value: 'producto.precio' },
            { text: 'Cant.' , value: 'cantidad' },
            { text: 'Acciones', value: 'action' }

        ],
    }),
    components: {
        Socie,
        VueSingleSelect
    },
    methods: {
        ...mapActions('socies', [
          'getSocieById'
        ]),
        ...mapActions('ventas', [
            'addVenta'
        ]),
        addProducto () {
          if (this.$refs.form.validate() && this.producto != ''){
            this.valid = !this.valid
            this.item = {
              producto: this.producto,
              cantidad: this.cantidad
            }
            this.items.push(this.item)
            this.itemVenta = {
              producto: this.producto.id,
              cantidad: this.cantidad,
              devolucion: this.devolucion,
              parcial: this.cantidad * this.producto.precio
            }
            console.log("ITEMVENTA", this.itemVenta)
            this.itemsVenta.push(this.itemVenta)
            this.monto = +this.monto + +this.producto.precio * +this.cantidad
            this.producto = '',
              this.cantidad =  '1'
          }    
        },
        deleteItem (item) {
            console.log('!!!!!!', this.selected)
            const index = this.items.indexOf(item)
            this.items.splice(index, 1)
            this.monto = +this.monto - +item.producto.precio * +item.cantidad
        },
        preVenta () {
            this.venta = {
                cajere: this.cajere,
                socie: this.socie,
                creado_el:  new Date(),
                tipo_de_venta:  this.tipoVenta,
                itemsVenta: this.itemsVenta,
                forma_de_pago: this.medioDePago,
                bonificacion:  this.bonificacion,
                recargo: this.recargo,
                monto_total: this.montoTotal
            }
            this.medioDePago = 'Efectivo'
            this.itemsVenta = []
        },
        closeModal () {
            this.dialog = false,
            this.items = [],
            this.bonificacion = '0',
            this.montoTotal = '',
            this.monto = '',
            this.socie = ''
        },
      filterObject(item, queryText) {
        return (
          String(item.id).indexOf(String(queryText)) >
          -1 ||
          item.nombre.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
        );
      }
    },
    updated () {
      let desc = (Number(this.bonificacion) / 100).toFixed(2)
      let rec = (Number(this.recargo) / 100).toFixed(2)
      this.montoTotal = this.monto - this.monto * desc + this.monto * rec
      console.log("SOCIE", this.socie)
        if(this.medioDePago === 'Tarjeta') {
            this.recargo = '15'
        } else {
            this.recargo = '0'
        }
    },
    mounted() {
     this.$store.dispatch('socies/getSocies')   
     this.$store.dispatch('productos/getProductos')   
    },
    computed: {
        ...mapGetters('productos',[
            'productos'
        ]),
        ...mapGetters('socies', [
            'socies'
        ]),
        socie: {
            get() {
                return this.$store.state.socies.socie
            },
            set(newVal){
                this.$store.state.socies.socie = newVal
            }
        }
    }
}
</script>

