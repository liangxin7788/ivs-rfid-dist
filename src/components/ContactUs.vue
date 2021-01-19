<template>
  <div>
    <div>
      <el-carousel :interval="8000" arrow="always" class="aaa" style="height: 240px; width: 100%">
        <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <el-image :src="img.url" style="height: auto; width: 100%"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <br>
    <br>
    <br>
    <div class="con">
      <div class="a" style="margin-top: 80px; font-size: 18px">
        <div v-for="item in introduction.split('\n')">{{item}}</div>
      </div>
      <div class="b">
        <el-form label-width="80px">
          <!-- <i class="el-icon-star-on"></i>Titel: <el-input type="input" v-model="titel" size="medium;font-size: 20px"></el-input> -->
          <i class="el-icon-star-on"></i>Name: <el-input type="input" v-model="name" size="medium;font-size: 20px"></el-input>
          <i class="el-icon-star-on"></i>E-mail: <el-input type="input" v-model="customerEmail" size="medium;font-size: 20px"></el-input>
          <i class="el-icon-star-on"></i>Tel: <el-input type="input" v-model="phoneNumber" size="medium;font-size: 20px"></el-input>
          Address: <el-input type="input" v-model="address" size="medium;font-size: 20px"></el-input>
          Company: <el-input type="input" v-model="company" size="medium;font-size: 20px"></el-input>
          <!-- Tel: <el-input type="input" v-model="phoneNumber" size="medium;font-size: 20px"></el-input> -->
          <i class="el-icon-star-on"></i>Content: <br><el-input type="textarea" :autosize="{ minRows: 3, maxRows: 50}" v-model="massage" style="margin: 10px 0 0  0; width: 750px; text-align: left; font-size: 20px"></el-input>
          <el-form-item style="text-align: center; margin-top: 10px">
            <el-button type="primary" @click="onSubmit">Submit</el-button>
            <el-button @click="resetForm">Cancel</el-button>
          </el-form-item>
        </el-form>

<!--        <el-form label-width="80px">-->
<!--          <div class="c">-->
<!--            <el-input type="input" v-model="name" placeholder="Your Name(required)" size="medium"></el-input>-->
<!--            <el-input type="input" v-model="customerEmail" placeholder="E-mail(required)" size="medium"></el-input>-->
<!--            <el-input type="input" v-model="comeFrom" placeholder="Country(required)" size="medium"></el-input>-->
<!--          </div><br>-->
<!--          <div class="c">-->
<!--            <el-input type="input" v-model="address" placeholder="Address(un-required)" size="medium"></el-input>-->
<!--            <el-input type="input" v-model="company" placeholder="Company(un-required)" size="medium"></el-input>-->
<!--            <el-input type="input" v-model="phoneNumber" placeholder="Phone(un-required)" size="medium"></el-input>-->
<!--          </div>-->
<!--          <el-form-item label="Massage:">-->
<!--            <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 50}" v-model="massage" style="margin: 50px 0 0  0; width: 500px; text-align: left"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item style="text-align: center">-->
<!--            <el-button type="primary" @click="onSubmit">Submit</el-button>-->
<!--            <el-button @click="resetForm">Cancel</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
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
          titel: '',
          name: '',
          customerEmail: '',
          phoneNumber: '',
          comeFrom: '',
          company: '',
          address: '',
          massage: ''
        }
      },
      mounted() {
        this.introduction = 'Company: Shenzhen IWINS Technology Co., Ltd\nPhone: +86 158 1429 5175\nTel:+86 75521000000\n' +
          'E-mail:sharon.loo@outlook.com\nSkype: iwinstech\n'+
          'Address: C1413 Xinmu Banli Building,Xinmu Rd 321-3,Xinmu Community,Pinghu Street,Longgang 518111,Shenzhen\n'
      },
      methods: {
        onSubmit() {
          console.log('submit!');
          req.postRequest('/customerMassage/addMassage',{
            titel: this.titel || undefined,
            name: this.name || undefined,
            customerEmail: this.customerEmail || undefined,
            massage: this.massage || undefined,
            phoneNumber: this.phoneNumber || undefined,
            comeFrom: this.comeFrom || undefined,
            company: this.company || undefined,
            address: this.address || undefined,
          }).then(res => {
            console.log(res.data.result);
            if (res.data && res.data.errorMsg)
            this.$notify({
              title: 'fail to leaf your massage!',
              message: res.data.errorMsg,
              offset: 80
            });
            else
              this.$notify({
                title: 'Thank you for your message and we will contact you soon!',
                offset: 50,
                resetForm() {
                  this.titel = ''
                  this.name = ''
                  this.customerEmail = ''
                  this.massage = ''
                  this.phoneNumber = ''
                  this.comeFrom = ''
                  this.company = ''
                  this.address = ''
                }
              });
          }).catch(e => {
            console.log(e);
            // if (e.data && e.data.errorMsg) { this.$Message.error(e.data.errorMsg) }
          })
        },
        resetForm() {
          this.titel = ''
          this.name = ''
          this.customerEmail = ''
          this.massage = ''
          this.phoneNumber = ''
          this.comeFrom = ''
          this.company = ''
          this.address = ''
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
    height: 400px;
    margin: 0 200px;
  }
  .con > div {
    width: 50%;
  }
  .a {
    text-align: left;
    line-height: 40px;
    margin-left: 0;
    width: 400px;
    float: left;
  }
  .c .el-input{
   width: 30%;
  }
  .b {
    margin-top: 60px;
    text-align: left;
    float: right;
    font-size: 18px;
  }
  .aaa  .el-carousel__container {
    height: 240px;
    margin: 0;
    padding: 0;
  }
</style>
