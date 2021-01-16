<template>
  <div>
    <!--    当遇到不需要 title 的场景时, 可以通过 withHeader 这个属性来关闭掉 title 的显示, 这样可以留出更大的空间给到用户, 为了用户的可访问性, 请务必设定 title 的值-->
    <el-drawer
      :title="newsDetailTitle"
      :visible.sync="drawer"
      :with-header="true">
      <div style="text-align: left; line-height: 30px">
        <span style="margin-left: 20px;">{{newsDetail && newsDetail[0] && newsDetail[0].content || ''}}</span>
      </div>
    </el-drawer>

    <div class="imageClass">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="item" style="width: auto; height: auto">
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-row style="margin-top: 100px; font-size: 16px">
      <el-col :span="7" :offset=3>
        <div class="grid-content bg-purple-dark">
          <span>Product</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" plain @click="routerToProducts" style="color: blue; font-size: 8px; margin-left: 10px">more...</el-button>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <span>News</span>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <span>Contact us</span>
        </div>
      </el-col>
    </el-row>
<!-- 具体内容区 -->
    <el-row>
      <el-col :span="4" :offset="5">
        <div style="line-height: 40px; text-align: left; margin-top: 10px" v-for="(product, index) in homeProducts" :key="index" class="text item">
          <el-button
            type="text"
            @click="routerToDetail(product.id)"><i class="el-icon-star-on"></i>
                <span class="newsCss" style="font-size: 14px; color: black">{{product.enName.slice(0,50)}}</span>
                <span class="newsCss" style="font-size: 14px ; color: black" v-if="product.enName.length > 50">...</span>
          </el-button>
        </div>
      </el-col>

      <el-col :span="4" :offset=2>
        <div style="line-height: 30px; text-align: left"  v-for="(company, index) in companys.slice(1, 5)" :key="index" class="text item">
          <el-button
            type="text"
            @click="getNewsDetail(company.id)">
            <el-row>
              <el-col span="6">
                <i class="el-icon-news"></i>
                <span class="newsCss" style="font-size: 14px; color: black">{{company.title.slice(0,25)}}</span>
                <span class="newsCss" style="font-size: 14px ; color: black" v-if="company.title.length > 25">...</span>
              </el-col>
            </el-row>
          </el-button>
        </div>
      </el-col>

      <el-col :span="5" :offset="2" style="font-size: 14px">
        <div style="line-height: 48px; text-align: left; margin-top: 10px">
          <span><i class="el-icon-message"></i> E-Mail: sharon.loo@outlook.com</span><br>
          <span><i class="el-icon-mobile-phone"></i> Phone: +86 158 1429 5175</span><br>
          <span><i class="el-icon-phone"></i> Tel: +0755 7852074</span><br>
          <span><i class="el-icon-chat-dot-round"></i> Skype: iwinstech</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
  export default {
    name: "Home",
    data(){
      return{
        imgList:["http://liangxin.fun/027dea2b69e44eea8294fe55dd41ea54.jpg", "http://liangxin.fun/a90ca363d6774e8ab783b4c866ea3136.jpg", "http://liangxin.fun/d44d4b1652f245cba98865b939815eb7.jpg"],
        title: this.title || undefined,
        content: this.content || undefined,
        createAt: this.createAt || undefined,
        newsDetail: [],
        companys: [],
        homeProducts: [],
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
      }),
      req.getRequest('/productInfo/getHomeProducts').then(res =>{
        this.homeProducts = res.data.result
      }).then(res => {
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
      },
      routerToDetail (data){
        this.$router.push("/productDetail?id="+data)
      },
      routerToProducts (){
        this.$router.push({name: `productCenter`})
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
