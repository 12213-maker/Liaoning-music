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
  name: 'formItem-creator',
  props: {
    data: String,
    fieldInfo: Object,
  },
  mounted() {
    this.value = JSON.parse(sessionStorage.getItem('userInfo')).nickName; 
    this.change();
  },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    data(val) {
      if(val) {
        this.value = val;  
      } else {
        this.value = JSON.parse(sessionStorage.getItem('userInfo')).nickName; 
        this.change();
      }
      
    },
  },
  methods: {
    change() {
      this.$emit('change', JSON.parse(sessionStorage.getItem('userInfo')).nickName);
    },
  },
};
</script>
