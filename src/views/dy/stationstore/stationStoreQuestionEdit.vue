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
        <el-form-item label="线条:" prop="applyLine" required>
          <el-radio-group v-model="applyForm.applyLine">
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
          <el-input v-model="applyForm.applyTheme"  placeholder="请填写主题" style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item v-if="this.$route.params.type!='3'" label="地点/听音单号:">
          <el-input v-model="applyForm.sourceId" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="触点类型:" prop="contactType" required>
          <el-radio-group v-model="applyForm.contactType" :disabled="this.$route.params.type!='3'" >
            <el-radio label="营业厅"></el-radio>
            <el-radio label="装维随同"></el-radio>
            <el-radio label="网格行销"></el-radio>
            <el-radio label="政企集团随销"></el-radio>
            <el-radio label="10086热线旁听"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
          <el-input v-if="applyForm.contactType=='其他'" v-model="applyForm.contactName"></el-input>
        </el-form-item>
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
        <el-form-item label="问题情况分类（一级）:" required>
          <el-col :span="9">
            <el-form-item prop="questionCategory1" required>
              <el-select v-model="applyForm.questionCategory1" placeholder="问题情况分类（一级）:" @change="cityChangeQuestionCategory">
                <el-option
                  v-for="item in questionCategoryOptions1"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item prop="questionCategory2" label="问题情况分类（二级）：" required>
              <el-select v-model="applyForm.questionCategory2" placeholder="问题情况分类（二级）:">
                <el-option
                  v-for="item in questionCategoryOptions2"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="对标端到端服务过程质量管理体系，哪项流程/控制点/KQI缺失:" prop="lackOfQuality">
          <el-input type="textarea" v-model="applyForm.lackOfQuality" placeholder="请填写对标端到端服务过程质量管理体系，哪项流程/控制点/KQI缺失" rows="5"></el-input>
        </el-form-item>
        <el-form-item label="对照问题失责13种类型39种表现，因归因到哪种类型:" prop="problemDefault">
          <el-input type="textarea" v-model="applyForm.problemDefault" placeholder="请填写对照问题失责13种类型39种表现，因归因到哪种类型" rows="5"></el-input>
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
          <el-button type="primary" @click="submitForm('applyForm')">新增</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="close()">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {
    getStationStoreContactInfoByCnd,getCityOrContyInfo,getStationStoreDetail,queryStationStoreQuestionInfoDetail,saveStationStoreQuestion,getOaUserDeptRelation,getOaDeptRelation
  } from "@/api/stationstore/api";
  export default {
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
          contactType: [
            { required: true, message: '请选择触点类型', trigger: 'change' }
          ],
          problemType: [
            { required: true, message: '请选择问题类型', trigger: 'change' }
          ],
          questionCategory1: [
            { required: true, message: '请选择问题情况分类（一级）', trigger: 'change' }
          ],
          questionCategory2: [
            { required: true, message: '请选择问题情况分类（二级）', trigger: 'change' }
          ],
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
            { required: true, message: '请填写主要发现', trigger: 'blur' }
          ],
          suggest: [
            { required: true, message: '请填写优改思路/举措建议', trigger: 'blur' }
          ],
          target:  [
            { required: true, message: '请填写目标', trigger: 'blur' }
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
        this.applyForm.sourceId = applyId;
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
      if(!(id=='0')){
        this.init(id);
        this.createdFlag = false;
      }
      this.getOaUserDeptRelationList();
      this.getOaDeptRelationList();
      this.initDept();
    },
    methods: {
      getStationStoreDetailByid(id){
        getStationStoreDetail(id).then((res) => {
          if (res.status == 200){
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
            saveStationStoreQuestion(this.applyForm).then((res) => {
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
</style>
