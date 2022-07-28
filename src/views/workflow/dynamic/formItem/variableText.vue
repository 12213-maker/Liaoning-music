<template>
  <Input
    v-model="value"
    @change="change"
    style="width: 48%"
    size="small"
    :disabled="fieldInfo.readOnly"
    :placeholder="`请填写${fieldInfo.name}`"
  >
  </Input>
</template>

<script>
// 针对个别档案编号
import {Input} from 'element-ui';
export default {
  components: {Input},
  name: 'formItem-variableText',
  props: {
    data: String,
    fieldInfo: Object,
  },
  mounted() {
    this.fieldInfo.value && ( this.value = this.fieldInfo.value);
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
