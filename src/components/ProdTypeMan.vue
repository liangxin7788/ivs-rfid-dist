<template>
  <div>
        <section style="font-size: 18px;font-weight: 700">产品类型管理</section>
    <el-row :gutter="24" >
      <el-col :span="20" style="display: flex;justify-content: flex-end">
      </el-col>
      <el-col :span="4">
        <el-button
          inline
          icon="el-icon-plus"
          type="success"
          @click="dialogFormVisible = true">
          添加类型</el-button>
      </el-col>
    </el-row>

    <el-dialog title="添加类型" :visible.sync="dialogFormVisible" width="400px" center>
      <el-form ref="form" :model="form">
        <el-form-item label="类型中文名" label-width="80px" prop="typeCn">
          <el-input v-model="form.typeCn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型英文名" label-width="80px" prop="typeEn">
          <el-input v-model="form.typeEn" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="类型code码" label-width="80px" prop="typeCode">
          <el-input v-model="form.typeCode" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="medium " type="primary" @click="confirmAddProductType">添加</el-button>
      </div>
    </el-dialog>

    <el-table
      stripe
      :data="tableData"
      border
      fit>
      <el-table-column
        fixed
        prop="typeCn"
        label="类型中文名">
      </el-table-column>
      <el-table-column
        fixed
        prop="typeEn"
        label="类型英文名">
      </el-table-column>
      <el-table-column
        fixed
        prop="typeCode"
        label="类型code码">
      </el-table-column>
      <el-table-column
        fixed
        prop="createAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed
        prop="updateAt"
        label="最后更新时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="editProductType(scope.row)" size="mini">编辑</el-button>
          <el-button type="danger" @click="deleteProductType(scope.row)" color="red" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
  export default {
    name: "ProdTypeMan",
    data() {
      return {
        searchName: '',
        dialogFormVisible: false,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '长度在 大于 6个字符', trigger: 'blur' }
          ],
        },
        form: {
          typeCn: '',
          typeEn: '',
          typeCode: ''
        },
        tableData: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      editProductType (data){
        console.log(data);
      },
      deleteProductType (data) {
        this.$confirm(`是否确认删除 产品类型 : ${data.typeCn}？`, '警告',{
          center: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req.getRequest('/productType/deleteType', {typeId: data.id}).then(res => {
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
            this.getData()
          })

        })
      },
      confirmAddProductType () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            req.postRequest('/productType/addOrEditType',
              {
                typeCn: this.form.typeCn,
                typeEn: this.form.typeEn,
                typeCode:this.form.typeCode
              }).then(res => {
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
              if (res.data.success) {
                this.getData()
                this.closeModal()
              }
            })
          } else {
            return false;
          }
        });

      },
      closeModal () {
        this.dialogFormVisible = false
        this.form = {
          typeCn: '',
          typeEn: '',
          typeCode: ''
        }
        this.refs['form'].resetFields()
        this.refs['form'].clearValidate()
      },
      getData () {
        req.getRequest('/productType/getTypeList').then(res => {
          this.tableData = res.data.result || []
        }).catch(e => {
          console.log(e);
        })
      }
    }
  }
</script>

<style scoped>

</style>
