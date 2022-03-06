<template>
  <v-card>
    <v-card-title>
     Socies 
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        placeholder="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="socies"
      :search="search"    
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-dialog
          v-model="$store.state.dialog"
          max-width="500px"
          transition="dialog-bottom-transition"
          persistent
        >  
        <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#c66d6c"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click.prevent=""
            >
             Nuevo Socie 
            </v-btn>
          </template> 
          <v-card>
            <Socie :key="codigoKey"></Socie> 
          </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogDelete"
            width="500"
            >
            <v-card>
                <v-card-title class="text-h5 lighten-2">
                    ¡Atención!
                </v-card-title>
            <v-card-text>
                ¿Estás segure de borrar este humane? 
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialogDelete = !dialogDelete"
                    >
                    Cancelar
                </v-btn>

                    <v-btn
                        color="primary"
                        text
                        @click="deleteItem(item), dialogDelete = !dialogDelete"
                        >
                        Sí 
                    </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog> 

      </v-toolbar>
    </template> 
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editSocie(item)"
      >
        mdi-pencil
      </v-icon>
<!--          <v-icon
              small
              @click="deleteDialog(item)"
              >
              mdi-delete
          </v-icon>
-->
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
      >
        Reset
      </v-btn>
    </template>
    </v-data-table>
  </v-card>

</template>


<script>
import Socie from "../components/Socie.vue"
import { 
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: "ListaSocies",
  data() {
    return {
     search:'',
     headers:[
         { text: 'Nombre', value:'nombre' },
         { text: 'Apellido', value:'apellido'}, 
         { text: 'Código', value:'codigo'},
         { text: 'Descripción', value:'descripcion' }, 
         { text: 'Actions', value: 'actions', sortable: false }
 
     ],  
     item: [],
     codigoKey: '',
     dialogDelete: false
     };
  },
  components: {
     Socie 
  },
  mounted() {
    this.$store.dispatch('socies/getSocies');
  },
  methods: {
    ...mapActions({
        editSocie: 'socies/editSocie',
        deletItem: 'deleteItem',
        getSocies: 'socies/getSocies',
        getTipos: 'getTipos'
    }),
    deleteDialog(item) {
        console.log('item', item.id)
        this.item = item
        this.dialogDelete = true
    }
  },
  computed: {
    ...mapGetters('socies', [
        'socies'
    ])
  }
};
</script>

<style scoped lang="scss"></style>

