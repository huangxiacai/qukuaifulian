<template>
  <div>
    <Group gutter="0">
      <x-input placeholder="请输入手机号" :max="11" mask="99999999999" v-model="mobile"></x-input>
    </Group>
    <Group gutter="0">
      <x-input placeholder="请输入图形验证码" v-model="xcode"></x-input>
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

  export default {
    name: "register",
    data() {
      return {
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
      ])
    },
    mounted() {

    },
    created() {
      this.handleGetKey().then(res => {
        debugger
      });
      this.handleGenerateSmsCode({}).then(res => {
        debugger
      });


      // var fd = new FormData();
      // fd.append("type", "register");
      // fd.append("phone", "15011599752");
      // this.$http.post("/api/fulian/common/sign/generateVerifyCode", fd).then(res => {
      //     debugger
      //   })
      // var fd = new FormData();
      //fd.append("type", "register");
      //fd.append("phone", "15011599752");
        this.handleGetGenderateVerifyCode({
          type:"register"
        }).then(res=>{
          debugger
        });
      }
    }
</script>

<style scoped>

</style>
