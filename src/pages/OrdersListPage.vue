<template>
  <q-page>
    <div class="text-h4 text-center">Заказы</div>

    <template>
      <div class="q-pa-md" style="max-width: 1000px">
        <q-list v-for="order in orders" :key="order.id" bordered separator>

          <q-item :to="{ name: 'ORDERS_DETAIL', params: {id: order.id}}" clickable v-ripple>
            <q-item-section>
              <q-item-label>Заказ №{{ order.id }}</q-item-label>
              <q-item-label caption>статус заказа: {{ order.status }}, стоимость заказа: {{
                  order.total_price }} руб.</q-item-label>
            </q-item-section>
              <q-btn v-if="order.status === 'created'" @click.prevent="toPaymentsPage(order.id)" color="cyan-7" glossy label="Оплатить" />
          </q-item>

        </q-list>
      </div>
    </template>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    }
  },

  methods: {
    toPaymentsPage (orderId) {
      this.$router.push({name: 'PAYMENTS', query: {order_id: orderId}})
    }
  },

  mounted() {
    //    сохранение в переменной токена авторизации полученного из localStorage
    const token = localStorage.getItem('AUTH_TOKEN')

    //          получение заказа
    this.$axios.get('/api/v1/orders/', {
      headers: {
        Authorization: "Token " + token
      }
    }).then(response => {

      console.log(response)
//          добавление в orders списка товаров корзины полученного из response data
      this.orders = response.data
      console.log(this.orders)
    })
  }
}
</script>

<style scoped>

</style>
