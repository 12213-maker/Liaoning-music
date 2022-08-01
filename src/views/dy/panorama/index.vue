<!-- 全景视图 -->
<template>
  <div class="dy-page-wrap panaroIndex" style=" display:flex; flex-direction:column;">
    <div class="dy-container">
      <el-tabs v-model="activeName" @tab-click="handleTabClick" class="outer-tabs">
        <el-tab-pane label="投诉概览" name="1">
          <div style="width:100%; display:flex; justify-content:space-between;">
            <NumberTitle text="整体投诉情况" num="01"/>
            <DateSelect 
            :latestDate="latestDate" 
            :latestMonth="latestMonth" 
            :weekOptions="weekOptions"
            :defualtDateType='defualtDateType' 
            @onDateChange="complaintDateChange"/>
          </div>
          <ComplaintPart01 
          :date="complaintDate" 
          :currentAreaId="currentAreaId" 
          ref='complaintPart01'/>

          <!-- <div style="width:100%; display:flex; justify-content:space-between; margin-top:20px;">
            <NumberTitle text="CHBN投诉情况" num="02"/>
            <DateSelect @onDateChange="CHBNDateChange"/>
          </div>
          <ComplaintPart02 v-if="activeName=='1'" ref='complaintPart02' /> -->

        </el-tab-pane>
        <!-- <el-tab-pane label="满意度概览" name="2"> -->
          <!-- <Blank text='功能待完善...'/> -->
          <!-- <div style="width:100%; display:flex; justify-content:space-between;">
            <NumberTitle text="服务整体情况" num="01"/>
          </div>
          <ServicePart01 v-if="activeName=='2'" ref='servicePart01'/>

          <div style="width:100%; display:flex; justify-content:space-between; margin-top:20px">
            <NumberTitle text="服务整体情况" num="02"/>
            <DateSelect @onDateChange="serviceDateChange"/>
          </div>
          <ServicePart02 v-if="activeName=='2'" ref='servicePart02'/> -->
        <!-- </el-tab-pane> -->
      </el-tabs>
    </div>

    
  </div>
</template>

<script>
import Blank from '@/components/common/Blank';
import Map from '@/components/common/map/Map';

import NumberTitle from '@/components/common/numberTitle';
import DateSelect from '@/components/common/DateSelect';
import ComplaintPart01 from './components/ComplaintPart01';
import ComplaintPart02 from './components/ComplaintPart02';

import ServicePart01 from './components/ServicePart01';
import ServicePart02 from './components/ServicePart02';
import { getUserInfo } from '@/api/stationstore/api'

import {getLatestDate,getWeekList} from '@/api/dy/panorama.js'
import {parseTime} from '@/utils/tools.js'


export default {
  name: "Home",
  components:{
    Blank,
    Map,
    NumberTitle,
    DateSelect,
    ComplaintPart01,
    ComplaintPart02,
    ServicePart01,
    ServicePart02
  },
  data() {
    return {
      activeName:'1',
      serviceDate:{
        type:'',
        date:''
      },

      complaintDate:{
        type:'',
        date:''
      },

      CHBNDate:{
        type:'',
        date:''
      },

      latestDate:'',
      latestMonth:'',
      weekOptions:[],

      currentAreaId:'',
      defualtDateType:'1'

    };
  },
  created() {
    // console.log(sessionStorage.getItem('areaId'))
    this.currentAreaId = sessionStorage.getItem('areaId')!=='null'?sessionStorage.getItem('areaId'):'99999';
        
    this.getUserDeptInfo();
    this.getLatestDate();
    this.getLatestMonth();
    this.getWeekList();
    
  },
  methods: {
    handleTabClick(val) {
      if(val.name=='1') {
        setTimeout(()=>{
          this.$refs.complaintPart01.getData(this.complaintDate.type,this.complaintDate.date );
        },100)
      }
    },

    complaintDateChange(type,date) {
      this.complaintDate.type = type;
      this.complaintDate.date = date;
      this.$refs.complaintPart01.getData(type,date);
    },

    serviceDateChange(type,date) {
      this.serviceDate.type = type;
      this.serviceDate.date = date;
    },

    CHBNDateChange(type,date) {
      this.CHBNDate.type = type;
      this.CHBNDate.date = date;
    },
    getUserDeptInfo() {
      getUserInfo().then(res => {
        const obj = res.data || {}
        if(obj.provinceCity =='本部'){
          obj.provinceCity = '辽宁省'
        }
        window.sessionStorage.setItem("dept",JSON.stringify(obj))
      })
    },

    getWeekList() {
      getWeekList({}).then(res=>{
        this.weekOptions = res.data;
      })
    },

    // 获取数据最新日期
    getLatestDate(){
      getLatestDate({
        "statType": '1',
        "cityId": this.currentAreaId
      }).then(res => {
        if(res.curDate=='') {
          this.latestDate = parseTime(new Date(),'{yyyy}{mm}{dd}');
          return;
        }
        this.latestDate = res.curDate;
      })
    },


    getLatestMonth(){
      getLatestDate({
        "statType": '3',
        "cityId": this.currentAreaId
      }).then(res => {
        if(res.curDate=='') {
          this.latestMonth = parseTime(new Date(),'{yyyy}{mm}');
          return; 
        }
        this.latestMonth = res.curDate;
      })
    }
  },


};
</script>

<style lang="scss">
.panaroIndex {
  .outer-tabs {
    .el-tabs__item {
      font-size: 20px !important;
      color: #595959 !important;
    }

    .el-tabs__item.is-active {
      color:#262626 !important;
      font-family:syhtMedium !important;
    }

    .el-tabs__active-bar {
      height:3px;
    }

    .el-tabs__nav-wrap::after {
      background-color: #f5f5f5
    }


    .inner-tabs {
      .el-tabs__item {
        font-size: 14px !important;
      }

      .el-tabs__active-bar {
        height:2px;
      }
    }

    

    .title-tabs {
      .el-tabs__item {
        font-size: 14px !important;
        color: #595959 !important;
        padding: 0 12px !important;
      }

      .el-tabs__item.is-active {
        color:#262626 !important;
      }

      .el-tabs__nav-wrap::after {
        background-color: #ffffff;
      }

      .el-tabs__header {
        margin-bottom:0px;
      }

      .el-tabs__active-bar {
        height:2px;
      }
    }
  }


}

</style>

