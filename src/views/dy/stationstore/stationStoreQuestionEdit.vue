<template>
  <div class="dy-form-wrap">
    <div>{{formTitle}}</div>
    <div class="dy-container">
      <el-form :model="applyForm" :rules="rules" ref="applyForm" label-width="220px" style="width: 900px;margin: 0 auto;">
        <el-form-item label="姓名:" prop="applyPersonName">
          <el-col :span="6">
            <span>{{applyForm.applyPersonName}}</span>
          </el-col>
          <el-col class="line" :span="6">
            <label class="el-form-item__label" style="float: right">所属区域：</label>
          </el-col>
          <el-col :span="12">
            <span>{{applyForm.applyPersonProvince}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="所在部门:">
          <el-col :span="6">
            <span>{{applyForm.applyPersonDept}}</span>
          </el-col>
          <el-col class="line" :span="6">
            <label class="el-form-item__label" style="float: right">所在职位：</label>
          </el-col>
          <el-col :span="12">
            <span>{{applyForm.applyPersonDuty}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="线条:" prop="applyLine"  required>
          <el-radio-group v-model="applyForm.applyLine" :disabled="this.$route.params.type=='2'">
            <el-radio label="市场"></el-radio>
            <el-radio label="网络"></el-radio>
            <el-radio label="政企"></el-radio>
            <el-radio label="服务"></el-radio>
            <el-radio label="综合"></el-radio>
            <el-radio label="支撑"></el-radio>
          </el-radio-group>
        </el-form-item>
<!--        <el-form-item label="主题:" prop="applyTheme" required>-->
<!--          <el-input v-model="applyForm.applyTheme" style="width: 60%"  placeholder="请填写主题"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="主题:" prop="applyTheme">
          <el-input v-model="applyForm.applyTheme"  placeholder="请填写主题" style="width: 60%;" :disabled="this.$route.params.type=='2'"></el-input>
        </el-form-item>
        <el-form-item v-if="this.$route.params.type=='1'" label="投诉工单编号:">
          <el-input v-model="applyForm.sourceId" style="width: 60%" disabled></el-input>
        </el-form-item>
        <el-form-item v-if="this.$route.params.type!='1'" label="触点信息:" prop="contactInfo">
          <el-input v-model="applyForm.contactInfo" @focus="openContactDialog"  placeholder="触点信息" :disabled="this.$route.params.type=='2'" readonly></el-input>
        </el-form-item>
<!--        <el-form-item label="触点类型:" prop="contactType" required>-->
<!--          <el-radio-group v-model="applyForm.contactType" :disabled="this.$route.params.type!='3'" >-->
<!--            <el-radio label="营业厅"></el-radio>-->
<!--            <el-radio label="装维随同"></el-radio>-->
<!--            <el-radio label="网格行销"></el-radio>-->
<!--            <el-radio label="政企集团随销"></el-radio>-->
<!--            <el-radio label="10086热线旁听"></el-radio>-->
<!--            <el-radio label="其他"></el-radio>-->
<!--          </el-radio-group>-->
<!--          <el-input v-if="applyForm.contactType=='其他'" v-model="applyForm.contactName"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="目标:" prop="target">
          <el-input type="textarea" v-model="applyForm.target" placeholder="请填写目标" style="width: 60%" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="关注要点:" prop="focus">
          <el-input type="textarea" v-model="applyForm.focus"  placeholder="请填写关注要点"  style="width: 60%" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="问题类型:" prop="problemType" required>
          <el-radio-group v-model="applyForm.problemType">
            <el-radio label="市场"></el-radio>
            <el-radio label="网络"></el-radio>
            <el-radio label="政企"></el-radio>
            <el-radio label="服务"></el-radio>
            <el-radio label="综合"></el-radio>
            <el-radio label="支撑"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题分类:" prop="questionCategory" required>
          <el-cascader :options="questionCategory1Options"
                       @change="handleChangeQuestionCategory1"
                       v-model="applyForm.questionCategory"
                       clearable
                       style="width: 80%;"
          ></el-cascader>

          <!--          <el-col :span="9">-->
<!--            <el-form-item prop="questionCategory1" required>-->
<!--              <el-select v-model="applyForm.questionCategory1" placeholder="问题情况分类（一级）:" @change="cityChangeQuestionCategory">-->
<!--                <el-option-->
<!--                  v-for="item in questionCategoryOptions1"-->
<!--                  :key="item.name"-->
<!--                  :label="item.name"-->
<!--                  :value="item.name"-->
<!--                >-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="15">-->
<!--            <el-form-item prop="questionCategory2" label="问题情况分类（二级）：" required>-->
<!--              <el-select v-model="applyForm.questionCategory2" placeholder="问题情况分类（二级）:">-->
<!--                <el-option-->
<!--                  v-for="item in questionCategoryOptions2"-->
<!--                  :key="item.name"-->
<!--                  :label="item.name"-->
<!--                  :value="item.name"-->
<!--                >-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-form-item>
        <el-form-item label="对标端到端服务过程质量管理体系，哪项流程/控制点/KQI缺失:" prop="lackOfQuality" class="item-line">
<!--          <el-input type="textarea" v-model="applyForm.lackOfQuality" placeholder="请填写对标端到端服务过程质量管理体系，哪项流程/控制点/KQI缺失" rows="5"></el-input>-->
          <el-select v-model="applyForm.lackOfQuality" placeholder="请选择对标端到端服务过程质量管理体系，哪项流程/控制点/KQI缺失" style="width: 80%;">
            <el-option
              v-for="item in lackOfQualityList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="对照问题失责13种类型39种表现，因归因到哪种类型:" prop="problemDefault"  class="item-line">
          <el-select v-model="applyForm.problemDefault" placeholder="请选择对照问题失责13种类型39种表现，因归因到哪种类型" style="width: 80%;">
            <el-option
              v-for="item in problemDefaultList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
<!--          <el-input type="textarea" v-model="applyForm.problemDefault" placeholder="请填写对照问题失责13种类型39种表现，因归因到哪种类型" rows="5"></el-input>-->
        </el-form-item>
        <el-form-item label="发起单位:" prop="activityName" required>
          <el-select v-model="applyForm.activityName" placeholder="请选择发起单位" style="width: 40%;">
            <el-option label="直属中心" value="科室领导"></el-option>
            <el-option label="职能部门" value="部门领导"></el-option>
            <el-option label="地市公司" value="地市部门领导"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批人:" prop="responsibleMan" required>
          <el-input v-model="applyForm.responsibleMan" @click.native="showTree1" placeholder="请选择发起人上级审批人" style="width: 80%;" readonly>
          </el-input>
<!--          <span style="width: 35%;color:red;margin-left: 10px">注：请选择到具体审批人</span>-->
          <div style="width: 80%;height: 200px;overflow-y: auto" v-show="treeVisible1">
            <el-tree ref="tree" :data="data1" :props="defaultProps" @node-click="handleNodeClick1"  :expand-on-click-node="false"></el-tree>
          </div>
        </el-form-item>
        <el-form-item label="责任单位:" prop="responsibleUnit" required>
          <el-input v-model="applyForm.responsibleUnit" @click.native="showTree" placeholder="请选择责任单位" style="width: 80%;" readonly></el-input>
          <div style="width: 80%;height: 200px;overflow-y: auto" v-show="treeVisible">
            <el-tree ref="tree" :data="data" :props="defaultProps" @node-click="handleNodeClick"  :expand-on-click-node="false"></el-tree>
          </div>
        </el-form-item>
        <el-form-item label="是否需要反馈:" prop="problemIsneedFeedback"   required>
          <el-select v-model="applyForm.problemIsneedFeedback" placeholder="请选择是否需要反馈" style="width: 40%;">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="applyForm.problemIsneedFeedback == '是'" label="问题反馈时间要求:" prop="problemFeedbackTime" required>
          <el-date-picker type="date" placeholder="请选择问题反馈时间" v-model="applyForm.problemFeedbackTime" value-format="yyyy-MM-dd" style="width: 40%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="主要发现:" prop="mainFindings">
          <el-input type="textarea" v-model="applyForm.mainFindings" rows="5"></el-input>
        </el-form-item>
        <el-form-item label="优改思路/举措建议:" prop="suggest">
          <el-input type="textarea" v-model="applyForm.suggest" rows="5"></el-input>
        </el-form-item>
        <el-form-item v-if=createdFlag>
          <el-button @click="goBack()">返回</el-button>
          <el-button @click="resetForm('applyForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('applyForm')" :loading="submitLoading">新增</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="close()">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
    <StationStoreContact
      :contactDialogVisible="contactDialogVisible"
      @closeContactDialog="closeContactDialog"
      @contactRowClick="contactRowClick"
    />
  </div>
</template>
<script>
  import {
    getStationStoreContactInfoByCnd,getCityOrContyInfo,getStationStoreDetail,queryStationStoreQuestionInfoDetail,saveStationStoreQuestion,getOaUserDeptRelation,getOaDeptRelation
  } from "@/api/stationstore/api";
  import StationStoreContact from '@/views/dy/stationstore/stationStoreContact';

  export default {
    components:{
      StationStoreContact,
    },
    data() {
      return {
        data: [],
        data1: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        applyForm: {
          applyPersonName:null,
          applyPersonDept:null,
          applyPersonDuty:null,
          applyPersonProvince:null,
          applyPersonCity:null,
          applyLine:null,
          applyTheme:null,
          applyTime:null,
          contactId:null,
          contactCity:null,
          contactCounty:null,
          contactType:null,
          contactName:null,
          contactAddress:null,
          contactPerson:null,
          contactPersonDuty:null,
          contactPersonTelephone:null,
          contactPersonEmail:null,
          contactInfo:null,
          status:null,
          createtime:null,
          modifytime:null,
          target:null,//目标
          focus:null,//关注要点
          problemType:null,//问题类型
          questionCategory:null,//问题分类
          questionCategory1:null,//问题情况分类（一级
          questionCategory2:null,//问题情况分类（二级）
          lackOfQuality:null,//对标端到端服务过程质量管理体系，哪项流程/控制点/KQI缺失？
          problemDefault:null,//对照问题失责13种类型39种表现，因归因到哪种类型
          responsibleMan:null,//审批人
          responsibleUnit:null,//责任单位
          problemIsneedFeedback:null,//是否需要反馈
          problemFeedbackTime:null,//问题反馈时间要求
          mainFindings:null,//主要发现
          suggest:null,//优改思路/举措建议
          isProblemSolved:null,//执行单位问题是否解决[OA回传]
          sourceType: 3,
          maindept: null,
          maindeptid: null,
          maindepteditid: null,
          approveman: null,
          activityName: null,
          // "maindept": "辽宁移动/管理支撑室",
          // "maindeptid": "wangjings",
          // "maindepteditid": "31110700",
          // "approveman": "wangjings",
          // "activityName": "科室领导",
        },
        rules: {
          // name: [
          //   { required: true, message: '请输入活动名称', trigger: 'blur' },
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // ],
          applyLine: [
            { required: true, message: '请选择线条', trigger: 'change' }
          ],
          applyTheme: [
            { required: true, message: '请填写主题', trigger: 'blur' }
          ],
          applyTime: [
            { required: true, message: '请选择需求时间', trigger: 'change' }
          ],
          // contactType: [
          //   { required: true, message: '请选择触点类型', trigger: 'change' }
          // ],
          problemType: [
            { required: true, message: '请选择问题类型', trigger: 'change' }
          ],
          questionCategory: [
            { required: true, message: '请选择问题分类', trigger: 'change' }
          ],
          // questionCategory2: [
          //   { required: true, message: '请选择问题情况分类（二级）', trigger: 'change' }
          // ],
          responsibleMan: [
            { required: true, message: '请填写审批人', trigger: 'blur' }
          ],
          responsibleUnit: [
            { required: true, message: '请填写责任单位', trigger: 'blur' }
          ],
          activityName: [
            { required: true, message: '请选择发起单位', trigger: 'blur' }
          ],
          problemIsneedFeedback: [
            { required: true, message: '请选择是否需要反馈', trigger: 'change' }
          ],
          problemFeedbackTime: [
            { required: true, message: '请填写问题反馈时间要求', trigger: 'blur' }
          ],
          mainFindings: [
            { required: true, message: '请填写主要发现', trigger: 'blur'},
            { max: 2000, message: '长度在2000个字符以内', trigger: 'blur'}
          ],
          suggest: [
            { required: true, message: '请填写优改思路/举措建议', trigger: 'blur'},
            { max: 2000, message: '长度在2000个字符以内', trigger: 'blur'}
          ],
          target:  [
            { required: true, message: '请填写目标', trigger: 'blur'},
            { max: 2000, message: '长度在2000个字符以内', trigger: 'blur'}
          ],
          applyPersonName: [
            { required: true, message: '姓名不能为空', trigger: 'change' }
          ],
        },
        contactDialogVisible: false,
        cityOptions: [],
        countyOptions: [],
        contactParams: {
          pageNo: 1,
          pageSize: 10,
          contactCity: null,//地市
          contactCounty: null,//区县
          contactType: null,//
          contactName: null,//具体名称
        },
        contactTypeOptions:[
          {name:'营业厅'},
          {name:'运维随装'},
          {name:'网格行销'},
          {name:'政企集团随销'},
          {name:'10086热线随销'},
          {name:'其他'},
        ],
        contactData:[],
        total: 10,
        loading: true,
        createdFlag: true,
        questionCategoryOptions1:[
          {
          name: '客户需求',
          children:[{
            name:'诉求'
          },{
            name:'抱怨'
          },{
            name:'其他'
          }]
        },{
          name: '市场动态',
          children:[{
            name:'竞对策略'
          },{
            name:'客户反馈'
          },{
            name:'其他'
          }]
        },{
          name: '业务规则',
          children:[{
            name:'规则设计'
          },{
            name:'规则执行'
          },{
            name:'客户反馈'
          },{
            name:'一线人员反馈'
          }]
        },{
          name: '服务流程',
          children:[{
            name:'流程设计'
          },{
            name:'流程执行'
          },{
            name:'客户反馈'
          },{
            name:'一线人员反馈'
          }]
        },{
          name: '系统支撑',
          children:[{
            name:'系统功能'
          },{
            name:'系统稳定性'
          },{
            name:'操作友好性'
          },{
            name:'客户反馈'
          },{
            name:'一线人员反馈'
          }]
        },{
          name:'其他管理类问题',
          children:[{
            name:'其他管理类问题'
          }]
        }
        ],
        questionCategoryOptions2:[],
        treeVisible:false,
        treeVisible1:false,
        parentMenuList:[],
        formTitle: null,
        contactDialogVisible:false,
        lackOfQualityList:[
          {
            name:'咨询类-热线触点响应流程'
          },
          {
            name:'咨询类-互联网触点响应流程'
          },
          {
            name:'咨询类- 营业厅/装维人员/客户经理（电话经理）触点响应流程'
          },
          {
            name:'办理类-热线触点响应流程'
          },
          {
            name:'办理类-互联网触点响应流程'
          },
          {
            name:'办理类-营业厅/装维人员/客户经理（电话经理）触点响应流程'
          },
          {
            name:'投诉类-热线触点自处理响应流程'
          },
          {
            name:'投诉类-热线触点转派处理市场类问题响应流程'
          },
          {
            name:'投诉类-热线触点转派处理网络类问题响应流程'
          },
          {
            name:'投诉类-热线触点转派处理政企类问题客户投诉响应流程'
          },
          {
            name:'投诉类-热线触点转派处理二线客服相关业务响应流程'
          },
          {
            name:'投诉类-互联网触点处响应流程'
          },
          {
            name:'投诉类-营业厅触点响应流程'
          },
          {
            name:'投诉类-装维人员触点响应流程'
          },
          {
            name:'投诉类-客户经理（电话经理）触点响应流程'
          },
        ],
        problemDefaultList:[
          {
            name:'1-A.没有制度'
          }, {
            name:'1-B.制度少模块'
          }, {
            name:'1-C.制度无效'
          }, {
            name:'2-A.没有流程'
          }, {
            name:'2-B.流程少模块'
          }, {
            name:'2-C.流程无效'
          }, {
            name:'3-A.没有流程环节'
          }, {
            name:'3-B.流程子环节不清晰'
          }, {
            name:'3-C.环节（动作）错误或无效'
          }, {
            name:'4-A.流程环节没有主体'
          }, {
            name:'4-B.流程环节主体不全'
          }, {
            name:'4-C.流程环节错误主体'
          }, {
            name:'5-A.流程环节没有要求'
          }, {
            name:'5-B.流程环节要求不全'
          }, {
            name:'5-C.流程环节要求错误'
          }, {
            name:'6-A.流程环节没有记录'
          }, {
            name:'6-B.流程环节记录不全'
          }, {
            name:'6-C.流程环节记录无效'
          }, {
            name:'7-A.文本未电子化'
          }, {
            name:'7-B.部分电子化'
          }, {
            name:'7-C.文本电子化无效'
          }, {
            name:'8-A.未电子化'
          }, {
            name:'8-B.部分电子化'
          }, {
            name:'8-C.电子化无效'
          }, {
            name:'9-A.未智能化'
          }, {
            name:'9-B.部分智能化'
          }, {
            name:'9-C.智能化无效'
          }, {
            name:'10-A.监督知识能力不具备'
          }, {
            name:'10-B.监督知识能力部分具备'
          }, {
            name:'10-C.对监督知识能力要求理解错误'
          }, {
            name:'11-A.无主责监督方案'
          }, {
            name:'11-B.主责监督方案不完备'
          }, {
            name:'11-C.主责监督方案无效'
          }, {
            name:'12-A.无主责监督行动'
          }, {
            name:'12-B.监督行动未完全执行'
          }, {
            name:'12-C.监督行动无效'
          }, {
            name:'13-A.未对监督发现问题整改'
          }, {
            name:'13-B.未对监督发现问题完全整改'
          }, {
            name:'13-C.监督发现问题整改无效'
          },
          ],
        questionCategory1Options:[
          {
          value: '10',
          label: '网络质量',
          children: [
            {
            value: '1001,网络质量/无线网络',
            label: '无线网络'
          }, {
            value: '1002,网络质量/家宽网络',
            label: '家宽网络',
          }, {
              value: '1003,网络质量/政企网络',
              label: '政企网络',
          }, {
            value: '1004,网络质量/物联网网络',
            label: '物联网网络',
          }
          ]
        }, {
          value: '11',
          label: '产品质量',
          children: [
            {
              value: '1101',
              label: '个人产品',
              children: [
                {
                value: '110101,产品质量/产品质量/积分',
                label: '积分'
              }, {
                value: '110102,产品质量/产品质量/终端业务（5G通信)',
                label: '终端业务（5G通信)'
              }, {
                value: '110103,产品质量/产品质量/全球通品牌重塑',
                label: '全球通品牌重塑'
              }, {
                value: '110104,产品质量/产品质量/终端业务',
                label: '终端业务'
              }, {
                value: '110105,产品质量/产品质量/其他',
                label: '其他'
              }]
            },
            {
              value: '1102',
              label: '家庭产品',
              children: [
                {
                value: '110201,产品质量/家庭产品/本省家庭业务',
                label: '本省家庭业务'
              }, {
                value: '110202,产品质量/家庭产品/固话业务',
                label: '固话业务'
              }, {
                value: '110203,产品质量/家庭产品/和家畅听',
                label: '和家畅听'
              }, {
                value: '110204,产品质量/家庭产品/和家固话',
                label: '和家固话'
              }, {
                value: '110205,产品质量/家庭产品/和目',
                label: '和目'
              }, {
                value: '110206,产品质量/家庭产品/互联网电视',
                label: '互联网电视'
              }, {
                value: '110207,产品质量/家庭产品/家庭安防',
                label: '家庭安防'
              }, {
                value: '110208,产品质量/家庭产品/家庭宽带',
                label: '家庭宽带'
              }, {
                value: '110209,产品质量/家庭产品/魔百和软终端',
                label: '魔百和软终端'
              }, {
                value: '110210,产品质量/家庭产品/HDICT',
                label: 'HDICT'
              }, {
                value: '110211,产品质量/家庭产品/智能组网',
                label: '智能组网'
              }, {
                value: '110212,产品质量/家庭产品/爱家社区',
                label: '爱家社区'
              }, {
                value: '110213,产品质量/家庭产品/爱家智能',
                label: '爱家智能'
              }, {
                value: '110299,产品质量/家庭产品/其他',
                label: '其他'
              }]
          }, {
            value: '1103',
            label: '政企产品',
            children: [
              {
                value: '110301,产品质量/政企产品/OneNET开放平台',
                label: 'OneNET开放平台'
              }, {
                value: '110302,产品质量/政企产品/云视讯',
                label: '云视讯'
              }, {
                value: '110303,产品质量/政企产品/高精定位',
                label: '高精定位'
              }, {
                value: '110304,产品质量/政企产品/行车卫士',
                label: '行车卫士'
              }, {
                value: '110305,产品质量/政企产品/行业解决方案',
                label: '行业解决方案'
              }, {
                value: '110306,产品质量/政企产品/和车队',
                label: '和车队'
              }, {
                value: '110307,产品质量/政企产品/和路通',
                label: '和路通'
              }, {
                value: '110308,产品质量/政企产品/和目专业版',
                label: '和目专业版'
              }, {
                value: '110309,产品质量/政企产品/和校园',
                label: '和校园'
              }, {
                value: '110310,产品质量/政企产品/和云镜',
                label: '和云镜'
              }, {
                value: '110311,产品质量/政企产品/集团彩铃',
                label: '集团彩铃'
              }, {
                value: '110312,产品质量/政企产品/路尚OBD（车务通Pro-OBD）',
                label: '路尚OBD（车务通Pro-OBD）'
              }, {
                value: '110313,产品质量/政企产品/能力开放',
                label: '能力开放'
              }, {
                value: '110314,产品质量/政企产品/千里眼',
                label: '千里眼'
              }, {
                value: '110315,产品质量/政企产品/通信+',
                label: '通信+'
              }, {
                value: '110316,产品质量/政企产品/物联卡',
                label: '物联卡'
              }, {
                value: '110317,产品质量/政企产品/物联网智能硬件',
                label: '物联网智能硬件'
              }, {
                value: '110318,产品质量/政企产品/芯片、模组',
                label: '芯片、模组'
              }, {
                value: '110319,产品质量/政企产品/移动云（公众服务云）',
                label: '移动云（公众服务云）'
              }, {
                value: '110399,产品质量/政企产品/其他',
                label: '其他'
            }]
          }, {
            value: '1104',
            label: '新兴产品',
            children: [{
              value: '110401,产品质量/新兴产品/本省增值业务',
              label: '本省增值业务'
            }, {
              value: '110402,产品质量/新兴产品/彩印',
              label: '彩印'
            }, {
              value: '110403,产品质量/新兴产品/短彩业务',
              label: '短彩业务'
            }, {
              value: '110404,产品质量/新兴产品/咪咕动漫',
              label: '咪咕动漫'
            }, {
              value: '110405,产品质量/新兴产品/咪咕互娱',
              label: '咪咕互娱'
            }, {
              value: '110406,产品质量/新兴产品/咪咕数媒',
              label: '咪咕数媒'
            }, {
              value: '110407,产品质量/新兴产品/咪咕音乐',
              label: '咪咕音乐'
            }, {
              value: '110408,产品质量/新兴产品/咪咕视频',
              label: '咪咕视频'
            }, {
              value: '110409,产品质量/新兴产品/手机报',
              label: '手机报'
            }, {
              value: '110410,产品质量/新兴产品/移动云VR',
              label: '移动云VR'
            }, {
              value: '110411,产品质量/新兴产品/咪咕文化',
              label: '咪咕文化'
            }, {
              value: '110412,产品质量/新兴产品/灵犀语音助手',
              label: '灵犀语音助手'
            }, {
              value: '110499,产品质量/新兴产品/其他',
              label: '其他'
            }]
          }]
        }, {
          value: '12',
          label: '触点质量',
          children: [
            {
              value: '1201,触点质量/社会渠道',
              label: '社会渠道',
            }, {
              value: '1202,触点质量/营业厅',
              label: '营业厅',
            }, {
              value: '1203,触点质量/APP',
              label: 'APP'
            }, {
              value: '1204,触点质量/热线',
              label: '热线'
            }, {
              value: '1205,触点质量/其他',
              label: '其他'
            }, {
              value: '1206,触点质量/家宽装维',
              label: '家宽装维'
            }]
        }, {
          value: '13',
          label: '其他',
          children: [
            {
              value: '1301,其他/工作环境',
              label: '工作环境'
            }, {
              value: '1302,其他/考核激励',
              label: '考核激励'
            }, {
              value: '1303,其他/组件交互文档',
              label: '组件交互文档'
            }, {
              value: '1304,其他/成长发展',
              label: '成长发展'
            }, {
              value: '1399,其他/其他',
              label: '其他'
            }]
        }],
        submitLoading: false,
      };
    },
    created() {
      //type 1听音 2站点 3 自发
      debugger
      const type = this.$route.params && this.$route.params.type;
      const id = this.$route.params && this.$route.params.id;
      const applyId =  this.$route.params && this.$route.params.applyId;
      if(type=='1'){
        this.applyForm.sourceType ='听音问题';
        this.applyForm.sourceId = id;
        this.applyForm.contactType = '10086热线旁听'
        this.formTitle = '发起听音问题单'
      } else if(type=='2'){
        this.applyForm.sourceType ='站店问题';
        this.applyForm.sourceId = applyId;
        this.getStationStoreDetailByid(applyId);
        this.formTitle = '发起站店问题单'
      } else{
        this.applyForm.sourceType ='自发问题';
        this.formTitle = '发起自发问题单'
      }
      // if(!(id=='0')){
      //   this.init(id);
      //   // this.createdFlag = false;
      // }
      this.getOaUserDeptRelationList();
      this.getOaDeptRelationList();
      this.initDept();
    },
    methods: {
      getStationStoreDetailByid(id){
        getStationStoreDetail(id).then((res) => {
          if (res.status == 200){
            this.applyForm.contactId=res.data.contactId;
            this.applyForm.contactCity=res.data.contactCity;
            this.applyForm.contactCounty=res.data.contactCounty;
            this.applyForm.contactType=res.data.contactType;
            this.applyForm.contactName=res.data.contactName;
            this.applyForm.contactAddress=res.data.contactAddress;
            this.applyForm.contactPerson=res.data.contactPerson;
            this.applyForm.contactPersonDuty=res.data.contactPersonDuty;
            this.applyForm.contactPersonTelephone=res.data.contactPersonTelephone;
            this.applyForm.contactPersonEmail=res.data.contactPersonEmail;
            // this.applyForm = res.data;
            this.applyForm.contactInfo = res.data.contactCity+'/'+res.data.contactCounty+'/'+res.data.contactType+'/'+res.data.contactName+'/'
              +res.data.contactPerson+'/'+res.data.contactPersonDuty+'/'+res.data.contactPersonTelephone+'/'+res.data.contactPersonEmail;
            this.applyForm.applyLine=res.data.applyLine;
            this.applyForm.applyTheme=res.data.applyTheme;
          }
        });
      },
      getOaDeptRelationList(){
        getOaUserDeptRelation().then((res) => {
          if (res.status == 200){
            this.data1 = this.tranListToTreeData(res.data);
          }
        });
      },
      getOaUserDeptRelationList(){
        getOaDeptRelation().then((res) => {
          if (res.status == 200){
            this.data = this.tranListToTreeData(res.data);
          }
        });
      },

      handleNodeClick(data, node ,el) {

        // if (data.children.length>0) {
        //   return;
        // }
        console.log(data, node);
        // 若node未知，可根据以下方式获取相关节点的node值
        this.parentMenuList = [];
        this.nodeClick(node)
        let parentMenuList = this.parentMenuList.reverse()
        // 将获取到的父级目录列表进行组合输出，若点击三级1-1-1得到的结果为  一级 1/二级 1-1/三级 1-1-1
        let parentMenu = ''
       this.parentMenuList.forEach((item,index)=>{
         if(index !== this.parentMenuList.length-1) {
               parentMenu += item + '/'
          } else {
              parentMenu += item
            }
       })

        this.applyForm.responsibleUnit = parentMenu;
        this.applyForm.maindept = parentMenu;
        this.applyForm.maindepteditid = node.data.id && node.data.id;
        // this.applyForm.maindeptid = node.data.parentId && node.data.id;
        // this.applyForm.approveman =node.data.parentId &&  node.data.id;
        this.showTree();
      },
      handleNodeClick1(data, node ,el) {
        if (data.children.length>0) {
          return;
        }
        this.applyForm.responsibleMan =node.data.name &&  node.data.name;
        this.applyForm.approveman =node.data.id &&  node.data.id;
        this.showTree1();
      },
      // 获取tree任意节点父级列表
      nodeClick (node) {
        if (node.label) {
          this.parentMenuList.push(node.label)
        }
        //迭代
        if(node.parent) {
          this.nodeClick(node.parent)
        }
      },
      showTree1() {
        this.treeVisible1 = !this.treeVisible1;
      },
      showTree() {
        this.treeVisible = !this.treeVisible;
      },
      tranListToTreeData(list) {
        // name: "中国移动通信集团辽宁有限公司", deptId: "00000000", deptParentId: "31000000"}
        const treeList = [],  // 最终要产出的树状数据的数组
          map = {}        // 存储映射关系
        list.forEach(item => {
          if (!item.children) {
            item.children = []
          }
          map[item.id] = item
        })
        list.forEach(item => {
          // 对于每一个元素来说，先找它的上级  如果能找到，说明它有上级，则要把它添加到上级的children中去
          //   如果找不到，说明它没有上级，直接添加到 treeList
          const parent = map[item.parentId]
          // 如果存在则表示item不是最顶层的数据
          if (parent) {
            parent.children.push(item)
          } else {
            // 如果不存在 则是顶层数据
            treeList.push(item)
          }
        })
        // 返回出去
        return treeList
      },
      init(id){
        this.loading = true;
        queryStationStoreQuestionInfoDetail(id).then((res) => {
          if (res.status == 200){
            this.applyForm = res.data;
            this.applyForm.contactInfo = res.data.contactCity+'/'+res.data.contactCity+'/'+res.data.contactType+'/'+res.data.contactName+'/'
              +res.data.contactPerson+'/'+res.data.contactPersonDuty+'/'+res.data.contactPersonTelephone+'/'+res.data.contactPersonEmail;
            this.loading = false;
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoading = true;
            saveStationStoreQuestion(this.applyForm).then((res) => {
              this.submitLoading = false;
              if (res.status == 200){
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
                this.$router.push({name:'stationStoreQuestion'});
                // this.$router.push({name:'stationStoreQuestion'});
              }else{
                this.$message({
                  type: "error",
                  message: "保存失败:"+res.message,
                });              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      close() {
        this.$router.push({name:'stationStoreQuestion'});
      },
      cityChangeQuestionCategory(value){
        this.applyForm.questionCategory2 = null;
        this.questionCategoryOptions1.forEach(item=>{
          if(value==item.name){
            this.questionCategoryOptions2 = item.children;
          }
        })
      },
      initDept(){
        const dept = JSON.parse((window.sessionStorage.getItem("dept") || '{"oaCode":"","oaName":"","deptName":"","provinceCity":"","duty":""}'));
        this.applyForm.applyPersonUserCode = dept.oaCode &&dept.oaCode;
        this.applyForm.applyPersonName = dept.oaName &&  dept.oaName;
        this.applyForm.applyPersonDept = dept.deptName &&  dept.deptName;
        this.applyForm.applyPersonDuty = dept.duty &&  dept.duty;
        this.applyForm.applyPersonProvince = dept.provinceCity && dept.provinceCity;
      },
      goBack(){
        const type = this.$route.params && this.$route.params.type;
        if(type=='1'){
          this.$router.push({name:'auditionMain'});
        } else if(type=='2'){
          this.$router.push({name:'stationstore'});
        } else{
          this.$router.push({name:'stationStoreQuestion'});
        }
      },
      //触点列点击
      contactRowClick(row){
        this.applyForm.contactId=row.contactId;
        this.applyForm.contactCity=row.contactCity;
        this.applyForm.contactCounty=row.contactCounty;
        this.applyForm.contactType=row.contactType;
        this.applyForm.contactName=row.contactName;
        this.applyForm.contactAddress=row.contactAddress;
        this.applyForm.contactPerson=row.contactPerson;
        this.applyForm.contactPersonDuty=row.contactPersonDuty;
        this.applyForm.contactPersonTelephone=row.contactPersonTelephone;
        this.applyForm.contactPersonEmail=row.contactPersonEmail;
        this.applyForm.contactInfo = row.contactCity+'/'+row.contactCounty+'/'+row.contactType+'/'
          +row.contactName+'/'+row.contactAddress+'/'+row.contactPerson+'/'+row.contactPersonDuty+'/'+row.contactPersonTelephone+'/'+row.contactPersonEmail;
        this.closeContactDialog()
      },
      closeContactDialog(){
        // this.contactParams = {
        //   pageNo: 1,
        //   pageSize: 10,
        //   contactCity: null,//地市
        //   contactCounty: null,//区县
        //   contactType: null,//
        //   contactName: null,//具体名称
        // }
        this.contactDialogVisible = !this.contactDialogVisible;
      },
      //选择触点窗口
      openContactDialog(){
        this.contactDialogVisible = true;
        // getCityOrContyInfo(null).then((res) => {
        //   if (res.status == 200){
        //     this.cityOptions = res.data;
        //   }
        //   console.log(res.data)
        // });
        // this.queryContact();
      },
      //问题分类
      handleChangeQuestionCategory1(value){
        console.log(value.length)
        if(value.length>0){
          let arr = value[value.length-1].split(',');
          this.applyForm.questionCategory1 = arr[0];
          this.applyForm.questionCategory2 = arr[1];
          console.log(this.applyForm.questionCategory1+this.applyForm.questionCategory2)
        }else{
          this.applyForm.questionCategory1 = "";
          this.applyForm.questionCategory2 = "";
        }
      }
    }
  };
</script>
<style  lang="scss" scoped>
  .dy-form-wrap {
    margin: 30px 100px;
    padding: 30px;
    background: #FFFFFF;
    .dy-container {
      width: 100%;
      height:auto;
      padding: 30px;
      box-sizing: border-box;
      background: #f5f5f5;
    }
  }

  .dy-form-wrap  ::v-deep  .item-line>.el-form-item__label{
    //写自己定义的样式
    line-height: 20px !important;

  }

</style>
