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
          @row-click="toDetailPage"
        >
<!--          <template v-slot:body-cell-title>-->
<!--            <div>-->
<!--              NAME-->
<!--            </div>-->
<!--          </template>-->
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
      visibleColumns: ['title', 'description', 'price'],
      columns: [
        {name: 'title', align: 'center', label: 'Наименование', field: 'title', sortable: true},
        {name: 'description', align: 'center', label: 'Описание', field: 'description', sortable: true},
        {name: 'price', align: 'center', label: 'Цена', field: 'price', sortable: true},
        {name: 'id', align: 'center', label: 'id', field: 'id', sortable: true},
      ]

    }
  }
  ,
  methods: {
    toDetailPage (evt, row, index) {
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
