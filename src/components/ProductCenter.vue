<template>
  <div class="mainContent">

<!--    <el-form class="contentForm" inline label-width="100px" label-position="right">-->
<!--      <el-form-item label="product name">-->
<!--        <el-input v-model="productTitle" placeholder="enter name"></el-input>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="tag type">-->
<!--        <el-select v-model="productTypeCode" clearable>-->
<!--          <el-option :value="type.typeCode" v-for="type in typeList" :key="type">-->
<!--            {{type.typeEn}}-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->

<!--      <el-form-item>-->
<!--        <el-button type="primary" plain @click="doSearch">Search</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

    <el-table
      @row-click="handleRowClick"
      v-loading="loading"
      :data="pagination.records"
      fit
      size="medium"
      min-height="500"
      style="width: 67%;margin: 30px auto"
    >
      <el-table-column
        label="Sample Picture"
        width="180">
        <template slot-scope="scope">
          <el-image @click.stop="imgClick(scope.row)" :src="scope.row.images.split(',')[0]"
               style="width: auto; height: auto">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="enName"
        label="Product Name">
      </el-table-column>
      <el-table-column
        prop="model"
        label="Model">
      </el-table-column>
      <el-table-column
        prop="size"
        label="Dimension">
      </el-table-column>
      <el-table-column
        prop="chipType"
        label="Chip Type">
      </el-table-column>
      <el-table-column
        prop="readingRange"
        label="Reading Range">
      </el-table-column>
      <el-table-column
        prop="application"
        label="Applications">
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 15px"
      background
      slot="append"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrev"
      @next-click="handleNext"
      :current-page="pagination.current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagination.size"
      :total="pagination.total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>


    <!--预览窗口-->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialogVisible"
      width="30%"
    >

      <el-image :src="dialog.imgUrl">
        <div slot="placeholder" class="image-slot">
          Loading...<span class="dot">...</span>
        </div>
      </el-image>
    </el-dialog>
  </div>
</template>

<script>
  import * as req from '@/utils/api'

  export default {
    name: "ProductCenter",
    watch: {
      '$route': function () {
        let query = this.$route.query

        this.productTypeCode = query.tag
        let title = this.$route.query.title
        console.log(query.title)
        this.productTitle = title
        this.doSearch()
      }
    },
    data() {
      return {
        loading: true,
        // productList: [],
        typeList: [],
        productTypeCode: undefined,
        productTitle: undefined,
        // pageIndex: 1,
        // pageSize: 10,
        pagination: {
          records: [],
          total: 0,
          size: 10,
          current: 1,
          pages: 1
        },

        dialog: {
          // title: "提示",
          imgUrl: ""
        },
        dialogVisible: false


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

      handleSizeChange(size) {

        this.pagination.size = size
        this.getProductData(this.pagination.current, this.pagination.size, this.productTypeCode);
      },

      handleCurrentChange(current) {

        this.pagination.current = current
        this.getProductData(this.pagination.current, this.pagination.size, this.productTypeCode);
      },

      handlePrev(current) {

        this.pagination.current = current
        this.getProductData(this.pagination.current, this.pagination.size, this.productTypeCode);
      },
      handleNext(current) {
        this.pagination.current = current
        this.getProductData(this.pagination.current, this.pagination.size, this.productTypeCode);
      },

      doSearch() {

        // req.postRequest('/productInfo/getProductList', {
        //   productTypeCode: this.productTypeCode || undefined,
        //   productTitle: this.productTitle || undefined,
        //   pageIndex: this.pagination.current,
        //   pageSize: this.pagination.size ,
        //
        // }).then(res => {
        //
        //   //将分页数据解构赋值到pagination对象
        //   this.pagination = res.data.result
        //   this.loading = false
        // }).catch(e => {
        //   this.loading = false
        // })
        this.getProductData(this.pagination.current, this.pagination.size, this.productTypeCode, this.productTitle);

      },

      /**
       * 获取产品数据列表
       * @param current
       * @param size
       * @param type
       * @param title
       */
      getProductData(current, size, type, title) {
        req.postRequest('/productInfo/getProductList', {
          productTypeCode: type,
          pageIndex: current,
          pageSize: size,
          productTitle: title ? title : ""
        }).then(res => {

          //将分页数据解构赋值到pagination对象
          this.pagination = res.data.result
          this.loading = false

        }).catch(e => {
          console.log(e);
          this.loading = false
        })

      },

      /**
       * 获取分类列表
       */
      getTypeList() {

        req.getRequest('/productType/getTypeList', {}).then(res => {
          this.typeList = res.data.result || []
        }).catch(e => {
          console.log(e);
        })
      },

      /**
       * 图片
       * @param row
       */
      imgClick(row) {

        this.dialog.imgUrl = row.images.split(',')[0]
        // this.dialog.title = row.cnName
        this.dialogVisible = true
      },


      /**
       * 点击表格 行
       * @param row
       * @param column
       * @param event
       */
      handleRowClick(row, column, event){

      this.$router.push("/productDetail?id="+row.id)

      }

    },

    created() {

    },
    mounted() {
      let query = this.$route.query
      let result = query.tag
      this.productTypeCode = result
      this.getProductData(this.pagination.current, this.pagination.size, this.productTypeCode);
      this.getTypeList()
    },

  }
</script>

<style scoped>
  .contentForm {
    line-height: 40px;
  }
</style>
