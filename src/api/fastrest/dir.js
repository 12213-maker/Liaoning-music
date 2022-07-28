import request from '@/utils/request'

// 查询目录结构列表
export function listDir(query) {
  return request({
    url: '/dir/list',
    method: 'get',
    params: query
  })
}

// 查询目录结构详细
export function getDir(id) {
  return request({
    url: '/dir/' + id,
    method: 'get'
  })
}

// 新增目录结构
export function addDir(data) {
  return request({
    url: '/dir',
    method: 'post',
    data: data
  })
}

// 修改目录结构
export function updateDir(data) {
  return request({
    url: '/dir',
    method: 'put',
    data: data
  })
}

// 删除目录结构
export function delDir(id) {
  return request({
    url: '/dir/' + id,
    method: 'delete'
  })
}

// 导出目录结构
export function exportDir(query) {
  return request({
    url: '/dir/export',
    method: 'get',
    params: query
  })
}
