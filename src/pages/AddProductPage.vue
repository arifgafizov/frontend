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
        :rules="[ val => !!val  || 'Поле не может быть пустым']"
      />


      <br>
      <q-separator />
      <div  class="q-pa-md q-gutter-sm">
        <q-btn @click.prevent="onSubmit" label="Отправить" type="submit" color="primary" glossy rounded :disable="!isFormValid"/>
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
        var formData = new FormData();

        var domain = this.getDomain(this.file)
        console.log(this.file)
        formData.append("file", this.file);

        this.$axios.post('/upload/' + domain, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          console.log(response)

        }).catch(function (error) {
          console.log(error)
          alert(error)
        })
      },

  },

}
</script>
<!--TODO fileinput 1 axios получить токен  2 загрузить файл приложив токено и получить ссылку 3 Сохранить товар-->
<style scoped>

</style>
