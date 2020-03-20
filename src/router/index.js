import Vue from 'vue'
import Router from 'vue-router'
import AboutUs from '@/components/AboutUs'
import ProductCenter from '@/components/ProductCenter'
import ApplicationExample from '@/components/ApplicationExample'
import ContactUs from '@/components/ContactUs'
import Admin from "@/components/Admin"
import ProductDetail from "../components/ProductDetail";
import ProdTypeMan from '@/components/ProdTypeMan'
import ProductMan from '@/components/ProductMan'
import UseForMan from '@/components/UseForMan'
import UserMan from '@/components/UserMan'
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
    },
    {
      path:"/admin",
      component: Admin,
      children: [
        {
          path: 'productType',
          name: 'ProdTypeMan',
          component: ProdTypeMan
        },
        {
          path: 'product',
          name: 'ProductMan',
          component: ProductMan
        },
        {
          path: 'user',
          name: 'UserMan',
          component: UserMan
        },
        {
          path: 'usedes',
          name: 'UseForMan',
          component: UseForMan
        }
      ]
    },
    {
      path: "/productDetail",
      component: ProductDetail
    }
  ]
})
