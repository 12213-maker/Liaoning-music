<template>
  <Input
    v-model="value"
    @change="change"
    :placeholder="`请填写${fieldInfo.name}`"
    style="width: 100%; max-width: 300px"
    :disabled ='fieldInfo.readOnly'
    size="small"
  >
  </Input>
</template>

<script>
import {Input} from 'element-ui';
export default {
  components: {Input},
  name: 'formItem-dept',
  props: {
    data: String,
    fieldInfo: Object,
  },
  mounted() {
    this.value = JSON.parse(sessionStorage.getItem('department')).deptName; 
    this.change();
  },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    data(val) {
      this.value = JSON.parse(sessionStorage.getItem('department')).deptName;
      this.change();
    },
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
  },
};
</script>
