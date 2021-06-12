<template>
  <q-page>
    <div v-if="isExist" >
      <q-banner dense class="bg-light-blue-2">
      <div class="text-h4 text-center">Информация о заказе № {{ id }}</div>
      </q-banner>

      <br>
      <div class="text-body1">
        <br>
        <br>
        <p class="text-h5">  Статус: {{ status }}</p>
        <p class="text-weight-bold">  Общая стоимость: {{ total_price }} руб.</p>
        <p>  Дата и время доставки: {{ delivery_at }}</p>
        <p>  Адрес доставки: {{ address }} </p>
        <p>  Контактный телефон: {{ phone }} </p>

        <div class="q-pa-md" style="max-width: 1000px">
          Содержимое заказа: <br>
          <q-list v-for="product in products" :key="product.id">

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label class="text-body1 text-italic">Наименование: {{ product.title }}, количество:
                  {{ product.quantity }}, цена: {{ product.price }}</q-item-label>
              </q-item-section>

            </q-item>

          </q-list>
        </div>

        <br><br>
        <q-btn v-if="status === 'created'" color="cyan-7" glossy label="Оплатить" />
      </div>
    </div>
    <q-banner v-else dense class="bg-red-3">
      <div class="text-h4 text-center">Страница не найдена. Ошибка 404</div>
    </q-banner>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      address: '',
      status: '',
      phone: '',
      delivery_at: '',
      total_price: '',
      products: {},
      isExist: true
    }
  },

  created() {
    //    сохранение id заказа из url location
    this.id = location.pathname.split('/').pop()

    //    сохранение в переменной токена авторизации полученного из localStorage
    const token = localStorage.getItem('AUTH_TOKEN')
    this.$axios.get('/api/v1/orders/' + this.id, {
      headers: {
        Authorization: "Token " + token
      }
    }).then(response => {
      console.log(response)
//          добавление в переменные списка товаров полученного из response data
      this.status = response.data.status
      this.total_price = response.data.total_price
      this.address = response.data.address
      this.delivery_at = response.data.delivery_at
      this.phone = response.data.phone
      this.products = response.data.products

    }).catch((err) => {
      if (err.response?.status === 404) {
        this.isExist = false
      } else {
        alert(err.response.status +" "+ err.response.statusText)
      }
    })
  }
}
</script>

<style scoped>

</style>
