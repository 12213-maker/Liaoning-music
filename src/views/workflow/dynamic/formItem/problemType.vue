<template>
  <Cascader
  ref="Cascader"
  v-model="value"
  :options="options"
  :props="{ 
    checkStrictly: true, 
    children:'child',
    value:'id',
    leaf:'leaf'
  }"
  :placeholder="`请选择${fieldInfo.name}`"
  size="small"
  @change="change"
  :clearable="false"></Cascader>
</template>

<script>
// import {queryIdentyDetail} from '@/api/common/index.js';
import {Cascader} from 'element-ui';
import {getProblemType} from '@/api/workflow/index.js';

export default {
  name: 'formItem-problemType',
  components:{Cascader},
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
  mounted() {
    this.getProblemType();
  },
  data() {
    return {
      value: [],
      options: [],
    };
  },
  watch: {
    // data(val) {
    //   if(val) this.value = val; 
    // },
  },
  methods: {
    change(val) {
      console.log(this.value[this.value.length-1]);
      if(val) this.$emit('change', this.value[this.value.length-1]);
    },

    getProblemType() {
      getProblemType()
      .then(res => {
        this.options = res.obj.problemType;
      })
    }
  },
};
</script>
