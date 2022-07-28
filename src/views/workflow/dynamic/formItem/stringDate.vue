<template>
  <el-date-picker
    :picker-options="pickerOptions"
    class="datepicker"
    v-model="date"
    type="datetime"
    format="yyyy-MM-dd"
    size="small"
    @change="change"
    placeholder="默认长期开展"
  >
  </el-date-picker>
</template>

<script>
import {dateFormat} from '@/utils/index';
export default {
  components: {
    // DatePicker,
  },
  name: 'formItem-stringDate',
  props: {
    fieldInfo: Object,
    data: String,
  },
  created() {
    // 默认值
    this.$emit('change', this.fieldInfo.params.default);
  },
  data() {
    return {
      date: '',
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
    data(val) {
      if (val === '') {
        this.$emit('change', this.fieldInfo.params.default);
      }
    },
  },
  methods: {
    change(e) {
      console.log('xxxxx', e);
      const dateFmt = e && dateFormat(e, 'yyyy-MM-dd');
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
          this.date = '';
          return;
        }
      }
      e ? this.$emit('change', `${dateFmt}`) : this.$emit('change', '');

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
