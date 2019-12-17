<template>
  <div class="mainContent">
    <el-form class="contentForm" inline label-width="100px" label-position="left">

      <el-form-item label="product name">
        <el-input v-model="productName"></el-input>
      </el-form-item>

      <el-form-item label="tag type">
        <el-select>
          <el-option :value="type" v-for="type in typeList" :key="type">
            {{type.typeEn}}
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
    export default {
      name: "ProductCenter",
      watch: {
        '$route': function (){
          let query = this.$route.query
          console.log(query.tag)
        }
      },
      data() {
        return {
          productList: [],
          typeList: []
        }
      },
      // methods: {
      //   doSearch () {
      //     req.postRequest('/productInfo/getProductList',{
      //       productTypeCode: this.productTypeCode || undefined,
      //       productTitle: this.productTitle || undefined,
      //       pageIndex: this.pageIndex || 0,
      //       pageSize: this.pageSize || undefined,
      //     }).then(res => {
      //       this.productList = res.data.result || []
      //     }).catch(e => {
      //       console.log(e);
      //     })
      //   }
      // },
      // created() {
      //   this.doSearch()
      // },
      mounted() {
        let query = this.$route.query
        console.log(JSON.parse(query.tag))
        let result = JSON.parse(query.tag)

        req.postRequest('/productInfo/getProductList',{
          productTypeCode: result.typeCode,
          pageIndex: this.pageIndex || 0,
          pageSize: this.pageSize || 10,
        }).then(res => {
          this.productList = res.data.result || []
        }).catch(e => {
          console.log(e);
        })

        req.getRequest('/productType/getTypeList',{}).then(res => {
          this.typeList = res.data.result || []
        }).catch(e => {
          console.log(e);
        })
      },

    }
</script>

<style scoped>
  .contentForm {
    line-height: 40px;
  }
</style>
