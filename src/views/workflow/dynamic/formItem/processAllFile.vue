<template>
  <Select
    v-model="value"
    :multiple="'multiple'"
    :disabled="fieldInfo.readOnly"
    @change="change"
    style="width: 250px"
    :placeholder="`请选择${fieldInfo.name}`"
    size="small"
  >
    <el-option
      size="small"
      v-for="item of options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </Select>
</template>

<script>
// import {getProcessAllFile} from '@/api/workflow/index.js';
import {Select} from 'element-ui';

export default {
  components: {Select},
  name: 'formItem-processAllFile',
  props: {
    fieldInfo: Object,
    data: Array,
    formdata: Object
  },
  created() {
    this.getAllFile();
    this.change();
  },
  data() {
    return {
      value: [],
      options: [],
    };
  },
  watch: {
    data(val) {
      this.value = val;
    }
  },
  methods: {
    async getAllFile() {
      const data = await getProcessAllFile(this.formdata && this.formdata.processInstanceId);
      this.options = data && data.map((item) => ({
        id: item.id,
        name: item.name
      }));
    },
    change() {
      this.$emit('change',this.value);
    }
  }
};
</script>
