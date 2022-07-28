<template>
 <!-- <el-button size="small" @click="downAttachList" style="fontSize:14px;color:#4d4d4d;">下载<i class="el-icon-download el-icon--right"></i></el-button> -->
 <div>
    <a
      style="margin-right: 16px"
      v-for="(item, index) in fileName ? fileName.split('|') : []"
      :key="index"
      target="_blank"
      :href="downloadUrlCommon + `?attachList=${item}`"
      >{{ item }}</a
    >
  </div>
</template>

<script>
// 下载模板附件的组件
export default {
  name: 'formItem-modelDown',
  props: {
    data: String,
    fieldInfo: Object,
  },
  created() {
    this.$emit('change', '');
  },
  mounted() {
    this.fileName = this.fieldInfo.value;
  },
  data() {
    return {
      fileName: null,
      downloadUrlCommon: `${process.env.VUE_APP_REQUEST_URL}/identyCommon/downModelAttachList`
    };
  },
  watch: {
   
  },
  methods: {
    change() {
      this.$emit('change', this.fileName);
    },
    // 下载模板附件
    // downAttachList() {
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.target = '_blank';
    //   a.href = `${process.env.VUE_APP_REQUEST_URL}/identyCommon/downModelAttachList?attachList=${this.fieldInfo.value}`;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // }
  }
   
};
</script>

