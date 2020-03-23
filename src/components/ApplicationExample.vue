<template>
  <div style="font-size: 30px">
    <el-row :gutter="20">
      <el-col :span="6"  :offset="6"><div class="grid-content bg-purple">
        <div style="line-height: 30px; text-align: left"  v-for="(applicationName, index) in applicationNames" :key="index">
          <el-button
            type="text"
            @click="getAppDetail(applicationName)">
            <span style="font-size: 20px">{{applicationName}}</span>
          </el-button>
        </div>
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-purple">
        {{description}}
      </div></el-col>
    </el-row>

    <div class="imageClass">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <img :src="img" style="width: auto; height: auto">
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
          applicationDetail: [],
          applicationNames: [],
          // imgList:[
          //   {url:require('../assets/ring.png')},
          //   {url:require('../assets/book.jpg')},
          //   {url:require('../assets/clothes.jpg')},
          //   {url:require('../assets/tyre.jpg')}
          // ],
          imgList:[],
          title: undefined,
          description: undefined
        }
      },
      mounted () {
        req.getRequest('/application/getAppNames',{}).then(res => {
          this.applicationNames = res.data.result || undefined
        }).catch(e => {
          console.log(e);
        })
      },
      methods: {
        getAppDetail (data) {
          req.getRequest('/application/getAppList',{appType: data}).then(res => {
            this.applicationDetail = res.data.result || undefined
            this.imgList = this.applicationDetail.images.split(',') || undefined
            this.description = this.applicationDetail.description || undefined
          }).catch(e => {
            console.log(e);
          })
        }
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
  .imageClass{
    margin: 15% 0 5px 0;
  }
</style>
