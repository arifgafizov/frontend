
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { name: 'PRODUCTS_LIST' } },
      { path: 'products', component: () => import('pages/ProductsListPage.vue'),  name: 'PRODUCTS_LIST'},
      { path: 'products/:id', component: () => import('pages/ProductsDetailPage.vue') ,  name: 'PRODUCTS_DETAIL'},
      { path: 'orders', component: () => import('pages/OrdersListPage.vue') ,  name: 'ORDERS_LIST', meta: {needAuth: true}},
      { path: 'orders/:id', component: () => import('pages/OrdersDetailPage.vue') ,  name: 'ORDERS_DETAIL', meta: {needAuth: true}},
      { path: 'payments', component: () => import('pages/PaymentsPage.vue') ,  name: 'PAYMENTS', meta: {needAuth: true}},
      { path: 'cart', component: () => import('pages/CartPage.vue') ,  name: 'CART', meta: {needAuth: true}},
      { path: 'complete-signup', component: () => import('pages/CompleteSignUp.vue') ,  name: 'COMPLETE-SIGNUP'},
      { path: 'add-products', component: () => import('pages/AddProductPage.vue') ,  name: 'ADD-PRODUCT', meta: {needAdmin: true}},
      { path: 'products/:id/edit', component: () => import('pages/AddProductPage.vue') ,  name: 'EDIT-PRODUCT', meta: {needAdmin: true}},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
