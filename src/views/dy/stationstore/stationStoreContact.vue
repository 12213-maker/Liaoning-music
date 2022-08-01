<template>
  <el-dialog title="触点信息" :visible.sync="contactDialogVisible" width="80%" destroy-on-close :before-close="closeContactDialog"	>
    <el-form :inline="true" :model="contactParams"  ref="contactForm">
      <el-form-item label="地市：">
        <el-select v-model="contactParams.contactCity" placeholder="地市" @change="cityChange">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in cityOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区县：">
        <el-select v-model="contactParams.contactCounty" placeholder="区县">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in countyOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="触点类型：">
        <el-select v-model="contactParams.contactType" placeholder="触点类型">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in contactTypeOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="触点名称：">
        <el-input v-model="contactParams.contactName" placeholder="名称模糊搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryContact">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="contactData"  @row-click="contactRowClick">
      <el-table-column label="地市" width="80" align="center" prop="contactCity" />
      <el-table-column label="区县" align="center" prop="contactCounty" :show-overflow-tooltip="true" />
      <el-table-column label="触点类型" align="center" prop="contactType" :show-overflow-tooltip="true" />
      <el-table-column label="触点名称" align="center" prop="contactName" :show-overflow-tooltip="true" />
      <el-table-column label="触点地址" align="center" prop="contactAddress" :show-overflow-tooltip="true" />
      <el-table-column label="触点联系人" align="center" prop="contactPerson" :show-overflow-tooltip="true" />
      <el-table-column label="职务" align="center" prop="contactPersonDuty" :show-overflow-tooltip="true" />
      <el-table-column label="联系电话" align="center" prop="contactPersonTelephone" :show-overflow-tooltip="true" />
      <el-table-column label="邮箱" align="center" prop="contactPersonEmail" :show-overflow-tooltip="true" class-name="fixed-width"/>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="contactParams.pageNo"
      :limit.sync="contactParams.pageSize"
      @pagination="queryContact"
    />
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeContactDialog">取 消</el-button>
        <el-button type="primary" @click="closeContactDialog">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import {
    getStationStoreContactInfoByCnd,getCityOrContyInfo,saveStationStoreApply,getStationStoreDetail
  } from "@/api/stationstore/api";
    export default {
        name: "StationStoreContact",
        props:['contactDialogVisible'],
      data() {
        return {
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
          loading: true
        };
      },
      // created() {
      //
      // },
      watch: {
        contactDialogVisible() {
          if (this.contactDialogVisible) {
            getCityOrContyInfo(null).then((res) => {
              if (res.status == 200){
                this.cityOptions = res.data;
              }
              console.log(res.data)
            });
            this.queryContact();
          }
        },
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
        //触点列点击
        contactRowClick(row){
          this.$emit('contactRowClick',row)

          // this.applyForm.contactId=row.contactId;
          // this.applyForm.contactCity=row.contactCity;
          // this.applyForm.contactCounty=row.contactCounty;
          // this.applyForm.contactType=row.contactType;
          // this.applyForm.contactName=row.contactName;
          // this.applyForm.contactAddress=row.contactAddress;
          // this.applyForm.contactPerson=row.contactPerson;
          // this.applyForm.contactPersonDuty=row.contactPersonDuty;
          // this.applyForm.contactPersonTelephone=row.contactPersonTelephone;
          // this.applyForm.contactPersonEmail=row.contactPersonEmail;
          // this.applyForm.contactInfo = row.contactCity+'/'+row.contactCounty+'/'+row.contactType+'/'
          //   +row.contactName+'/'+row.contactAddress+'/'+row.contactPerson+'/'+row.contactPersonDuty+'/'+row.contactPersonTelephone+'/'+row.contactPersonEmail;
          // this.closeContactDialog()
        },
        closeContactDialog(){
          this.contactParams = {
            pageNo: 1,
            pageSize: 10,
            contactCity: null,//地市
            contactCounty: null,//区县
            contactType: null,//
            contactName: null,//具体名称
          }
          this.$emit('closeContactDialog')
        },
        //选择触点窗口
        openContactDialog(){
          this.contactDialogVisible = true;

        },
        //查询触点
        queryContact(){
          if ( this.contactParams.contactCity === null || this.contactParams.contactCity === undefined || this.contactParams.contactCity === "" ) {
            this.contactParams.contactCity = null
          }
          if ( this.contactParams.contactCounty === null || this.contactParams.contactCounty === undefined || this.contactParams.contactCounty === "" ) {
            this.contactParams.contactCounty = null
          }
          if ( this.contactParams.contactType === null || this.contactParams.contactType === undefined || this.contactParams.contactType === "" ) {
            this.contactParams.contactType = null
          }
          if ( this.contactParams.contactName === null || this.contactParams.contactName === undefined || this.contactParams.contactName === "" ) {
            this.contactParams.contactName = null
          }
          this.loading = true;
          getStationStoreContactInfoByCnd(this.contactParams).then((res) => {
            if (res.status == 200){
              this.contactData = res.data.list||[];
              this.total =parseInt(res.data.total && res.data.total||0) ;
              this.loading = false;
            }
          });
        },
        //地市选择
        cityChange(value){
          this.contactParams.contactCity = value;
          this.contactParams.contactCounty = "";
          getCityOrContyInfo(value).then((res) => {
            if (res.status == 200){
              this.countyOptions = res.data;
            }
          });
        },
        goBack(){
          this.$router.push({name:'stationstore'});
        }
      }
    }
</script>

<style scoped>

</style>
