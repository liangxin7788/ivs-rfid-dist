<template>



    <el-row>

      <el-col :span="4">

        <dl>
          <dt>关于我们</dt>
          <dd><a @click="linkTo('applicationExample')">公司概况</a></dd>
          <dd><a href="https://www.baidu.com">新闻动态</a></dd>
          <dd><a href="https://www.baidu.com">联系我们</a></dd>
        </dl>

      </el-col>

      <el-col :span="4">

        <dl>
          <dt>系统集成伙伴</dt>
          <dd><a href="https://www.baidu.com">产品及技术支持</a></dd>
          <dd><a href="https://www.baidu.com">项目推广扶持</a></dd>
        </dl>

      </el-col>


      <el-col :span="4">

        <dl>

          <dt>技术支持</dt>
          <dd><a href="https://www.baidu.com">服务支持</a></dd>
          <dd><a href="https://www.baidu.com">问题解答</a></dd>

        </dl>
      </el-col>

      <el-col :span="4">

        <dl>
          <dt>关注我们</dt>
          <dd>
            <div class="wx_ewm">
              <img src="../assets/weixin.jpg" width="100" height="100"><!--<span>官方微信</span>-->
            </div>
          </dd>
        </dl>

      </el-col>

      <el-col :span="4">

        <dl>
          <dt>服务热线</dt>
          <dd>400-888-8888</dd>
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
    margin-bottom: 15px;

  }

  dd, a {
    margin: 0 0 5px 0;
    color: #adaeb3;
    text-decoration: none;
    transition: all 300ms;
  }

  a:hover {
    cursor: pointer;
    color: #00A0DE;
  }


</style>
