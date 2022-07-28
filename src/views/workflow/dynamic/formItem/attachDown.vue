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
    <el-input  placeholder="该工单暂无附件" disabled v-if="!fileName">
    </el-input>
  </div>
</template>

<script>
// 回复附件下载的组件, 从流程变量获取文件名
export default {
  name: 'formItem-attachDown',
  props: {
    data: String,
    formdata: Object
  },
  created() {
    this.$emit('change', '');
    // console.log(11111,this.formdata.processVariables.attachList);
  },
  mounted() {
    this.fileName = this.formdata.processVariables.attachList;
  },
  data() {
    return {
      fileName: null,
      downloadUrlCommon: `${process.env.VUE_APP_REQUEST_URL}/identyCommon/downAttachList`
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
    //   a.href = `${process.env.VUE_APP_REQUEST_URL}/identyCommon/downAttachList?attachList=${this.formdata.processVariables.attachList}`;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // }
  }
   
};
</script>

