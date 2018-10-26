import Vue from 'vue'
import Router from 'vue-router'
import Posts from '../containers/Posts.vue'
import NewPost from '../containers/NewPost.vue'
import EditPost from '../containers/EditPost.vue'
import Login from '../containers/Login.vue'
import Profile from '../containers/Profile.vue'
import Orders from '../containers/Orders.vue'
import BuySell from '../containers/BuySell.vue'
import Dashboard from '../containers/Dashboard.vue'

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
      path: '/buysell',
      name: 'BuySell',
      component: BuySell
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
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
