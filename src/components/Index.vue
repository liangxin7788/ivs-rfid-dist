<template>

  <el-container>
    <!--    头部-->
    <el-header height="120px">
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
        <el-button type="primary" @click="signInDialog">Sign In</el-button>
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

    <div>
      <el-dialog
        :before-close="()=>{dialogVisible = false}"
        title="登录"
        :visible="dialogVisible"
        width="30%"
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
  import Footer from "./Footer";

  export default {
    name: "Index",
    components: {
      Footer
    },

    data() {
      return {
        defaultActive: '/index',
        typeList: [],
        dialogVisible: false,
        form:{
          username: '',
          password: ''
        }
      }
    },
    mounted() {
      console.log(this.$router);
      this.defaultActive = this.$route.path
      // console.log(this.$route.path)
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
      // linkTo(path) {
      //   this.$router.push({name: path})
      //   this.defaultActive = '/' + path
      //
      //   console.log(this.defaultActive)
      // },

      signInDialog() {
        this.dialogVisible = true
      },

      signIn(){

        req.postRequest("/login",
          {
            "userName": this.form.username,
            "password": this.form.password
          })
          .then(res=>{
            if (res.result === null){
              this.$message.error({
                message: res.data.errorMsg
              });
            }else {
              this.$message.success({
                message: '登陆成功!'
              })

              this.$router.push({path: "/admin"})

              //保存用户数据到本地
              localStorage.setItem("userInfo", JSON.stringify(res.data.result))

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
