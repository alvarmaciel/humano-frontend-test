<template>
    <v-container>
        <v-row>
        <v-col>    
        <v-row>    
            <div class="text-h5 mt-10">Egresos y Notas de Crédito</div>
        </v-row>
        <v-row>
        <v-form 
            ref="form"
            v-model="valid"
        >
                <div class="mt-10">Seleccioná el tipo de Egreso</div>
                <v-tabs
                    @change="resetTabs()"
                >
                    <v-tab
                        v-for="tab of tabs"
                        :key="tab.nombre"
                        @change="tipoSalida(tab.name)"
                        >{{ tab.name }}</v-tab>
                
                    <v-tab-item>
                        <vue-single-select
                            :options="sociesH"
                            option-label="nombre"
                            option-key="id"
                            placeholder="Seleccioná un humane"
                            v-model="nota.humane"
                            :classes = "{
                                input:'select-input',
                                dropdown:'dropdown',
                                icons:'icons',
                                wrapper:'single-select-wrapper',
                                activeClass: 'active',
                                required: 'required',
                            }"
                        ></vue-single-select>
                    </v-tab-item>
                    <v-tab-item>
                        <vue-single-select
                            :options="sociesP"
                            option-label="nombre"
                            option-key="id"
                            placeholder="Seleccioná un proveedore"
                            value="id"
                            v-model="nota.humane"
                            :classes = "{
                                input:'select-input',
                                dropdown:'dropdown',
                                icons:'icons',
                                wrapper:'single-select-wrapper',
                                activeClass: 'active',
                                required: 'required',
                            }"
                        ></vue-single-select>
                        <v-text-field
                            label="Remito Número"
                            type="number"
                            v-model="nota.remito_nro"
                        ></v-text-field>
                    </v-tab-item>
                    <v-tab-item>
                       <v-text-field
                            label="Tipo de Egreso"
                       ></v-text-field>
                    </v-tab-item>
                    <v-tab-item>
                       <v-text-field
                            label="Cajere"
                       ></v-text-field>
                    </v-tab-item>
                </v-tabs>
                <v-row>
                    <v-col>
                       <v-text-field
                            type="number"
                            label="Monto"
                            :rules="montoRules"
                            v-model="nota.monto"
                            prefix="$"
                       ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        offset="7"
                    >
                        <v-btn
                            cols="1"
                            depressed
                            color="error"
                            right
                            style="margin-right:10px;"
                            @click="reset()"
                        >Cancelar</v-btn>
                        <v-dialog
                            v-model="dialog"
                            width="500"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    cols="1"
                                    depressed
                                    color="success"
                                    right
                                    @click="preNota"
                                    :disabled="!valid"
                                     v-bind="attrs"
                                     v-on="on"
                                    >Aceptar</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>  
                                    Confirmá el Egreso 
                                </v-card-title>
                                <v-card-text>
                                    <p><strong>Tipo de Salida: </strong>{{ nota.salida }}</p>
                                    <p v-if="this.nota.humane"><strong>Humane: </strong>{{ nota.humane.codigo }} - {{ nota.humane.nombre }} {{ nota.humane.apellido }}</p>
                                    <p v-if="this.nota.proveedor"><strong>Proveedore: </strong>{{ nota.proveedor.codigo }} - {{ nota.proveedor.nombre }}</p>
                                    <p v-if="this.nota.remito_nro"><strong>Remito Nro.: </strong>{{ nota.remito_nro }}</p>
                                    <p><strong>Monto: </strong>${{ nota.monto }}</p>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-row>
                                    <v-col offset="4">
                                    <v-btn
                                        color="error"
                                        text
                                        @click="close(),resetTabs(),reset()"
                                        >
                                        Cancelar
                                    </v-btn>
                                    <v-btn
                                        color="success"
                                        text
                                        @click="addNota(nota), resetTabs(), reset(), close()"
                                        right
                                        >
                                        Confirmar 
                                    </v-btn>
                                    </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
        </v-form>
        </v-row>
        </v-col>
        </v-row>
        <v-row><v-col offset="5"><span style="color:red;font-size:.7em;" v-show="salida === 'Diferencia de caja' || salida === 'Gasto Diario'">Opción de Egreso no disponible</span></v-col></v-row>
    </v-container>
</template>
<script>
import VueSingleSelect from 'vue-single-select'
import { 
    mapActions,
    mapGetters
 } from 'vuex'

export default {
    data: () => ({
        dialog:false,
        valid: true,
        montoRules: [
            v => !!v || 'Escribí el monto',
            v => v && v.length < 8 || 'Solo 8 digitos'
        ],
        nota: {
            humane: null,
        },
        salida: "Humane",
        tabs: [
            { name: "Humane" },            
            { name: "Pago Proveedores"},
            { name: "Gasto Diario" },            
            { name: "Diferencia de caja" },            
        ],
    }),
    mounted() {
      this.$store.dispatch('socies/getSocies')   
    },
    components: {
        VueSingleSelect
    },
    computed: {
        ...mapGetters('socies', [
            'socies',
            'sociesH',
            'sociesP'
        ])
    },
    methods: {
        reset(){ 
          this.$refs.form.reset()
          this.nota.humane = null  
          this.nota.proveedor = null 
          this.salida = null  
        },
        resetTabs() {
            this.nota = {} 
        },
        tipoSalida(name) {
            this.salida  = name,
            console.log("Tipo de Salida", this.salida)
        },
        ...mapActions('egresos', [
            'addNota',
        ]),

        preNota() {
          if (!this.nota.humane) {
                this.nota.humane = '' 
          }
            if (!this.nota.proveedor) {
                this.nota.proveedor = ''
            }  
          this.nota.salida = this.salida
          console.log("preNota",this.nota)
        },
        close() {
           this.dialog = false
        }
    },
    updated() {
        console.log("Salida", this.salida)
        if (this.salida === "Gasto Diario" || this.salida === "Diferencia de caja") {
            this.valid = false
        }
    }
}
</script>
<style>
.v-window {
    overflow: visible !important;
}
.v-tabs {
    margin-top:20px;
}
.v-window__container {
    padding:1.5em 0;
}
</style>
