<template>
  <div class="dy-form-wrap">
    <div>发起站店申请单</div>
    <div class="dy-container">
      <el-form :model="applyForm" :rules="rules" ref="applyForm" label-width="150px" style="width: 700px;margin: 0 auto;">
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
        <el-form-item label="线条:" prop="applyLine">
          <el-radio-group v-model="applyForm.applyLine">
            <el-radio label="市场"></el-radio>
            <el-radio label="网络"></el-radio>
            <el-radio label="政企"></el-radio>
            <el-radio label="服务"></el-radio>
            <el-radio label="综合"></el-radio>
            <el-radio label="支撑"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主题:" prop="applyTheme">
          <el-input v-model="applyForm.applyTheme"  placeholder="请填写主题" style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item label="需求处理时间:" prop="applyTime">
          <el-date-picker type="date" placeholder="请选择日期" v-model="applyForm.applyTime" value-format="yyyy-MM-dd" style="width: 60%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="触点信息:" prop="contactInfo">
          <el-input v-model="applyForm.contactInfo" @focus="openContactDialog"  placeholder="触点信息" readonly></el-input>
        </el-form-item>

        <el-form-item label="目标:" prop="target">
          <el-input type="textarea" v-model="applyForm.target" rows="5"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="goBack()">返回</el-button>
          <el-button @click="resetForm('applyForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('applyForm')" :loading="submitLoading">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <StationStoreContact
      :contactDialogVisible="contactDialogVisible"
      @closeContactDialog="closeContactDialog"
      @contactRowClick="contactRowClick"
   />
    <!--      @closeDetail="closeDetail"-->

