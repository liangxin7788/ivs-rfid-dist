<template>
  <div>
    <div class="bar">
      <el-button @click="backPerv" icon="el-icon-arrow-left" round>return</el-button>
    </div>

    <el-row :gutter="20">
      <el-col :span="6" :offset="6">
        <div class="grid-content bg-purple">
          <img :src="bigImg || images[0]" style="width: 100%; height: 100%">
        </div>
        <div>
          <img v-for="item in images"  :src="item" @click="bigImg = item">
        </div>
      </el-col>

      <el-col :span="6" :offset="1">
        <div class="grid-content bg-purple">
          {{productDetailObj.description}}
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="16"><div class="grid-content bg-purple">
        <span style="font-size: 20px">Related Tags</span>
      </div></el-col>
    </el-row>

<!--    <el-container>-->
<!--      <el-aside width="30%" class="aside">-->
<!--        <el-image :src="productDetailObj.images">-->
<!--          <div slot="placeholder" class="image-slot">-->
<!--            Loading...<span class="dot">...</span>-->
<!--          </div>-->
<!--        </el-image>-->
<!--      </el-aside>-->
<!--      <el-main >-->
<!--        <el-form  label-width="100px" size="medium" label-position="left" class="form">-->
<!--          <el-form-item  label="cnName :">{{productDetailObj.cnName}}</el-form-item>-->
<!--          <el-form-item  label="enName :">{{productDetailObj.enName}}</el-form-item>-->
<!--          <el-form-item  label="application :">{{productDetailObj.application}}</el-form-item>-->
<!--          <el-form-item  label="size :">{{productDetailObj.size}}</el-form-item>-->
<!--          <el-form-item  label="model :">{{productDetailObj.model}}</el-form-item>-->
<!--          <el-form-item  label="chipType :">{{productDetailObj.chipType}}</el-form-item>-->
<!--          <el-form-item  label="description :">{{productDetailObj.description}}</el-form-item>-->
<!--        </el-form>-->
<!--      </el-main>-->
<!--    </el-container>-->
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
        images: []
      }
    },
    methods: {
      getProductDetail(id) {
        req.getRequest("/productInfo/getProductDetail",
          {productId: id}
        ).then(res => {
          let data = res.data.result
          this.productDetailObj = data
          this.images = data.images.split(',')
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


</style>
