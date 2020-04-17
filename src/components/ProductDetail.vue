<template>
  <div>
    <div class="bar">
      <el-button @click="backPerv" icon="el-icon-arrow-left" round>Back</el-button>
    </div>

    <el-row :gutter="20" style="margin-bottom: 50px">
      <el-col :span="6" :offset="6">
        <div class="grid-content bg-purple">
          <img :src="bigImg || images[0]" style="width: 400px; height: 200px">
        </div>
        <div style="margin-top: 60px">
          <img v-for="item in images"  :src="item" @click.capture="imgSel(item)" style="width: 100px; height: 50px">
        </div>
      </el-col>

      <el-col :span="10">
        <el-col :span="12" :offset="1">
          <div v-for="card in cards" :key="card" class="box-card" style="height: 30%">
            {{card}}
          </div>
        </el-col>

        <el-col :offset="2" style="margin-top: 40px">
          <div style="text-align: left">
            <el-button @click="download(productId)" style="font-size: 16px; background: paleturquoise"><i class="el-icon-download"></i>Download DataSheet</el-button>
          </div>
        </el-col>
      </el-col>

    </el-row>


    <el-row :gutter="24">
      <el-col :span="16" :offset="4">
        <div class="relatedCss">
          <span style="font-size: 20px">Detailed Product Description</span>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="10" :offset="6">
          <div v-for="param in detailParams" :key="param" style="text-align: left; font-size: 16px; line-height: 25px;margin-top: 10px; margin-bottom: 10px">
            {{param }}
          </div>
      </el-col>
    </el-row>


    <el-row :gutter="24">
      <el-col :span="16" :offset="4"><div class="relatedCss">
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
      <el-col :span="10" :offset="6">
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
        productId: '',
        productPDFName: '',
        productSimilars: [],
        cards: [],
        detailParams: [],
        images: []
      }
    },
    methods: {
      imgSel(item) {
        console.log('imgSel = ', item)
        this.bigImg = item
      },
      getProductDetail(id) {
        req.getRequest("/productInfo/getProductDetail", {productId: id}
        ).then(res => {
          let data = res.data.result
          this.productDetailObj = data
          // console.log(this.productDetailObj.description);
          this.images = data.images && data.images.split(',') || []
          this.productSimilars = data.productSimilars
          this.productPDFName = data.enName
          this.cards = data.description.split('\n') || []
          this.detailParams = data.detailParam.split('\n') || []
          console.log(this.productPDFName + '====================');
        }).catch(err => {
          console.log(err);
        })
      },
      backPerv() {
        this.$router.back()
      },
      download(id){
        req.download("/productInfo/downloadPDF",{productId: id}
        ).then(
          res => {
          console.log(res)
          var blob = res.data;
          var reader = new FileReader();
          reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
          reader.onload = function (e) {
            // 转换完成，创建一个a标签用于下载
            var a = document.createElement("a");
            a.download = res.headers['content-disposition'].split(";")[1].split("filename=")[1];
            a.href = e.target.result;
            a.click();
            a.remove()
          }
          }

          // function (res) {
          //   var fileName = res.headers("Content-Disposition").split(";")[1].split("filename=")[1];
          //   var blob = res.data;
          //   var reader = new FileReader();
          //   reader.readAsDataURL(blob);
          //   reader.onload = function (e) {
          //     // 创建一个a标签用于下载
          //     var a = document.createElement('a');
          //     a.download = fileName;
          //     a.href = e.target.result;
          //     $("body").append(a);
          //     a.click();
          //     $(a).remove();
          //   }
          ).catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      let productId = this.$route.query.id
      this.productId = productId
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
