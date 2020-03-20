<template>
  <div>
    <section style="font-size: 18px;font-weight: 700">产品管理</section>
    <!--搜索添加区域-->

    <el-row :gutter="24" >
      <el-col :span="20" style="display: flex;justify-content: flex-end">
        <el-select v-model="productType" placeholder="请选择">
          <el-option
            v-for="type in productTypes"
            :key="type.value"
            :label="type.label"
            :value="type">
          </el-option>
        </el-select>
        <el-button
          type="primary"
          @click="getProducts"
        >search</el-button>

      </el-col>
      <el-col :span="4">
        <el-button
          inline
          icon="el-icon-plus"
          type="success"
          @click="dialogFormVisible = true">
          添加用户</el-button>
      </el-col>
    </el-row>


    <!--添加产品-->
    <el-dialog
      title="添加产品"
      :visible="dialogFormVisible"
      @close="dialogFormVisible = false">
      123456
    </el-dialog>

<!--表格-->
    <el-table
      :data="tableData"
      stripe
      border
      fit>
      <el-table-column
        fixed
        prop="id"
        label="产品id">
        <template slot-scope="scope">
          <el-image contain style="width: 100px;height: 100px" :src="scope.row.images"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        v-for="col in tableColumns"
        :prop="col.prop"
        :label="col.label">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="danger" @click="doDelete(scope.row)" color="red" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="changePage"
    >
    </el-pagination>
  </div>

</template>

<script>
import * as req from '@/utils/api'
  export default {
    name: "ProductMan",
    data () {
      return {
        dialogFormVisible: false,
        tableColumns: [
          {
            prop: 'id',
            label: 'id'
          },
          {
            prop: 'cnName',
            label: '产品名称'
          },
          {
            prop: 'application',
            label: '应用于'
          },
          {
            prop: 'chipType',
            label: 'chip-type'
          }
        ],
        pageSize: 50, // 一页显示多少条数据，常量。
        total: 1,
        productType: '',
        productTypes: [],
        tableData: []
      }
    },
    mounted() {
      this.getTypes()
    },
    methods: {
      doAdd () {

      },
      changePage (c) {
        this.currentPage = c
        this.getProducts()
      },
      getProducts () {
        req.postRequest('/productInfo/getProductList',
          {
            productTypeCode: this.productType.typeCode,
            productTitle:'',
            pageIndex: this.currentPage,
            pageSize: this.pageSize
          }).then(res => {
            if(res.data.success) {
              this.tableData = res.data.result.records;
              this.total = res.data.result.total
            }
        })
      },
      getTypes () {
        req.getRequest('/productType/getTypeList').then(res => {
          this.productTypes = res.data.result.map(o => {
            return {
              ...o,
              value: o.id,
              label: o.typeCn
            }
          })
          this.productType = this.productTypes[1]
          this.getProducts()
        }).catch(e => {
          console.log(e);
        })
      },
      doDelete  (data) {
        console.log(data)
      }
    }
  }
</script>

<style scoped>

</style>
