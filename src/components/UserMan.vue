<template>
  <div>
    <section style="font-size: 18px;font-weight: 700">用户管理</section>
    <el-row :gutter="24" >
      <el-col :span="20" style="display: flex;justify-content: flex-end">
        <el-input
          clearable
          v-model.enter="searchName"
          placeholder="请输入用户名查询"
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
          添加用户</el-button>
      </el-col>
    </el-row>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="400px" center>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="form.password" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="medium" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="medium " type="primary" @click="confirmAddUser">添加</el-button>
      </div>
    </el-dialog>

    <el-table
      stripe
      :data="tableData"
      border
      fit>
      <el-table-column
        fixed
        prop="id"
        label="用户名id">
      </el-table-column>
      <el-table-column
        fixed
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        fixed
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        fixed
        prop="createAt"
        label="创建用户时间">
      </el-table-column>
      <el-table-column
        fixed
        prop="updateAt"
        label="最后更新时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteUser(scope.row)" color="red" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
  export default {
    name: "UserMan",
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
          username: '',
          password: ''
        },
        tableData: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      deleteUser ({id, userName}) {
        this.$confirm(`是否确认删除 用户 : ${userName}？`, '警告',{
          center: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req.getRequest('/user/deleteUser', {userId: id}).then(res => {
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
      confirmAddUser () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            req.postRequest('/user/addUser',
              {
                userName: this.form.username,
                password:this.form.password
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
          username: '',
          password: ''
        }
        this.refs['form'].resetFields()
        this.refs['form'].clearValidate()
      },
      getData (userName) {
        req.getRequest('/user/getUserList', {userName}).then(res => {
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
