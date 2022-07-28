import request from '@/utils/request'

// 查询地区管理列表
export function listArea(query) {
  return request({
    url: '/area/list',
    method: 'post',
    data: query
  })
}

// 查询地区管理详细
export function getArea(id) {
  return request({
    url: '/area/' + id,
    method: 'get'
  })
}

// 新增地区管理
export function addArea(data) {
  return request({
    url: '/area',
    method: 'post',
    data: data
  })
}

// 修改地区管理
export function updateArea(data) {
  return request({
    url: '/area',
    method: 'put',
    data: data
  })
}

// 删除地区管理
export function delArea(id) {
  return request({
    url: '/area/' + id,
    method: 'delete'
  })
}

// 导出地区管理
export function exportArea(query) {
  return request({
    url: '/area/export',
    method: 'get',
    params: query
  })
}
