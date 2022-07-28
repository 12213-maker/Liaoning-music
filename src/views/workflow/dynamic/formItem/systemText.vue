<template>
  <Input
    v-model="value"
    @change="change"
    style="max-width: 300px;"
    size="small"
    :disabled="fieldInfo.readOnly"
    :placeholder="`请填写${fieldInfo.name}`"
  >
  </Input>
</template>

<script>
// 针对档案编号的组件
import {Input} from 'element-ui';
// import {getFlowCode} from '@/api/common/index.js';
export default {
  components: {Input},
  name: 'formItem-systemText',
  props: {
    data: String,
    fieldInfo: Object,
  },
  mounted() {
    this.change();
    this.value = this.data;
    this.getCode();
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
    // 获取后台生成的代码
    getCode() {
      getFlowCode({
        contentId:this.fieldInfo.id
      }).then((res) => {
        console.log('11111111',res);
        this.value = res.data;
        this.change();
      });
    }
  },
};
</script>
