<template>

  <el-container>

    <!--    头部-->
    <el-header>
      <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal"
               @select="handleSelect" style="width: 100%">
        <el-menu-item index="/index">About Us</el-menu-item>
        <el-submenu index="/productCenter">
          <template slot="title">Product Center</template>
          <el-menu-item :index="JSON.stringify(type)" v-for="(type, index) in typeList" :key="index">{{type.typeEn}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/applicationExample">Application Example</el-menu-item>
        <el-menu-item index="/contactUs">Contact Us</el-menu-item>
        <el-menu-item index="/login"><a href="https://www.baidu.com" target="_blank">Login In</a></el-menu-item>
      </el-menu>
    </el-header>

    <!--    内容区-->
    <el-main class="navLi" style="min-height: 700px">

      <router-view/>

    </el-main>

    <!--底部-->
    <el-footer class="myFooter" height="200px">
      <Footer></Footer>
    </el-footer>

  </el-container>

</template>

<script>
  import * as req from '@/utils/api'
  import Footer from "./Footer";

  export default {
    name: "Index",
    components: {
      Footer
    },

    data() {
      return {
        defaultActive: '/index',
        typeList: []
      }
    },
    mounted() {
      this.defaultActive = this.$route.path
      console.log(this.$route.path)
      req.getRequest('/productType/getTypeList', {}).then(res => {
        this.typeList = res.data.result || []
      }).catch(e => {
        console.log(e);
      })
    },
    beforeRouteEnter(to, from, next) {
      console.log('1', to, from);
      next()
    },
    beforeRouteUpdate(to, from, next) {
      console.log('11', to, from);
      next()
    },
    beforeRouteLeave(to, from, next) {
      console.log('111', to, from);
      next()
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath,key.typeEn);
        if (keyPath[0] != '/productCenter')
          this.$router.push({
            path: key,
          })
        else
          this.$router.push({
            name: `productCenter`,
            query: {
              tag: JSON.parse(key).typeCode
            }
          })
      },
      linkTo(path) {
        this.$router.push({name: path})
        this.defaultActive = '/' + path

        console.log(this.defaultActive)
      },
      // routerToProductCenter(){
      //   this.$router.push({
      //     name: `productCenter`,
      //     params: {
      //       typeEn: 'enName', code: '8989'
      //     }
      //   })
      // }
    }
  }
</script>

<style scoped>


  .myFooter {
    background-color: #303848;
    color: rgb(222, 222, 222);
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }


  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }


</style>
