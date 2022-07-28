<template>
  <el-input v-model.number="value" @change="change"> </el-input>
</template>

<script>
export default {
  name: 'formItem-number',
  props: {
    data: Number,
  },
  mounted() {
    this.value = this.data;
  },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
  },
};
</script>
