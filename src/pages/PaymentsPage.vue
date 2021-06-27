<template>
  <q-page>
<!--    <button id="start-payment-button">start-payment</button>-->
    <q-btn id="start-payment-button" color="primary" glossy label="start-payment" />

    <div id="dropin-container"></div>
<!--    <button id="submit-button">Request payment method</button>-->
    <q-btn id="submit-button" color="green-7" glossy label="Request payment method" />
  </q-page>
</template>

<script>

export default {
  name: "PaymentsPage",

  mounted() {
    // подключение dropin
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://js.braintreegateway.com/web/dropin/1.27.0/js/dropin.min.js')
    document.head.appendChild(recaptchaScript)


    // получение элемента с id start-payment-button и добавление его в переменную startPaymentButton
    const startPaymentButton = document.querySelector('#start-payment-button');
    var button = document.querySelector('#submit-button');

    //    сохранение в переменной токена авторизации полученного из localStorage
    const authToken = localStorage.getItem('AUTH_TOKEN');

    //    сохранение в переменной id заказа полученного из url params
    const orderId = new URLSearchParams(location.search).get('order_id');

    const internalAxios = this.$axios
    // подключение обработчика нажатия к переменной startPaymentButton
    startPaymentButton.addEventListener('click', () => {
      // после завершения метода пост с заголовком авторизации, получением response, выполняется анонимная функция (=>)
      // с выводом в консоль браузера (console.log)
      // и присвоением переменной token токена из data принимаемого объекта response
      // далее создание braintree.dropin с  console.log
      this.$axios.post('/api/v1/orders/' + orderId + '/pay-client-token/', {}, {
          headers: {
            Authorization: "Token " + authToken
          }
        })
        .then(response => {
          console.log('response from api')
          console.log(response)
          const token = response.data.token
          braintree.dropin.create({
            authorization: token,
            container: '#dropin-container'
          }, (createErr, instance) => {
            button.addEventListener('click', () => {
              instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
                console.log('braintree submit payload')
                console.log(requestPaymentMethodErr)
                console.log(payload)
                // присвоение переменной nonce payload.nonce
                const nonce = payload.nonce
                // пост запрос на pay-chekout с телом запроса в кот. поле nonce с переменной nonce и заголовком авторизации
                this.$axios.post('/api/v1/orders/' + orderId + '/pay-chekout/', {
                    nonce: nonce
                  }, {
                    headers: {
                      Authorization: "Token " + authToken
                    }
                  })
                  .then(response =>{
                    console.log('chekout response')
                    console.log(response)
                  })
                // Submit payload.nonce to your server
              });
            });
          });
        });
    });

  }
}
</script>

<style scoped>

</style>
