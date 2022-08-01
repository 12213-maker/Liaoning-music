<template>
  <el-dialog  :title="status=='1'?(applyForm.sourceType+'单受理'):(applyForm.sourceType+'单详情')" :visible.sync="detailVisible" width="950px" :before-close="close">
        <el-form :model="applyForm"  ref="applyForm" label-width="220px" style="width: 900px;">
          <el-form-item label="姓名:" prop="applyPersonName">
            <el-col :span="6">
              <span>{{applyForm.applyPersonName}}</span>
            </el-col>
            <el-col class="line" :span="6" style="text-align: right">
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
            <el-col class="line" :span="6" style="text-align: right">
              <label class="el-form-item__label" style="float: right">所在职位：</label>
            </el-col>
            <el-col :span="12">
              <span>{{applyForm.applyPersonDuty}}</span>
            </el-col>
          </el-form-item>
          <el-form-item label="线条:" prop="applyLine" required>
            {{applyForm.applyLine}}
<!--            <el-radio-group v-model="applyForm.applyLine">-->
<!--              <el-radio label="市场"></el-radio>-->
<!--              <el-radio label="网络"></el-radio>-->
<!--              <el-radio label="政企"></el-radio>-->
<!--              <el-radio label="服务"></el-radio>-->
<!--              <el-radio label="综合"></el-radio>-->
<!--              <el-radio label="支撑"></el-radio>-->
<!--            </el-radio-group>-->
          </el-form-item>
          <el-form-item label="主题:" prop="applyTheme" required>
            {{applyForm.applyTheme}}
<!--            <el-input v-model="applyForm.applyTheme"></el-input>-->
          </el-form-item>
          <el-form-item v-if="applyForm.sourceType=='听音问题'" label="投诉工单编号:">
            {{applyForm.sourceId}}
          </el-form-item>
          <el-form-item v-if="applyForm.sourceType!='听音问题'" label="触点信息:" prop="contactInfo">
            {{applyForm.contactInfo}}
          </el-form-item>

<!--          <el-form-item label="触点类型:" prop="contactType">-->
<!--            {{applyForm.contactType}}-->
<!--            <span v-if="applyForm.contactType=='其他:'">-{{applyForm.contactName}}</span>-->
<!--&lt;!&ndash;            <el-radio-group v-model="applyForm.applyLine">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-radio label="营业厅"></el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-radio label="装维随同"></el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-radio label="网格行销"></el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-radio label="政企集团随销"></el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-radio label="10086热线旁听"></el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-radio label="其他"></el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-radio-group>&ndash;&gt;-->
<!--          </el-form-item>-->
          <el-form-item label="目标:" prop="target">
            {{applyForm.target}}
<!--            <el-input type="textarea" v-model="applyForm.target"></el-input>-->
          </el-form-item>
          <el-form-item label="关注要点:" prop="focus">
            {{applyForm.focus}}
<!--            <el-input type="textarea" v-model="applyForm.focus"></el-input>-->
          </el-form-item>
          <el-form-item label="问题类型:" prop="problemType" required>
            {{applyForm.problemType}}
<!--            <el-radio-group v-model="applyForm.problemType">-->
<!--              <el-radio label="市场"></el-radio>-->
<!--              <el-radio label="网络"></el-radio>-->
<!--              <el-radio label="政企"></el-radio>-->
<!--              <el-radio label="服务"></el-radio>-->
<!--              <el-radio label="综合"></el-radio>-->
<!--              <el-radio label="支撑"></el-radio>-->
<!--            </el-radio-group>-->
          </el-form-item>
          <el-form-item label="问题分类:" required>
            <el-col :span="11">
              <el-form-item prop="questionCategory">
                {{applyForm.questionCategory2}}
<!--                <el-select v-model="applyForm.questionCategory1" placeholder="问题情况分类（一级）">-->
<!--&lt;!&ndash;                  <el-option&ndash;&gt;-->
<!--&lt;!&ndash;                    v-for="item in questionCategoryOptions1"&ndash;&gt;-->
<!--&lt;!&ndash;                    :key="item.name"&ndash;&gt;-->
<!--&lt;!&ndash;                    :label="item.name"&ndash;&gt;-->
<!--&lt;!&ndash;                    :value="item.name"&ndash;&gt;-->
<!--&lt;!&ndash;                  >&ndash;&gt;-->
<!--&lt;!&ndash;                  </el-option>&ndash;&gt;-->
<!--                </el-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="13">
<!--              <el-form-item prop="questionCategory2" label="问题情况分类（二级）:">-->
<!--                {{applyForm.questionCategory2}}-->
<!--&lt;!&ndash;                <el-input v-model="applyForm.questionCategory2" placeholder="问题情况分类（二级）">&ndash;&gt;-->

<!--&lt;!&ndash;                </el-input>&ndash;&gt;-->
<!--              </el-form-item>-->
            </el-col>
          </el-form-item>
          <el-form-item label="对标端到端服务过程质量管理体系，哪项流程/控制点/KQI缺失:" prop="lackOfQuality">
            {{applyForm.lackOfQuality}}
<!--            <el-input type="textarea" v-model="applyForm.lackOfQuality"></el-input>-->
          </el-form-item>
          <el-form-item label="对照问题失责13种类型39种表现，因归因到哪种类型:" prop="problemDefault">
            {{applyForm.problemDefault}}
