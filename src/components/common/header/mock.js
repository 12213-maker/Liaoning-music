export const menuItems = [
	{
		"name": "",
		"path": "",
		"id": '1',
		"meta": {
			"title": "服务全景"
		},
		"children": [
			{
				"name": "",
				"path": "",
				"parentIds": ['1'],
				"meta": {
					"title": "全景视图概览"
				},
				"children": [
					{
						"name": "Home",
						"path": "/home",
						"parentIds": ['1', '1-1'],
						"meta": {
							"title": "全景概览",
							"remark": ""
						}
					}
				]
			},
			/*{
				"name": "",
				"path": "",
				"parentIds": ['1'],
				"meta": {
					"title": "端到端过程质量视图"
				},
				"children": [
					{
						"name": "Home",
						"path": "/home",
						"parentIds": ['1', '1-2'],
						"meta": {
							"title": "归集展示",
							"remark": "归集展示XXXXXX"
						}
					}
				]
			}*/
		]
	}, {
		"name": "",
		"path": "",
		"id": '2',
		"meta": {
			"title": "共享中心"
		},
		"children": [
			{
				"name": "",
				"path": "",
				"parentIds": ['2-1'],
				"meta": {
					"title": "报表管理"
				},
				"children": [
					{
						"name": "ReportHome",
						"path": "/reportHome",
						"parentIds": ['2', '2-1'],
						"meta": {
							"title": "报表首页",
							"remark": ""
						}
					}, {
						"name": "ReportList",
						"path": "/reportList",
						"parentIds": ['2', '2-1'],
						"meta": {
							"title": "报表列表",
							"remark": ""
						}
					}, {
						"name": "",
						"path": "request:/statementDetailList/getDTSDownFlie",
						"parentIds": ['2', '2-1'],
						"meta": {
							"title": "报表下载",
							"remark": ""
						}
					}
				]
			}
		]
	},
  {
      "children": [
          {
              "children": [
                {
                     "meta": {

                         "title": "站店听音-精准推音"
                     },
                     "name": "auditionPrecise",
                     "parentIds": [
                         "3",
                         "3-1"
                     ],
                     "path": "/auditionPrecise"
                 },
                 /* {
                      "meta": {

                          "title": "站店听音-主页"
                      },
                      "name": "auditionMain",
                      "parentIds": [
                          "3",
                          "3-1"
                      ],
                      "path": "/auditionMain"
                  }, */
                  {
                      "meta": {

                          "title": "站店听音-我的"
                      },
                      "name": "auditionMy",
                      "parentIds": [
                          "3",
                          "3-1"
                      ],
                      "path": "/auditionMy"
                  }, {
                    "meta": {
                      "title": "站店听音-站店申请单"
                    },
                    "name": "stationstore",
                    "parentIds": [
                      "3",
                      "3-1"
                    ],
                    "path": "/stationstore"
                  }, {
                    "meta": {

                      "title": "站店听音-问题任务清单"
                    },
                    "name": "stationStoreQuestion",
                    "parentIds": [
                      "3",
                      "3-1"
                    ],
                    "path": "/stationStoreQuestion"
                  }
              ],
              "meta": {
                  "title": "站店听音"
              },
              "name": "",
              "parentIds": [
                  "3-1"
              ],
              "path": ""
          }
      ],
      "id": "3",
      "meta": {
          "title": "站店听音"
      },
      "name": "",
      "path": ""
  }
];

export const jtMenu = {
	"name": "",
	"path": "request:/account/getGroupUrl",
	"meta": {
		"title": "集团大音",
		"icon": "edit",
		"noCache": false,
		"remark": "0",
		"menuId": 2011
	}
}
