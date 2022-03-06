<template>
   <v-card> 
    <v-card-title>
        <h1>Ventas</h1>
    </v-card-title>
    <v-data-table
    :headers="headers"
    :items="ventas"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
   </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            headers:[
                { text: 'ID', value:'id' },
                { text: 'socie', value:'socie'}, 
                { text: 'Forma de pago', value:'forma_de_pago'},
                { text: 'Monto', value:'monto_total' }, 

            ],  

        }
    },
    computed: {
        ...mapGetters('ventas', [
            'ventas'
        ])
    },
    mounted() {
        this.$store.dispatch('ventas/getVentas');

    }
}
</script>
