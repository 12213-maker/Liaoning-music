<template>
  <div>
    <el-input v-model="commentdata" placeholder="" @change="change"></el-input>
  </div>
</template>

<script>
export default {
  name: 'formItem-comments',
  props: {
    data: String,
    formInfo: Object,
  },
  created() {
    this.change();
  },
  data() {
    return {
      commentdata: '',
    };
  },
  methods: {
    change() {
      this.$emit('change', this.commentdata);
    },
  },
};
</script>

<style lang="scss" scoped></style>
