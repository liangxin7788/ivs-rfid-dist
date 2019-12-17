import Vue from 'vue'
import Router from 'vue-router'
import AboutUs from '@/components/AboutUs'
import ProductCenter from '@/components/ProductCenter'
import ApplicationExample from '@/components/ApplicationExample'
import ContactUs from '@/components/ContactUs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',

    },
    {
      path: '/index',
      name: 'index',
      component: AboutUs
    },
    {
      name: 'productCenter',
      path: '/productCenter',
      component: ProductCenter
    },
    {
      name: 'applicationExample',
      path: '/applicationExample',
      component: ApplicationExample
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: ContactUs
    }
  ]
})
