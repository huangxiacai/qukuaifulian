import axios from '@/libs/api.request'
import {user} from "./config";
/**
 * 注册
 * @returns {*}
 */
export const register=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: user.register,
    data,
    method: 'post'
  })
};