<!--    <el-dialog title="触点信息" :visible.sync="contactDialogVisible" width="80%" destroy-on-close :before-close="closeContactDialog">-->
<!--      <el-form :inline="true" :model="contactParams"  ref="contactForm">-->
<!--        <el-form-item label="地市：">-->
<!--          <el-select v-model="contactParams.contactCity" placeholder="地市" @change="cityChange">-->
<!--            <el-option label="全部" value=""></el-option>-->
<!--            <el-option-->
<!--              v-for="item in cityOptions"-->
<!--              :key="item.name"-->
<!--              :label="item.name"-->
<!--              :value="item.name"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="区县：">-->
<!--          <el-select v-model="contactParams.contactCounty" placeholder="区县">-->
<!--            <el-option label="全部" value=""></el-option>-->
<!--            <el-option-->
<!--              v-for="item in countyOptions"-->
<!--              :key="item.name"-->
<!--              :label="item.name"-->
<!--              :value="item.name"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="触点类型：">-->
<!--          <el-select v-model="contactParams.contactType" placeholder="触点类型">-->
<!--            <el-option label="全部" value=""></el-option>-->
<!--            <el-option-->
<!--              v-for="item in contactTypeOptions"-->
<!--              :key="item.name"-->
<!--              :label="item.name"-->
<!--              :value="item.name"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="触点名称：">-->
<!--          <el-input v-model="contactParams.contactName" placeholder="名称模糊搜索"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="queryContact">查询</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <el-table v-loading="loading" :data="contactData"  @row-click="contactRowClick">-->
<!--        <el-table-column label="地市" width="80" align="center" prop="contactCity" />-->
<!--        <el-table-column label="区县" align="center" prop="contactCounty" :show-overflow-tooltip="true" />-->
<!--        <el-table-column label="触点类型" align="center" prop="contactType" :show-overflow-tooltip="true" />-->
<!--        <el-table-column label="触点名称" align="center" prop="contactName" :show-overflow-tooltip="true" />-->
<!--        <el-table-column label="触点地址" align="center" prop="contactAddress" :show-overflow-tooltip="true" />-->
<!--        <el-table-column label="触点联系人" align="center" prop="contactPerson" :show-overflow-tooltip="true" />-->
<!--        <el-table-column label="职务" align="center" prop="contactPersonDuty" :show-overflow-tooltip="true" />-->
<!--        <el-table-column label="联系电话" align="center" prop="contactPersonTelephone" :show-overflow-tooltip="true" />-->
<!--        <el-table-column label="邮箱" align="center" prop="contactPersonEmail" :show-overflow-tooltip="true" class-name="fixed-width"/>-->
<!--      </el-table>-->
<!--      <pagination-->
<!--        v-show="total>0"-->
<!--        :total="total"-->
<!--        :page.sync="contactParams.pageNo"-->
<!--        :limit.sync="contactParams.pageSize"-->
<!--        @pagination="queryContact"-->
<!--      />-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="closeContactDialog">取 消</el-button>-->
<!--        <el-button type="primary" @click="closeContactDialog">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>
<script>
  import {
    getStationStoreContactInfoByCnd,getCityOrContyInfo,saveStationStoreApply,getStationStoreDetail
  } from "@/api/stationstore/api";
  import sessionStorage from "js-cookie";
  import StationStoreContact from '@/views/dy/stationstore/stationStoreContact';

  export default {
    name: "stationStoreEdit",
    components:{
      StationStoreContact,
    },
    data() {
      return {
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
          target:null,
          status:null,
          createtime:null,
          modifytime:null,
        },
        rules: {
          // name: [
          //   { required: true, message: '请输入活动名称', trigger: 'blur' },
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // ],
          applyPersonName: [
            { required: true, message: '姓名不能为空', trigger: 'change' }
          ],
          applyLine: [
            { required: true, message: '请选择线条', trigger: 'change' }
          ],
          applyTheme: [
            { required: true, message: '请填写主题', trigger: 'blur' }
          ],
          applyTime: [
            { required: true, message: '请选择需求时间', trigger: 'blur' }
          ],
          contactInfo: [
            { required: true, message: '请选择触点信息', trigger: 'change' }
          ],
          target: [
            { max: 2000, message: '长度在2000个字符以内', trigger: 'blur'}
          ]
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
        submitLoading: false,
      };
    },
    created() {
      const id = this.$route.params && this.$route.params.id;
      this.initDept()
      // if(!(id=='0')){
      //   this.init(id);
      //   this.createdFlag = false;
      // }
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
      // init(id){
      //   this.loading = true;
      //   getStationStoreDetail(id).then((res) => {
      //     if (res.status == 200){
      //       this.applyForm = res.data;
      //       this.applyForm.contactInfo = res.data.contactCity+'/'+res.data.contactCity+'/'+res.data.contactType+'/'+res.data.contactName+'/'
      //         +res.data.contactPerson+'/'+res.data.contactPersonDuty+'/'+res.data.contactPersonTelephone+'/'+res.data.contactPersonEmail;
      //       this.loading = false;
      //     }
      //   });
      // },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoading = true;
            saveStationStoreApply(this.applyForm).then((res) => {
              this.submitLoading = false;
              if (res.status == 200){
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
                this.$router.push({name:'stationstore'});
              }else{
                this.$message({
                  type: "error",
                  message: "保存失败:"+res.message,
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      //查询触点
      // queryContact(){
      //   if ( this.contactParams.contactCity === null || this.contactParams.contactCity === undefined || this.contactParams.contactCity === "" ) {
      //     this.contactParams.contactCity = null
      //   }
      //   if ( this.contactParams.contactCounty === null || this.contactParams.contactCounty === undefined || this.contactParams.contactCounty === "" ) {
      //     this.contactParams.contactCounty = null
      //   }
      //   if ( this.contactParams.contactType === null || this.contactParams.contactType === undefined || this.contactParams.contactType === "" ) {
      //     this.contactParams.contactType = null
      //   }
      //   if ( this.contactParams.contactName === null || this.contactParams.contactName === undefined || this.contactParams.contactName === "" ) {
      //     this.contactParams.contactName = null
      //   }
      //   this.loading = true;
      //   getStationStoreContactInfoByCnd(this.contactParams).then((res) => {
      //     if (res.status == 200){
      //       this.contactData = res.data.list||[];
      //       this.total =parseInt(res.data.total && res.data.total||0) ;
      //       this.loading = false;
      //     }
      //   });
      // },
      // //地市选择
      // cityChange(value){
      //   this.contactParams.contactCity = value;
      //   this.contactParams.contactCounty = "";
      //   getCityOrContyInfo(value).then((res) => {
      //     if (res.status == 200){
      //       this.countyOptions = res.data;
      //     }
      //   });
      // },
      goBack(){
        this.$router.push({name:'stationstore'});
      }
    }
  }
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
