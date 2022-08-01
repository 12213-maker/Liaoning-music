<template class="cascader-border">
  <div>

    <el-upload
      ref="upload"
      :action="uploadUrl"
      :headers="config"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-progress="uploadProgress"
      :on-error="uploadError"
      :on-change="onFileListChange"
      :on-remove="remove"
      :before-remove="beforeRemove"
      multiple
      :disabled="uploading">
      <el-button
      icon="el-icon-upload2"
      size="small"
      type="primary"
      class="button_upload">
      附件上传
      </el-button>
    </el-upload>

    <!-- <el-upload
      ref="upload"
      
      class="upload-demo"
      
      :headers="config"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-progress="uploadProgress"
      :on-error="uploadError"
      :on-change="onFileListChange"
      :file-list="fileList"
      :show-file-list="true"
    >
      <el-button
      icon="el-icon-upload2"
      size="small"
      type="primary"
      class="button_upload">
      附件上传
      </el-button>
    </el-upload> -->

    <!-- <ul style="width:100%; list-style:none; font-size:12px; color:#595959; line-height:30px; display:flex; flex-direction:column;">
      <li v-for="(fileName,idx) in fileList" :key="idx">
        {{fileName}}  
        <i class="el-icon-circle-close" @click="remove(fileName,fileList)" style="margin-left:20px;"></i>
      </li>
    </ul> -->
  </div>
</template>

<script>
import {getToken} from '@/utils/auth'
export default {
  name: 'formItem-upload',
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
      uploadUrl: `${process.env.VUE_APP_BASE_API}/Sound/attachFile/upload`,
      fileName: '',
      fileList: [],
      uploading: false,
      config: {
        'Authorization':'Bearer '+ getToken()
      },
      files:[],
      repeatFile:false
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
    remove(file) {
      const idx = this.files.indexOf(file.name);
      this.files.splice(idx,1);
      this.fileList.splice(idx,1);
      this.fileName = this.fileList.join('|');
      if(this.fileList.length==0) {
        this.$emit('changeBtnStatus',false);
      }
      this.$emit('change', this.fileName);
    },

    beforeRemove(file) {
      if(this.repeatFile) {
        this.repeatFile = false;
        let idx = 0;
        // console.log(this.$refs.upload.$data.uploadFiles)
        for(var i=0; i<this.$refs.upload.$data.uploadFiles.length; i++) {
          if(this.$refs.upload.$data.uploadFiles[i].status=='ready') {
            idx = i;
          }
        }
        this.$refs.upload.$data.uploadFiles.splice(idx,1);
        return false;
      }
    },

    // 文件上传之前的回调
    beforeUpload(file) {
      let imgSize = Number(file.size / 1024 / 1024);
      if(imgSize>50) {
        this.repeatFile = true;
        this.$message.error('附件超过50M，不允许上传！');
        return false;
      }

      if(this.files.includes(file.name)) {
        this.repeatFile = true;
        this.$message.error('请勿上传重复文件！');
        return false;
      }
      this.$emit('changeBtnStatus',true);
    },

    // 文件上传成功的回调
    uploadSuccess(response) {
      this.uploading = false;
      if(response.obj) {
        response.obj.forEach((item)=>{
          this.fileList.push(item.systemFileName);
          this.files.push(item.originFileName);
        })
        // this.fileList.push(response.obj.fileNames);
        this.fileName = this.fileList.join('|'); 
        this.$emit('change', this.fileName);
        this.$emit('busyChange', this.uploading);
      } else {
        let idx = 0;
        for(var i=0; i<this.$refs.upload.$data.uploadFiles.length; i++) {
          if(this.$refs.upload.$data.uploadFiles[i].response.success==false) {
            idx = i;
          }
        }
        this.$refs.upload.$data.uploadFiles.splice(idx,1);
        this.$message.error('附件上传失败！');
      }
      this.$emit('changeBtnStatus',false);
    },
    // 上传中的回调
    uploadProgress() {
      this.uploading = true;
      this.$emit('busyChange', this.uploading);
    },

    uploadError(err) {
      this.$message.error('附件上传失败！');
      this.$emit('changeBtnStatus',false);
    },

    onFileListChange(file, fileList) {
      console.log('change',file,fileList)
    }
  },
};
</script>
<style lang='scss'>
.cascader-border {
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

  .el-upload-list {
    display: none !important;
  }
}

</style>
