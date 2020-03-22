<template>
  <div>
<!--    <section style="font-size: 18px;font-weight: 700">应用领域管理</section>-->
    <el-row :gutter="24" >
      <el-col :span="20" style="display: flex;justify-content: flex-end">
        <el-input
          clearable
          v-model.enter="searchName"
          placeholder="请输入应用名查询"
          style="width: 200px;" />
        <el-button
          type="primary"
          @click="getData(searchName)"
        >search</el-button>
      </el-col>
      <el-col :span="4">
        <el-button
          inline
          icon="el-icon-plus"
          type="success"
          @click="dialogFormVisible = true">
          添加应用</el-button>
      </el-col>
    </el-row>

    <el-dialog title="添加应用" :visible.sync="dialogFormVisible" width="400px" center>
      <el-form ref="form" :model="form">
        <el-form-item label="图片" label-width="80px" prop="images">
          <el-input v-model="form.images" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用类型" label-width="80px" prop="appType">
          <el-input v-model="form.appType" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="应用描述" label-width="80px" prop="description">
          <el-input v-model="form.description" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="medium " type="primary" @click="confirmAddApplication">添加</el-button>
      </div>
    </el-dialog>

    <el-table
      stripe
      :data="tableData"
      border
      fit>
      <el-table-column
        fixed
        label="图片"
        width="180">
        <template slot-scope="scope">
          <el-image :src="scope.row.images.split(',')[0]"
                    style="width: auto; height: auto">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        prop="appType"
        label="应用类型">
      </el-table-column>
      <el-table-column
        fixed
        prop="description"
        label="应用描述">
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
    name: "UseForMan",
    data() {
      return {
        searchName: '',
        dialogFormVisible: false,
        // rules: {
        //   username: [
        //     { required: true, message: '请输入用户名', trigger: 'blur' },
        //   ],
        //   password: [
        //     { required: true, message: '请输入密码', trigger: 'blur' },
        //     { min: 6, message: '长度在 大于 6个字符', trigger: 'blur' }
        //   ],
        // },
        form: {
          images: '',
          appType: '',
          description: ''
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
        this.$confirm(`是否确认删除 应用领域 : ${data.typeCn}？`, '警告',{
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
      confirmAddApplication () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            req.postRequest('/application/addApp',
              {
                images: this.form.images,
                appType: this.form.appType,
                description:this.form.description
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
          images: '',
          appType: '',
          description: ''
        }
        this.refs['form'].resetFields()
        this.refs['form'].clearValidate()
      },
      getData (appType) {
        req.getRequest('/application/getAppList', {appType}).then(res => {
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
