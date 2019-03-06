<template>
  <div class="flianRegister">
    <Group gutter="0">
      <x-input placeholder="请输入手机号" required :max="11" mask="99999999999" v-model="mobile"></x-input>
    </Group>
    <Group gutter="0" class="flianGroup">
      <x-input placeholder="请输入图形验证码" required v-model="xcode" @on-blur="checkCode"></x-input>
      <div class="flianImgWrapper" @click="getGenerateVerifyCode">
        <spinner type="ios" v-if="loadingVcode"></spinner>
        <x-img :src="xcodeImg" v-else></x-img>
      </div>
    </Group>
    <Group gutter="0" class="flianGroup">
      <x-input placeholder="请输入手机验证码" required v-model="mobileCode"></x-input>
      <x-button :disabled="isGetMobileCode" :class="isGetMobileCode?'isGetMobileCode':'flianCodeWrapper'"
                @click.native="getMobileCode">{{getMoblieText}}
      </x-button>
    </Group>
    <Group gutter="0">
      <x-input placeholder="请输入密码" :min="6"  required type="password" v-model="password"></x-input>
    </Group>
    <Group gutter="0">
      <x-input placeholder="请确认密码" :min="6" required type="password" v-model="repassdword"  @on-blur="checkPwd"></x-input>
    </Group>
    <Group gutter="0">
      <x-input placeholder="请输入推荐码(可不填)" v-model="referralCode"></x-input>
    </Group>
    <div class="custom-primary-white_wrpper">
      <x-button type="primary"  class="custom-primary-white" @click.native="registerUser">注册</x-button>
    </div>

  </div>
</template>

<script type="es6">
  import {mapActions} from 'vuex'
  import config from '../config/index'
  import {common} from '../api/config'
  import {validateTel,getDeviceType,getUrlKey} from '../libs/util'
  export default {
    name: 'register',
    data () {
      return {
        timelen: 60,
        isGetMobileCode: false,//是否获取手机验证码
        getMoblieText: '获取手机验证码',
        loadingVcode: false,
        xcodeImg: null,
        referralCode: null,
        mobile: null,
        xcode: null,
        mobileCode: null,
        password: null,
        repassdword: null,
        BtnDisabled:true,
      }
    },
    methods: {
      ...mapActions([
        'handleGenerateSmsCode',
        'handleGetGenderateVerifyCode',
        'handleCheckVerifyCode',
        'handleGetKey',
        'handleRegister'
      ]),
      /**
       * 注册
       */
      registerUser(){
        debugger
        if(this.mobile==null ||this.mobile=="" || !validateTel(this.mobile)){
          this.$vux.toast.text('请添写正确的手机号', 'top')
          return false;
        }
        if(this.xcode==null || this.xcode==''){
          this.$vux.toast.text('请输入图形验证码', 'top');
          return false;
        }
        if(this.mobileCode==null || this.mobileCode==''){
          this.$vux.toast.text('请输入手机验证码', 'top');
          return false;
        }
        if(!this.checkPwd()){
          return false;
        }
        let type="";
        let getType=getDeviceType()
        if(getType=='ios'){
          type=3;
        }else if(getType=='android'){
          type=2;
        }else{
          type=1;
        }
        this.handleRegister(
          {
            phone:this.mobile,
            loginPassword:this.password,
            inviteCode:this.referralCode,
            code:this.mobileCode,
            type:'register',
            registerType:type,
          }
        ).then(res=>{
          if(res.code===20000){
            this.$vux.toast.text('注册成功', 'top')
            //判断操作系统是android还是ｉｏｓ
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
              //这个是安卓操作系统
              window.setTimeout(function(){
                window.location.href="https://fir.im/456d";
              },2000)
            }
            if (isIOS) {
              //这个是ios操作系统
              window.setTimeout(function(){
                window.location.href="https://fir.im/fk28";
              },2000)
            }
          }else{
            this.$vux.toast.text(res.msg, 'top')
          }
        });
      },

      getMobileCode () {
        let vm = this
        //先校验手机号
        if (validateTel(this.mobile)) {
          if(this.xcode==null || this.xcode==''){
            this.$vux.toast.text('请填写图形验证码', 'top')
            return false;
          }
          //获取手机验证码
          this.handleGenerateSmsCode({
            phone:this.mobile,
            type:'register',
            code:this.xcode
          }).then(res => {
            if (res.code === 20000) {
              this.isGetMobileCode=true;
              this.timelen = 120;
              this.$vux.toast.text('验证码发送成功', 'top');
              setInterval(function () {
                if (vm.timelen === 0) {
                  vm.isGetMobileCode = false;
                  vm.getMoblieText = '发送验证码'
                } else {
                  vm.timelen--;
                  vm.getMoblieText = vm.timelen+'s';
                }
              }, 1000)
          }else{
              this.$vux.toast.text(res.msg, 'top');
            }
          })
        } else {
          //
          this.$vux.toast.text('请填写的手机号', 'top')
        }

      },
      /**
       * 获取图片验证码
       */
      getGenerateVerifyCode () {
        this.loadingVcode = true
        let baseurl = process.env.NODE_ENV !== 'production' ? config.baseUrl.dev : config.baseUrl.pro
        this.$http.get(baseurl + '' + common.generateVerifyCode + '?type=register',
          {
            responseType: 'arraybuffer',
          }).then(res => {
          this.loadingVcode = false
          this.xcodeImg = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        })
      },
      /**
       * 校验图形验证码
       */
      checkCode(){
        if(this.xcode==null || this.xcode==""){
          debugger
        }else{
          // this.handleCheckVerifyCode({
          //   type:'register',
          //   phone:this.mobile,
          //   code:this.xcode
          // }).then(res=>{
          //   if(res.code===20000){
          //
          //   }else{
          //     this.$vux.toast.text(res.msg, 'top')
          //   }
          // })
        }
      },
      checkPwd(){
        if(this.password!==this.repassdword){
          this.$vux.toast.text('再次密码不一致', 'top');
          return false;
        }else{
          if(this.password==null || this.password=='' || this.repassdword==null || this.repassdword==''){
            this.$vux.toast.text('密码不能为空', 'top');
            return false;
          }else{
            return true;
          }

        }
      }
    },
    mounted () {
      let code=getUrlKey('code');
      if(code){
        this.referralCode=code
      }

    },
    created () {
      this.getGenerateVerifyCode()
    }
  }
</script>

<style scoped>
  .flianGroup {
    display: flex;
    flex-direction: column;
  }

  .flianImgWrapper {
    height: 40px;
    width: 80px;
    margin-right: 5px;
    display: flex;
    vertical-align: middle;
    align-items: center;
  }

  .flianImgWrapper img {
    width: 100%;
    height: 100%;
  }

  .flianCodeWrapper {
    height: 24px;
    width: 130px;
    font-size: 12px;
    color: #c48a96;
    margin-right: 5px;
  }

  .isGetMobileCode {
    height: 24px;
    width: 130px;
    font-size: 12px;
    color: #dcdcdc;
    margin-right: 5px;
  }
.custom-primary-white_wrpper{
  margin-top: 75px;
  padding:0 50px;
}
  .flianRegister{
    padding-top:40px;

  }
</style>
