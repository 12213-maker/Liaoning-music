import request from '@/utils/request'
const Qs = require('qs')

export function getReportList(url) {
	return request({
		url,
		method: 'get',
	});
}

export function postReportList(query, url) {
	return request({
		url,
		method: 'post',
		data: Qs.stringify(query),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	});
}

export function postSearch(query, url) {
	return request({
		url,
		method: 'post',
		data: query
	});
}


export function downloadRportList(url) {
	return request({
		url: url,
		method: 'post',
		data: {}
	});
}

/*

	以下为报表配置页面接口
	查询分组: /userStatementConfig/findGrouping	
	查询报表类型：/userStatementConfig/findStatement
	分组数据回显：/userStatementConfig/findConfig
	批量修改：/userStatementConfig/batchInsert
*/



// 查询分组名
export function getGroupList() {
	return request({
		url: '/userStatementConfig/findGrouping',
		method: 'get'
	});
}


// 查询报表类型：
export function getReportTypeList() {
	return request({
		url: '/userStatementConfig/findStatement',
		method: 'get'
	});
}


// 分组数据回显
export function getGroupReportType(data) {
	return request({
		url: `/userStatementConfig/findConfig?dtsUserGroupName=${data.dtsUserGroupName}`,
		method: 'post'
	});
}


// 批量修改：
export function batchInsertReport(data) {
	return request({
		url: '/userStatementConfig/batchInsert',
		method: 'post',
		data
	});
}


