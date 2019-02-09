import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'//业主管理
import common from './module/common'//管理员管理

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //审核状态
    auditSatus: [
      {
        value: 1,
        label: '添加'
      },
      {
        value: 2,
        label: "提交审核",
      },
      {
        value: 3,
        label: "审核未通过"
      },
      {
        value: 4,
        label: '审核通过'
      }
    ],
    //用户类型
    userTypeObj: {
      1: '业主家人',
      2: '租客',
      3: '租客成员',
      11: "物业人员",
      12: "快递",
      13: "外卖",
      14: "其它",
      99: "黑名单"
    },
    communtiyListArr: [
      {
        label: '上东阳小区',
        value: '123142'
      },
      {
        label: '流星花园小区',
        value: '123123sdf'
      }
    ],
    //
    wh: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    },
    //合同状态
    contract: [
      {
        key: 1,
        value: "添加"
      },
      {
        key: 2,
        value: "提交审核"
      },
      {
        key: 3,
        value: "审核未通过"
      },
      {
        key: 4,
        value: "审核通过"
      },

    ]
  },
  mutations: {
    //
    windowResize(state, wh) {
      state.wh.innerWidth = wh.innerWidth;
      state.wh.innerHeight = wh.innerHeight;
    },
  },
  actions: {
    //
  },
  modules: {
    user,
    common
  }
})
