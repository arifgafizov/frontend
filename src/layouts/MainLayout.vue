<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Web store
        </q-toolbar-title>

        <!--        auth form-->

        <div class="q-pa-md q-gutter-sm">
          <template v-if="isAuth" >
            <q-btn push color="white" text-color="primary" :label="username"/>
            <q-btn label="Выйти" color="primary" @click="logout"/>
          </template>
          <q-btn v-else align="right" label="Войти" color="primary" @click="layout = true"/>


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
        <router-link v-if="!isAuth" :to="{ name: 'PRODUCTS_LIST'}">
          <q-tab name="products" icon="table_view" label="Товары"/>
        </router-link>

        <template v-else>
          <router-link :to="{ name: 'PRODUCTS_LIST'}">
            <q-tab name="products" icon="table_view" label="Товары"/>
          </router-link>
          <router-link :to="{ name: 'ORDERS_LIST'}">
            <q-tab name="orders" icon="feed" label="Заказы"/>
          </router-link>
          <router-link :to="{ name: 'CART'}">
            <q-tab name="cart" icon="shopping_cart" label="Корзина"/>
          </router-link>
        </template>

      </q-tabs>

    </q-drawer>

    <q-page-container>
      <router-view/>
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

    <q-dialog v-model="layout">
      <div>
        <q-splitter
          v-model="splitterModel"
          style="height: 500px"
        >
      <q-card style="width: 700px; max-width: 80vw;">

        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Log in" />
          <q-tab name="signUp" label="Sign up" />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >

          <q-tab-panel name="login">
          <q-card-section>
            <div class="text-h6">Введите свой логин и пароль</div>
          </q-card-section>

          <q-card-section>
            <div class="q-pa-md" style="max-width: 800px">
  <!--          <div class="q-pa-md" style="max-width: 800px">-->

              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  rounded outlined
                  v-model.trim="username"
                  label="логин *"
                  hint="Логин"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
                />

                <q-input
                  type="password"
                  rounded outlined
                  v-model.trim="password"
                  label="пароль *"
                  hint="Пароль"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
                />

                <br>
                <q-separator />
                <div  class="q-pa-md q-gutter-sm">
                  <q-btn @click.prevent="onSubmit" label="Отправить" type="submit" color="primary" glossy rounded/>
                  <q-btn label="Сброс" type="reset" color="primary" glossy rounded/>
                </div>
              </q-form>

            </div>

          </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="signUp">
            <q-card-section>
              <div class="text-h6">Зарегистрируйтесь</div>
            </q-card-section>

            <q-card-section>
            <div class="q-pa-md" style="max-width: 800px">
             <q-form
               @submit="onRegister"
               class="q-gutter-md">
              <q-input
                rounded outlined
                v-model.trim="username"
                label="логин *"
                hint="Логин, обязательное поле"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
              />

             <q-input
                rounded outlined
                v-model.trim="email"
                label="ел. адрес "
                hint="ел. адрес"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
              />

             <q-input
                rounded outlined
                v-model.trim="first_name"
                label="имя "
                hint="имя"
                lazy-rules
              />

             <q-input
                rounded outlined
                v-model.trim="last_name"
                label="фамилия "
                hint="фамилия"
                lazy-rules
              />

             <q-input
                rounded outlined
                v-model.trim="middle_name"
                label="отчество "
                hint="отчество"
                lazy-rules
              />

              <q-input
                rounded outlined
                v-model.trim="phone_number"
                label="телефон "
                hint="телефон"
                lazy-rules
              />

               <q-input
                rounded outlined
                v-model.trim="address"
                label="адрес "
                hint="адрес"
                lazy-rules
              />

              <br>
              <q-separator />
              <div  class="q-pa-md q-gutter-sm">
                <q-btn @click.prevent="onRegister" label="Зарегстрироваться" type="submit" color="primary"
                       glossy rounded/>
              </div>
              </q-form>

              </div>

            </q-card-section>
          </q-tab-panel>

        </q-tab-panels>

      </q-card>
        </q-splitter>
      </div>

    </q-dialog>

    <div v-if="sendMail" class="q-pa-md q-gutter-sm">

      <q-dialog v-model="sendMail">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Завершение регистрации</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            На вашу почту отправлено письмо с ссылкой для установления пароля и завершения регистрации
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-layout>
</template>

<script>
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';

export default {
  data() {
    return {
      layout: false,
      left: true,

      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      phone_number: '',
      address: '',

      accept: false,
      tab: 'login',
      splitterModel: 20,
      sendMail: false,
    }
  },

  computed: {
    isAuth() {
      return this.$store.state.auth.isAuth;
    }
  },
  // computed: mapState([
  //   // проксирует в this.isAuth доступ к store.state.isAuth
  //   'isAuth'
  //   // isAuth: state => state.isAuth
  //
  // ]),

  methods: {

    // ...mapMutations([
    //   'auth', // `this.auth()` будет вызывать `this.$store.commit('auth')`
    // //
    // ]),
    onSubmit() {
//          отправка пост запроса с данными username и password из формы
      this.$axios.post('/api/v1/users/auth/login/', {
        'username': this.username,
        'password': this.password,
      }).then((response) => {
        console.log(response)
//              сохранение в переменной токена авторизации полученного из response data
        const token = response.data.token
//              добавление токена авторизации в localStorage с ключом AUTH_TOKEN
        localStorage.setItem('AUTH_TOKEN', token)
        this.$store.commit('auth/setAuth', true)
        this.layout = false


      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    },

    onReset() {
      this.username = null
      this.password = null
    },

    logout() {
      localStorage.removeItem('AUTH_TOKEN')
      this.$store.commit('auth/setAuth', false)
    },

    onRegister() {
//          отправка пост запроса с данными username и password из формы
      this.$axios.post('/api/v1//users/auth/register/', {
        'username': this.username,
        "email": this.email,
        "first_name": this.first_name,
        "last_name": this.last_name,
        "middle_name": this.middle_name,
        "phone_number": this.phone_number,
        "address": this.address
      }).then((response) => {
        console.log(response)
        this.sendMail = true
        this.layout = false

      }).catch(function (error) {
        console.log(error)
        if (error.response.data.unique === "A user with that username already exists.") {
          alert("A user with that username already exists.")
          return
        }
        else if (error.response.data.unique === "this username is already reserved.") {
          alert("This username is already reserved.")
          return
        }
        else if (error.response.data.unique === "A user with that email already exists.") {
          alert("A user with that email already exists.")
          return
        }
        else if (error.response.data.unique === "this email is already reserved.") {
          alert("This email is already reserved.")
          return
        }
        alert('Something error')
      })
    },

  },

  created() {
    // проверка правильности токена авторизации
//    сохранение в переменной токена авторизации полученного из localStorage
    const token = localStorage.getItem('AUTH_TOKEN')
//     отправка гет запроса в заголовке которого токен авторизации
    this.$axios.get('/api/v1/users/auth/current/', {
      headers: {
        Authorization: "Token " + token
      }
    })
      .then(({data}) => {
        console.debug(data)
        this.checkAuthLoading = false
      }).catch((err) => {
      if (err.response?.status === 401) {
        this.logout()
      } else {
      }
    })
  },


}
</script>
