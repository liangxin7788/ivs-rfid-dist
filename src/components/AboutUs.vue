<template>
  <div>
<!--    当遇到不需要 title 的场景时, 可以通过 withHeader 这个属性来关闭掉 title 的显示, 这样可以留出更大的空间给到用户, 为了用户的可访问性, 请务必设定 title 的值-->
    <el-drawer
      :title="newsDetailTitle"
      :visible.sync="drawer"
      :with-header="true">
      <span>{{newsDetail && newsDetail[0] && newsDetail[0].content || ''}}</span>
    </el-drawer>
    <el-carousel :interval="5000" arrow="never" class="aaa" style="height: 240px; width: 100%">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <el-image :src="img.url" style="height: auto; width: 100%"></el-image>
      </el-carousel-item>
    </el-carousel>

    <el-row>
      <el-col :span="6" :offset="6">
        <div class="grid-content bg-purple-dark">
          <span style="font-size: 24px">{{title}}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <span style="font-size: 24px">News</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6" :offset="6">
        <div class="text item" style="line-height: 30px; text-align: left; font-size: 20px">
          {{content}}
        </div>
      </el-col>
      <el-col :span="6" :offset="1">
        <div style="line-height: 30px; text-align: left"  v-for="(company, index) in companys.slice(1, showLength)" :key="index" class="text item">
          <el-button
            type="text"
            @click="getNewsDetail(company.id)">
            <span class="newsCss" style="font-size: 20px; color: black">{{company.title.slice(0,50)}}</span>
            <span class="newsCss" style="font-size: 20px ; color: black" v-if="company.title.length > 50">...</span>
          </el-button>
        </div>
        <div>
          <span v-if="showLength == 11" @click="showLength = companys.length" style="text-decoration: underline">Open...</span>
          <span v-else @click="showLength = 11" style="text-decoration: underline">Close...</span>
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
          // {url:require('../assets/Long-image-4.jpg')}
        ],
        title: this.title || undefined,
        content: this.content || undefined,
        createAt: this.createAt || undefined,
        newsDetail: [],
        companys: [],
        showLength: 11,
        newsDetailTitle: this.newsDetailTitle,
        drawer: false
      }
    },
    mounted () {
      req.getRequest('/company/getCompanyInfo',{
        title: this.title || undefined,
        content: this.content || undefined,
        createAt: this.createAt || undefined
      }).then(res => {
        this.title = res.data.result.title || undefined
        this.content = res.data.result.content || undefined
        this.createAt = res.data.result.createAt || undefined
      }).catch(e => {
        console.log(e);
      }),
        req.getRequest('/company/getNewsTitle',{}).then(res => {
          this.companys = res.data.result//.map(item => item.cnName) || []
        }).catch(e => {
          console.log(e);
        })
    },
    methods: {
      getNewsDetail (data){
        this.drawer = true
        req.getRequest('/company/getNews',{newsId: data}).then(res => {
          this.newsDetail = res.data.result || undefined,
          this.newsDetailTitle = res.data.result[0].title || undefined
        }).catch(e => {
          console.log(e);
        })
      }

    }
  }
</script>

<style scoped>
  .card{
    margin-right: 30px;
    width: 350px;
  }
  .column-style{
  }
  .aaa  .el-carousel__container {
    height: 240px;
    margin: 0;
    padding: 0;
  }
  .newsCss:hover{
    text-decoration: underline
  }

</style>
