<template>
  <Select
    v-model="value"
    :multiple="fieldInfo.optionType === 'multiple'"
    @change="change"
    size="small"
  >
    <el-option
      v-for="item of options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </Select>
</template>
<script>
import {Select} from 'element-ui';
export default {
  components: {Select},
  name: 'formItem-select',
  props: {
    fieldInfo: Object,
    data: String,
  },
  created() {
    // 取默认值
    this.fieldInfo.value && (this.value = this.fieldInfo.value);
    this.change();
    if (this.fieldInfo) {
      this.options = this.fieldInfo.options;
    }
  },
  data() {
    return {
      options: null,
      value: null,
    };
  },
  watch: {
   data(val) {
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
