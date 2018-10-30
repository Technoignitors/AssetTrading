import Vue from 'vue'
import Router from 'vue-router'
import Login from '../containers/Login.vue'
import Profile from '../containers/Profile.vue'
import Orders from '../containers/Orders.vue'
import SellAsset from '../containers/SellAsset.vue'
import Dashboard from '../containers/Dashboard.vue'
import MyAssets from '../containers/MyAssets.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/myassets',
      name: 'MyAssets',
      component: MyAssets
    },
    {
      path: '/sellasset',
      name: 'SellAsset',
      component: SellAsset
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/user',
      name: 'User',
      children: [
        {
          path: ':username',
          name: 'Profile',
          component: Profile
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'Login' }
    }
  ],
  mode: 'hash'

})
