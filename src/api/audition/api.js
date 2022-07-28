import request from '@/utils/request'
import fileRequest from '@/utils/request'
/* 拼接字符串 */
var JsonToUrlParam = function(jsonParam) {
			var urlArr = [];
			for (var key in jsonParam) {
				urlArr.push(key + "=" + jsonParam[key]);
			}
			return "&" + urlArr.join("&");
}

/*查询条件初始化*/
export function initParamSelect() {
  return request({
    url: '/audition/initParamSelect?randomTime=' + (new Date()).getTime() ,
    method: 'post'
  })
}

/*级联查询子分类列表*/
export function querySubTypeList(dataParam) {
  return request({
    url: '/audition/querySubTypeList?randomTime=' + (new Date()).getTime() + JsonToUrlParam(dataParam),
    method: 'post'
  })
}

/*站内听音主页-分页查询 */
export function queryItemInfoOfPage(dataParam) {
  return request({
    url: '/audition/queryItemInfoOfPage?randomTime=' + (new Date()).getTime() +  JsonToUrlParam(dataParam),
    method: 'post'
  })
}

/*站内听音主页-单一查询记录信息*/
export function queryItemInfoSingle(dataParam) {
  return request({
    url: '/audition/queryItemInfoSingle?randomTime=' + (new Date()).getTime() + JsonToUrlParam(dataParam),
    method: 'post'
  })
}

/*站内听音主页-录音详情列表查询 */
export function recordDetailList(dataParam) {
  return request({
    url: '/audition/recordDetailList?randomTime=' + (new Date()).getTime() + JsonToUrlParam(dataParam),
    method: 'post'
  })
}

/*站内听音主页-重复工单列表查询 */
export function queryRepeatedItemList(dataParam) {
  return request({
    url: '/audition/queryRepeatedItemList?randomTime=' + (new Date()).getTime() +  JsonToUrlParam(dataParam),
    method: 'post'
  })
}

/*站内听音主页-查询openApi接口参数*/
export function getOpenApiStream(dataParam) {
  return fileRequest({
    url: '/audition/getOpenApiStream?randomTime=' + (new Date()).getTime()+  JsonToUrlParam(dataParam),
    method: 'get',
    responseType:'blob'
  })
}

/*站内听音我的-分页查询*/
export function queryMyInfoOfPage(dataParam) {
  return request({
    url: '/audition/queryMyInfoOfPage?randomTime=' + (new Date()).getTime()+JsonToUrlParam(dataParam),
    method: 'post'
  })
}

/*站内听音我的-下载播放记录文件*/
export function exportMyDataFile(dataParam) {
  return fileRequest({
    url: '/audition/exportMyDataFile?randomTime=' + (new Date()).getTime()+ JsonToUrlParam(dataParam),
    method: 'get',
    responseType:'blob'
  })
}

/*站内听音-精准推音-听音情况分析统计*/
export function queryAuditionStatistics(dataParam) {
  return request({
    url: '/audition/queryAuditionStatistics?randomTime=' + (new Date()).getTime()+JsonToUrlParam(dataParam),
    method: 'post'
  })
}
/*站内听音-精准推音-听音情况top5列表*/
export function queryPreciseTop5(dataParam) {
  return request({
    url: '/audition/queryPreciseTop5?randomTime=' + (new Date()).getTime()+JsonToUrlParam(dataParam),
    method: 'post'
  })
}

/*站店听音:发起听音问题工单同步参数"*/
export function updateOrderId(dataParam) {
  return request({
    url: '/audition/updateOrderId?randomTime=' + (new Date()).getTime()+  JsonToUrlParam(dataParam),
    method: 'post'
  })
}



