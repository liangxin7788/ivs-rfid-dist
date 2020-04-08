<template>
  <div>
    <div class="bar">
      <el-button @click="backPerv" icon="el-icon-arrow-left" round>Back</el-button>
    </div>

    <el-row :gutter="20" style="margin-bottom: 50px">
      <el-col :span="6" :offset=6>
        <div class="grid-content bg-purple">
          <img :src="bigImg || images[0]" style="width: 400px; height: 200px">
        </div>
        <div style="margin-top: 60px">
          <img v-for="item in images"  :src="item" @click="bigImg = item" style="width: 100px; height: 50px">
        </div>
      </el-col>

      <el-col :span="8" :offset=1>
          <div v-for="card in cards" :key="card" class="box-card" style="height: 30%">
            {{card }}
          </div>
      </el-col>
    </el-row>


    <el-row :gutter="24">
      <el-col :span="16" offset=4>
        <div class="relatedCss">
          <span style="font-size: 20px">Detailed Product Description</span>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="10" offset=6>
          <div v-for="param in detailParams" :key="card" style="text-align: left; font-size: 16px; line-height: 25px;margin-top: 10px; margin-bottom: 10px">
            {{param }}
          </div>
      </el-col>
    </el-row>


    <el-row :gutter="24">
      <el-col :span="16" offset=4><div class="relatedCss">
        <span style="font-size: 20px">Related Tags</span>
      </div></el-col>
    </el-row>

    <el-row :gutter="24">
<!--      <el-col :span="10" offset=6>-->
<!--        <div v-for="item in productSimilars">-->
<!--          <img :src="item.imageUrl" @click="getProductDetail(item.productId)" style="width: 40%; height: 50%">-->
<!--          <span>{{item.title}}</span>-->
<!--        </div>-->
<!--      </el-col>-->
      <el-col :span="10" offset=6>
        <el-carousel autoplay="false" type="card" arrow="always" indicator-position="none" height="200px">
          <el-carousel-item v-for="item in productSimilars" :key="item">
            <el-row>
              <el-col>
                <img :src="item.imageUrl" @click="getProductDetail(item.productId)" style="width: 70%; height: 80%">
              </el-col>
              <el-col>
                <span>{{item.title}}</span>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </el-col>

<!--      <div v-for="item in productSimilars">-->
<!--        <img :src="item.imageUrl" @click="getProductDetail(item.productId)" style="width: 40%; height: 50%">-->
<!--        <span>{{item.title}}</span>-->
<!--      </div>-->

    </el-row>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
  export default {
    name: "ProductDetail",
    data() {
      return {
        productDetailObj: {},
        bigImg: '',
        productSimilars: [],
        cards: [],
        detailParams: [],
        images: []
      }
    },
    methods: {
      getProductDetail(id) {
        req.getRequest("/productInfo/getProductDetail", {productId: id}
        ).then(res => {
          let data = res.data.result
          this.productDetailObj = data
          // console.log(this.productDetailObj.description);
          this.images = data.images && data.images.split(',') || []
          this.productSimilars = data.productSimilars
          this.cards = data.description.split('\n') || []
          this.detailParams = data.detailParam.split('\n') || []
          console.log(data);
        }).catch(err => {
          console.log(err);
        })
      },
      backPerv() {
        this.$router.back()
      }
    },
    mounted() {
      let productId = this.$route.query.id
      this.getProductDetail(productId)

    }
  }
</script>

<style scoped>
  .bar {
    display: flex;
    margin-left: 15%;
  }
  .form{
    float: left;
  }
  .aside{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /*.relatedCss {*/
  /*  border-radius: 4px;*/
  /*  min-height: 36px;*/
  /*}*/
  .relatedCss {
    background: #99a9bf;
    text-align: left;
  }

  .box-card {
    /*width: 500px;*/
    /*height: 600px;*/
    text-align: left;
    font-size: 16px;
    line-height: 25px;
  }
</style>
