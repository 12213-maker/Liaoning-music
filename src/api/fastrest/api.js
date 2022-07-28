import request from '@/utils/request'

// 查询接口管理列表
export function listApi(data,pageSize,pageNum) {
  return request({
    url: '/api/list?'+'pageNum='+pageNum+'&pageSize='+pageSize,
    method: 'post',
    data: data
  })
}

// 查询接口管理详细
export function getApi(id) {
  return request({
    url: '/api/' + id,
    method: 'get'
  })
}
// 查询接口管理详细-扩展信息
export function getApiExt(id) {
  return request({
    url: '/api/get-info-ext/' + id,
    method: 'get'
  })
}


// 新增接口管理
export function addApi(data) {
  return request({
    url: '/api',
    method: 'post',
    data: data
  })
}

// 修改接口管理
export function updateApi(data) {
  return request({
    url: '/api',
    method: 'put',
    data: data
  })
}

// 删除接口管理
export function delApi(id) {
  return request({
    url: '/api/' + id,
    method: 'delete'
  })
}

// 下拉树结构
export function treeApiSelect() {
  return request({
    url: '/dir/treeselect',
    method: 'get'
  })
}

// 更改状态
export function updateApiEnable(data) {
  return request({
    url: '/api/changeEnable',
    method: 'put',
    data: data
  })
}

// 删除接口中的sql
export function delSql(id) {
  return request({
    url: '/api/delSql/' + id,
    method: 'delete'
  })
}

// 修改接口归档状态
export function changeStatus(id) {
  return request({
    url: '/api/changeStatus/' + id,
    method: 'put'
  })
}

// 调试接口
export function callRestApi(data,serialNO) {
  return request({
    url: '/api/rest-api/' + serialNO,
    method: 'POST',
    data
  })
}

export function callRestApiMock(data,serialNO,mock) {
  return request({
    url: '/api/rest-api/' + serialNO + '?' + 'mock=' + mock,
    method: 'POST',
    data
  })
}
