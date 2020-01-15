<template>
  <div>
    <div>
      <el-carousel :interval="5000" arrow="always" class="aaa" style="height: 240px; width: 100%">
        <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <el-image :src="img.url" style="height: auto; width: 100%"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <br>
    <br>
    <br>
    <div class="main">
      <div class="a" v-for="item in introduction.split('\n')">{{item}}</div>
      <div class="b">右边暂缺</div>
    </div>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
    export default {
      name: "ContactUs",
      data() {
        return {
          imgList:[
            {url:require('../assets/Long-image-3.jpg')},
            {url:require('../assets/Long-image-4.jpg')}
          ],
          introduction: ''
        }
      },
      mounted() {
        this.introduction = 'Company: SZ IVS Technologies CO.,LTD.\n' +
          'Address: 深圳市龙岗区平湖街道新木社区新木路321-3号新木半里大厦C座1413\n' +
          'Tel: (0755)8888 8888\nFax: (0755)8888 8889\nP.C: 351100\nE-mail: Sharon.loo@outlook.com\n' +
          'WhatsApp: +86 158 1429 5175'
      }
    }
</script>

<style >
  .a {
    text-align: left;
    line-height: 30px;
    margin-left: 500px;
    width: 350px;
    /*background: red;*/
    /*float: left;*/
  }
  /*.b {*/
  /*  background: yellow;*/
  /*  float: right;*/
  /*}*/
  .aaa  .el-carousel__container {
    height: 240px;
    margin: 0;
    padding: 0;
  }
</style>
