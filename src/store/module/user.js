import {register} from '../../api/user'
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
    handleRegister({state, commit}, params){
      return new Promise((resolve, reject) => {
        register({
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
