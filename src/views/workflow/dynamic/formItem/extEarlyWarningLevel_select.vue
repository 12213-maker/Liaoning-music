<template>
  <Select v-model="value" @change="change" size="small">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </Select>
</template>

<script>
import {Select} from 'element-ui';
export default {
  components: {Select},
  name: 'formItem-extEarlyWarningLevel_select',
  props: {
    data: String,
  },
  mounted() {
    const WarningLevel = JSON.parse(
      sessionStorage.getItem('extEarlyWarningLevel')
    );
    this.options = WarningLevel;
  },
  created() {
    this.change();
  },
  destroyed() {
    this.$emit('change', undefined);
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
