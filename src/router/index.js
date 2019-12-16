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
      component: AboutUs
    },
    {
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
      component: ContactUs
    }
  ]
})
