import {getGenderateVerifyCode,generateSmsCode,checkVerifyCode,getKey} from '../../api/common'
export default {
  state: {
  },
  mutations: {

  },
  actions: {
    /**
     * 注册
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleGetKey({state, commit}, params){
      return new Promise((resolve, reject) => {
        getKey({
          ...params
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    },
    /**
     * 注册
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleGetGenderateVerifyCode({state, commit}, params){
      return new Promise((resolve, reject) => {
        getGenderateVerifyCode(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    },
    /**
     * 获取手机验证码
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleGenerateSmsCode({state, commit}, params){
      return new Promise((resolve, reject) => {
        generateSmsCode({
          ...params
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    },
    /**
     * 校验图形验证码
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleCheckVerifyCode({state, commit}, params){
      return new Promise((resolve, reject) => {
        checkVerifyCode({
          ...params
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    }
  }
}
