import axios from '@/libs/api.request'
import {common} from "./config";

/**
 * 生成图形验证码
 * @returns {*}
 */
export const getKey=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: common.getKey,
    data,
    method: 'post'
  })
};
/**
 * 生成图形验证码
 * @returns {*}
 */
export const getGenderateVerifyCode=(params)=>{
  const data = params;
  return axios.request({
    url: common.generateVerifyCode,
    params:data,
    method: 'get'
  })
};
/**
 * 校验图形验证码
 * @returns {*}
 */
export const checkVerifyCode=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: common.checkVerifyCode,
    data,
    method: 'post'
  })
};
/**
 * 发送手机验证码
 * @returns {*}
 */
export const generateSmsCode=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: common.generateSmsCode,
    data,
    method: 'post'
  })
};
