import request from '@/utils/request'

// 按条件分页查询申请记录
export function queryStationStoreApplyInfoByPage(data) {
  return request({
    url: '/zdty/queryStationStoreApplyInfoByPage',
    method: 'post',
    data: data
  })
}
// 提交站店申请
export function saveStationStoreApply(data) {
  return request({
    url: '/zdty/saveStationStoreApply',
    method: 'post',
    data: data
  })
}
//获取站店听音触点
export function getStationStoreContactInfoByCnd(data) {
  return request({
    url: '/zdty/getStationStoreContactInfoByCnd',
    method: 'post',
    data: data
  })
}
// 获取站店听音触点地市区县
export function getCityOrContyInfo(city) {
  return request({
    url: '/zdty/getCityOrContyInfo?city=' + city,
    method: 'get'
  })
}

// 站店申请归档
export function stationStoreApplyArchive(data) {
  return request({
    url: '/zdty/stationStoreApplyArchive_new',
    method: 'post',
    data:data
  })
}
// 站店申请详情
export function getStationStoreDetail(id) {
  return request({
    url: '/zdty/getStationStoreDetail?id=' + id,
    method: 'post'
  })
}
// 按条件分页查询问题单记录
export function queryStationStoreQuestionInfoByPage(data) {
  return request({
    url: '/zdty/queryStationStoreQuestionInfoByPage',
    method: 'post',
    data: data
  })
}
//保存问题工单
export function saveStationStoreQuestion(data) {
  return request({
    url: '/zdty/saveStationStoreQuestionInfo',
    method: 'post',
    data: data
  })
}
//问题单详情
export function queryStationStoreQuestionInfoDetail(id) {
  return request({
    url: '/zdty/queryStationStoreQuestionInfoDetail?id=' + id,
    method: 'get',
  })
}
//获取问题审批人
export function getOaUserDeptRelation() {
  return request({
    url: '/zdty/getOaUserDeptRelation',
    method: 'get',
  })
}
//获取问题单申请责任单位
export function getOaDeptRelation() {
  return request({
    url: '/zdty/getOaDeptRelation',
    method: 'get',
  })
}


//获取登陆人信息
export function getUserInfo() {
  return request({
    url: '/zdty/getUserInfo',
    method: 'get',
  })
}
//问题单提交OA申请
export function submitOA(id) {
  return request({
    url: '/zdty/submitOA?id=' + id,
    method: 'post',
  })
}

