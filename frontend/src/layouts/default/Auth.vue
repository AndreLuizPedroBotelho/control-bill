<template>
  <v-app>
    <Alert />

    <app-bar />
    <v-layout>
      <v-navigation-drawer v-model="drawer" elevation="4" :rail="rail" @click="rail = false"
        class="bg-blue-grey-darken-1">
        <v-list-item title=" Control Bill" nav>
          <template v-slot:prepend>
            <v-menu rounded>
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" class="mr-2">
                  <v-avatar size="large">
                    <v-img alt="Avatar" src="https://randomuser.me/api/portraits/lego/7.jpg" />
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <div class="mx-auto text-center">
                    <v-avatar>
                      <v-img alt="Avatar" src="https://randomuser.me/api/portraits/lego/7.jpg" />
                    </v-avatar>
                    <h3>{{ user?.name }}</h3>
                    <p class="text-caption mt-1">
                      {{ user?.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" @click="router.push('user')">
                      <v-icon>mdi-account</v-icon> Edit Account
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" @click="logout()">
                      <v-icon>mdi-logout</v-icon> Logout
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-menu>

          </template>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider class="mt-4"></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" to="/" />
          <v-list-item prepend-icon="mdi-credit-card-settings-outline" title="Type of Payment" to="typePayment" />
          <v-list-item prepend-icon="mdi-cash-clock" title="Bill" to="bill" />
          <v-list-item prepend-icon="mdi-cash" title="Payment" to="payment" />

        </v-list>

      </v-navigation-drawer>

      <v-main class="bg-blue-grey-darken-1">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
@media (max-width:550px) {
  .logout {
    font-size: 0px !important;
  }
}
</style>

<script lang="ts" setup >
import { ref } from 'vue'
import { useLoginStore } from '../../store/login';
import { useRouter } from 'vue-router';
import Alert from '@/components/Alert.vue';

const drawer = ref(true)
const rail = ref(false)
const store = useLoginStore();
const router = useRouter()
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};

function logout() {
  store.logout()

  router.push('/login')

}

</script>
