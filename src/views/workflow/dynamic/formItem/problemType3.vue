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
import {Cascader} from 'element-ui';
import {getProblemType} from '@/api/workflow/index.js';

export default {
  name: 'formItem-problemType3',
  components:{Cascader},
  props: {
    fieldInfo: Object,
    data: String,
    subtype: String,
    defaultValue:String||Number
  },
  created() {
    // this.change();
    this.getProblemType();
  },
  mounted() {
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
        this.options = res.obj.problemType.filter( item => !item.flag );
        console.log('------------',this.options)
      })
    }
  },
};
</script>
