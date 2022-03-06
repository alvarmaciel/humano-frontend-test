<template>
   <v-card> 
    <v-card-title>
        <h1>Egresos</h1>
    </v-card-title>
    <v-data-table
    :headers="headers"
    :items="egresos"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
   </v-card>
</template>
<script>
import { 
  mapGetters  
} from 'vuex'

export default {
    data () {
        return {
            headers:[
                { text: 'ID', value:'id' },
                { text: 'Tipo de Salida', value:'salida'}, 
                { text: 'Monto', value:'monto' }, 

            ],  

        }
    },
    computed: {
        ...mapGetters('egresos',[
            'egresos'  
        ])
    },
    mounted() {
        this.$store.dispatch('egresos/getEgresos');

    }
}
</script>
