<template>
  <div style="font-size: 30px">
    <el-row :gutter="20" v-for="(application, index) in applicationDetail" :key="index">
      <el-col :span="6" :offset="4" style="margin-top: 40px">
        <div class="grid-content bg-purple">
          <img :src="application.images.split(',')[0]">
        </div>
      </el-col>

      <el-col :span="8"><div class="grid-content bg-purple">
        <el-row style="margin-top: 20px; text-align: left; font-size: 20px">
          <el-col>
            <span>{{application.appType}}</span>
          </el-col>

          <el-col style="margin-top: 15px">
            <span>{{application.description.slice(0,showLength)}}</span>
            <span v-if="application.description.length > showLength">...</span>
          </el-col>
          <div>
            <span v-if="showLength == 200" @click="showLength = application.description.length" style="text-decoration: underline; color: blue; margin-left: 75%">Read more</span>
            <span v-else @click="showLength = 200" style="text-decoration: underline; color: blue; margin-left: 75%">Close...</span>
          </div>
        </el-row>
      </div></el-col>
    </el-row>

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
          showLength: 200,
          title: undefined
        }
      },
      mounted () {
        this.getAppDetail()
      },
      methods: {
        getAppDetail (data) {
          req.getRequest('/application/getAppList',{appType: data}).then(res => {
            this.applicationDetail = res.data.result || undefined
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

  /*.el-carousel__item:nth-child(2n) {*/
  /*  background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*  background-color: #d3dce6;*/
  /*}*/
  .imageClass{
    margin: 15% 0 5px 0;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
