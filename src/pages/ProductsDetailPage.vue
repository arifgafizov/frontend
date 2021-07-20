<template>
  <q-page>
    <template>
      <div v-if="isExist" class="q-pa-md">
        <q-layout view="lhh LpR lff" container style="height: 900px" class="shadow-2 rounded-borders">
          <q-header class="bg-black">
            <q-toolbar>
              <q-toolbar-title>Детальная информация о товаре</q-toolbar-title>
            </q-toolbar>
          </q-header>

          <q-page-container>
            <q-page padding>
              <router-link v-if="isSuperuser" :to="{ name: 'EDIT-PRODUCT'}">
                <q-btn color="amber" glossy icon="save" label="Изменить товар" text-color="black" />
              </router-link>

              <h5 class="text-h5">{{ title }}</h5>
              <p class="text-body1">{{ description }}</p>
              <p class="text-body1">Стоимость: {{ price }} руб.</p>
              <p class="text-body1">Масса: {{ weight }} г.</p>
              <q-img
                :src="file_link"
                basic
                style="height: 550px; max-width: 550px"
              >
                <div class="absolute-bottom text-h6">
                  {{ title }}
                </div>
              </q-img>

              <div class="q-pa-md">
                <q-rating
                  v-model="model"
                  max="5"
                  size="3.5em"
                  color="yellow"
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  no-dimming
                />
              </div>

              <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn @click.prevent="addToCart(id)" size="25px" round color="primary" icon="shopping_cart"/>
              </q-page-sticky>

            </q-page>
          </q-page-container>
        </q-layout>
      </div>

      <q-banner v-else dense class="bg-red-3">
        <div class="text-h4 text-center">Страница не найдена. Ошибка 404</div>
      </q-banner>

    </template>
  </q-page>
</template>

<script>
export default {
  name: "ProductsDetailPage",
  data() {
    return {
      id: '',
      title: '',
      description: '',
      price: '',
      weight: '',
      file_link: '',
      // isSuperuser: false,
      isExist: true,
      model: 2.3
    }
  },
  computed: {
    isSuperuser() {
      return this.$store.state.auth.isSuperuser;
    },
  },
  methods: {
    addToCart: function (product_id) {
//          сохранение в переменной токена авторизации полученного из localStorage
      const token = localStorage.getItem('AUTH_TOKEN')
//          отправка пост запроса с данными product id из формы
      this.$axios.post('/api/v1/cart-products/', {
          'product': product_id
        },
        {
          headers: {
            Authorization: "Token " + token
          },
        }
      ).then((response) => {

        console.log(response)

      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    }
  },

  created() {
    this.id = location.pathname.split('/').pop()
    this.$axios.get('/api/v1/products/' + this.id
    ).then(response => {
      console.log(response)
//          добавление в products списка товаров полученного из response data results
      this.title = response.data.title
      this.description = response.data.description
      this.price = response.data.price
      this.weight = response.data.weight || 'вес не определен'
      this.file_link = response.data.file_link

    }).catch((err) => {
      if (err.response?.status === 404) {
        this.isExist = false
      } else {
        alert(err.response.status + " " + err.response.statusText)
      }
    })

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
        // вызов мутации setSuperuser из модуля auth для присвоения значения из data для isSuperuser
        this.$store.commit('auth/setSuperuser', data.is_superuser)
      }).catch((err) => {
        console.log(err)
    })
  }

}
</script>

<style scoped>

</style>
