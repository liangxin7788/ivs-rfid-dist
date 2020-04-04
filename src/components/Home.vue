<template>
  <div>
    <!--    当遇到不需要 title 的场景时, 可以通过 withHeader 这个属性来关闭掉 title 的显示, 这样可以留出更大的空间给到用户, 为了用户的可访问性, 请务必设定 title 的值-->
    <el-drawer
      :title="newsDetailTitle"
      :visible.sync="drawer"
      :with-header="true">
      <span>{{newsDetail && newsDetail[0] && newsDetail[0].content || ''}}</span>
    </el-drawer>
    <el-carousel :interval="5000" class="aaa" style="height: 240px; width: 100%">   <!--arrow="never"  设置了该属性就不会自动轮换照片-->
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <el-image :src="img.url" style="height: auto; width: 100%"></el-image>
      </el-carousel-item>
    </el-carousel>

    <el-row style="margin-top: 100px">
      <el-col :span="7" :offset=3>
        <div class="grid-content bg-purple-dark">
          <span style="font-size: 24px">Product</span>
          <el-button type="primary" plain @click="routerToProducts" style="color: blue; font-size: 10px; margin-left: 10px">more...</el-button>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <span style="font-size: 24px">News</span>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <span style="font-size: 24px">Contact us</span>
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
                <span class="newsCss" style="font-size: 20px; color: black">{{product.enName.slice(0,50)}}</span>
                <span class="newsCss" style="font-size: 20px ; color: black" v-if="product.enName.length > 50">...</span>
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
                <span class="newsCss" style="font-size: 20px; color: black">{{company.title.slice(0,25)}}</span>
                <span class="newsCss" style="font-size: 20px ; color: black" v-if="company.title.length > 25">...</span>
              </el-col>
<!--              <el-col span="6" offset="12">-->
<!--                <span style="font-size: 20px ; color: black">{{company.createAt.substring(0, 10)}}</span>-->
<!--              </el-col>-->
            </el-row>
          </el-button>
        </div>
      </el-col>

      <el-col :span="5" :offset="2">
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
        imgList:[
          {url:require('../assets/Long-image-3.jpg')},
          {url:require('../assets/Long-image-4.jpg')}
        ],
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
