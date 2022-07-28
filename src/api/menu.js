import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}


// 获取路由
export const addSysOperLog = (data) => {
	return request({
		url: '/monitor/operlog/addSysOperLog',
		method: 'post',
		data
	})
}