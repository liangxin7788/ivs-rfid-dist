<template>
  <div>
    <div>
      <el-carousel :interval="5000" arrow="always" class="aaa" style="height: 240px; width: 100%">
        <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <el-image :src="img.url" style="height: auto; width: 100%"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <br>
    <br>
    <br>
    <div class="con">
      <div class="a">
        <div v-for="item in introduction.split('\n')">{{item}}</div>
      </div>
      <div class="b">
        <el-form label-width="80px">
          <div class="c">
              <el-input type="input" v-model="name" placeholder="Your Name(required)" size="medium"></el-input>
              <el-input type="input" v-model="customerEmail" placeholder="E-mail(required)" size="medium"></el-input>
          </div><br>
          <div class="c">
              <el-input type="input" v-model="comeFrom" placeholder="Country(un-required)" size="medium"></el-input>
              <el-input type="input" v-model="company" placeholder="Company(un-required)" size="medium"></el-input>
              <el-input type="input" v-model="phoneNumber" placeholder="Phone(un-required)" size="medium"></el-input>
          </div>
          <el-form-item label="Massage:">
            <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="massage" style="margin: 50px 0; width: 500px; text-align: left"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Submit</el-button>
            <el-button @click="resetForm">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import * as req from '@/utils/api'
    export default {
      name: "ContactUs",
      data() {
        return {
          imgList:[
            {url:require('../assets/Long-image-3.jpg')},
            {url:require('../assets/Long-image-4.jpg')}
          ],
          introduction: '',
          name: '',
          customerEmail: '',
          phoneNumber: '',
          comeFrom: '',
          company: '',
          massage: ''
        }
      },
      mounted() {
        this.introduction = 'Company: SZ IVS Technologies CO.,LTD.\n' +
          'Address: 深圳市龙岗区平湖街道新木社区新木路321-3号新木半里大厦C座1413\n' +
          'Tel: (0755)8888 8888\nFax: (0755)8888 8889\nP.C: 351100\nE-mail: Sharon.loo@outlook.com\n' +
          'WhatsApp: +86 158 1429 5175'
      },
      methods: {
        onSubmit() {
          console.log('submit!');
          req.postRequest('/customerMassage/addMassage',{
            name: this.name || undefined,
            customerEmail: this.customerEmail || undefined,
            massage: this.massage || undefined,
            phoneNumber: this.phoneNumber || undefined,
            comeFrom: this.comeFrom || undefined,
            company: this.company || undefined,
          }).then(res => {
            console.log(res.data.result);
          }).catch(e => {
            console.log(e);
          })
        },
        resetForm() {
          return {
            name: '',
            customerEmail: '',
            massage: '',
            phoneNumber: '',
            comeFrom: '',
            company: ''
          }
        }
      }
    }
</script>

<style >
  * {
    margin: 0;
    padding: 0;
  }
  .con {
    /*width: 500px;*/
    height: 400px;
    margin: 0 200px;
  }
  .con > div {
    width: 50%;
    /*height: 100%;*/
  }
  .a {
    text-align: left;
    line-height: 40px;
    margin-left: 0;
    width: 400px;
    /*background: red;*/
    float: left;
  }
  .c .el-input{
   width: 30%;
  }
  .b {
    text-align: left;
    /*background: yellow;*/
    float: right;
  }
  .aaa  .el-carousel__container {
    height: 240px;
    margin: 0;
    padding: 0;
  }
</style>