<!--            <el-input type="textarea" v-model="applyForm.problemDefault"></el-input>-->
          </el-form-item>
          <el-form-item label="发起单位:" prop="activityName" required>
            {{formatActivityName(applyForm.activityName)}}
            <!--            <el-input v-model="applyForm.responsibleUnit" ></el-input>-->
          </el-form-item>
          <el-form-item label="审批人:" prop="approveman" required>
            {{applyForm.approveman}}
            <!--            <el-input v-model="applyForm.responsibleUnit" ></el-input>-->
          </el-form-item>
          <el-form-item label="责任单位:" prop="responsibleUnit" required>
            {{applyForm.maindept}}
<!--            <el-input v-model="applyForm.responsibleUnit" ></el-input>-->
          </el-form-item>
          <el-form-item label="是否需要反馈:" prop="problemIsneedFeedback" required>
            {{applyForm.problemIsneedFeedback}}
<!--            <el-select v-model="applyForm.problemIsneedFeedback" placeholder="">-->
<!--              <el-option label="是" value="是"></el-option>-->
<!--              <el-option label="否" value="否"></el-option>-->
<!--            </el-select>-->
          </el-form-item>
          <el-form-item v-if="applyForm.problemIsneedFeedback == '是'" label="问题反馈时间要求:" prop="problemFeedbackTime" required>
            {{applyForm.problemFeedbackTime}}
<!--            <el-date-picker type="date" placeholder="选择日期" v-model="applyForm.problemFeedbackTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>-->
          </el-form-item>
          <el-form-item label="主要发现:" prop="mainFindings">
            {{applyForm.mainFindings}}
<!--            <el-input type="textarea" v-model="applyForm.mainFindings"></el-input>-->
          </el-form-item>
          <el-form-item label="优改思路/举措建议:" prop="suggest">
            {{applyForm.suggest}}
<!--            <el-input type="textarea" v-model="applyForm.suggest"></el-input>-->
          </el-form-item>

          <el-form-item label="执行单位问题是否解决:" v-if="applyForm.status=='3'" prop="isProblemSolved">
            {{applyForm.isProblemSolved}}
            <!--            <el-input type="textarea" v-model="applyForm.suggest"></el-input>-->
          </el-form-item>
          <el-form-item label="解决时间:"  v-if="applyForm.status=='3'" prop="resolvTime">
            {{applyForm.resolvTime}}
            <!--            <el-input type="textarea" v-model="applyForm.suggest"></el-input>-->
          </el-form-item>
          <el-form-item label="问题解决路径/具体实施方案:"  v-if="applyForm.status=='3'" prop="solution">
            {{applyForm.solution}}
            <!--            <el-input type="textarea" v-model="applyForm.suggest"></el-input>-->
          </el-form-item>


          <el-form-item v-if="status=='1'">
            <el-button @click="close()">关闭</el-button>
            <el-button type="primary" v-if="applyForm.status=='1'" @click="submitOa()">提交OA</el-button>
            <el-button @click="goFlow()" v-if="applyForm.status=='3' && applyForm.isProblemSolved!='是'" type="primary">回传集团</el-button>
          </el-form-item>
          <el-form-item v-else>
            <el-button @click="close()">关闭</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
</template>
<script>
  import {
    queryStationStoreQuestionInfoDetail
  } from "@/api/stationstore/api";
  export default {
    name:'StationStoreQuestionDetail',
    props:['detailVisible','questionId','status'],
    data() {
      return {
        applyForm: {
          id:null,
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
          responsibleUnit:null,//责任单位
          problemIsneedFeedback:null,//是否需要反馈
          problemFeedbackTime:null,//问题反馈时间要求
          mainFindings:null,//主要发现
          suggest:null,//优改思路/举措建议
          isProblemSolved:null,//执行单位问题是否解决[OA回传]
          sourceType: 3
        },
        contactTypeOptions:[
          {name:'营业厅'},
          {name:'运维随装'},
          {name:'网格行销'},
          {name:'政企集团随销'},
          {name:'10086热线随销'},
          {name:'其他'},
        ],
      };
    },
    watch: {
      questionId() {
        if (this.questionId) {
          queryStationStoreQuestionInfoDetail(this.questionId).then((res) => {
            if (res.status == 200 && res.data){
              this.applyForm = res.data;
              this.applyForm.contactInfo = res.data.contactCity+'/'+res.data.contactCity+'/'+res.data.contactType+'/'+res.data.contactName+'/'
                +res.data.contactPerson+'/'+res.data.contactPersonDuty+'/'+res.data.contactPersonTelephone+'/'+res.data.contactPersonEmail;
              this.loading = false;
            }
          });
        }
      },
    },
    created() {
    },
    methods: {
      initDept(){
        const dept = JSON.parse((window.sessionStorage.getItem("dept") || '{"oaCode":"","oaName":"","deptName":"","provinceCity":"","duty":""}'));
        this.applyForm.applyPersonUserCode = dept.oaCode &&dept.oaCode;
        this.applyForm.applyPersonName = dept.oaName &&  dept.oaName;
        this.applyForm.applyPersonDept = dept.deptName &&  dept.deptName;
        this.applyForm.applyPersonDuty = dept.duty &&  dept.duty;
        this.applyForm.applyPersonProvince = dept.provinceCity && dept.provinceCity;
      },
      close() {
        this.$emit('closeDetail')
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitOa() {
        this.$emit('submitOa',this.applyForm.id)
        this.$emit('closeDetail')
      },
      goFlow(){
        this.$emit('goFlow',this.applyForm.id,this.applyForm.sourceType)
      },
      formatActivityName(name){
        if(name=='科室领导'){
          return '直属中心';
        }else  if(name=='部门领导') {
          return '职能部门';
        }else  if(name=='地市部门领导') {
          return '地市公司';
        }
      }
    }
  }
</script>
