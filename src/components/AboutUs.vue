<template>
  <div>
    <el-carousel :interval="5000" arrow="never" class="aaa" style="height: 240px; width: 100%">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <el-image :src="img.url" style="height: auto; width: 100%"></el-image>
      </el-carousel-item>
    </el-carousel>

    <el-row>
      <el-col :span="12" :offset=1 style="margin-top: 40px">
        <div class="grid-content bg-purple-dark">
          <span style="font-size: 20px">Company Profile</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12" :offset=6 style="margin-top: 20px">
        <div class="text item" style="line-height: 30px; text-align: left; font-size: 18px">
          {{companyProfile}}
        </div>
      </el-col>
    </el-row>

    <el-row>
        <el-col :span="11" :offset=1 style="margin-top: 60px">
          <div class="grid-content bg-purple-dark">
            <span style="font-size: 20px">Advantage</span>
          </div>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset=6 style="margin-top: 20px">
        <div class="text item" style="line-height: 30px; text-align: left; font-size: 18px">
          {{advantage}}
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11" :offset=1 style="margin-top: 40px">
        <div class="grid-content bg-purple-dark">
          <span style="font-size: 20px">Partner</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset=6>
        <div class="text item" style="line-height: 30px; text-align: left; font-size: 20px">
          <img :src="partner" style="width: auto; height: auto">
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import * as req from '@/utils/api'
  export default {
    name: "AboutUs",
    data(){
      return{
        imgList:[
          {url:require('../assets/Long-image-3.jpg')}
        ],
        aboutUs: [],
        companyProfile: '',
        advantage: '',
        partner: ''
      }
    },
    mounted () {
      req.getRequest('/aboutUs/useAboutUsInfo',{id: 1}).then(res => {
        this.aboutUs = res.data.result || undefined,
        this.companyProfile = res.data.result.companyProfile,
        this.advantage = res.data.result.advantage,
        this.partner = res.data.result.partner
      }).catch(e => {
        console.log(e);
      })
    },
    methods: {

    }
  }
</script>

<style scoped>

  .aaa  .el-carousel__container {
    height: 240px;
    margin: 0;
    padding: 0;
  }

</style>
