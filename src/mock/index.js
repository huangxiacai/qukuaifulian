import Mock from 'mockjs'
import {generateSmsCode,getGenderateVerifyCode,checkVerifyCode} from './module/common'
import {register} from './module/user'//用户管理
// 注册
Mock.mock(/\/app\/fulian\/login\/register/, register);
Mock.mock(/\/fulian\/common\/sign\/generateSmsCode/, generateSmsCode);//
Mock.mock(/\/fulian\/common\/sign\/generateVerifyCode/, getGenderateVerifyCode);//
Mock.mock(/\/fulian\/common\/sign\/checkVerifyCode/, checkVerifyCode)
