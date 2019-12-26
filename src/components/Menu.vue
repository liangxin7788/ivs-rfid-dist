<template>
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
</template>

<script>
    export default {
        name: "Menu"
    }
</script>

<style scoped>

</style>
