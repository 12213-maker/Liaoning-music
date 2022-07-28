<template>
  <Select
    v-model="value"
    :multiple="fieldInfo && fieldInfo.optionType === 'multiple'"
    :disabled="fieldInfo.readOnly"
    @change="change($event)"
    :placeholder="`请选择${fieldInfo.name}`"
    size="small"
  >
    <el-option
      size="small"
      v-for="item of fieldInfo.options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      :disabled="item.disabled"
    ></el-option>
  </Select>
</template>

<script>
// import {queryIdentyDetail} from '@/api/common/index.js';
import {Select} from 'element-ui';

export default {
  components: {Select},
  name: 'formItem-dropdown',
  props: {
    fieldInfo: Object,
    data: String,
    subtype: String,
    defaultValue:String||Number
  },
  created() {
    this.change();
    
    // if (this.subtype) {
    //   this.queryIdenty(this.subtype);
    // }
  },
  data() {
    return {
      value: '',
      options: [],
    };
  },
  watch: {
    data(val) {
      this.value = val?val:'';
    },
  },
  methods: {
    change(val) {
      this.$emit('change', this.value);
      const hidden = [];
      const visible = [];
      if (this.fieldInfo.params && this.fieldInfo.params.setVisible) {
        for (const k in this.fieldInfo.params.setVisible) {
          if (this.value !== k) {
            hidden.push(...this.fieldInfo.params.setVisible[k] || []);
          } else {
            visible.push(...this.fieldInfo.params.setVisible[k] || []);
          }
        }
        this.$emit('setVisible', visible, hidden);
      }
    },
    // queryIdenty(type) {
    //   const identySubtype = type;
    //   queryIdentyDetail({
    //     // 申请单判断处理
    //     identyType: identySubtype.substring(0, 2),
    //   }).then((res) => {
    //     if (res) {
    //       this.options = res.data[identySubtype];
    //     }
    //   });
    // },
  },
};
</script>
