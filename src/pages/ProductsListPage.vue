<template>
  <q-page>
    <template>
      <div class="q-pa-md">
        <q-table
          grid
          grid-header
          title="Список товаров"
          :data="products"
          :columns="columns"
          row-key="id"
          :visible-columns="visibleColumns"
        >

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card @click="toDetailPage(props.row)" >
                <q-card-section class="text-center">
                  <strong>{{ props.row.title }}</strong>
                </q-card-section>
                <q-card-section class="text-center">
                  <q-img
                    :src="props.row.file_link"
                    basic
                    style="height: 250px; max-width: 250px"
                  >
                  </q-img>
                </q-card-section>
                <q-separator />
                <q-card-section class="flex flex-center" >
                  <div>{{ props.row.description }} g</div>
                </q-card-section>
              </q-card>
            </div>
          </template>

        </q-table>
      </div>
    </template>
  </q-page>
</template>

<script>
export default {
  name: "ProductsListPage",
  data() {
    return {
      products: [],
      visibleColumns: ['title', 'description', 'price', 'file_link'],
      columns: [
        {name: 'title', align: 'center', label: 'Наименование', field: 'title', sortable: true},
        {name: 'description', align: 'center', label: 'Описание', field: 'description', sortable: true},
        {name: 'price', align: 'center', label: 'Цена', field: 'price', sortable: true},
        {name: 'id', align: 'center', label: 'id', field: 'id', sortable: true},
        {name: 'file_link', align: 'center', label: 'FILE', field: 'file_link', sortable: true},
      ]

    }
  }
  ,
  methods: {
    toDetailPage (row) {
      this.$router.push({name: 'PRODUCTS_DETAIL', params: {id: row.id}})
    }
  },
  mounted() {
    this.$axios.get('/api/v1/products/', {}).then(response => {
      console.log(response)
//          добавление в products списка товаров полученного из response data results
      this.products = response.data.results
      console.log(this.products)
    })
  }
}
</script>

<style scoped>

</style>
