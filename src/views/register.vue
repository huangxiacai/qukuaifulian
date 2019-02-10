<template>
  <div>
    <Group gutter="0">
      <x-input placeholder="请输入手机号" :max="11" mask="99999999999" v-model="mobile"></x-input>
    </Group>
    <Group gutter="0" class="flianGroup">
      <x-input placeholder="请输入图形验证码" v-model="xcode"></x-input>
      <x-img :src="xcodeImg" @click="getGenerateVerifyCode"></x-img>
    </Group>
    <Group gutter="0">
      <x-input placeholder="请输入手机验证码" v-model="mobileCode"></x-input>
    </Group>
    <Group gutter="0">
      <x-input placeholder="请输入密码" type="password" v-model="passwrod"></x-input>
    </Group>
    <Group gutter="0">
      <x-input placeholder="请输入密码" type="password" v-model="repassdword"></x-input>
    </Group>
    <Group gutter="0">
      <x-input placeholder="请输入推荐码(可不填)" v-model="referralCode"></x-input>
    </Group>
  </div>
</template>

<script type="es6">
  import {mapActions} from 'vuex'
  import config from '../config/index'
  import {common} from '../api/config'
  export default {
    name: "register",
    data() {
      return {
        xcodeImg:null,
        referralCode: null,
        mobile: null,
        xcode: null,
        mobileCode: null,
        passwrod: null,
        repassdword: null
      }
    },
    methods: {
      ...mapActions([
        'handleGenerateSmsCode',
        'handleGetGenderateVerifyCode',
        'checkVerifyCode',
        'handleGetKey'
      ]),
      /**
       * 获取图片验证码
       */
      getGenerateVerifyCode(){
        let baseurl=process.env.NODE_ENV !== 'production'?config.baseUrl.dev:config.baseUrl.pro;
        this.$http.get(baseurl+""+common.generateVerifyCode+"?type=register",
          {
            responseType:'arraybuffer',
          }).then(res=>{
          this.xcodeImg = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        })
      }
    },
    mounted() {

    },
    created() {
      this.getGenerateVerifyCode();

      }
    }
</script>

<style scoped>
.flianGroup{
  display: flex;
  flex-direction: column;
}
</style>
