<template>
<div class="workflow-add">
  <!-- <div class="title-type" >
      <p style="margin-left: 3.8%"></p>
      <el-page-header @back="goBack" content="新增工单" class="pag_header">
      </el-page-header>
  </div> -->
  <div class="title-type" >发起{{pageTitle}}</div>
  <div class="container">
    <div class="content">
      <div class="orderclass" id="form_class">
        <!-- <div class="select_list select_handle"> -->
          <!-- <span>请选择工单类型：</span>
          <el-select
            style="width: 260px"
            v-model="identyType"
            placeholder="请选择工单类型"
            @change="onIdentyTypeChange"
            size="small"
            class="selectdown"
            :disabled="typeDisabled"
          >
            <el-option
              v-for="item in identyTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>请选择工单子类型：</span>
          <el-select
            style="width: 260px"
            v-model="identySubtype"
            placeholder="请选择工单子类型"
            @change="onIdentySubtypeChange"
            size="small"
            class="selectdown"
            :disabled="typeDisabled"
          >
            <el-option
              v-for="item in identySubtypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
        <!-- </div> -->
        <!-- {{ variabledata }} -->
        <div
          class="form_content"
          style="background: #f5f5f5"
          v-loading="loadingChang"
          element-loading-text="加载中..."
        >
          <el-form
            :model="variabledata"
            ref="ruleForm"
            label-width="38%"
            class="demo-ruleForm"
          >
            <template v-for="(item, index) of formInfoFilter.fields">
              <el-form-item
                style="margin-bottom: 16px"
                :key="`${formInfoFilter.key}${item.id}`"
                :label="item.name + '：'"
                validate-on-rule-change="false"
                :prop="item.id"
                v-if="formItemIfShow(item)"
                size="small"
                :rules="[
                  {
                    required: item.required,
                    message: item.errorMsg?item.errorMsg:`${item.name}不能为空`,
                    trigger: 'blur',
                    pattern: item.pattern
                  },
                ]"
              >
                <component
                  :ref="'formItem-' + item.type"
                  :is="'formItem-' + item.type"
                  :data="variabledata[item.id]"
                  :variableInfo='variabledata'
                  :fieldInfo="item"
                  :subtype="identySubtype"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                  :oaDeptList="oaDeptList"
                  :oaUserDeptList="oaUserDeptList"
                  @busyChange="busyData[index] = $event"
                  @change="formItemChange($event, item.id)"
                  @addCodeSendId='copySendIdchange($event)'
                  @addAuditorCNName="auditorCNNameChange($event)"
                  @changeBtnStatus="changeBtnStatus"
                ></component>
              </el-form-item>
            </template>
          </el-form>
        </div>
      </div>
      <div class="footer_add">
        <el-button class="cancelButton" @click="resetForm" :disabled="btnDisabled">重 置</el-button>
        <el-button class="subButton" @click="launchProcess" :disabled="btnDisabled">新 增 </el-button>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
/* eslint-disable camelcase */
import '../styles/order.css';
import modules from '../dynamic/form.js';
import form from './form.js'
import {provinceAdd,groupAdd,allCode,getOaDeptList,getOaUserDeptList,getStationStoreDetail} from '@/api/workflow/index.js'

import {dateFormat} from '@/utils/index.js';
// import {queryIdentySubtype} from '@/api/common/index.js';
// import {getAddFormInfo, processNewByVO} from '@/api/workflow/index.js';

