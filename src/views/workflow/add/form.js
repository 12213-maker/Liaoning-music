
export default
[
  {
    "name": "省内工单",
    "key": "99",
    "version": 0,
    "fields": [
      {
        "fieldType": "FormField",
        "id": "applyCount",
        "name": "事项数",
        "showExp": true,
        "type": "text",
        "value": '1',
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 2
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "applyTitle",
        "name": "督办事项",
        "showExp": true,
        "type": "applyTitle",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 3
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "applyDepartment",
        "showExp": true,
        "name": "派单部门",
        // "type": "workflowHandlerList",
        "type": "dept",
        "value": null,
        "required": true,
        "readOnly": true,
        "overrideId": false,
        "placeholder": "empty",
        "params": {
          "showType": "1",
          "userRoleId": "task_01_accept",
          "order": 4
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "applyPerson",
        "showExp": true,
        "name": "派单人",
        "type": "creator",
        "value": null,
        "required": true,
        "readOnly": true,
        "overrideId": true,
        "placeholder": null,

        "params": {
          "showType": "2",
          "order": 5
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "applyPhone",
        "name": "派单人电话",
        "showExp": true,
        "type": "creatorNumber",
        "pattern": /^(([0-9]{11})|([0-9]{3}\-[0-9]{8})|([0-9]{4}\-[0-9]{7}))$/,
        "errorMsg": '电话号码不能为空，且需格式正确',
        "value": null,
        "required": true,
        "readOnly": true,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 6
        },
        "layout": null
      },
      {
        "fieldType": "OptionFormField",
        "id": "limitTime",
        "name": "督办时限",
        "showExp": true,
        "type": "date",
        "value": "11",
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "1",
          "order": 7,
          "type":'date'
        },
        "layout": null,
        "optionType": null,
        "hasEmptyValue": true,
        "options": [

        ],
        "optionsExpression": null
      },
      {
        "fieldType": "FormField",
        "id": "taskType",
        "name": "督办类别",
        "showExp": true,
        "type": "taskType",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 8
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "lordDepartment",
        "name": "主责部门",
        "showExp": true,
        "type": "lordDepartment",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 9
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "problemDesc",
        "name": "督办问题描述",
        "showExp": true,
        "type": "textarea",
        "value": null,
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 10,
          "rows":6
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "problemSource",
        "name": "督办问题来源",
        "showExp": true,
        "type": "text",
        "value": null,
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 11
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "target",
        "name": "督办目标",
        "showExp": true,
        "type": "text",
        "value": null,
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 12
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "copySend",
        "name": "抄送人",
        "showExp": true,
        "type": "copySend",
        "value": null,
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 14
        },
        "layout": null
      },
       {
         "fieldType": "FormField",
         "id": "auditor",
         "name": "接口人",
         "showExp": true,
         "type": "auditor",
         "value": null,
         "required": true,
         "readOnly": false,
         "overrideId": true,
         "placeholder": null,
         "params": {
           "showType": "0",
           "order": 14
         },
         "layout": null
       },
      {
        "fieldType": "FormField",
        "id": "attachList",
        "name": "上传附件",
        "showExp": true,
        "type": "upload",
        "value": null,
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 10
        },
        "layout": null
      },
    ]
  },
  {
    "name": "省专公司申请单",
    "key": "0301",
    "version": 0,
    "fields": [{
        "fieldType": "OptionFormField",
        "id": "identyDetail",
        "name": "工单细类",
        "showExp": true,
        "type": "dropdown",
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 1
        },
        "layout": null,
        "optionType": null,
        "hasEmptyValue": true,
        "options": [
          {
            "id": "01",
            "name": "投诉管理"
          },
          {
            "id": "02",
            "name": "用后即评管理"
          },
          {
            "id": "03",
            "name": "端到端管理"
          },
           {
             "id": "04",
             "name": "标准落地管理"
           }, 
           {
             "id": "05",
             "name": "大音平台管理"
           }, 
           {
             "id": "06",
             "name": "其他"
           },
      ],
        "optionsExpression": null
      },
      {
        "fieldType": "FormField",
        "id": "title",
        "name": "工单标题",
        "showExp": true,
        "type": "text",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 2
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "content",
        "name": "工单内容",
        "showExp": true,
        "type": "textarea",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 3
        },
        "layout": null
      },
      {
        "fieldType": "OptionFormField",
        "id": "processTime",
        "name": "要求处理时间",
        "showExp": true,
        "type": "date",
        "value": "11",
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "1",
          "order": 7,
          "type":"date"
        },
        "layout": null,
        "optionType": null,
        "hasEmptyValue": true,
        "options": [

        ],
        "optionsExpression": null
      },
      {
        "fieldType": "FormField",
        "id": "creator",
        "name": "创建人",
        "showExp": true,
        "type": "creator",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 8
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "creatorContactInfo",
        "name": "创建人联系方式",
        "showExp": true,
        "type": "creatorNumber",
        "value": null,
        "required": true,
        "pattern": /^(([0-9]{11})|([0-9]{3}\-[0-9]{8})|([0-9]{4}\-[0-9]{7}))$/,
        "errorMsg": '电话号码不能为空，且需格式正确',
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 9
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "attachList",
        "name": "上传附件",
        "showExp": true,
        "type": "upload",
        "value": null,
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 10
        },
        "layout": null
      },
    ]
  },
  {
    "name": "一线回传申请单",
    "key": "0302",
    "version": 0,
    "fields": [{
        "fieldType": "OptionFormField",
        "id": "identyDetail",
        "name": "工单细类",
        "showExp": true,
        "type": "dropdown",
        "required": false,
        "readOnly": true,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 1
        },
        "layout": null,
        "optionType": null,
        "hasEmptyValue": true,
        "options": [
           {
              "id": "01",
              "name": "一线声音申请单"
           }, {
              "id": "02",
              "name": "站店问题申请单",
              "disabled":true
           }, {
              "id": "03",
               "name": "听音问题申请单",
             "disabled": true
           }, {
              "id": "04",
              "name": "追投诉问题申请单",
              "disabled": true
           },
        ],
        "optionsExpression": null
      },
      {
        "fieldType": "FormField",
        "id": "title",
        "name": "工单标题",
        "showExp": true,
        "type": "text",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 2
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "content",
        "name": "工单内容",
        "type": "textarea",
        "showExp": true,
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 3
        },
        "layout": null
      },
      {
        "fieldType": "OptionFormField",
        "id": "processTime",
        "name": "要求处理时间",
        "showExp": true,
        "type": "date",
        "value": "11",
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "1",
          "order": 7,
          "type": "date"
        },
        "layout": null,
        "optionType": null,
        "hasEmptyValue": true,
        "options": [

        ],
        "optionsExpression": null
      },
      {
        "fieldType": "FormField",
        "id": "creator",
        "name": "创建人",
        "showExp": true,
        "type": "creator",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 8
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "creatorContactInfo",
        "name": "创建人联系方式",
        "showExp": true,
        "pattern": /^(([0-9]{11})|([0-9]{3}\-[0-9]{8})|([0-9]{4}\-[0-9]{7}))$/,
        "errorMsg": '电话号码不能为空，且需格式正确',
        "type": "creatorNumber",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 9
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "target",
        "name": "派发目标",
        "showExp": true,
        "type": "dropdown",
        "value": null,
        "defaultValue":"1",
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 10
        },
        "options": [
          { "id": "1", "name": "集团大音" },
          { "id": "2", "name": "省公司" },
          { "id": "3", "name": "专业公司" }
        ],
        "layout": null
      },
        {
          "fieldType": "FormField",
          "id": "handlerDept",
          "name": "工单接收部门",
          "showExp":"target",
          "showIf":'1',
          "type": "dropdown",
          "value": null,
          "required": false,
          "readOnly": false,
          "overrideId": true,
          "placeholder": null,
          "params": {
            "showType": "0",
            "order": 10
          },
          "options": [
            {
              "id": "0001",
              "name": "客户服务部"
            },{
              "id": "0002",
              "name": "市场经营部"
            },{
              "id": "0003",
              "name": "网络事业部"
            },{
              "id": "0013",
              "name": "法律与监管事务部"
            },{
              "id": "0014",
              "name": "政企事业部"
            }, {
              "id": "0015",
              "name": "信息安全部"
            }, {
              "id": "0016",
              "name": "人力资源部（党组组织部"
            }, {
              "id": "0017",
              "name": "党群工作部（党群宣传部/直属党委"
            },{
              "id": "0018",
              "name": "办公室（党组办公室/董事会办公室）"
            }, {
              "id": "0019",
              "name": "发展战略部（改革办/慈善基金会）"
            }, {
              "id": "0020",
              "name": "计划建设部/乡村振兴办公室"
            }, {
              "id": "0021",
              "name": "5G共建共享办公室"
            },{
              "id": "0022",
              "name": "财务部"
            }, {
              "id": "0023",
              "name": "信网项目部"
            }, {
              "id": "0024",
              "name": "技术部（重大科技专项办公室）"
            }, {
              "id": "0025",
              "name": "国际业务部"
            },{
              "id": "0026",
              "name": "内审部"
            }, {
              "id": "0027",
              "name": "巡视办公室（党风廉政办公室）"
            }, {
              "id": "0028",
              "name": "纪检监察组"
            }, {
              "id": "0029",
              "name": "集团工会"
            },
          ],
          "layout": null
        },
      {
        "fieldType": "FormField",
        "id": "receiverUnit",
        "name": "工单接收省份",
        "showExp": "target",
        "showIf": '2',
        "type": "dropdown",
        "value": null,
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 10
        },

        "options": [
          {"id": "100","name": "北京"}, 
          {"id": "220","name": "天津"}, 
          {"id": "531","name": "山东"}, 
          {"id": "311","name": "河北"}, 
          {"id": "351","name": "山西"}, 
          {"id": "471","name": "内蒙古"}, 
          {"id": "551","name": "安徽"}, 
          {"id": "210","name": "上海"}, 
          {"id": "250","name": "江苏"}, 
          {"id": "571","name": "浙江"}, 
          {"id": "591","name": "福建"}, 
          {"id": "898","name": "海南"}, 
          {"id": "200","name": "广东"}, 
          {"id": "771","name": "广西"}, 
          {"id": "971","name": "青海"}, 
          { "id": "270", "name": "湖北" },
          { "id": "731", "name": "湖南" },
          { "id": "791", "name": "江西" },
          { "id": "371", "name": "河南" },
          { "id": "891", "name": "西藏" },
          { "id": "280", "name": "四川" },
          { "id": "230", "name": "重庆" },
          { "id": "290", "name": "陕西" },
          { "id": "851", "name": "贵州" },
          { "id": "871", "name": "云南" },
          { "id": "931", "name": "甘肃" },
          { "id": "951", "name": "宁夏" },
          { "id": "991", "name": "新疆" },
          { "id": "431", "name": "吉林" },
          { "id": "240", "name": "辽宁" },
          { "id": "451", "name": "黑龙江" }
        ],
        "layout": null
      },

    {
      "fieldType": "FormField",
      "id": "receiverUnit",
      "name": "工单接收在线公司",
      "showExp": "target",
      "showIf": '3',
      "type": "dropdown",
      "value": null,
      "required": false,
      "readOnly": false,
      "overrideId": true,
      "placeholder": null,
      "params": {
        "showType": "0",
        "order": 10
      },

      "options": [
        { "id": "6243", "name": "终端公司" },
        { "id": "6230", "name": "咪咕大音二级平台" },
        { "id": "0267", "name": "在线公司/在线营销中心" },
        { "id": "0157", "name": "物联网专席客服" },
        { "id": "0609", "name": "杭研智慧家庭" },
        { "id": "6215", "name": "上海产业研究院" },
        { "id": "6217", "name": "苏研云能经分系统" },
        { "id": "0604", "name": "金科公司" },
        { "id": "0178", "name": "中移互联网有限公司" },
        { "id": "6231", "name": "大音大数据子目录系统" },
        { "id": "6214", "name": "成都产业研究院" },
        { "id": "6247", "name": "集成公司" }
      ],
      "layout": null
    },
          {
            "fieldType": "FormField",
            "id": "problemNature",
            "name": "问题所属性质",
            "type": "dropdown",
            "showExp": true,
            "value": null,
            "required": true,
            "readOnly": false,
            "overrideId": true,
            "placeholder": null,
            "params": {
              "showType": "0",
              "order": 10
            },
            "options": [
              {
                "id": "01",
                "name": "紧迫性问题"
              },
              {
                "id": "02",
                "name": "长期性问题"
              },
              {
                "id": "99",
                "name": "其他性问题"
              }
          ],
            "layout": null
          },
          {
            "fieldType": "FormField",
            "id": "problemType",
            "name": "问题分类",
            "showExp": "identyDetail",
            "showIf": "02,03,04",
            "type": "cascader",
            "value": null,
            "required": true,
            "readOnly": false,
            "overrideId": true,
            "placeholder": null,
            "params": {
              "showType": "0",
              "order": 10
            },
            "options": [{
                "child":[
                    {
                      "id": "01",
                      "name": "无线网络"
                    },
                    {
                      "id": "02",
                      "name": "家宽网络"
                    },
                ],
                "id": "10",
                "name": "网络质量"
              },
              {
                "child":[
                  {
                    "id": "01",
                    "name": "个人产品"
                  }, {
                    "id": "02",
                    "name": "家庭产品"
                  },
                  {
                    "id": "03",
                    "name": "政企产品"
                  }, {
                    "id": "04",
                    "name": "新兴产品"
                  },
                ],
                "id": "11",
                "name": "产品质量"
              }, {
                "child": [{
                    "id": "01",
                    "name": "社会渠道"
                  }, {
                    "id": "02",
                    "name": "营业厅"
                  },
                  {
                    "id": "03",
                    "name": "App"
                  }, {
                    "id": "04",
                    "name": "热线"
                  },
                  {
                    "id": "05",
                    "name": "其它"
                  },
                ],
                "id": "12",
                "name": "触点质量"
              }, {
                "child": [{
                  "id": "01",
                  "name": "工作环境"
                }, {
                  "id": "02",
                  "name": "考核激励"
                },
                {
                  "id": "03",
                  "name": "成长发展"
                }, {
                  "id": "99",
                  "name": "其他"
                }
                ],
                "id": "13",
                "name": "其他"
              }
            ],
            "layout": null
          },

          {
            "fieldType": "FormField",
            "id": "problemType",
            "name": "问题分类",
            "showExp": "identyDetail",
            "showIf": "01",
            "type": "cascader",
            "value": null,
            "required": true,
            "readOnly": false,
            "overrideId": true,
            "placeholder": null,
            "params": {
              "showType": "0",
              "order": 10
            },
            "options": [{
              "child": [
                  {
                    "id": "01",
                    "name": "无线网络"
                  },
                  {
                    "id": "02",
                    "name": "家宽网络"
                  },
                ],
                "id": "10",
                "name": "网络质量"
              },
              {
                "child": [
                  {
                    "id": "01",
                    "name": "个人产品"
                  }, {
                    "id": "02",
                    "name": "家庭产品"
                  },
                  {
                    "id": "03",
                    "name": "政企产品"
                  }, {
                    "id": "04",
                    "name": "新兴产品"
                  },
                ],
                "id": "11",
                "name": "产品质量"
              }, {
                "child": [
                  {
                    "id": "01",
                    "name": "社会渠道"
                  }, {
                    "id": "02",
                    "name": "营业厅"
                  },
                  {
                    "id": "03",
                    "name": "App"
                  }, {
                    "id": "04",
                    "name": "热线"
                  },
                  {
                    "id": "05",
                    "name": "其它"
                  },
                ],
                "id": "12",
                "name": "触点质量"
            }],
            "layout": null
          },
           
          {
            "fieldType": "FormField",
            "id": "initialSuggestion",
            "name": "初审意见",
            "showExp": true,
            "type": "textarea",
            "value": null,
            "required": true,
            "readOnly": false,
            "overrideId": true,
            "placeholder": null,
            "params": {
              "showType": "0",
              "order": 10
            },
            "layout": null
          },
          {
            "fieldType": "FormField",
            "id": "personnelType",
            "name": "一线人员类型",
            "showExp": true,
            "type": "dropdown",
            "value": null,
            "required": true,
            "readOnly": false,
            "overrideId": true,
            "placeholder": null,
            "params": {
              "showType": "0",
              "order": 10
            },
            "options": [{
                "id": "01",
                "name": "网格人员"
              },
              {
                "id": "02",
                "name": "营业人员"
              }, {
                "id": "03",
                "name": "客户经理"
              },
              {
                "id": "04",
                "name": "装修人员"
              },
                {
                  "id": "05",
                  "name": "热线人员"
                },
                {
                  "id": "99",
                  "name": "其它人员"
                }
            ],
            "layout": null
          },
          {
            "fieldType": "FormField",
            "id": "introducer",
            "name": "问题提出人",
            "showExp": true,
            "type": "text",
            "value": null,
            "required": true,
            "readOnly": false,
            "overrideId": true,
            "placeholder": null,
            "params": {
              "showType": "0",
              "order": 10
            },
            "layout": null
          },
            {
              "fieldType": "FormField",
              "id": "introducerTel",
              "name": "问题提出人手机号",
              "showExp": true,
              "type": "text",
              "value": null,
              "required": true,
              "pattern": /^(([0-9]{11})|([0-9]{3}\-[0-9]{8})|([0-9]{4}\-[0-9]{7}))$/,
              "errorMsg": '电话号码不能为空，且需格式正确',
              "readOnly": false,
              "overrideId": true,
              "placeholder": null,
              "params": {
                "showType": "0",
                "order": 10
              },
              "layout": null
            },
            {
              "fieldType": "FormField",
              "id": "informationType",
              "name": "信息类型",
              "showExp": true,
              "type": "dropdown",
              "value": null,
              "required": false,
              "readOnly": false,
              "overrideId": true,
              "placeholder": null,
              "params": {
                "showType": "0",
                "order": 10
              },
              "options": [{
                  "id": "01",
                  "name": "业务规则问题"
                },
                {
                  "id": "02",
                  "name": "产品质量问题"
                }, {
                  "id": "03",
                  "name": "生产流程问题"
                },
                {
                  "id": "04",
                  "name": "系统支撑问题"
                },
                {
                  "id": "05",
                  "name": "客户需求"
                },
                {
                  "id": "06",
                  "name": "竞争动态"
                },
                {
                  "id": "99",
                  "name": "其它日常管理建议"
                }
              ],
              "layout": null
            },
            {
              "fieldType": "FormField",
              "id": "fileNo",
              "name": "档案编号",
              "showExp": "identyDetail",
              "showIf":'01',
              "type": "text",
              "value": null,
              "required": false,
              "readOnly": false,
              "overrideId": true,
              "placeholder": null,
              "params": {
                "showType": "0",
                "order": 10
              },
              "layout": null
            },
            {
              "fieldType": "FormField",
              "id": "fileNo",
              "name": "档案编号",
              "showExp": "identyDetail",
              "showIf": '02,03,04',
              "type": "text",
              "value": null,
              "required": true,
              "readOnly": false,
              "overrideId": true,
              "placeholder": null,
              "params": {
                "showType": "0",
                "order": 10
              },
              "layout": null
            },
             {
               "fieldType": "FormField",
               "id": "attachList",
               "name": "上传附件",
               "showExp": true,
               "type": "upload",
               "value": null,
               "required": false,
               "readOnly": false,
               "overrideId": true,
               "placeholder": null,
               "params": {
                 "showType": "0",
                 "order": 10
               },
               "layout": null
             },
    ]
  },


    {
      "name": "投诉焦点治理任务单",
      "key": "0206",
      "version": 0,
      "fields": [
      {
        "fieldType": "FormField",
        "id": "number",
        "name": "期数",
        "showExp": true,
        "type": "text",
        "value": null,
        "required": true,
          "pattern": /[0-9]{2}年第[1-9]期/g,
        "errorMsg":'期数不能为空，且需格式正确',
        "readOnly": false,
        "overrideId": true,
        "placeholder": '格式：xx年第x期',
        "params": {
          "showType": "2",
          "order": 2
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "currentTitle",
        "name": "本期主题",
        "type": "text",
        "showExp": true,
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "2",
          "order": 3
        },
        "layout": null
      },
      {
        "fieldType": "OptionFormField",
        "id": "problemName",
        "name": "问题名称",
        "showExp": true,
        "type": "textarea",
        "value": "11",
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "1",
          "order": 7
        },
        "layout": null,
        "optionType": null,
        "hasEmptyValue": true
      },
      {
        "fieldType": "FormField",
        "id": "problemContent",
        "name": "问题表现",
        "showExp": true,
        "type": "textarea",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 8
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "problemReason",
        "name": "问题根因",
        "showExp": true,
        "type": "textarea",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 8
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "governanceMeasures",
        "name": "问题措施",
        "showExp": true,
        "type": "textarea",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 8
        },
        "layout": null
      },
      {
        "fieldType": "FormField",
        "id": "goal",
        "name": "完成标志",
        "showExp": true,
        "type": "textarea",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 8
        },
        "layout": null
      },

      {
        "fieldType": "FormField",
        "id": "completionTime",
        "name": "完成时限",
        "showExp": true,
        "type": "processTime",
        "value": null,
        "required": true,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 8
        },
        "layout": null
      },

      {
        "fieldType": "FormField",
        "id": "evaluation",
        "name": "是否需要效果评估",
        "showExp": true,
        "type": "dropdown",
        "value": '1',
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 10
        },
        "options": [
          {
            "id": "是",
            "name": "是"
          },
          {
            "id": "否",
            "name": "否"
          }
        ],
        "layout": null
      },

      {
        "fieldType": "FormField",
        "id": "attachList",
        "name": "上传附件",
        "showExp": true,
        "type": "upload",
        "value": null,
        "required": false,
        "readOnly": false,
        "overrideId": true,
        "placeholder": null,
        "params": {
          "showType": "0",
          "order": 10
        },
        "layout": null
      },
      ]
    },
  
]
