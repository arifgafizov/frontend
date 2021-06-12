<template>
  <q-page>
    <div class="text-h4">Информация о заказе № {{ id }}</div>
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
        this.isActive = false
      } else {
        alert(err.response.status +" "+ err.response.statusText)
      }
    })
  }
}
</script>

<style scoped>

</style>
