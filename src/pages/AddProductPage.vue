<template>
  <q-page>
    <q-toolbar-title v-if="!isEditable">Добавить товар</q-toolbar-title>
    <q-toolbar-title v-else-if="isEditable">Обновить товар</q-toolbar-title>
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

      <q-img
        v-if="isEditable"
        :src="file_link"
        basic
        style="height: 540px; max-width: 550px"
      >
      </q-img>

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
      file_link: '',
      id: null
    }
  },
  computed: {
    isFormValid() {
      return !!this.title && !!this.description && !!this.weight && !!this.price && !!this.file
    },
    isEditable() {
      return this.$router.currentRoute.name === 'EDIT-PRODUCT'
    }
  },
  methods: {
    showNotif() {
      this.$q.notify({
        type: 'negative',
        position: 'center',
        message: 'Error',
        icon: 'announcement'
      })
    },

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
          var put_url = '/api/v1/crud-products/' + this.id + '/'
          var post_url = '/api/v1/crud-products/'

          // если это роутер обновления товара, то отправка PUT запроса с данными о товаре из формы с токеном
          // если это роутер добавления товара, то отправка POST запроса с данными о товаре из формы с токеном
          return this.$axios({
            method: this.isEditable ? 'put' : 'post',
            url: this.isEditable ? put_url : post_url,
            data: {
              'title': this.title,
              'description': this.description,
              'weight': this.weight,
              'price': this.price,
              'file_link': fileLink
            },
            headers: {
              Authorization: "Token " + token
            },
          })

        }).then((response) => {
        console.log(response)

      })
        .catch((error) => {
          console.log(error)
          this.showNotif()
        })
    },

  },
  created() {
    // если это роутер обновления товара то запросить данные о товаре
    if (this.isEditable) {
      // получение id товара
      this.id = this.$router.currentRoute.params.id
      this.$axios.get('/api/v1/products/' + this.id
      ).then(response => {
        console.log(response)
//          сохранение данных о товаре полученного из response data results
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
    }
  }
}
</script>

<style scoped>

</style>
