<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Web store
        </q-toolbar-title>

        <!--        auth form-->

        <div class="q-pa-md q-gutter-sm">
          <q-btn  align="right" label="Войти" color="primary" @click="layout = true" />

          <q-dialog v-model="layout">
            <q-layout view="Lhh lpR fff" container class="bg-white">
              <q-header class="bg-primary">
                <q-toolbar>
                  <q-toolbar-title>Web store</q-toolbar-title>
                  <q-btn flat v-close-popup round dense icon="close" />
                </q-toolbar>
              </q-header>

              <q-footer class="bg-black text-white">
                <q-toolbar inset>
                  <q-toolbar-title>Web store</q-toolbar-title>
                </q-toolbar>
              </q-footer>

              <q-page-container>
                    <div class="q-pa-md" style="max-width: 400px">

                      <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                      >
                        <q-input
                          filled
                          v-model.trim="username"
                          label="логин *"
                          hint="Логин"
                          lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
                        />

                        <q-input
                          filled
                          v-model.trim="password"
                          label="пароль *"
                          hint="Пароль"
                          lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
                        />

<!--                        <q-toggle v-model="accept" label="I accept the license and terms" />-->

                        <div>
                          <q-btn @click.prevent="onSubmit" label="Отправить" type="submit" color="primary"/>
                          <q-btn label="Сброс" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                      </q-form>

                    </div>

              </q-page-container>
            </q-layout>
          </q-dialog>
        </div>

        <!--        auth form-->
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
                    <q-tabs
                      v-model="tab"
                      vertical
                      class="text-teal"
                    >
                      <router-link :to="{ name: 'PRODUCTS_LIST'}">
                        <q-tab name="products" icon="table_view" label="Товары" />
                      </router-link>
                      <router-link :to="{ name: 'ORDERS_LIST'}">
                        <q-tab name="orders" icon="feed" label="Заказы" />
                      </router-link>
                      <router-link :to="{ name: 'CART'}">
                        <q-tab name="cart" icon="shopping_cart" label="Корзина" />
                      </router-link>
                    </q-tabs>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Web store
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  Store,
  data () {
    return {
      layout: false,
      left: true,
      username: null,
      password: null,

      accept: false,
      tab: 'mails',
      splitterModel: 20
    }
  },

  // computed: {
  //   isAuth() {
  //     return this.$store.state.a.isAuth;
  //   },
  computed: mapState([
    // проксирует в this.isAuth доступ к store.state.isAuth
    'isAuth'
    // isAuth: state => state.isAuth

  ]),

  methods: {
    ...mapMutations([
      'auth', // `this.auth()` будет вызывать `this.$store.commit('auth')`

    ]),
    onSubmit () {
//          отправка пост запроса с данными username и password из формы
      this.$axios.post('/api/v1/users/auth/login/', {
        'username': this.username,
        'password': this.password,
      }).then ((response) => {
        console.log(response)
//              сохранение в переменной токена авторизации полученного из response data
        const token = response.data.token
//              добавление токена авторизации в localStorage с ключом AUTH_TOKEN
        localStorage.setItem('AUTH_TOKEN', token)
        this.auth()
        this.layout = false


      }).catch(function(error) {
        console.log(error)
        alert(error)
      })
      // if (this.accept !== true) {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'warning',
      //     message: 'You need to accept the license and terms first'
      //   })
      // }
      // else {
      //   this.$q.notify({
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'cloud_done',
      //     message: 'Submitted'
      //   })
      // }
    },

    onReset () {
      this.username = null
      this.password = null
      // this.accept = false
    },

  }



}
</script>
