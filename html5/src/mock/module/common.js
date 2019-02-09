/**
 * 模拟数据
 * @type {{}}
 */
const USER_MAP = {
  add: {
    "user_id": 1
  },
  edit: {},
  del: {},
  getList: {
    "total":5,
    "community": [
      {
        "id":1,
        "name":"小区一号",
        "addr": "天府广场",
        "qrcode": "http://www.baidu.com",
        "status":1,
        "contract_expiration_date":"2018-01-02",
        create_timesec:'2018-01-02',
        cuid:11,
      },
      {
        "id":2,
        "name":"小区2号",
        "addr": "天府广场2",
        "qrcode": "http://www.baidu.com",
        "status":3,
        "contract_expiration_date":"2018-01-02",
        create_timesec:'2018-01-03',
        cuid:11,
      }
    ]
  },
  getUserList: {
    "total": 123456,
    "user_ids": [123, 456]
  },
  getDeviceList: {
    "total": 123456,
    "dids": [{
      "did": "xxxxxx",
      "name": "xxxxxx",
      "addr": "xxxxxx",
      "longitude": 123456,
      "latitude": 123456,
      "owner_uid": 123456,
      "create_timesec": 123456
    }]
  },
};
//基本数据结构
const result = {
  body: {},
  result: 0,
  errorMsg: ""
}

/**
 * 获取手机验证码
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const generateSmsCode = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    data: null,
    code: 20000,
    msg: ""
  };
  return temp;
};
/**
 * 校验图形验证码
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const checkVerifyCode = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    data: null,
    code: 20000,
    msg: ""
  };
  return temp;
};
/**
 * 校验图形验证码
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getGenderateVerifyCode = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    data: null,
    code: 20000,
    msg: ""
  };
  return temp;
};
