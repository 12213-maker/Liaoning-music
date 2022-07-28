<template>
  <div>
    <Select
      v-model="value"
      @change="change"
      size="small"
      :disabled="!info.improvementPoints"
      v-if="info.improvementPoints === '01'"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        :disabled="item.disabled"
      >
      </el-option>
    </Select>
    <el-input
      v-model="value"
      @change="change"
      style="width: 40%"
      size="small"
      v-else
      :disabled="!info.improvementPoints"
    >
    </el-input>
  </div>
</template>

<script>
import {Select} from 'element-ui';
export default {
  components: {Select},
  name: 'formItem-improveMode_dropdown',
  props: {
    fieldInfo: null,
    data: {
      type: String,
    },
    info: {
      type: Object,
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
    'info.improvementPoints'() {
      this.value = '';
    },
  },
};
</script>
