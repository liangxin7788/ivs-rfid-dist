<template>
  <el-container>
    <!-- 头部-->
    <el-header >
      <el-row :gutter="20" >
        <el-col :span="20" style="margin: 0 auto;float: none" >
          <el-menu :default-active="defaultActive" class="el-menu-header" mode="horizontal"
                   @select="handleSelect" style="margin-left: 25%">
            <el-menu-item index="0"><img src="http://liangxin.fun/logo.jpg" style="width: 100px; height: 40px"></el-menu-item>
            <el-menu-item index="/index">Home</el-menu-item>
            <el-menu-item index="/aboutUs">About Us</el-menu-item>
            <el-submenu index="/productCenter">
              <template slot="title">Product</template>
              <el-menu-item  :index="JSON.stringify(type)" v-for="(type, index) in typeList" :key="index">
                {{type.typeEn}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/applicationExample">Solution</el-menu-item>
            <el-menu-item index="/contactUs">Contact Us</el-menu-item>
            <el-menu-item index="/admin" v-show="isAdmin">Manager Center</el-menu-item>
            <el-menu-item index="1">
              <div :span="4" style="height: 60px;line-height: 60px;border-bottom: 1px solid #eee">
                <el-button type="primary" @click="signInDialog" v-show="!isAdmin">Sign In</el-button>
                <el-button type="danger" plain  @click="logout" v-show="isAdmin">
                  <i class="el-icon-switch-button" color="red"></i>
                  logout</el-button>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>

    <!--    内容区-->
    <el-main class="navLi" style="min-height: 700px;padding: 0;">
      <router-view/>
    </el-main>

    <!--底部-->
    <el-footer class="myFooter" height="200px">
      <Footer></Footer>
    </el-footer>

    <div>
      <el-dialog
        @close="dialogVisible=false"
        title="登录"
        :visible="dialogVisible"
        width="350px"
      >

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input placeholder="请输入账号" v-model="form.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
          </el-form-item>
        </el-form>

        <el-button class="loginBtn" type="primary" round @click="signIn">登 录</el-button>

      </el-dialog>
    </div>

  </el-container>
</template>

<script>
  import * as req from '@/utils/api'
  import utils from '@/utils/utils'
  import Footer from "./Footer";
  export default {
    name: "Index",
    components: {
      Footer
    },
    data() {
      return {
        isAdmin: false,
        defaultActive: '/home',
        typeList: [],
        dialogVisible: false,
        form:{
          username: '',
          password: ''
        }
      }
    },
    watch: {
      $route (to, from1) {
        this.defaultActive = to.path == '/home' ? '/index' : to.path
        this.defaultActive = to.path == '/aboutUs' ? '/aboutUs' : to.path
        this.defaultActive = to.path == '/productCenter' ? '//productCenter' : to.path
        this.defaultActive = to.path == '/applicationExample' ? '/applicationExample' : to.path
        this.defaultActive = to.path == '/contactUs' ? '/contactUs' : to.path

        console.log('$route = ',to.path, from1.path,this.defaultActive);
        if(to.path === '/admin' && !utils.getCookie('username')) {
          this.dialogVisible = true
        }
      }
    },
    mounted() {
      this.isAdmin = !!utils.getCookie('username')
      this.defaultActive = this.$route.path == '/productCenter' ? 10 : this.$route.path
      // console.log(this.$route.path)
      req.getRequest('/productType/getTypeList', {}).then(res => {
        this.typeList = res.data.result || []
      }).catch(e => {
        console.log(e);
      })
    },
    methods: {
      handleSelect(key, keyPath) {
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
      signInDialog() {
        this.dialogVisible = true
      },
      logout () {
        this.$confirm('是否确认退出？', '警告',{
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          utils.deleteCookie('username')
          this.$router.push('/home')
          this.isAdmin = false
          this.defaultActive = '/home'
          this.$message({
            type: 'success',
            message: '已退出管理员'
          });
        })
      },
      signIn(){
        req.postRequest("/login",
          {
            "userName": this.form.username,
            "password": this.form.password
          })
          .then(res=>{
            this.dialogVisible = false
            if (!res.data.success){
              this.isAdmin = false
              this.$message.error({
                message: res.data.errorMsg
              });
            }else {
              this.$message.success({
                message: '登陆成功!'
              });
              this.isAdmin = true
              this.$router.push({path: "/admin"})
              this.defaultActive = '/admin'
              //保存用户数据到本地
              utils.setCookie('username', this.form.username)
              // localStorage.setItem("userInfo", JSON.stringify(res.data.result))

            }

          }).catch(err=>{

          console.log(err);
        })

      }

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
  .loginBtn{
    width: 50%;
  }

</style>
