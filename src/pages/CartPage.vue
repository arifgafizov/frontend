<template>
  <q-page>
    <div class="text-h4 text-center">Корзина</div>

    <template>
      <div class="q-pa-md" style="max-width: 1000px">
        <q-list v-for="cart_product in cart_products" :key="cart_product.id" bordered separator>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ cart_product.title }}</q-item-label>
              <q-item-label caption>количество: {{ cart_product.quantity }},
                цена: {{cart_product.price }} руб.</q-item-label>
            </q-item-section>
            <q-btn-group push>
              <q-btn @click.prevent="addToCart(cart_product.id)"
                     color="light-blue-8" glossy push label="добавить" />
              <q-btn @click.prevent="onDeleteCartProduct(cart_product.id)"
                     color="red-9" glossy push label="удалить" type="delete" />
            </q-btn-group>
          </q-item>

        </q-list>

        <h5 class="text-h6">Общая стоимость товаров в корзине: {{ cart_total_price.total_price }} руб.</h5>
      </div>
    </template>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      cart_products: [],
      cart_total_price: '',
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
        this.getCartProducts()

      }).catch(function(error) {
        console.log(error)
        alert(error)
       })
    },

    onDeleteCartProduct (product_id) {
//          сохранение в переменной токена авторизации полученного из localStorage
      const token = localStorage.getItem('AUTH_TOKEN')
//        проходимся по cart_products используя find с функцией сравнения полученного product_id с id товара в корзине
//        сохраняя найденный товар в переменной product
      const product = this.cart_products.find(function (product) {
        return product.id === product_id
      })
//        сохраняем в переменной productPosition id позиции в корзине
      const productPosition = product.positions.pop().id
//        отправляем delete запрос с id позиции в корзине
      this.$axios.delete('/api/v1/cart-products/' + productPosition, {
        headers: {
          Authorization: "Token " + token
        }
      }).then(response => {
        console.log(response)
        this.getCartProducts()
      }).catch(function(error) {
        console.log(error)
      })
    },

    getCartProducts () {
      //    сохранение в переменной токена авторизации полученного из localStorage
      const token = localStorage.getItem('AUTH_TOKEN')
      //     отправка гет запроса в заголовке которого токен авторизации
//          получение товаров в корзине
      this.$axios.get('/api/v1/cart-products/', {
        headers: {
          Authorization: "Token " + token
        }
      }).then(response => {

        console.log(response)
//          добавление в cart_products списка товаров корзины полученного из response data
        this.cart_products = response.data
        console.log(this.cart_products)
      }),

//          получение общей цены товаров в корзине
        this.$axios.get('/api/v1/cart-products/cart-total-price/', {
          headers: {
            Authorization: "Token " + token
          }
        }).then(response => {

          console.log(response)
//          добавление в cart_products списка товаров корзины полученного из response data
          this.cart_total_price = response.data
          console.log(this.cart_total_price)
        })
    }
  },

  mounted() {
    // редирект на главную страницу для не авторизованного пользователя
    if (!this.$store.state.auth.isAuth) {
      this.$router.push({ name: "PRODUCTS_LIST"})
    }

    this.getCartProducts()
}
}
</script>

<style scoped>

</style>
