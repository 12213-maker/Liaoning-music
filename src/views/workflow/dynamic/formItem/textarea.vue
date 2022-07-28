<template>
  <Input
    v-model="value"
    @change="change"
    :placeholder="`请填写${fieldInfo.name}`"
    type="textarea"
    :rows="fieldInfo.params.rows"
    style="width: 100%; max-width: 300px"
    size="small"
    :maxlength="1000"
  >
  </Input>
</template>

<script>
import {Input} from 'element-ui';
export default {
  components: {Input},
  name: 'formItem-textarea',
  props: {
    data: String,
    fieldInfo: Object,
  },
  mounted() {
    this.change();
    this.value = this.data;
  },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    data(val) {
      this.value = val;
    },
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
  },
};
</script>

<style lang="scss">
  .el-textarea__inner {
    line-height: 1.1;
  }
</style>
