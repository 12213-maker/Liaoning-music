<template class="cascader-border">
  <el-upload
    ref="upload"
    :disabled="uploading"
    :on-remove="remove"
    class="upload-demo"
    :action="uploadUrl"
    multiple
    :before-upload="showfile"
    :on-success="uploadSuccess"
    :on-progress="uploadProgress"
    :on-error="uploadError"
  >
    <el-button
      icon="el-icon-upload2"
      size="small"
      type="primary"
      class="button_upload"
      >附件上传
    </el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'formItem-upload_list',
  props: {
    data: String,
  },
  created() {
    this.$emit('change', '');
  },
  mounted() {
    this.fileName = this.data;
  },
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_REQUEST_URL}/staticresource/FileUploadController/createIdentyupload`,
      fileName: '',
      fileList: [],
      uploading: false,
    };
  },
  watch: {
    data(val) {
      if (val === '') {
        // this.fileName = val;
        this.$refs.upload.clearFiles();
        this.fileList = [];
        this.fileName = '';
      }
    },
  },
  methods: {
    change() {
      this.$emit('change', this.fileList);
    },
    // 删除文件
    remove(file, fileList) {
      this.fileList = [];
      const fileArr = fileList
        .map((item) => item.response)
        .map((item) => item.data);
      fileArr.forEach((item) => {
        this.fileList.push(item.fileName);
      });
      this.fileName = this.fileList.join('|');
      this.$emit('change', this.fileName);
    },

    // 文件上传之前的回调
    showfile() {},
    // 文件上传成功的回调
    uploadSuccess(response) {
      this.uploading = false;
      this.fileList.push(response.data.fileName);
      console.log(this.fileList);
      this.fileName = this.fileList.join('| ');
      this.$emit('change', this.fileName);
      this.$emit('busyChange', this.uploading);
    },
    // 上传中的回调
    uploadProgress() {
      this.uploading = true;
      this.$emit('busyChange', this.uploading);
    },
    uploadError() {
      this.uploading = false;
      this.$emit('busyChange', this.uploading);
    },
  },
};
</script>
<style>
.button_upload {
  height: 32px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
  color: #4d4d4d;
  background: #ffffff;
}

.button_upload:hover {
  color: #4d4d4d;
  background: #ffffff;
  border: 1px solid #ff9900;
}

.button_upload:active {
  color: #4d4d4d;
  background: #ffffff;
  border: 1px solid #ff9900;
}

.button_upload:focus {
  color: #4d4d4d;
  background: #ffffff;
  border: 1px solid #ff9900;
}

.el-upload-list__item-name {
  width: 45%;
}

.el-upload-list__item {
  width: 45%;
}
</style>
