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

// 分离出来的路由
const syncRouter = [
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: '后台首页', icon: 'icon-shouye' },
        visible: true,
        component: () => import('../views/dashboard/index.vue')
      },
      {
        path: '/order',
        name: 'order',
        meta: { title: '订单管理', icon: 'icon-wenjian' },
        visible: true,
        redirect: '/order/index',
        component: () => import('../views/order/index.vue'),
        children: [
          {
            path: '/order/index',
            name: 'order',
            meta: { title: '订单列表' },
            visible: true,
            component: () => import('../views/order/orderList.vue')
          }
        ]
      },
      {
        path: '/product',
        name: 'product',
        meta: { title: '商品管理', icon: 'icon-shangpin' },
        redirect: '/product/index',
        visible: true,
        component: () => import('../views/product/index.vue'),
        children: [
          {
            path: '/product/index',
            name: 'productList',
            meta: { title: '商品列表' },
            visible: true,
            component: () => import('../views/product/productList.vue')
          },
          {
            path: '/product/productadd',
            name: 'productadd',
            meta: { title: '商品添加' },
            visible: true,
            component: () => import('../views/product/productAdd.vue')
          },
          {
            path: '/product/productcate',
            name: 'productCate',
            meta: { title: '商品分类' },
            visible: true,
            component: () => import('../views/product/productCate.vue')
          }
        ]
      },
      {
        path: '/store',
        name: 'store',
        redirect: '/store/index',
        meta: { title: '店铺管理', icon: 'icon-dianpu' },
        visible: true,
        component: () => import('../views/store/index.vue'),
        children: [
          {
            path: '/store/index',
            name: 'storeindex',
            meta: { title: '店铺列表' },
            visible: true,
            component: () => import('../views/store/storeList.vue')
          }
        ]
      },
      {
        path: '/acount',
        name: 'acount',
        redirect: '/product/index',
        meta: {
          title: '账号管理',
          icon: 'icon-zhanghao',
          role: ['super', 'normal']
        },
        visible: true,
        component: () => import('../views/acount/index.vue'),
        children: [
          {
            path: '/acount/index',
            name: 'acountList',
            meta: { title: '账号列表', role: ['super'] },
            visible: true,
            component: () => import('../views/acount/acountList.vue')
          },
          {
            path: '/acount/acountAdd',
            name: 'acountAdd',
            meta: { title: '添加账号', role: ['super'] },
            visible: true,
            component: () => import('../views/acount/acountAdd.vue')
          },
          {
            path: '/acount/resetPwd',
            name: 'acount',
            meta: { title: '修改密码' },
            visible: true,
            component: () => import('../views/acount/resetPwd.vue')
          }
        ]
      },
      {
        path: '/saleCount',
        name: 'saleCount',
        meta: { title: '销售统计', icon: 'icon-tongji', role: ['super'] },
        redirect: '/saleCount/goodsCount',
        visible: true,
        component: () => import('../views/saleCount/index.vue'),
        children: [
          {
            path: '/saleCount/goodsCount',
            name: 'saleCount',
            meta: { title: '商品统计', role: ['super'] },
            visible: true,
            component: () => import('../views/saleCount/goodsCount.vue')
          },
          {
            path: '/saleCount/orderCount',
            name: 'saleCount',
            meta: { title: '订单统计', role: ['super'] },
            visible: true,
            component: () => import('../views/saleCount/orderCount.vue')
          }
        ]
      },
      {
        path: '/myCenter',
        name: 'myCenter',
        meta: { title: '个人中心' },
        visible: false,
        component: () => import('../views/myCenter')
      },
      {
        path: '*',
        name: '404',
        meta: { title: '404' },
        visible: false,
        component: () => import('../views/404')
      }
    ]
  }
]

creatRouter()
// 3.0获取计算出来的路由动态加载
export function creatRouter() {
  // 获取当前登录的角色
  const role = local.get('role')
  if (!role) return
  const finalRouter = calcRouter(syncRouter[0].children, role)
  // 把自己的 children 通过角色对比计算一下,得到最终的路由在覆盖自己的 children
  syncRouter[0].children = finalRouter
  // 权限设计,动态路由的核心方法
  // console.log(syncRouter)
  router.addRoutes(syncRouter)

  // 动态计算 menu
  const menuArr = calcMenu(finalRouter)
  // 存在 local 中
  local.set('menu', JSON.stringify(menuArr))
  // console.log(menuArr)
}

function calcMenu(routers) {
  // 根据标识符进行过滤
  return routers.filter(item => {
    if (item.visible) {
      if (item.children && item.children.length > 1) {
        item.children = calcMenu(item.children)
      }
      return true
    } else {
      return false
    }
  })
}

// 2.0 calcRouter 执行计算路由
function calcRouter(router, role) {
  return router.filter(item => {
    if (hasPermission(item, role)) {
      if (item.children && item.children.length > 0) {
        item.children = calcRouter(item.children, role)
      }
      return true
    } else {
      return false
    }
  })
}

// 1.0 hasPermission 函数用来鉴定权限
function hasPermission(item, role) {
  if (item.meta && item.meta.role) {
    return item.meta.role.includes(role)
  } else {
    return true
  }
}

export default router
