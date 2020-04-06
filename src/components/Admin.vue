<template>
  <el-container >
    <el-aside width="150px" class="admin-aside">
      <el-menu style="border-right: 0;" router>
        <el-menu-item v-for="(menu,index) in menus" :key="index" :index="index.toString()" :route="menu.route">
          <i class="el-icon-menu"></i>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>

      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import utils from '@/utils/utils'
export default {
  name: "Admin",
  data () {
      return {
        menus: [
          {
            title: '产品类型管理',
            icon: '',
            route: '/admin/productType'
          },
          {
            title: '产品管理',
            icon: '',
            route: '/admin/product'
          },
          {
            title: '用户管理',
            icon: '',
            route: '/admin/user'
          },
          {
            title: '解决方案管理',
            icon: '',
            route: '/admin/usedes'
          }
        ]
      }
  },
  mounted () {
    if (!utils.getCookie('username')) {
      this.$router.push('/index')
    }
  }

}
</script>

<style scoped>
</style>
