<template>
  <Select
    v-model="value"
    :multiple="fieldInfo.optionType === 'multiple'"
    @change="change"
    size="small"
  >
    <el-option
      v-for="item of options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </Select>
</template>
<script>
// 督办事项
import {Select} from 'element-ui';
export default {
  components: {Select},
  name: 'formItem-applyTitle',
  props: {
    fieldInfo: Object,
    data: String,
  },
  mounted() {
    setTimeout(()=>{
      this.options = JSON.parse(sessionStorage.getItem('code')).applyTitle;  
    },1000)
    
  },
  data() {
    return {
      options: null,
      value: null,
    };
  },
  watch:{
    data(val){
      this.value = val;

    }
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
  },
};
</script>
