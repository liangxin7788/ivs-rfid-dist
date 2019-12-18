<template>
  <div class="mainContent">
    <el-form class="contentForm" inline label-width="100px" label-position="left">

      <el-form-item label="product name">
        <el-input v-model="productTitle"></el-input>
      </el-form-item>
      <el-form-item label="tag type">
        <el-select v-model="productTypeCode">
          <el-option :value="type.typeCode" v-for="type in typeList" :key="type">
            {{type.typeEn}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="doSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="productList" fit size="medium" @cell-click="cellclick">
      <el-table-column
        label="主图"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.productPic.imageUrl">
        </template>
      </el-table-column>
      <el-table-column
        prop="enName"
        label="名字">
      </el-table-column>
      <el-table-column
        label="详情介绍">
        <template slot-scope="scope">
          <span>{{scope.row.description.slice(0,20)}}</span>
          <span v-if="scope.row.description.length > 20">...</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="上传时间">
      </el-table-column>
      <el-table-column
        prop="model"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="material"
        label="材质">
      </el-table-column>
      <el-table-column
        prop="applyTo"
        label="应用领域">
      </el-table-column>
      <el-pagination
        slot="append"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-table>

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
          typeList: [],
          productTypeCode: undefined,
          productTitle: undefined,
          pageIndex: undefined,
          pageSize: undefined
        }
      },
      methods: {
        // getImage(imgs) {
        //   let image = ''
        //
        //   imgs.forEach(item => {
        //     if(item.isFirstImage)
        //       image = item.imageUrl
        //   });
        //
        //   return image
        // },
        doSearch () {
          req.postRequest('/productInfo/getProductList',{
            productTypeCode: this.productTypeCode || undefined,
            productTitle: this.productTitle || undefined,
            pageIndex: this.pageIndex || 0,
            pageSize: this.pageSize || undefined,
          }).then(res => {
            console.log(res.data.result.records);
            this.productList = res.data.result.records || []
            this.total = res.data.result.total || 0
          }).catch(e => {
            console.log(e);
          })
        }
      },
      // created() {
      //   this.doSearch()
      // },
      mounted() {
        let query = this.$route.query
        // console.log(JSON.parse(query.tag))
        // let result = JSON.parse(query.tag)
        let result = query.tag

        req.postRequest('/productInfo/getProductList',{
          productTypeCode: result,
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
