<template>
  <div>
    <h3>{{title}}</h3>
    <div>
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <img :src="img.url">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
    export default {
      name: "ApplicationExample",
      components: {
      },
      data () {
        return {
          imgList:[
            {url:require('../assets/ring.png')},
            {url:require('../assets/book.jpg')},
            {url:require('../assets/clothes.jpg')},
            {url:require('../assets/tyre.jpg')}

          ],
          title: undefined
        }
      },
      mounted () {
        req.getRequest('/applicationExample/getTitle',{}).then(res => {
          this.title = res.data.result || undefined
        }).catch(e => {
          console.log(e);
        })
      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
