import request from '@/utils/request'
const baseUrl = '/api/rest-open-api';


// 获取指标列表及最新有数据时间
export function getMapData(data) {
	return request({
		url: `${baseUrl}/6xgltt2j`,
		method: 'post',
		data: data
	})
}


// 获取指标列表及最新有数据时间
export function getComplaintRank(data) {
	return request({
		url: `${baseUrl}/eKqffqQJ`,
		method: 'post',
		data: data
	})
}


// 获取数据最新日期
export function getLatestDate(data) {
	return request({
		url: `${baseUrl}/W8YixAJ1`,
		method: 'post',
		data: data
	})
}


// 获取数据最新日期
export function getWeekList(data) {
	return request({
		url: `${baseUrl}/Mx9buqta`,
		method: 'post',
		data: data
	})
}


// 获取整体投诉量，整体万投比，CHBN
export function getDetailData(data) {
	return request({
		url: `${baseUrl}/j15hKIen`,
		method: 'post',
		data: data
	})
}

// 获取指标列表
export function getIndexList(data) {
	return request({
		url: `${baseUrl}/jRoO5Tvv`,
		method: 'post',
		data: data
	})
}


// 获取指标列表
export function getIndexMapDatas(data) {
	return request({
		url: `${baseUrl}/tiHDgB3R`,
		method: 'post',
		data: data
	})
}


// 在线人数信息
export function getAccountNumber() {
	return request({
		url: `/account/getAccountNumber`,
		method: 'post',
		data: {}
	})
}