export default {
  name: 'Add',
  components: {...modules},
  data() {
    return {
      pageTitles:{
        '99':'省内督办单',
        '0301':'省专公司申请单',
        '0302':'一线声音回传申请单',
        '0206':'投诉焦点治理任务单'
      },
    identyData:[ 
      { 
         children: [
          //  {
          //   label: "省内督办单",
          //   value: '99'
          // },
         ],
         label: '省内流转单',
         value: '99'
       },
        {
         children: [ 
          {
            label: '省专公司申请单',
            value: '0301'
          },
          {
            label: '一线声音回传申请单',
            value: '0302'
          },
         ],
         label: '申请单',
         value: '03'
       },

       { 
         children: [
           {
            label: "投诉焦点治理任务单",
            value: '0206'
          },
         ],
         label: '任务单',
         value: '02'
       },
      
      ] ,
      variabledata: {},
      busyData: [],
      identyType: '',
      identySubtype: '',
      processKey: null,
      orderSubdata: [],
      formInfoData: form,
      loadingChang: false,

      typeDisabled:false,

      auditorForm:{
        identyDetail:'',
        fileNo:''
      },
      fromAudition:false,
      oaDeptList:[],
      oaUserDeptList:[],
      pageTitle:'',
      curIdentyId:'',
      btnDisabled:false
    };
  },
  computed: {
    formInfoFilter() {
      if (this.formInfoData) {
        let data = {};
        this.formInfoData.forEach(item => item.key=== (this.identySubtype || this.identyType) ? data = item : []);
        return  data;
      }
      return [];
    },
    // 获取工单类型数据
    identyTypeData() {
      const data = this.identyData.map((item) => ({
        'value': item.value,'label': item.label
      })) ;
      return  data;
    },
    // 获取工单子类型数据
    identySubtypeData() {
      let data = [];
      this.identyData.forEach((item) => {
        if(this.identyType === item.value) {
          data = item.children;
        }
      });
      return  data;
      
    },
    // 获取工单类型数据(新)
    // identyTypeData() {
    //   const data = JSON.parse(sessionStorage.getItem('identyType')).map((item) => ({
    //     'value': item.value,'label': item.label
    //   })) ;
    //   return  data;
    // },
  },

  watch:{
    $route(val) {
      this.routerChange();
    }
  },
  created() {
    // this.getAllCode();
    // this.onIdentyTypeChange('99');
  },

  mounted() {
    this.routerChange();

    /*if(this.$route.query && this.$route.query.fromAudition=='1') {
      this.identyType = '03';
      this.identySubtype = '0302';
      this.typeDisabled = true;
      this.fromAudition = true;
      this.auditorForm.identyDetail = this.$route.query.identyDetail;
      this.auditorForm.fileNo = this.$route.query.fileNo;
      this.onIdentySubtypeChange('0302'); 
    } else {
      this.fromAudition = false;
    }*/
  },

  methods: {
    changeBtnStatus(flag) {
      this.btnDisabled = flag;
    },

    routerChange() {
      this.identyType = '';
      this.identySubtype = '';
      if(this.$route.params.id1) {
        this.identyType = this.$route.params.id1; 
        if(this.identyType==='99') {
          this.pageTitle = this.pageTitles[this.identyType];
        }
        this.onIdentyTypeChange(this.identyType);
      }

      if(this.$route.params.id2) {
        this.identySubtype = this.$route.params.id2; 
        this.pageTitle = this.pageTitles[this.identySubtype];
        this.onIdentySubtypeChange(this.identySubtype);
      }

      if(this.$route.params.indentyId) {
        this.curIdentyId = this.$route.params.indentyId;
        // 调用站店详情接口
        this.getStationStoreDetail();
      }
     // 获取工单类型字典
    },

    getStationStoreDetail() {
      this.loadingChang = true;
      getStationStoreDetail(this.curIdentyId)
      .then(res => {
        if (res.status == 200) {
          this.$nextTick(() => {
            // 工单细类 
            const { sourceType } = { ...res.data };
            let temp = sourceType == '听音问题' ? '03' : '04';
            let identyDetail = sourceType == '站店问题' ? '02' : temp;

            this.$set(this.variabledata,['identyDetail'],identyDetail);
            // 档案编号
            this.$set(this.variabledata,['fileNo'],res.data.id);
            // 信息类型
            // this.variabledata.informationType = res.data;
            // 问题提出人手机号
            this.$set(this.variabledata,['introducerTel'],JSON.parse(sessionStorage.getItem('userInfo')).phonenumber);
            // 问题提出人
            this.$set(this.variabledata,['introducer'],res.data.applyPersonName);
            /*// 一线人员类型
            this.variabledata.personnelType = res.data;
            // 初审意见
            this.variabledata.initialSuggestion = res.data;
            // 问题分类
            this.variabledata.problemType = res.data;
            // 问题所属性质
            this.variabledata.problemNature = res.data;
            // 工单接收在线公司
            this.variabledata.receiverUnit = res.data;
            // 工单接收省份
            this.variabledata.receiverUnit = res.data;
            // 工单接收部门
            this.variabledata.handlerDept = res.data;
            // 派发目标
            this.variabledata.target = res.data;*/
            // 创建人联系方式
            // this.variabledata.creatorContactInfo = res.data;
            // 创建人
            // this.variabledata.creator = res.data;
            // 要求处理时间
            this.$set(this.variabledata,['processTime'],`${res.data.problemFeedbackTime.split('-').join('')}000000`);
            // 工单内容
            // this.variabledata.content = res.data;
            // 工单标题
            this.$set(this.title,['introducer'],res.data.applyTheme);
          })

        }

      })
      .finally(()=>{
        this.loadingChang = false;
      })
    },


   /* getAllCode() {
      allCode().then((data)=>{
        sessionStorage.setItem('code',JSON.stringify(data.obj));
      });
    },*/
    copySendIdchange(val) {
      this.$set(this.variabledata, 'copySendId', val);
    },

    // 省内督办人中文名
    auditorCNNameChange(val) {
      this.$set(this.variabledata, 'auditorCNName', val);
    },
    // 回退
    goBack() {
      this.$router.push('/workflow');
    },
    // 重置
    resetForm() {
      // this.variabledata.copySendId = '';
      this.$refs['ruleForm'].resetFields();
      this.onIdentyTypeChange(this.identyType,true);
      // if(this.identyType=='99') this.variabledata.applyCount = '1';
      // this.onIdentySubtypeChange(this.identySubtype);

    },
    // 发起流程
    launchProcess() {
      // if (this.identySubtype === null) {
      //   this.$message.info('请先选择工单子类型');
      //   return;
      // }
      // const hasBusy = this.busyData.indexOf(true) >= 0;
      // if (hasBusy) {
      //   this.$message.info('请等待文件上传');
      //   return;
      // }
      this.variabledata.identyType = this.identyType;
      this.variabledata.identySubtype = this.identySubtype;

      this.$refs.ruleForm.validate((valid) => {
        // 后续更正逻辑 表单较少, 省内派发和集团派发 分别不同的接口
        if (valid) {

          if(this.variabledata.identyType=='03' || this.variabledata.identyType=='02'){
            this.loadingChang = true;
            this.variabledata['applyTime'] = dateFormat(new Date(),'yyyyMMddHHmmss');
            if(this.identySubtype === "0302") {
              if(this.variabledata.target !== '1') {
                this.variabledata.handlerDept = this.variabledata.receiverUnit;
              } else {
                this.variabledata.receiverUnit = '0057';
              }
            }
            
            groupAdd(this.variabledata)
            .then((res) => {
              if (res) {
                this.resetForm();
                this.$message({
                  type: 'success',
                  message: res.msg,
                });
              }
            })
            .catch((res) => {
              this.resetForm();
              // this.$message({type: 'error', message: res.msg});
            })
            .finally(()=>{
              this.loadingChang = false;
            })
          } else {
            this.loadingChang = true;
            provinceAdd(this.variabledata)
            .then((res) => {
              if (res) {
                this.resetForm();
                this.$message({
                  type: 'success',
                  message: res.msg,
                });
              }
            })
            .catch((e) => {
              this.resetForm();
              // this.$message({type: 'error', message: res.msg});
            })
            .finally(()=>{
              this.loadingChang = false;
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '请填写必填项',
          });
        }
      });
    },
    formItemChange(v, field) {
      // console.log(field,v)
      if(field == 'applyTitle') {
        this.$set(this.variabledata, 'taskType', '');
      }

      this.$set(this.variabledata, [field], v);

      if(field=='lordDepartment'||field=='auditor') {
        this.$refs.ruleForm.validateField(field); 
      }
    },

    onIdentyTypeChange(val,unchangeSub) {
      this.variabledata = {};

      if(this.$refs['formItem-upload']) {
        this.$refs['formItem-upload'][0].$refs.upload.clearFiles();
        this.$refs['formItem-upload'][0].fileList = [];
        this.$refs['formItem-upload'][0].files = [];
      }
      this.changeBtnStatus(false);
      if(!unchangeSub) {
        if(this.identySubtypeData && this.identySubtypeData.length) {
          this.identySubtype = this.identySubtypeData[0].value;
        } else {
          this.identySubtype = "";
        }
      }
      
      this.onIdentySubtypeChange(this.identySubtype);
      if(val=='99') this.variabledata.applyCount = '1';
    },

    onIdentySubtypeChange(val) {
      this.variabledata = {};

      this.formInfoFilter.fields.forEach(item=>{
        // this.variabledata[item.id] = item.value;
        if( item.id=="fileNo") {
          if(this.fromAudition) {
            item.readOnly = true;
          } else {
            item.readOnly = false;
          }
        }
      })
      
      if(val === "0302") {
        this.$nextTick(() => {
          this.$set(this.variabledata,['target'],'1');
          this.$set(this.variabledata,['creator'],JSON.parse(sessionStorage.getItem('userInfo')).nickName);
          this.$set(this.variabledata,['problemType'],'');
          this.$set(this.variabledata,['identyDetail'],'01');
        });
      }

      if(val == '0206') {
        this.$nextTick(() => {
          setTimeout(()=>{
            this.$set(this.variabledata,['evaluation'],'是');
          },100);
        });
      }

      /*if(val =='99') {
        this.variabledata.applyPerson = JSON.parse(sessionStorage.getItem('userInfo')).nickName; 
      }*/
    },

    formItemIfShow(item) {
      if(item.showExp===true) {
        return true;
      } else if(item.showIf.split(',').length==1) {
        return this.variabledata[item.showExp]===item.showIf;
      } else {
        return this.variabledata[item.showExp]===item.showIf.split(',')[0] || this.variabledata[item.showExp]===item.showIf.split(',')[1] || this.variabledata[item.showExp]===item.showIf.split(',')[2];
      }
    },

    getOaDeptList() {
      getOaDeptList({deptCode:31000000})
      .then(res => {
        this.oaDeptList = res.data;
      })
    },

    getOaUserDeptList() {
      getOaUserDeptList({code:31000000})
      .then(res => {
        this.oaUserDeptList = res.data;
      })
    },


  },
};
</script>

<style scoped lang='scss'>
.workflow-add {

  .title-type {
    height: 56px;
    line-height: 56px;
    font-family: syhtMedium;
    font-size: 16px;
    color: #262626;
    background: #ffffff;
    padding-left:44px;
    box-sizing:border-box;
  }
  .el-select-dropdown__item.hover {
    background-color: #f5f5f5;
  }
  .el-select-dropdown__item.selected {
    font-family: SourceHanSansSC-Regular;
    color: #606266;
    font-weight: normal;
    background: #ffc266;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    height: 100%;
    overflow: auto;
  }

  .content {
    width: 100%;
    height: auto;
    padding: 36px 48px 8px 48px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .orderclass {
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
    flex-grow: 2;
  }

  .form_content {
    width: 100%;
    border: 1px solid #e1e1e1;
    height:auto;
    /*min-height: 360px;
    flex-grow: 2;*/
  }

  .demo-ruleForm {
    padding: 8px 0px;
    text-align: left;
    height: 100%;
  }

  .footer_add {
    height: 100%;
    margin: 8px auto;
    display: flex;
    justify-content: center;
  }

  .footer_add .subButton {
    height: 32px;
    line-height: 32px;
    background-color: rgba(247, 138, 28, 1);
    padding: 0px 16px;
    border-radius: 4px;
    color: #262626;
    border: 1px solid rgba(247, 138, 28, 1);
    box-sizing: border-box;
  }

  .footer_add .cancelButton {
    height: 32px;
    line-height: 32px;
    padding: 0px 16px;
    border-radius: 4px;
    color: #262626;
    box-sizing: border-box;
  }

  .footer_add .subButton:hover {
    background-color: #ffad33;
    border-color: #ffad33;
  }

  .footer_add .cancelButton:hover {
    border-color: #ff9900;
    font-size: 14px;
    color: #ff9900;
    background-color: #fff;
  }

  .footer_add .el-button:active {
    border-color: #ff9900;
    color: #ff9900;
  }

  .footer_add .cancelButton.el-button:focus,
  .footer_add .el-button:hover {
    color: #ff9900;
    border-color: #ff9900;
    background: white;
  }

  .footer_add .subButton.el-button:focus,
  .footer_add .el-button:hover {
    color: black;
    border-color: #ff9900;
    background: #ff9900;
  }
}

</style>
