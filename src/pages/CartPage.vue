<template>
  <q-page>
    <div class="text-h4">Корзина</div>

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
              <q-btn style="background: #1E90FF; color: white" push label="добавить" />
              <q-btn style="background: #DC143C; color: white" push label="удалить" />
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

  mounted() {

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
}
</script>

<style scoped>

</style>
