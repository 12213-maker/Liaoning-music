<template>
  <Select
    v-model="value"
    :multiple="fieldInfo.optionType === 'multiple'"
    @change="change"
    :disabled ='disabled'
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
  name: 'formItem-taskType',
  props: {
    fieldInfo: Object,
    data: String,
    variableInfo: Object
  },
  created() {
    // this.options = JSON.parse(sessionStorage.getItem('code')).applyTitle;
  },
  data() {
    return {
      options: null,
      value: null,
      disabled: true
    };
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
    handle(data) {
      this.options = data;
      this.disabled = false;
    }
  },
  watch: {
    data(val){
      this.value = val;
    },
    'variableInfo.applyTitle': function(val) {
        console.log('变化',val);
        let data = [];
        JSON.parse(sessionStorage.getItem('code')).applyTitle.forEach(el => {
          if(el.value === val){
           data = el.child
          }
        });
        this.handle(data);
     
    }
  }
};
</script>
