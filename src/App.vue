<template>
  <v-app>
    <v-app-bar app color="#c4996c" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <p style="margin:1em;color:red;"><strong>Atencion: Esta es una versión de pruebas con la funcionalidad mínima acordada con el equipo. La información cargada será eliminada.</strong></p>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="180"
        />
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Humano </v-list-item-title>
          <v-list-item-subtitle>
            Artesanía - Arte - Diseño
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>
                <router-link to="/">Home</router-link>
            </v-list-item-title>
          </v-list-item>
        <v-list-item>
            <v-list-item-title>
                <router-link to="/CajaDiaria">Registrar Venta</router-link>
            </v-list-item-title>
        </v-list-item>
         <v-list-item>
            <v-list-item-title>
                <router-link to="/Egresos">Registrar Egreso</router-link>
            </v-list-item-title>
        </v-list-item>
       <v-list-item>
        <v-list-item-title>
                <router-link to="/ListaVentas">Ventas</router-link>
            </v-list-item-title>
        </v-list-item>
        <v-list-item>
         <v-list-item-title>
                <router-link to="/ListaEgresos">Egresos</router-link>
            </v-list-item-title>
        </v-list-item>

         <v-list-item>
            <v-list-item-title>
                <router-link to="/ListaProductos">Productos</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
                <router-link to="/ListaSocies">Socies</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
     <v-progress-linear
        indeterminate
        color="green"
        stripped
        v-show="$store.state.progress"
     ></v-progress-linear>
      <v-alert type="success" :value="$store.state.alert" transition="slide-y-transition" icon="mdi-cannabis">
         Registro Guardado
     </v-alert>
       <router-view></router-view>
        <v-dialog
            v-model="$store.state.dialogError"
            width="500"
            >
            <v-card>
                <v-card-title class="text-h5">
                    <v-icon
                        color="error"
                        large
                    >mdi-cannabis-off </v-icon>
                    Uhhh!
                </v-card-title>
            <v-card-text class="subtitle-1">
                Algo Salió mal.... Por favor intentá nuevamente!
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="$store.state.dialogError = !$store.state.dialogError"
                    >
                    Cerrar
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    updated() {
        if(this.$store.state.alert) {
            window.setInterval(() => {
                this.$store.state.alert = false
            },3000)
        }
    }
};
</script>
