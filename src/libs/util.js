import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { forEach, hasOneOf, objEqual } from '@/libs/tools'

export const TOKEN_KEY = 'token';
export const USER_NAME= 'userName'

export const setToken = (token) => {
  sessionStorage.token=token;
  //Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}
export const setUserNameCookie = (userName) => {
  if(userName && userName!==undefined){
    Cookies.set(USER_NAME, userName, {expires: config.cookieExpires || 1})

  }
}
export const getUserName = () => {
  const token = Cookies.get(USER_NAME)
  if (token) return token
  else return false
}

export const getToken = () => {
  //const token = Cookies.get(TOKEN_KEY)
  const token=sessionStorage.getItem("token");
  if (token) return token
  else return false
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
  let routeMetched = route.matched
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let meta = {...item.meta}
    if (meta.title && typeof meta.title === 'function') meta.title = meta.title(route)
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [{...homeItem, to: homeRoute.path}, ...res]
}

export const getRouteTitleHandled = route => {
  let router = {...route}
  let meta = {...route.meta}
  if (meta.title && typeof meta.title === 'function') meta.title = meta.title(router)
  router.meta = meta
  return router
}

export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  sessionStorage.tagNaveList = JSON.stringify(list);
  //localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = sessionStorage.tagNaveList
  //const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    console.log(route, index, list.length)
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode
  if (parentNode) {
    let classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}
/**
 * 根据枚举key 获取对应的value
 * @param arr
 * @param key
 * @returns {string}
 */
export const getValueWithEnum=(arr,key)=>{
  let result="";
  for(let i=0;i<arr.length;i++){
    let list=arr[i]
    if(key==list.key){
      result=list.value;
      break;
    }
  }
  return result;
};
/**
 * 显示区域的名字
 * @param arr
 * @param id
 */
export const withIdShowText=(arr,id)=>{
  let result="";
  if(arr===undefined){
    return;
  }
  for(let i=0;i<arr.length;i++){
    if(arr[i].region_id==id){
      result=arr[i].region_name;
      break;
    }
  }
  return result;
}
/**
 * 遍历成树
 * @param arr
 * @param personId
 * @returns {Array}
 */
export const setTree=(arr,personId)=>{

  let result=[];
  let temp;
  for(let i in arr){
    if(arr[i].parent_id==personId){
      let obj={
        ...arr[i],
        value:arr[i].region_id+"",
        label:arr[i].region_name,
        title:arr[i].region_name,
        expand:true
      };
      temp=setTree(arr,arr[i].region_id);
      if(temp.length>0){
        obj.children=temp;
      }
      result.push(obj);
    }
  }
  return result;
}
/**
 * 根据子集获取上级的结构
 * @param arr
 * @param childId
 */
export const getPersonTree=(arr,pid)=> {
  let result = [];
  let forFn = function (arr, pid) {
    for (let i in arr) {
      if (arr[i].region_id == pid) {
        result.unshift(arr[i].region_id + "");
        forFn(arr, arr[i].parent_id)
      }
    }
  };
  forFn(arr, pid);

  return result;
};
/**
 * 获取父级节点对象
 * @param arr
 * @param parent_id
 */
export const getPersonTreeMessage=(arr,parent_id)=>{
  let result={};
  for (let i=0;i<arr.length;i++) {
    if (arr[i].region_id == parent_id) {
      result= arr[i]
      break;
    }
  }
  return result;
}
/**
 * 将时间戳转换成时间格式
 * @param timestamp
 * @returns {string}
 */
export const timestampToTime=(timestamp)=>{
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() <10?'0'+date.getDate():date.getDate())+' ';
  var h = (date.getHours()<10?'0'+date.getHours():date.getHours())+':';
  var m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
  var s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
  return Y+M+D+h+m+s;
}
/**
 *获取树的顶级节点
 * @param arr
 */
export const  getTreeParentId=(arr)=>{
  let min=arr[0].parent_id;
  for(let i=1;i<arr.length;i++){
    let temp=arr[i].parent_id;
    temp<min?min=temp:null
  }
  return min;
};
/**
 * 根据key 获取枚举类型
 * @param obj
 * @param id
 * @returns {string}
 */
export const getEnumText=(obj,id)=>{
  let result='';
  if(obj.hasOwnProperty(id)){
    result=obj[id];
  }
  return result;
};

/**
 * 根据value 获取label
 * @param arr
 * @param value
 * @returns {string}
 */
export const getEnumArrText=(arr,value)=>{
  debugger
  let result='';
  for(let i=0;i<arr.length;i++){
    if(value===arr[i].value){
      result=arr[i].label;
      break;
    }

  }
  return result;
}
/**
 * 校验手机号
 * @param mobile
 */
export const validateTel=(mobile)=>{
  let TEL_REGEXP = /^1[3-9]\d{9}$/;
  if(TEL_REGEXP.test(mobile)){
    return true;
  }
  return false;
};
/**
 * 判断浏览器类型
 * @returns {string}
 */
export const getDeviceType=()=>{
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return 'ios';
  } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
    return 'android'
  } else { //pc
    return 'pc'
  }
}
