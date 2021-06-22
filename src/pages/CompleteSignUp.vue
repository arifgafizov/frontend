<template>
  <q-page>
          <q-card-section>
            <div class="text-h6">Введите пароль</div>
          </q-card-section>

          <q-card-section>
            <div class="q-pa-md" style="max-width: 800px">

              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >

                <q-input
                  type="password"
                  rounded outlined
                  v-model.trim="password1"
                  label="пароль *"
                  hint="Пароль"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
                />
                <br>
                <div class="text-weight-bold">Подтвердите пароль</div>
                <q-input
                  type="password"
                  rounded outlined
                  v-model.trim="password2"
                  label="пароль *"
                  hint="Пароль"
                  lazy-rules
                  :rules="[ val => val === this.password1 || 'Пароли не совпадают']"
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

    <div v-if="passwordNotEqual" class="q-pa-md q-gutter-sm">

      <q-dialog v-model="passwordNotEqual">
        <q-card class="bg-white text-red-10" style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Ошибка</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Пароли не совпадают
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="red-10" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-page>

</template>

<script>
export default {
  name: "CompleteSignUp",
  data() {
    return {
      password1: null,
      password2: null,
      uuid_token: null,

      passwordNotEqual: false,
    }
  },

  methods: {
    onSubmit() {
      if (this.password1 === this.password2) {
//          отправка пост запроса с данными uuid_token и password из формы
        this.$axios.post('/api/v1/users/auth/register-complete/', {
          'uuid_token': this.uuid_token,
          'password': this.password1,
        }).then((response) => {
          console.log(response)
//              сохранение в переменной токена авторизации полученного из response data
          const token = response.data.token
//              добавление токена авторизации в localStorage с ключом AUTH_TOKEN
          localStorage.setItem('AUTH_TOKEN', token)
//              вызов мутации setAuth из модуля auth для присвоения true isAuth
          this.$store.commit('auth/setAuth', true)
//              редирект на главную страницу после успешной регистрации
          this.$router.push({ name: "PRODUCTS_LIST"})

        }).catch(function (error) {
          console.log(error.response)
          if (error.response.data.expired) {
            alert("Token not exist or expired.")
            return
          }
          alert('Error something')

        })
      }
      else {
        this.passwordNotEqual = true
      }
    },

    onReset() {
      this.password1 = null
      this.password2 = null
      },
    },

  created() {
    // другой способ this.uuid_token = location.search.split('=').pop()
    this.uuid_token = new URL(location.href).searchParams.get('uuid')
    console.log(this.uuid_token)
  }
}
</script>

<style scoped>

</style>
