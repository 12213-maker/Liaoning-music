<template>
  <div class="audition-wrap">
      <div class="audition-container">
        <el-form ref="queryForm" :model="queryForm">
          <ol class="form-list">
            <li style="width:225px;margin-right:0px;">
               <el-form-item label="结单日期:"  prop="arcTimeBegin">
                  <el-date-picker style="width:140px;" v-model="queryForm.arcTimeBegin" type="date"
                  value-format="yyyy-MM-dd" :picker-options="pickerBeginOpts" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </li>
            <li>
                 <el-form-item label=""  prop="arcTimeEnd">
                    <span>~&nbsp;</span>
                    <el-date-picker
                      style="width:140px;"
                      v-model="queryForm.arcTimeEnd"
                      :clearable="false"
                      type="date"
                      value-format="yyyy-MM-dd" :picker-options="pickerBeginOpts"
                      placeholder="选择日期"
                    ></el-date-picker>
               </el-form-item>
            </li>
            <li style="width:160px;">
              <el-form-item label="地市:"  prop="areaName">
                <el-select v-model="queryForm.areaName" style="width:110px;">
                  <el-option v-for="(loopItem, loopIndex) in areaNameList"
                    :key="loopItem.key"
                    :label="loopItem.name"
                    :value="loopItem.key">
                  </el-option>
                </el-select>
               </el-form-item>
            </li>
            <li style="width:200px;">
                <el-form-item label="问题大类:"  prop="mainType">
                  <el-select v-model="queryForm.mainType" @change="querySubTypeList" style="width:110px;">
                    <el-option v-for="(loopItem, loopIndex) in mainTypeList"
                      :key="loopItem.key"
                      :label="loopItem.name"
                      :value="loopItem.key">
                    </el-option>
                  </el-select>
               </el-form-item>
            </li>
            <li style="width:300px;">
              <el-form-item label="问题小类:"  prop="subType">
                <el-select v-model="queryForm.subType" multiple collapse-tags placeholder="请选择" style="width:210px;">
                  <el-option v-for="(loopItem, loopIndex) in subTypeList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li  style="width:156px;margin-right:0px;">
              <el-form-item label="编号:"  prop="numberType">
                <el-select v-model="queryForm.numberType" style="width:110px;">
                  <el-option v-for="(loopItem, loopIndex) in numberTypeList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item label=""  prop="ticketsPhone">
                 <el-input v-model="queryForm.ticketsPhone" placeholder="请输入内容" maxlength="50" style="width:240px;"></el-input>
              </el-form-item>
            </li>

            <li style="width:225px;margin-right:0px;">
               <el-form-item label="听音时间:"  prop="playTime">
                  <el-date-picker style="width:140px;" v-model="queryForm.playTime" type="date"
                  value-format="yyyyMMdd"  :picker-options="pickerPlayDateOpts" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </li>
            <li>
              <el-form-item label=""  prop="playTimeEnd">
                   <span>~&nbsp;</span>
                   <el-date-picker
                     style="width:140px;"
                     v-model="queryForm.playTimeEnd"
                     :clearable="false"
                     type="date"
                     value-format="yyyyMMdd"
                      :picker-options="pickerPlayEndOpts"
                     placeholder="选择日期"
                   ></el-date-picker>
              </el-form-item>
            </li>
            <li>
              <el-button type="primary" @click="queryMyInfoOfPage" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
              <el-button @click="resetForm">重置</el-button>
              <el-button @click="exportMyDataFile" :disabled="isDisabledFlag" ><i class="el-icon-download"></i>附件下载</el-button>
            </li>
          </ol>
       </el-form>
        <table class="comTable">
          <thead>
            <tr>
              <th width="100">序号</th>
              <th width="220">工单编号</th>
              <th>工单标题</th>
              <th width="120">相关单位</th>
              <th width="120">问题分类</th>
              <th width="180">问题小类</th>
              <th>听音时间</th>
            </tr>
          </thead>
          <tbody id="queryItemInfoTbody">
            <template v-for="(infoItem, loopIndex) in auditionQueryList">
              <tr>
                <td>{{ loopIndex + 1 }}</td>
                <td>{{ infoItem.wrkfmShowSwftno }}</td>
                <td>{{ infoItem.serType6 == null ? infoItem.serType3 : infoItem.serType6 }}</td>
                <td>{{ infoItem.areaName }}</td>
                <td>{{ infoItem.mainType }}</td>
                <td>{{ infoItem.subType }}</td>
                <td>{{ infoItem.playTime }}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- 分页组件 -->
        <pagination
          v-show="queryParams.maxentries > 0"
          :total="queryParams.maxentries"
          :page.sync="queryParams.currentPage"
          :limit.sync="queryParams.itemsPerPage"
           :page-sizes="[10,20]"
          @pagination="queryMyInfoOfPage"
        />
      </div>
  </div>
</template>

