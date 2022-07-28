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
  name: 'formItem-dropdown_notice',
  props: {
    fieldInfo: Object,
    data: {
      type: String,
      default: '11',
    },
  },
  mounted() {
    if (this.fieldInfo) {
      this.options = this.fieldInfo.options;
    }
    this.change();
  },
  data() {
    return {
      value: this.data,
      options: [
        {
          id: '11',
          name: '短信',
        },
        // {
        //   id: '12',
        //   name: '邮件',
        //   disabled: true,
        // },
        // {
        //   id: '13',
        //   name: '短信+邮件',
        //   disabled: true,
        // },
        {
          id: '00',
          name: '不通知',
        },
      ],
    };
  },
  methods: {
    change() {
      // if (this.value === '短信') {
      //   this.value = '11';
      // }
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
