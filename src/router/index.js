import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/index.vue')
      },
      {
        path: '/order',
        name: 'order',
        redirect: '/order/index',
        component: () => import('../views/order/index.vue'),
        children: [
          {
            path: '/order/index',
            name: 'order',
            component: () => import('../views/order/orderList.vue')
          }
        ]
      },
      {
        path: '/product',
        name: 'product',
        redirect: '/product/index',
        component: () => import('../views/product/index.vue'),
        children: [
          {
            path: '/product/index',
            name: 'productList',
            component: () => import('../views/product/productList.vue')
          },
          {
            path: '/product/productadd',
            name: 'productadd',
            component: () => import('../views/product/productAdd.vue')
          },
          {
            path: '/product/productcate',
            name: 'productCate',
            component: () => import('../views/product/productCate.vue')
          }
        ]
      },
      {
        path: '/store',
        name: 'store',
        redirect: '/store/index',
        component: () => import('../views/store/index.vue'),
        children: [
          {
            path: '/store/index',
            name: 'storeindex',
            component: () => import('../views/store/storeList.vue')
          }
        ]
      },
      {
        path: '/acount',
        name: 'acount',
        redirect: '/product/index',
        component: () => import('../views/acount/index.vue'),
        children: [
          {
            path: '/acount/index',
            name: 'acountList',
            component: () => import('../views/acount/acountList.vue')
          },
          {
            path: '/acount/acountAdd',
            name: 'acountAdd',
            component: () => import('../views/acount/acountAdd.vue')
          },
          {
            path: '/acount/resetPwd',
            name: 'acount',
            component: () => import('../views/acount/resetPwd.vue')
          }
        ]
      },
      {
        path: '/saleCount',
        name: 'saleCount',
        redirect: '/saleCount/goodsCount',
        component: () => import('../views/saleCount/index.vue'),
        children: [
          {
            path: '/saleCount/goodsCount',
            name: 'saleCount',
            component: () => import('../views/saleCount/goodsCount.vue')
          },
          {
            path: '/saleCount/orderCount',
            name: 'saleCount',
            component: () => import('../views/saleCount/orderCount.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
