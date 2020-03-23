<template>
  <el-row>
    <el-col :span="6">
      <dl>
        <dt>company info</dt>
        <dd><a @click="linkTo('aboutUs')">aboutUs</a></dd>
        <dd><a href="linkTo('connectUs')">connect us</a></dd>
      </dl>
    </el-col>

    <el-col :span="6">
      <dl>
        <dt>partner</dt>
        <dd><a href="https://www.baidu.com">项目推广扶持</a></dd>
      </dl>
    </el-col>

    <el-col :span="6">
      <dl>
        <dt>support</dt>
        <dd><a href="https://www.baidu.com">服务支持</a></dd>
        <dd><a href="https://www.baidu.com">问题解答</a></dd>
      </dl>
    </el-col>
    <el-col :span="6">
      <dl>
        <dt>关注我们</dt>
        <dd>
          <div class="wx_ewm">
            <img src="../assets/weixin.jpg" width="100" height="100">
          </div>
        </dd>
      </dl>
    </el-col>
  </el-row>

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
