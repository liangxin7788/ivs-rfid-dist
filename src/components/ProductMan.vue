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
          添加产品</el-button>
      </el-col>
    </el-row>

<!--表格-->
    <el-table
      :data="tableData"
      stripe
      border
      fit>
      <el-table-column
        fixed
        prop="id"
        label="产品样品图">
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
        width="200">
        <template slot-scope="scope">
          <el-button @click="doEdit(scope.row)" size="mini">编辑</el-button>
          <el-button type="danger" @click="doDelete(scope.row)" color="red" size="mini">删除</el-button>
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

    <!--添加产品-->

    <el-dialog title="添加产品" :visible.sync="dialogFormVisible">
      <el-form :model="proform" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="产品图片" >
              <el-upload
                action=""
                :on-change="handOnchange"
                multiple
                :show-file-list="false"
                :auto-upload="false">
                <el-button size="small" type="primary">选择图片（可多选）</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品code码" >
              <el-select v-model="proform.productTypeCodes" clearable>
                <el-option :value="type.typeCode" v-for="type in productTypes" :key="type">
                  {{type.typeEn}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="产品中文名" >
          <el-input v-model="proform.cnName" placeholder="请输入中文名"></el-input>
        </el-form-item>
        <el-form-item label="	产品英文名" >
          <el-input v-model="proform.enName" placeholder="请输入英文名"></el-input>
        </el-form-item>

        <el-form-item label="	产品型号" >
          <el-input v-model="proform.model" placeholder="请输入型号"></el-input>
        </el-form-item>
        <el-form-item label="产品尺寸" >
          <el-input v-model="proform.size" placeholder="请输入尺寸"></el-input>
        </el-form-item>
        <el-form-item label="应用领域" >
          <el-input v-model="proform.application" placeholder="请输入应用领域"></el-input>
        </el-form-item>
        <el-form-item label="芯片类型" >
          <el-input v-model="proform.chipType" placeholder="请输入芯片类型"></el-input>
        </el-form-item>
        <el-form-item label="读距范围" >
          <el-input v-model="proform.readingRange" placeholder="请输入读距范围"></el-input>
        </el-form-item>

        <el-form-item label="	产品描述" >
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="proform.description" placeholder="请输入产品描述信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="proCommit">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import * as req from '@/utils/api'
  export default {
    name: "ProductMan",
    data () {
      return {
        typeList: [],
        dialogFormVisible: false,
        proform: {
          images: [],
          cnName: '',
          enName: '',
          description: '',
          productTypeCodes: '',
          model: '',
          size: '',
          application: '',
          chipType: '',
          readingRange: '',
        },

        tableColumns: [
          {
            prop: 'enName',
            label: '产品英文名称'
          },
          {
            prop: 'cnName',
            label: '产品中文名称'
          },
          {
            prop: 'application',
            label: '应用于'
          },
          {
            prop: 'size',
            label: '尺寸'
          },
          {
            prop: 'chipType',
            label: '芯片类型'
          },
          {
            prop: 'readingRange',
            label: '读距'
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
      handOnchange(file, fileList) {    
        this.proform.images = fileList.map(item => item.raw)
      },
      proCommit() {
        let data = new FormData()

        console.log(this.proform);
        
        for (const key in this.proform) {
          if (this.proform.hasOwnProperty(key)) {
            const element = this.proform[key];

            if(key == 'images')
              element.forEach(item => {
                data.append(key,item)
              })
            else 
              data.append(key,element)
          }
        }

        req.postRequest('/productInfo/addProduct',data).then(res => {
          console.log(res);
          
          this.$message('添加成功！');
        }).finally(() => {
          this.dialogFormVisible = false

          this.getProducts()
        })

      },

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

        this.$confirm(`是否确认删除 产品 : ${data.cnName}？`, '警告',{
          center: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req.getRequest('/productInfo/delProduct', {productId: data.id}).then(res => {
            let message = res.data.result
            let type = 'success'
            if(!res.data.success) {
              message=res.data.errorMsg
              type = 'error'
            }
            this.$message({
              message,
              type
            });
            this.getProducts()
          })
        })

      },
      doEdit (data) {
        console.log(data)
      }
    }
  }
</script>

<style scoped>

</style>
