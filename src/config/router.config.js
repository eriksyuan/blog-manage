// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          // 外部链接
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: '文章管理', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/new',
            name: 'NewArticle',
            component: () => import('@/views/list/NewArticle'),
            meta: { title: '新建文章', keepAlive: false, permission: [ 'table' ] }
          },
          {
            hidden: true,
            path: '/list/edit/:id',
            name: 'EditArticle',
            component: () => import('@/views/list/EditArticle'),
            meta: { title: '编辑文章', keepAlive: false, permission: [ 'table' ] }
          },
          {
            path: '/list/recycle',
            name: 'RecycleStation',
            component: () => import('@/views/list/RecycleStation'),
            meta: { title: '文章列表', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      {
        path: '/classify',
        name: 'classify',
        component: RouteView,
        redirect: '/classify/list',
        meta: { title: '文章分类管理', icon: 'profile', permission: [ 'classify' ] },
        children: [
          {
            path: '/classify/list',
            name: 'classifyList',
            component: () => import('@/views/classify/classifyList'),
            meta: { title: '分类管理', permission: [ 'classify' ] }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/security',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '个人设置', keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      },
      {
        path: '/setting',
        component: RouteView,
        redirect: '/setting/menu',
        name: 'setting',
        meta: { title: '网站综合管理', icon: 'setting', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/setting/menu',
            name: 'setting',
            component: () => import('@/views/setting/menu'),
            meta: { title: '前台菜单管理', keepAlive: true, permission: [ 'user' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
