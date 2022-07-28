<template>
  <div>
    <el-date-picker
      :picker-options="pickerOptions"
      class="datepicker"
      v-model="value"
      type="date"
      format="yyyy年M月d日"
      value-format='yyyy年M月d日'
      size="small"
      @change="change"
      placeholder="选择日期"
      :disabled="value2"
      ref="datepicker"
    >
    </el-date-picker>

    <!-- <el-date-picker
      v-model="value"
      type="datetime"
      value-format='yyyyMMddhhmmss'
      ref="datepicker"
      :disabled="value2"
      :picker-options="pickerOptions"
      @change="change"
      placeholder="选择日期时间">
    </el-date-picker> -->


    <el-checkbox v-model="value2" :disabled="Boolean(value)" @change="onCheckChange" style="margin-left:30px;">长期开展</el-checkbox>
  </div>
</template>

<script>

export default {
  name: 'formItem-processTime',
  props: {
    fieldInfo: Object,
    data: String,
    subtype: String,
    defaultValue:String||Number
  },
  created() {
  },
  data() {
    return {
      value: null,
      value2: false,
      options: [],

      pickerOptions: {
        disabledDate: (time) =>
          time.getTime() < Date.now() - 8.64e7,
      },
    };
  },
  watch: {
    data(val) {
      if(!val){
        this.value = '' ;
        this.value2 = false;
      }
    },
  },
  methods: {
    change(val) {
      if(val) {
        this.$emit('change', this.value);
      }
    },

    onCheckChange(val) {
      if(val) {
        // 长期开展
        this.$emit('change', '长期开展');
        this.$refs.datepicker.value=null;
        
      }
    }
  },
};
</script>
