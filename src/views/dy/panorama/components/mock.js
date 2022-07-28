export const tabs = [
	{
		label:'整体投诉量',
		id:'1',
		overviewData: {
			xName: ['1月', '2月', '3月'],
			legendsBar: ['投诉量'],
			legendsLine: ['环比'],
			barValue: [[parseInt(Math.random()*100).toString(), parseInt(Math.random()*100).toString(), parseInt(Math.random()*100).toString()]],
			lineValue: [[parseInt(Math.random()*10).toString(), parseInt(Math.random()*10).toString(), parseInt(Math.random()*10).toString()]]
  	},
		trendData: {
			xName: ['1月', '2月', '3月'],
			legendsBar: [],
			legendsLine: ['环比'],
			barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
			lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
		}
  }, {
		label: '整体万投比',
			id: '2',
			overviewData: {
			xName: ['1月', '2月', '3月'],
			legendsBar: ['投诉量'],
			legendsLine: ['环比'],
			barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
			lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
		},
		trendData: {
			xName: ['1月', '2月', '3月'],
			legendsBar: [],
			legendsLine: ['环比'],
			barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
			lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
		}
	}
]

export const tabs2 = [
	{
		label:'10086客户投诉情况（集团口径）',
		id:'1',
		activeName: '1',
		trendData: {
			xName: ['1月', '2月', '3月'],
			legendsBar: [],
			legendsLine: ['环比'],
			barValue: [[parseInt(Math.random()*100).toString(), parseInt(Math.random()*100).toString(), parseInt(Math.random()*100).toString()]],
			lineValue: [[parseInt(Math.random()*10).toString(), parseInt(Math.random()*10).toString(), parseInt(Math.random()*10).toString()]]
  		},
		innerTabs: [
			{
				label: '整体投诉量',
				id: '1',
				overviewData: {
					xName: ['1月', '2月', '3月'],
					legendsBar: ['投诉量'],
					legendsLine: ['环比'],
					barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
					lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
				}
			}, {
				label: '整体万投比',
				id: '2',
				overviewData: {
					xName: ['1月', '2月', '3月'],
					legendsBar: ['投诉量'],
					legendsLine: ['环比'],
					barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
					lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
				}
			}
		]
  }, {
		label: '10086客户投诉情况（协查工单）',
		id: '2',
		activeName: '1',
		trendData: {
			xName: ['1月', '2月', '3月'],
			legendsBar: [],
			legendsLine: ['环比'],
			barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
			lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
		},
		innerTabs: [
			{
				label: '整体投诉量',
				id: '1',
				overviewData: {
					xName: ['1月', '2月', '3月'],
					legendsBar: ['投诉量'],
					legendsLine: ['环比'],
					barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
					lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
				}
			}, {
				label: '整体万投比',
				id: '2',
				overviewData: {
					xName: ['1月', '2月', '3月'],
					legendsBar: ['投诉量'],
					legendsLine: ['环比'],
					barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
					lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
				}
			}
		]
	}, {
		label: '10086客户投诉情况（非投诉立单）',
		id: '3',
		activeName: '1',
		trendData: {
			xName: ['1月', '2月', '3月'],
			legendsBar: [],
			legendsLine: ['环比'],
			barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
			lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
		},
		innerTabs: [
			{
				label: '整体投诉量',
				id: '1',
				overviewData: {
					xName: ['1月', '2月', '3月'],
					legendsBar: ['投诉量'],
					legendsLine: ['环比'],
					barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
					lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
				}
			}, {
				label: '整体万投比',
				id: '2',
				overviewData: {
					xName: ['1月', '2月', '3月'],
					legendsBar: ['投诉量'],
					legendsLine: ['环比'],
					barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
					lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
				}
			}
		]
	}, {
		label: '10086客户投诉情况（家宽报障）',
		id: '4',
		activeName: '1',
		trendData: {
			xName: ['1月', '2月', '3月'],
			legendsBar: [],
			legendsLine: ['环比'],
			barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
			lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
		},
		innerTabs: [
			{
				label: '整体投诉量',
				id: '1',
				overviewData: {
					xName: ['1月', '2月', '3月'],
					legendsBar: ['投诉量'],
					legendsLine: ['环比'],
					barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
					lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
				}
			}, {
				label: '整体万投比',
				id: '2',
				overviewData: {
					xName: ['1月', '2月', '3月'],
					legendsBar: ['投诉量'],
					legendsLine: ['环比'],
					barValue: [[parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString(), parseInt(Math.random() * 100).toString()]],
					lineValue: [[parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString(), parseInt(Math.random() * 10).toString()]]
				}
			}
		]
	}
]


export const innerTabs = [
	{
		label: '投诉量',
		id: '1',
		overviewData: {
			xName: [],
			legendsBar: [],
			legendsLine: ['投诉量','环比'],
			barValue: [],
			lineValue: []
		}
	}, {
		label: '万投比',
		id: '2',
		overviewData: {
			xName: [],
			legendsBar: [],
			legendsLine: ['万投比','环比'],
			barValue: [],
			lineValue: []
		}
	}
]

export const pieData = [
	{
		score: 0,
		target_name: '标题',
		partrate: '-'
	}, /*{
		score: parseInt(Math.random()*100).toString(),
		target_name: 'C-移动业务',
		partrate: Math.random()
  	}, {
		score: parseInt(Math.random() * 100),
		target_name: 'H-家庭业务',
		partrate: Math.random()
	}, {
		score: parseInt(Math.random() * 100),
		target_name: 'B-集团业务',
		partrate: Math.random()
	}, {
		score: parseInt(Math.random() * 100),
		target_name: 'N-新增业务',
		partrate: Math.random()
	}*/
]

export const carouselLists = function(){
	const arr = [
		'客户投诉情况', '移动网络类投诉情况', '家宽网络类投诉情况',
		'集团网络类投诉情况', '市场类投诉情况', '', '信息安全投诉情况',
		'个人业务投诉情况', '家庭业务投诉情况', '通信行程卡投诉情况',
		'集团业务投诉情况', '增值业务投诉情况'
	]

	const datas = arr.map((item, idx) => {
		if(item) {
			return {
				target_name: item,
				score: (Math.random() * 100).toFixed(2),	//投诉总量
				investBasis: (Math.random() * 100).toFixed(2),	//万投比值
				target_id: idx == 0 ? '4010101' : idx,
				showCHBN: false,
				yearbasis: Math.random().toFixed(1),	//万投比环比
				momrate: Math.random().toFixed(1),	//投诉量环比
			};
		} else {
			return {};
		}
	})
	return []
}()