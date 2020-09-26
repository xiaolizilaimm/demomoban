import Vue from 'vue'
import VueRouter from 'vue-router'
import local from '@/utils/local'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
        meta: { title: '订单管理' },
        redirect: '/order/index',
        component: () => import('../views/order/index.vue'),
        children: [
          {
            path: '/order/index',
            name: 'order',
            meta: { title: '订单列表' },
            component: () => import('../views/order/orderList.vue')
          }
        ]
      },
      {
        path: '/product',
        name: 'product',
        meta: { title: '商品管理' },
        redirect: '/product/index',
        component: () => import('../views/product/index.vue'),
        children: [
          {
            path: '/product/index',
            name: 'productList',
            meta: { title: '商品列表' },
            component: () => import('../views/product/productList.vue')
          },
          {
            path: '/product/productadd',
            name: 'productadd',
            meta: { title: '商品添加' },
            component: () => import('../views/product/productAdd.vue')
          },
          {
            path: '/product/productcate',
            name: 'productCate',
            meta: { title: '商品分类' },
            component: () => import('../views/product/productCate.vue')
          }
        ]
      },
      {
        path: '/store',
        name: 'store',
        redirect: '/store/index',
        meta: { title: '店铺管理' },
        component: () => import('../views/store/index.vue'),
        children: [
          {
            path: '/store/index',
            name: 'storeindex',
            meta: { title: '店铺列表' },
            component: () => import('../views/store/storeList.vue')
          }
        ]
      },
      {
        path: '/acount',
        name: 'acount',
        redirect: '/product/index',
        meta: { title: '账号管理' },
        component: () => import('../views/acount/index.vue'),
        children: [
          {
            path: '/acount/index',
            name: 'acountList',
            meta: { title: '账号列表' },
            component: () => import('../views/acount/acountList.vue')
          },
          {
            path: '/acount/acountAdd',
            name: 'acountAdd',
            meta: { title: '添加账号' },
            component: () => import('../views/acount/acountAdd.vue')
          },
          {
            path: '/acount/resetPwd',
            name: 'acount',
            meta: { title: '修改密码' },
            component: () => import('../views/acount/resetPwd.vue')
          }
        ]
      },
      {
        path: '/saleCount',
        name: 'saleCount',
        meta: { title: '销售统计' },
        redirect: '/saleCount/goodsCount',
        component: () => import('../views/saleCount/index.vue'),
        children: [
          {
            path: '/saleCount/goodsCount',
            name: 'saleCount',
            meta: { title: '商品统计' },
            component: () => import('../views/saleCount/goodsCount.vue')
          },
          {
            path: '/saleCount/orderCount',
            name: 'saleCount',
            meta: { title: '订单统计' },
            component: () => import('../views/saleCount/orderCount.vue')
          }
        ]
      },
      {
        path: '/myCenter',
        name: 'myCenter',
        meta: { title: '个人中心' },
        component: () => import('../views/myCenter')
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

// 路由的请求拦截
router.beforeEach((to, from, next) => {
  const token = local.get('k_v')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
