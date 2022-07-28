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