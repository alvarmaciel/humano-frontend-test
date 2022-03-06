<template>
        <v-container
            style="padding:30px"
        >
            <v-row>
                <h1>Socie</h1>
            </v-row>
            <v-form v-model="isValid" ref='form'>
                <v-row>
                    <v-col
                        cols="4"
                    >
                    <v-text-field
                       type="number"
                       placeholder="Código"
                       label="Código"
                       v-model="socieEdit.codigo"
                       :rules="codigoRules"
                    >
                    </v-text-field>
                    </v-col>
                    <v-col
                        cols="4"
                    >
                    <v-text-field
                       type="number"
                       placeholder="DNI"
                       label="DNI"
                       v-model="socieEdit.dni"
                       :rules="dniRules"
                    >
                    </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <v-text-field
                        placeholder="Nombre"
                        label="Nombre"
                        v-model="socieEdit.nombre"
                        :rules="nombreRules"
                    >
                    </v-text-field>
                    </v-col>
                    <v-col>
                    <v-text-field
                        placeholder="Apellido" 
                        label="Apellido"
                        v-model="socieEdit.apellido"
                        :rules="apellidoRules"
                    >
                    </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <v-text-field
                        placeholder="Emprendimiento"
                        label="Emprendimiento"
                        v-model="socieEdit.emprendimiento"
                    >
                    </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <v-textarea
                        label="descripcion"
                        placeholder="descripcion"
                        v-model="socieEdit.descripcion"

                    >
                    </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <v-text-field
                        label="Domicilio"
                        placeholder="Domicilio"
                        v-model="socieEdit.domicilio"
                        :rules="domicilioRules"
                    >
                    </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            type="number"
                            label="Teléfono"
                            placeholder="Teléfono"
                            v-model="socieEdit.telefono"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            type="number"
                            label="Código Postal"
                            placeholder="Código Postal"
                            v-model="socieEdit.codigo_postal"
                            :rules="cpRules"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            label="Email"
                            placeholder="Email"
                            v-model="socieEdit.email"
                            :rules="emailRules"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-checkbox
                          v-model="socieEdit.activo"
                          label="Activo"
                          :disabled="disabledA"
                        ></v-checkbox>
                    </v-col>
                    <v-col>
                        <v-checkbox
                          v-model="socieEdit.proveedor"
                          label="Provedore"
                          :disabled="disabledP"
                        ></v-checkbox>
                    </v-col>
                    <v-col>
                        <v-checkbox
                          v-model="socieEdit.adherente"
                          label="Adherente"
                          :disabled="disabledAd"
                        ></v-checkbox>
                    </v-col>
                </v-row>
                <v-row
                    v-show="socieEdit.fecha_de_ingreso"
                >
                    <v-col>
                        <v-text-field
                             v-model="socieEdit.fecha_de_ingreso"
                             label="Fecha de Ingreso"
                             prepend-icon="mdi-calendar"
                             disabled
                         ></v-text-field>
                    </v-col>
                     <v-col>
                        <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                         <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="socieEdit.fecha_de_egreso"
                                    label="Fecha de Egreso"
                                    prepend-icon="mdi-calendar"
                                    read-only
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="socieEdit.fecha_de_egreso"
                                @input="menu1 = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
               </v-row>
                <v-row
                    v-show="socieEdit.fecha_de_ingreso"
                >
                    <v-col>
                        <v-select
                            v-model="socieEdit.modo_de_egreso"
                            :items="modos_egreso"
                            hint="Modo de Egreso"
                            persistent-hint
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row
                   style="margin-top:60px;"
                >
                    <v-col
                        offset="4"
                    >
                    <v-btn
                        @click="cancelar"
                        color="error"
                    >Cancelar</v-btn>
                    </v-col>
                    <v-col>
                    <v-btn
                        @click.prevent="updateSocie(socieEdit)"
                        v-show="this.$store.state.edit"
                        color="success"
                    >Editar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click.prevent="addSocie(socieEdit)"
                        v-show="!this.$store.state.edit"
                        :disabled="!isValid"
                        color="success"
                    >Añadir</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
</template>
<script>
import { 
  mapActions, 
  mapGetters  
} from 'vuex'

export default {
    data() {
        return {
            isValid:false,
            emailRules:[
              v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'mmmm... eso no parece un email!!',
              v => !!v || 'Escribí el email'

            ],
            codigoRules:[
             // v => !!v || 'Escribí el código del socie',
            ],
            dniRules:[
              v => !!v || 'Escribí el DNI'                 
            ],
            nombreRules:[
              v => !!v || 'Escribí el Nombre del socie'
            ],
            apellidoRules:[
              v => !!v || 'Escribí el Apellido del socie'
            ],
            domicilioRules:[
              v => !!v || 'Escribí el Domicilio del socie'
            ],
            cpRules:[
              v => !!v || 'Escribí el Código Postal del socie'
            ],
            tiendasRules:[
              v => !!v || 'Seleccioná una o varias tiendas '
            ],
           disabledA:false,
           disabledP:false,
           disabledAd: false,
           date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu1: false,
            modal: false,
            modos_egreso: ["Renuncia","Expulsión","Exclusión"]
        } 
    },
    methods: {
        ...mapActions('socies', [
            'cancelar',
            'addSocie',
            'updateSocie'
        ])        
    },
    computed: {
      ...mapGetters('socies', [
        'socieEdit',
        'tiendas'
      ]),
    },
    updated() {
        if (this.socieEdit.activo){
           this.disabledP = true
           this.disabledAd = true
        } else {
           this.disabledP = false
           this.disabledAd = false

        }
        if (this.socieEdit.adherente){
           this.disabledA = true
        } else {
            this.disabledA = false
        }
    }

}
</script>
