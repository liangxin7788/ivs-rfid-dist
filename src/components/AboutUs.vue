<template>
  <div style="display: flex; justify-content: center">
    <el-card class="card" style="width: 35%">
      <div slot="header" style="line-height: 30px">
        <span>{{title}}</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="text item" style="line-height: 30px; text-align: left">
        {{content}}
      </div>
    </el-card>
    <el-card class="card" style="width: 35%">
      <div slot="header" style="line-height: 30px">
        <span>最新动态</span>
      </div>
      <div  style="line-height: 30px"  v-for="(company, index) in companys.slice(1, showLength)" :key="index" class="text item">
        {{company.content}}
      </div>
      <div >
        <span v-if="showLength == 11" @click="showLength = companys.length" style="text-decoration: underline">展开</span>
        <span v-else @click="showLength = 11" style="text-decoration: underline">收起</span>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
  export default {
    name: "AboutUs",
    data(){
      return{
        title: this.title || undefined,
        content: this.content || undefined,
        createAt: this.createAt || undefined,
        companys:  [],
        showLength: 11
      }
    },
    mounted () {
      req.getRequest('/company/getCompanyInfo',{
        title: this.title || undefined,
        content: this.content || undefined,
        createAt: this.createAt || undefined
      }).then(res => {
        this.title = res.data.result.title || undefined
        this.content = res.data.result.content || undefined
        this.createAt = res.data.result.createAt || undefined
      }).catch(e => {
        console.log(e);
      }),
        req.getRequest('/company/getNews',{}).then(res => {
          this.companys = res.data.result//.map(item => item.cnName) || []
        }).catch(e => {
          console.log(e);
        })
    }
  }
</script>

<style scoped>
  .card{
    margin-right: 30px;
    width: 350px;
  }
  .column-style{
  }
</style>
