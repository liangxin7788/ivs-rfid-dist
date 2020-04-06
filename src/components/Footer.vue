<template>
  <div>
    <el-row :gutter="24" style="margin-top: 30px">
      <el-col :span="2" offset=7>
        <span @click="routerToHome" style="text-decoration: underline; font-size: 16px">Home</span>
      </el-col>

      <el-col :span="2">
        <span @click="routerToAboutUs" style="text-decoration: underline; font-size: 16px">About us</span>
      </el-col>

      <el-col :span="2">
        <span @click="routerToProducts" style="text-decoration: underline; font-size: 16px">Product</span>
      </el-col>

      <el-col :span="2">
        <span @click="routerToSolution" style="text-decoration: underline; font-size: 16px">Solution</span>
      </el-col>

      <el-col :span="2">
        <span @click="routerToContactUs" style="text-decoration: underline; font-size: 16px">Contact us</span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 100px; font-size: 16px">
      <el-col :span="12" offset="6">
        <span>@ Shenzhen IWINS Technologies Co., Ltd All rights reserved</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    methods: {
      routerToHome (){
        this.$router.push({name: `home`})
      },
      routerToAboutUs (){
        this.$router.push({name: `aboutUs`})
      },
      routerToProducts (){
        this.$router.push({name: `productCenter`})
      },
      routerToSolution (){
        this.$router.push({name: `applicationExample`})
      },
      routerToContactUs (){
        this.$router.push({name: `contactUs`})
      }
    }
  }
</script>

<style scoped>
  dt {
    color: #ffffff;
    font-weight: bold;
    /*margin-bottom: 15px;*/
    margin: 10px 0 5px 0;
  }

  dd, a {
    margin: 10px 0 5px 0;
    color: #adaeb3;
    text-decoration: none;
    transition: all 300ms;
  }

  a:hover {
    cursor: pointer;
    color: #00A0DE;
  }

</style>
