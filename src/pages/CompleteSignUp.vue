<template>
  <q-page>
          <q-card-section>
            <div class="text-h6">Подтвердите свой пароль</div>
          </q-card-section>

          <q-card-section>
            <div class="q-pa-md" style="max-width: 800px">

              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >

                <q-input
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

  </q-page>

</template>

<script>
export default {
  name: "CompleteSignUp",
  data() {
    return {
      password: null,
      uuid_token: null,
    }
  },

  methods: {
    onSubmit() {
//          отправка пост запроса с данными uuid_token и password из формы
      this.$axios.post('/api/v1//users/auth/register-complete/', {
        'uuid_token': this.uuid_token,
        'password': this.password,
      }).then((response) => {
        console.log(response)

      }).catch(function (error) {
        console.log(error)
        // console.log(this.uuid_token)
        alert(error)

      })
    },


    onReset() {
      this.password = null
    },

    created() {
      this.uuid_token = location.search.split('=').pop()
      console.log(this.uuid_token)
    }
  }
}
</script>

<style scoped>

</style>
