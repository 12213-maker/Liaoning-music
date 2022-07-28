<template>
  <Input
    v-model="value"
    @change="change"
    :disabled="fieldInfo.readOnly"
    :placeholder="placeholder?placeholder:`请填写${fieldInfo.name}`"
    style="width: 100%; max-width: 300px"
    size="small"
    :maxlength="50"
  >
  </Input>
</template>

<script>
import {Input} from 'element-ui';
export default {
  components: {Input},
  name: 'formItem-text',
  props: {
    data: String,
    fieldInfo: Object,
    placeholder:String
  },
  mounted() {
    // this.change();
    this.value = this.data;
  },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    data(val) {
      console.warn(this.fieldInfo.id,this.fieldInfo.readOnly,"val:",val)
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
