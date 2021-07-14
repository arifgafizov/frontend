<template>
  <q-page>
    <q-toolbar-title>Добавить товар</q-toolbar-title>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md" style="max-width: 800px"
    >
      <q-input
        filled
        v-model.trim="title"
        label="наименование *"
        hint="Наименование"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
      />

      <q-input
        type="textarea"
        filled
        v-model.trim="description"
        label="описание *"
        hint="Описание"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Поле не может быть пустым']"
      />

      <q-input
        type="number"
        filled
        v-model.number="weight"
        label="вес *"
        hint="Вес"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Поле не может быть пустым']"
      />

      <q-input
        type="number"
        filled
        v-model.number="price"
        label="цена *"
        hint="Цена"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Поле не может быть пустым']"
      />

      <q-input
        @input="val => { file = val[0] }"
        filled
        type="file"
        hint="Native file"
        :rules="[ val => !!val  || 'Нужно выбрать файл для загрузки']"
      />
      <!--TODO rules не работает правильно-->

      <br>
      <q-separator/>
      <div class="q-pa-md q-gutter-sm">
        <q-btn @click.prevent="onSubmit" label="Отправить" type="submit" color="primary" glossy rounded
               :disable="!isFormValid"/>
      </div>
    </q-form>

  </q-page>
</template>

<script>

export default {
  name: "AddProductPage",
  data() {
    return {
      title: '',
      description: '',
      weight: '',
      price: '',
      file: null,
    }
  },
  computed: {
    isFormValid() {
      return !!this.title && !!this.description && !!this.weight && !!this.price && !!this.file
    }
  },
  methods: {
    getDomain(file) {
      var arr = file.name.split('.')
      var extension = arr[arr.length - 1]
      if (['jpg', 'jpeg', 'png', 'tif', 'tiff', 'gif'].includes(extension)) {
        return 'image'
      } else if (['avi', 'mp4', 'mpeg', 'mod', '3gp', 'mkv'].includes(extension)) {
        return 'video'
      } else if (['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
        return 'document'
      } else {
        alert('invalid format')
      }
    },
    onSubmit() {
      //    сохранение в переменной токена авторизации полученного из localStorage
      const token = localStorage.getItem('AUTH_TOKEN')

      var domain = this.getDomain(this.file)
      var fileSize = this.file.size
      var arr = this.file.name.split('.')
      var extension = arr[arr.length - 1]

      //          отправка пост запроса с данными файла и токеном авторизации для получения jwt токена
      this.$axios.post('/api/v1/jwt/token/', {
        'domain': domain,
        'extension': extension,
        'file_size': fileSize,
      }, {
        headers: {
          Authorization: "Token " + token
        }
      }).then((response) => {
        console.log(response)
        var jwtToken = response.data.token
        console.log(jwtToken)
        // отправка пост запроса с файлом для получения ссылки хранения файла
        var formData = new FormData();
        console.log(this.file)
        formData.append("file", this.file);

        return this.$axios.post('/upload/' + domain, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + jwtToken
          }
        })

      })
        .then((response) => {
          console.log(response)
          var fileLink = response.data.file
          console.log(fileLink)

          //          отправка пост запроса с данными о товаре из формы
          return this.$axios.post('/api/v1/crud-products/', {
              'title': this.title,
              'description': this.description,
              'weight': this.weight,
              'price': this.price,
              'file_link': fileLink
            },
            {
              headers: {
                Authorization: "Token " + token
              },
            }
          )

        }).then((response) => {
        console.log(response)

      })
        .catch(function (error) {
          console.log(error)
          alert(error)
        })
    },

  },

}
</script>

<style scoped>

</style>
