<template>
  <div class="radio_color">
    <Radio
      v-model="radio"
      v-for="item in radioInfo ? radioInfo : []"
      :key="item.id"
      :label="item.id"
      @change="change"
      >{{ item.name }}
    </Radio>
    <!-- <Radio v-model="radio" label="1" @change="change">{{ radioB }} </Radio> -->
  </div>
</template>

<script>
import {Radio} from 'element-ui';
export default {
  components: {Radio},
  name: 'formItem-taskGroup',
  props: {
    data: String,
    fieldInfo: Object,
  },
  mounted() {
    this.radio = this.data;
    this.fieldInfo && (this.radioInfo = this.fieldInfo.options);
  },
  data() {
    return {
      radio: null,
      radioInfo: null,
    };
  },
  methods: {
    change() {
      this.$emit('change', this.radio);
    },
  },
};
</script>
<style>
.radio_color .el-radio__input.is-checked + .el-radio__label {
  color: #fd7624 !important;
}
.radio_color .el-radio__input.is-checked .el-radio__inner {
  background: #fd7624 !important;
  border-color: #fd7624 !important;
}
.radio_color .el-radio__inner:hover {
  border-color: #fd7624;
}
</style>
>
