<template>
	<div class="date-select-wrap">
    选择时间：
    <el-select v-model="dateType" placeholder="请选择" style="width:80px" @change="onTypeChange" size="small">
      <el-option
        v-for="item in dateTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <div class="cutstom-icon-select-wrap">
      <el-date-picker
        size="small"
        style="width:260px;"
        v-show="dateType=='1'"
        v-model="date"
        :picker-options="pickerOptions"
        format="yyyy年M月d日"
        value-format="yyyyMMdd"
        type="date">
      </el-date-picker>

      <el-date-picker
        size="small"
        style="width:260px;"
        v-show="dateType=='3'"
        v-model="date"
        format="yyyy年M月"
        value-format="yyyyMM"
        :picker-options="pickerOptions"
        type="month">
      </el-date-picker>

      <el-select 
      v-model="date" 
      placeholder="请选择" 
      v-show="dateType=='2'" 
      size="small"
      style="width:260px;">
        <el-option
          v-for="item in weekOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <img src='@/assets/images/riqi.png' class="custom-select-icon">
    </div>

    <el-button type="primary" @click="onQuery">查询</el-button>
  </div>
</template>

<script>
  export default {
    name:"DateSelect",
    props:['latestDate','weekOptions','defualtDateType','latestMonth'],
    data(){
      let _this = this;
      return {
        dateType:_this.defualtDateType?_this.defualtDateType:'3',
        dateTypeOptions:[
         {
          label:'月',
          value:'3'
         } ,{
          label:'周',
          value:'2'
         } ,{
          label:'日',
          value:'1'
         }
        ],
        date:'',

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        /*dateOptions:[
          '2022年01月'
        ]*/

        // weekOptions:['2022年5月第1周','2022年5月第2周','2022年5月第3周','2022年5月第4周']
      }
    },
    watch: {
      latestDate(val){
        if(!this.date) {
          this.date = this.latestDate;
          this.$emit('onDateChange',this.dateType,this.date)
        }
      }
    },
    mounted(){},
    methods:{ 
      onQuery() {
        this.$emit('onDateChange',this.dateType,this.date)
      },

      onTypeChange(val) {
        if(val=='1') {
          this.date = this.latestDate;
        } else if (val=='2') {
          this.date = this.weekOptions.length>0 ? this.weekOptions[0].value : '';
        } else {
          this.date = this.latestMonth;
        }
      }
    }

  };
</script>

<style lang="scss" scope>
.date-select-wrap {
  display:flex;
  justify-content:flex-end;
  align-items:center;

  .cutstom-icon-select-wrap {
    position: relative; 
    width: 260px;
    margin: 0 12px;
  }

  .custom-select-icon {
    position:absolute; 
    right:10px; 
    top:7px;
    margin-left:12px;
  }
}

</style>

