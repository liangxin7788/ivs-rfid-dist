<template>
    <div>
      <div>
        <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect" style="width: 100%" >
          <el-menu-item index="/index">About Us</el-menu-item>
          <el-submenu index="/productCenter">
            <template slot="title">Product Center</template>
<!--            -->
            <el-menu-item  :index="JSON.stringify(type)" v-for="(type, index) in typeList" :key="index">{{type.typeEn}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="/applicationExample">Application Example</el-menu-item>
          <el-menu-item index="/contactUs">Contact Us</el-menu-item>
          <el-menu-item index="/login"><a href="https://www.baidu.com" target="_blank">Login In</a></el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-container style="width: 100%">
          <el-main class="navLi" style="min-height: 100%">
            <router-view/>
          </el-main>
        </el-container>
        <el-footer height="200px">
          <div class="in_foots_t">
            <div class="in_foos_t_l">
              <div class="in_footnav">
                <span>关于我们</span>
                <a @click="linkTo('applicationExample')">公司概况</a>
                <a href="https://www.baidu.com">新闻动态</a>
                <a href="https://www.baidu.com">联系我们</a>
              </div>
              <div class="in_footnav">
                <span>系统集成伙伴</span>
                <a href="https://www.baidu.com">产品及技术支持</a>
                <a href="https://www.baidu.com">项目推广扶持</a>
              </div>
              <div class="in_footnav">
                <span>技术支持</span>
                <a href="https://www.baidu.com">服务支持</a>
                <a href="https://www.baidu.com">问题解答</a>
              </div>
            </div>
            <div class="in_foos_t_r">
              <div class="in_followus">
                <span>关注我们</span>
                <div class="wx_ewm">
                  <img src="../assets/weixin.jpg" width="100" height="100"><!--<span>官方微信</span>-->
                </div>
              </div>
              <div class="in_tel"><span>服务热线</span>
                <div class="in_tel_text">400-888-8888
                </div>
              </div>
            </div><br clear="all">
          </div>
        </el-footer>
      </div>
    </div>
</template>

<script>
  import * as req from '@/utils/api'
  export default {
    name: "Index",
    data() {
      return {
        defaultActive: '/index',
        typeList: []
      }
    },
    mounted() {
      this.defaultActive = this.$route.path
      console.log(this.$route.path)
      req.getRequest('/productType/getTypeList',{}).then(res => {
        this.typeList = res.data.result || []
      }).catch(e => {
        console.log(e);
      })
    },
    beforeRouteEnter (to, from, next) {
      console.log('1',to, from);
      next()
    },
    beforeRouteUpdate (to, from, next) {
      console.log('11',to, from);
      next()
    },
    beforeRouteLeave (to, from, next) {
      console.log('111',to, from);
      next()
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);

        if(keyPath[0] != '/productCenter')
          this.$router.push({
            path: key,
          })
        else
          this.$router.push({
            name: `productCenter`,
            query: {
              tag: key
            }
          })
      },
      linkTo(path) {
        this.$router.push({ name: path })
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
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
  .in_footnav > *, .in_foos_t_r > * {
    height: 40px;
    width: 200px;
    display: block;
    font-size: 13px;
    font-weight: bold;
    padding-bottom: 8px;
  }

  .in_foos_t_l .in_footnav,.in_foos_t_r .in_tel, .in_foos_t_r .in_followus {
    display: inline-block;
    vertical-align: top;
  }

  .in_foos_t_l, .in_foos_t_r {
    display: inline-block;
    vertical-align: top;
  }
</style>
