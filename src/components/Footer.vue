<template>
  <div>
    <el-row :gutter="24" style="margin-top: 10px; font-size: 18px">
      <el-col :span="2" offset="7">
        <span>Home</span>
      </el-col>

      <el-col :span="2">
        <span>About us</span>
      </el-col>

      <el-col :span="2">
        <span>Product</span>
      </el-col>

      <el-col :span="2">
        <span>Solution</span>
      </el-col>

      <el-col :span="2">
        <span>Contact us</span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 100px; font-size: 18px">
      <el-col :span="12" offset="6">
        <span>@ Shenzhen IWINS Technologies Co., Ltd All rights reserved</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Footer"
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
