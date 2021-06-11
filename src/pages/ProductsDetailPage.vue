<template>
  <q-page>
    <template>
      <div class="q-pa-md">
        <q-layout view="lhh LpR lff" container style="height: 900px" class="shadow-2 rounded-borders">
          <q-header class="bg-black">
            <q-toolbar>
              <!--              <q-btn flat round dense icon="menu" />-->
              <q-toolbar-title>Детальная информация о товаре</q-toolbar-title>
            </q-toolbar>
          </q-header>

          <q-page-container>
            <q-page padding>

              <h5 class="text-h5">{{ title }}</h5>
              <p class="text-body1">{{ description }}</p>
              <p class="text-body1">Стоимость: {{ price }} руб.</p>
              <p class="text-body1">Масса: {{ weight }} г.</p>

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
      model: 2.3
    }
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

    }).catch((err) => {
      if (err.response?.status === 404) {
        this.isActive = false
      } else {
        alert(err.response.status + " " + err.response.statusText)
      }
    })
  }

}
</script>

<style scoped>

</style>
