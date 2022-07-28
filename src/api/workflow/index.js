import request from '@/utils/request'

// 查询首页列表
export function TaskList(data) {
  return request({
    url: '/Sound/Identy/List',
    method: 'post',
    data: data
  })
}
// 工单明细查询
export function TaskListDetail(data) {
  return request({
    url: '/Sound/Identy/Detail',
    method: 'get',
    // data: data
    params: data
  })
} 
// 省内新增接口
export function provinceAdd(data) {
  return request({
    url: '/Sound/Identy/add/province',
    method: 'post',
    data: data
  })
} 
// 集团新增接口
export function groupAdd(data) {
  return request({
    url: '/Sound/Identy/add/group',
    method: 'post',
    data: data
  })
} 
// 通用字典
export function allCode(params) {
  return request({
    url: '/Sound/common/enum',
    method: 'get',
    params
  })
}
// 获取接口人代码
export function getOaUserDeptRelation() {
  return request({
    url: '/zdty/getOaUserDeptRelation',
    method: 'get',
  })
}
// 获取主责部门
export function getOaDeptRelation(data) {
  return request({
    url: '/zdty/getOaDeptRelation',
    method: 'get',
    data: data
  })
}


// 获取主责部门
export function downloadFile(params) {
  return request({
    url: '/Sound/download',
    method: 'get',
    params
  })
}


// 归档
export function identyStatement(data) {
  return request({
    url: '/Sound/Identy/Statement',
    method: 'post',
    data: data
  })
} 


// 获取OA部门
export function getOaDeptList(params) {
  return request({
    url: '/oaUserDept/getOaDeptList',
    method: 'get',
    params
  })
} 

// 获取OA用户
export function getOaUserDeptList(params) {
  return request({
    url: '/oaUserDept/getOaUserDeptList',
    method: 'get',
    params
  })
}


// 获取OA用户远程搜索
export function searchOaUserDeptList(params) {
  return request({
    url: '/oaUserDept/searchOaUserDeptList',
    method: 'get',
    params
  })
}

// 获取OA部门远程搜索
export function searchOaDeptList(params) {
  return request({
    url: '/oaUserDept/searchOaDeptList',
    method: 'get',
    params
  })
}


export function getStationStoreDetail(id) {
  return request({
    url: '/zdty/getStationStoreDetail?id='+id,
    method: 'post'
  })
}