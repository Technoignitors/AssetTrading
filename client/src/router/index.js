import Vue from 'vue'
import Router from 'vue-router'
import Login from '../containers/Login.vue'
import Profile from '../containers/Profile.vue'
import Orders from '../containers/Orders.vue'
import SellAsset from '../containers/SellAsset.vue'
import Dashboard from '../containers/Dashboard.vue'
import MyAssets from '../containers/MyAssets.vue'
import ExploreAsset from '../containers/ExploreAsset.vue'
import OrderConfirmation from '../containers/OrderConfirmation.vue'
import MyApprovals from '../containers/MyApprovals.vue'
import AssetLogs from '../containers/AssetLogs.vue'

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
      path: '/myapprovals',
      name: 'MyApprovals',
      component: MyApprovals
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
      path: '/exploreasset/:id',
      name: 'ExploreAsset',
      component: ExploreAsset
    },
    {
      path: '/assetLogs',
      name: 'ReSellAsset',
      component: AssetLogs
    },
    {
      path: '/orderconfirmation/:id',
      name: 'OrderConfirmation',
      component: OrderConfirmation
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