<script>
import { setWaterMark ,removeWatermark } from '@/utils/watermask.js';
import { initParamSelect, querySubTypeList,queryMyInfoOfPage, exportMyDataFile } from '@/api/audition/api.js';
export default {
  name: 'auditionMy',
  data() {
    return {
      username: null,
      initParamData:{},
      areaNameList: [],
      mainTypeList: [],
      subTypeList: [],
      auditionQueryList: [],
      isDisabledFlag:true,
      numberTypeList: [{ key: 1, name: '工单编号' }, { key: 2, name: '手机号码' }],
      queryForm: {
        arcTimeBegin: '',
        arcTimeEnd: '',
        areaName: '',
        mainType: '重复投诉',
        subType: '-1',
        numberType: 1,
        ticketsPhone: '',
        isLevel1: '',
        isListen:1,
        bizCntt:'',
        playTime:'',
        playTimeEnd:''
      },
      queryParams: {
        itemsPerPage: 10,
        maxentries: 0,
        currentPage: 1
      },
      pickerBeginOpts: {
        disabledDate: time => {
          const curDate = new Date().getTime();
          const day = 4 * 24 * 3600 * 1000;
          const dateRegion = curDate - day;
          return time.getTime() > dateRegion;
        }
      },
      pickerPlayDateOpts: {
        disabledDate: time => {
          if(this.isNotEmpty(this.queryForm.playTimeEnd)){
            var currPlayTimeEnd = this.queryForm.playTimeEnd;
             return time.getTime() > new Date(currPlayTimeEnd.substring(0,4)+"/"+currPlayTimeEnd.substring(4,6)+"/"+currPlayTimeEnd.substring(6)).getTime();
          }else{
             return time.getTime() > new Date().getTime();
          }
        }
      },
      pickerPlayEndOpts: {
        disabledDate: time => {
          return time.getTime() > new Date().getTime();
        }
      },
      fullscreenLoading: false,
    };
  },
  mounted() {
    this.initParamSelect();
  },
  beforeDestroy(){
     removeWatermark();
  },
  methods: {
    //验证是否为空
    isNotEmpty(txtVal) {
      if (txtVal === '' || txtVal === undefined || txtVal === null) {
        return false;
      } else {
        return true;
      }
    },
    //判断元素内容是否为手机格式
    isMobile(txtVal) {
      let reg = /^1[3456789]\d{9}$/;
      if (reg.test(txtVal)) {
        return true;
      } else {
        return false;
      }
    },
    //格式化-话务流水号
    scopeCallSwftno(keyParam) {
      return keyParam.substring(0, 8) + ' ' + keyParam.substring(8, 10) + ':' + keyParam.substring(10, 12) + ':' + keyParam.substring(12, 14);
    },
    //初始化查询条件
    initParamSelect() {
      let _self = this;
      initParamSelect({ userId: this.username }).then(response => {
        console.log('初始化查询条件:');
        console.log(response);
        //debugger;
       if (response.state == 200) {
         _self.initParamData = response.data;
         _self.username =  _self.initParamData['userItem']['userId'];
         //增加水印效果
         setWaterMark(_self.username,_self.initParamData['userItem']['phoneNo']);
         //地市列表
         if (_self.initParamData['cityList'].length > 1) {
           _self.areaNameList = _self.initParamData['cityList'];
           _self.areaNameList.unshift({ key: -1, name: '全部' });
         } else {
           _self.areaNameList = _self.initParamData['cityList'];
         }
         _self.queryForm.areaName = _self.areaNameList[0]['key'];
         //大类列表
         _self.mainTypeList = _self.initParamData['mainTypeList'];
         _self.mainTypeList.unshift({ key: -1, name: '全部' });
         _self.queryForm.arcTimeEnd = _self.initParamData['maxDate'];
         //针对一级领导特殊处理
         if(_self.initParamData['userItem']['userLevel'] == "1"){
           _self.queryForm.mainType = -1;
         }else{
           _self.queryForm.arcTimeBegin = _self.initParamData['minDate'];
           _self.queryForm.mainType = '重复投诉';
           _self.querySubTypeList();
         }
         _self.queryMyInfoOfPage();

       }else{
          this.$router.push({name:'auditionPrompt'});
       }
      });
    },
    //级联查询子分类列表
    querySubTypeList() {
      let _self = this;
      if (this.queryForm.mainType != -1) {
        querySubTypeList({ mainType: encodeURIComponent(this.queryForm.mainType) }).then(response => {
          console.log('初始化查询条件:');
          console.log(response);
          _self.queryForm.subType = '';
          // debugger;
          if (response.state == 200) {
            //大类列表
            _self.subTypeList = response.data['subTypeList'];
            //_self.subTypeList.unshift({ key: -1, name: '全部' });
          }else{
            _self.$notify({
              title: '温馨提示',
              message: response.message,
              type: 'warning',
              position: 'bottom-right'
            });
          }
        });
      } else {
        _self.subTypeList = [] ;
        _self.subTypeList.unshift({ key: -1, name: '全部' });
      }
    },
    //重置表单
    resetForm() {
      let _self = this;
      this.$refs.queryForm.resetFields();
      //_self.isLevel1 = _self.initParamData['userItem']['userLevel'];
      _self.queryForm.arcTimeBegin = _self.initParamData['minDate'];
      _self.queryForm.arcTimeEnd = _self.initParamData['maxDate'];
    },
    joinQueryParam(){
      let dataParam = {
        itemsPerPage: this.queryParams.itemsPerPage,
        currentPage: this.queryParams.currentPage,
        userId: this.username,
        isListen :this.queryForm.isListen
      };
      //日期开始时间
      if (this.isNotEmpty(this.queryForm.arcTimeBegin)) {
        dataParam['arcTimeBegin'] = this.queryForm.arcTimeBegin;
      }
      //日期开始时间
      if (this.isNotEmpty(this.queryForm.arcTimeEnd)) {
        dataParam['arcTimeEnd'] = this.queryForm.arcTimeEnd;
      }
      //地市编码
      if (this.isNotEmpty(this.queryForm.areaName) && this.queryForm.areaName != -1) {
        dataParam['areaName'] = encodeURIComponent(this.queryForm.areaName);
      }
      //问题大类
      if (this.isNotEmpty(this.queryForm.mainType) && this.queryForm.mainType != -1) {
        dataParam['mainType'] = encodeURIComponent(this.queryForm.mainType);
      }
      //问题小类
      if (this.isNotEmpty(this.queryForm.subType)){
        if(this.queryForm.subType != -1){
            dataParam['subType'] = encodeURIComponent(this.queryForm.subType);
        }else{
            if(this.queryForm.mainType != -1){
               var subTypeArr = [];
                for(var i=0;i<this.subTypeList.length;i++){
                   subTypeArr.push(this.subTypeList[i]['key'])
                }
                dataParam["subType"] = encodeURIComponent(subTypeArr.join(','));
            }
        }
      }
      //用户级别
      if (this.isNotEmpty(this.queryForm.isLevel1) && this.queryForm.isLevel1 == '1') {
        dataParam['isLevel1'] = this.queryForm.isLevel1;
      }
      if (this.isNotEmpty(this.queryForm.numberType) && this.isNotEmpty(this.queryForm.ticketsPhone)) {
        //工单号码
        if (this.queryForm.numberType == 1) {
          dataParam['wrkfmShowSwftno'] = this.queryForm.ticketsPhone;
        } else if (this.queryForm.numberType == 2) {
          if (this.isMobile(this.queryForm.ticketsPhone)) {
            dataParam['acptNum'] = this.queryForm.ticketsPhone;
          }else{
            this.$notify({
              title: '温馨提示',
              message: "手机号码填写不符合要求!!",
              type: 'warning',
              position: 'bottom-right'
            });
          }
        }
      }
      //工作内容
      if (this.isNotEmpty(this.queryForm.bizCntt)) {
        dataParam['bizCntt'] = encodeURIComponent(this.queryForm.bizCntt);
      }
      //听音开始时间
      if (this.isNotEmpty(this.queryForm.playTime)) {
        dataParam['playTime'] = this.queryForm.playTime;
      }
      //听音结束时间
      if (this.isNotEmpty(this.queryForm.playTimeEnd)) {
        dataParam['playTimeEnd'] = this.queryForm.playTimeEnd;
      }

     return dataParam;
    },
    //站内听音主页-分页查询
    queryMyInfoOfPage() {
      // alert('站内听音主页-分页查询');
      let _self = this;
      _self.fullscreenLoading = true;

      queryMyInfoOfPage(this.joinQueryParam()).then(response => {
        _self.fullscreenLoading = false;
        if (response.state == 200) {
          _self.isDisabledFlag = false;
          //大类列表
          _self.auditionQueryList = response.data.itemList;
          _self.queryParams.maxentries = response.data['maxentries'];
        }else{
          _self.auditionQueryList = [];
          _self.queryParams.maxentries = 0;
          _self.$notify({
            title: '温馨提示',
            message: response.message,
            type: 'warning',
            position: 'bottom-right'
          });
        }
      });
    },
    //下载附件
    exportMyDataFile(){
      let _self = this;
     _self.isDisabledFlag = true;
      exportMyDataFile(this.joinQueryParam()).then(res => {
           _self.isDisabledFlag = false;
           const content = res;
           const blob = new Blob([content]);
           const fileName = "audition"+(new Date()).getTime()+".xlsx";
           if(window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, fileName);
           }else{
            const downloadElement = document.createElement('a');
            const href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            downloadElement.download = fileName;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
          }

      });
    }
  }
};
</script>

<style lang="css">
@import "../../../assets/styles/audition.css";
</style>
