<template>
  <Input
    v-model="value"
    @change="change"
    disabled
    :placeholder="`请选择${fieldInfo.name}`"
    style="width: 40%"
    size="small"
  >
  </Input>
</template>

<script>
import {Input} from 'element-ui';
export default {
  components: {Input},
  name: 'formItem-readOnly',
  props: {
    data: String,
    fieldInfo: Object,
  },
  mounted() {
    this.value = this.fieldInfo.value;
    this.change();
  },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    // data(val) {
    //   this.value = val;
    // },
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
  },
};
</script>
