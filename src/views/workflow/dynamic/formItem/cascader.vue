<template>
  <!-- <Select
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
    ></el-option>
  </Select> -->

  <Cascader
  ref="Cascader"
  v-model="value"
  :options="fieldInfo.options"
  :props="{ checkStrictly: true, children:'child', label:'name',value:'id' }"
  :placeholder="`请选择${fieldInfo.name}`"
  size="small"
  @change="change($event)"
  :clearable="false"></Cascader>
</template>

<script>
// import {queryIdentyDetail} from '@/api/common/index.js';
import {Cascader} from 'element-ui';

export default {
  name: 'formItem-cascader',
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
  data() {
    return {
      value: '',
      options: [],
    };
  },
  watch: {
    data(val) {
      console.log('问题分类',val,[val.substring(0,2),val.substring(2,4)]);
      this.value = val?[val.substring(0,2),val.substring(2,4)]:'';
    },
  },
  methods: {
    change(val) {
      console.warn(1,this.value);
      if(val) {
        this.$emit('change', this.value.join(''));
        if(this.value.length==2) console.log(this.$refs.Cascader);
      }
      
      /*const hidden = [];
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
      }*/
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
