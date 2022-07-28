<template>
  <!-- <DatePicker v-model="data1" @change="change" align='right' prefix-icon='' size='small'></DatePicker> -->
  <el-date-picker
    :picker-options="pickerOptions"
    class="datepicker"
    v-model="data1"
    type="datetime"
    format="yyyy-MM-dd HH时"
    size="small"
    @change="change"
    placeholder="选择日期"
    :disabled="fieldInfo.readOnly"
  >
  </el-date-picker>
</template>

<script>
// import {DatePicker} from 'element-ui';
import {dateFormat} from '@/utils/index';
export default {
  components: {
    // DatePicker,
  },
  name: 'formItem-variableDate',
  props: {
    data: String,
    fieldInfo:Object
  },
  mounted() {
    this.fieldInfo.value && ( this.data1 = new Date(this.fieldInfo.value.slice(0,4),
      this.fieldInfo.value.slice(4,6) - 1,
      this.fieldInfo.value.slice(6,8),
      this.fieldInfo.value.slice(8,10),
    ));
    this.$emit('change', this.fieldInfo.value);
    
  },
  data() {
    return {
      data1: '',
      pickerOptions: {
        disabledDate: (time) =>
          // 设置可选择的日期为今天之后的一个月内
          // const curDate = (new Date()).getTime();
          // 这里算出一个月的毫秒数,
          // 这里使用30的平均值,实际中应根据具体的每个月有多少天计算;
          // const day = 10 * 24 * 3600 * 1000;
          // const dateRegion = curDate + day;
          time.getTime() < Date.now() - 8.64e7,
      },
    };
  },
  watch: {
    // data(val) {
    //   if (val === '') {
    //     this.data1 = val;
    //   }
    // },
  },
  methods: {
    change(e) {
      console.log('xxxxx', e);
      const dateFmt = e && dateFormat(e, 'yyyyMMddHH');
      const dataNow = new Date();
      const a = dateFmt && dateFmt.slice(8);
      const b = dataNow.getHours() + 1;
      const YYYY = dataNow.getFullYear();
      const MM =
        dataNow.getMonth() < 9
          ? `0${dataNow.getMonth() + 1}`
          : dataNow.getMonth();
      const DD =
        dataNow.getDate() < 10 ? `0${dataNow.getDate()}` : dataNow.getDate();
      // console.log(`${YYYY}${MM}${DD}`, dateFmt && dateFmt.slice(0, 8));
      // console.log(a, b);
      if (`${YYYY}${MM}${DD}` === (dateFmt && dateFmt.slice(0, 8))) {
        if (a < b) {
          this.$message.info('请选择当前时间后面的时间');
          this.data1 = '';
          return;
        }
      }
      e ? this.$emit('change', `${dateFmt}0000`) : this.$emit('change', '');

      // console.log(e);
      // console.log(dateFmt);
    },
  },
};
</script>
<style>
/* .datepicker.el-input--small .el-input__inner {
  padding: 0 34px;
} */
/* 隐藏分钟选择 */
/* .el-time-spinner__wrapper {
  width: 100% !important;
} */
/* .el-scrollbar:nth-of-type(2) {
  display: none;
} */
</style>
