<template>
  <Select v-model="value" @change="change" size="small">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      :disabled="item.disabled"
    >
    </el-option>
  </Select>
</template>

<script>
import {Select} from 'element-ui';
export default {
  components: {Select},
  name: 'formItem-improvePoint_dropdown',
  props: {
    fieldInfo: null,
    data: {
      type: String,
    },
  },
  mounted() {
    if (this.fieldInfo) {
      this.options = this.fieldInfo.options;
    }
    this.value = this.data;
  },
  data() {
    return {
      value: '',
      options: [],
    };
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
  },
  watch: {
    data(val) {
      this.value = val;
    },
  },
};
</script>
