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
          添加解决方案</el-button>
      </el-col>
    </el-row>

    <el-dialog title="添加解决方案" :visible.sync="dialogFormVisible" width="600px" center>
      <el-form ref="form" :model="form">
<!--        <el-form-item label="图片" label-width="80px" prop="images">-->
<!--          <el-input v-model="form.images" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="解决方案图片样例" >
          <el-upload
            action=""
            :on-change="handOnchange"
            multiple
            :show-file-list="true"
            :auto-upload="false">
            <el-button size="small" type="primary">选择图片（可多选）</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="解决方案主题" label-width="80px" prop="appType">
          <el-input v-model="form.appType" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="解决方案描述" label-width="80px" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="form.description" autocomplete="off" ></el-input>
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
        label="解决方案主题">
      </el-table-column>
      <el-table-column
        fixed
        prop="description"
        label="解决方案描述">
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
          images: [],
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
      handOnchange(file, fileList) {
        this.form.images = fileList.map(item => item.raw)
      },
      editProductType (data){
        console.log(data);
      },
      deleteProductType (data) {
        this.$confirm(`是否确认删除 应用领域 : ${data.appType}？`, '警告',{
          center: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req.getRequest('/application/delApp', {appId: data.id}).then(res => {
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
        let data = new FormData()
        console.log(this.form);
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            const element = this.form[key];

            if(key == 'images')
              element.forEach(item => {
                data.append(key,item)
              })
            else
              data.append(key,element)
          }
        }

        req.postRequest('/application/addApp',data).then(res => {
          console.log(res);

          this.$message('添加成功！');
        }).finally(() => {
          this.dialogFormVisible = false
          this.resetForm()
          this.getData()
        })

      },
      resetForm() {
        this.form = {
          images: '',
          appType: '',
          description: ''
        }
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
