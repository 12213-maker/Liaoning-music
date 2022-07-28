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
      v-for="item of options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </Select>
</template>

<script>
// import {queryIdentyDetail} from '@/api/common/index.js';
import {Select} from 'element-ui';

export default {
  components: {Select},
  name: 'formItem-ProblemType2',
  props: {
    fieldInfo: Object,
    data: String,
    subtype: String,
    variableInfo: Object
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
      this.value = val;
    },
    'variableInfo.ProblemType1': function(val){
      console.log('编发的是',val);
      this.value = '';
      this.change();
      let data = []
      this.fieldInfo.options.forEach(ele => {
        if(ele.id === val){
          data = ele.child;
        }
      });
      this.options = data;
    }

  },
  methods: {
    change() {
      this.$emit('change', this.value);
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
