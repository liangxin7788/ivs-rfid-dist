<template>
  <div>
    <div class="bar">
      <el-button @click="backPerv" icon="el-icon-arrow-left" round>return</el-button>
    </div>

    <el-row :gutter="20">
      <el-col :span="6" :offset=6>
        <div class="grid-content bg-purple">
          <img :src="bigImg || images[0]" style="width: 100%; height: 100%">
        </div>
        <br>
        <br>
        <br>
        <div>
          <img v-for="item in images"  :src="item" @click="bigImg = item">
        </div>
      </el-col>

      <el-col :span="8" :offset=1>
        <div class="descriptionCss">
          {{productDetailObj.description}}
        </div>
      </el-col>
    </el-row>


    <el-row :gutter="24">
      <el-col :span="6" offset=6><div class="grid-content bg-purple">
      </div></el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="16" offset=4><div class="relatedCss">
        <span style="font-size: 20px">Related Tags</span>
      </div></el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="10" offset=6>
        <div v-for="item in productSimilars">
          <img :src="item.imageUrl" @click="getProductDetail(item.productId)" style="width: 40%; height: 50%">
          <span>{{item.title}}</span>
        </div>
      </el-col>
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
        images: []
      }
    },
    methods: {
      getProductDetail(id) {
        console.log(this.productSimilars,id)
        req.getRequest("/productInfo/getProductDetail", {productId: id}
        ).then(res => {
          let data = res.data.result
          this.productDetailObj = data
          this.images = data.images && data.images.split(',') || []
          this.productSimilars = data.productSimilars
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
  }

  .descriptionCss {
    float: left;
  }
</style>
