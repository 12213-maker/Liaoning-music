import request from '@/utils/request'

// 获取大音门户菜单
export function getMenus() {
	return request({
		url: '/authority/getMenus',
		method: 'get'
	});
}

// 获取大音门户权限申请列表
export function getAuthorityList(params) {
	return request({
		url: '/authority/getAuthorityList',
		method: 'get',
		params

	});
}

// 申请大音门户菜单权限
export function applyAuthority(data) {
	return request({
		url: '/authority/applyAuthority',
		method: 'post',
		data
	});
}