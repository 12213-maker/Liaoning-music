import request from '@/utils/request'

export function gotoJTDY() {
	return request({
		url: '/account/getGroupUrl',
		method: 'post',
		data:{}
	});
}