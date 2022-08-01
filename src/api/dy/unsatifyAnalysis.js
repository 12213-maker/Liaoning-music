import request from '@/utils/request'
const baseUrl = '/api/rest-open-api';

// 获取指标列表及最新有数据时间
export function getCustomerList(data) {
	return request({
		url: `${baseUrl}/customer_group_list`,
		method: 'post',
		data: data
	})
}

// 获取客户群详情接口
export function getCustomerGroupInfo(data) {
	return request({
		url: `${baseUrl}/customer_group_info`,
		method: 'post',
		data: data
	})
}

// 客户分析接口-汇总数据
export function getCustomerAll(data) {
	return request({
		url: `${baseUrl}/customer_all`,
		method: 'post',
		data: data
	})
}


// 修复结果分析-修复结果
export function getCustomerGroupFix(data) {
	return request({
		url: `${baseUrl}/customer_group_fix`,
		method: 'post',
		data
	})
}

// 修复结果分析-修复结果
export function getCustomerGroupCurdate(data) {
	return request({
		url: `${baseUrl}/customer_group_curDate`,
		method: 'post',
		data
	})
}



// 修复结果分析-修复结果-修复排名
export function getCustomerGroupFixRank(data) {
	return request({
		url: `${baseUrl}/customer_group_fix_top`,
		method: 'post',
		data
	})
}


// 不满意客户修复-地市列表
export function getCityList(data) {
	return request({
		url: `${baseUrl}/customer_cityList`,
		method: 'post',
		data
	})
}



// 不满意客户修复-修复结果分析-修复时间趋势
export function getCustomerGroupFixTrend(data) {
	return request({
		url: `${baseUrl}/customer_group_fix_day`,
		method: 'post',
		data
	})
}