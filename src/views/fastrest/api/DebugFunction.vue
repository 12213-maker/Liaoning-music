<template>
  <div class="app-container">
    <el-tabs tab-position="left" v-model="activeName">
      <el-tab-pane name="document">
        <span slot="label"><i class="el-icon-document"></i>文档</span>
        <doc-show :restInfoVO="restInfoVO" :restInfo="restInfo" v-on:listenArgs="handleArgs"></doc-show>
      </el-tab-pane>
      <el-tab-pane name="edit">
        <span slot="label"><i class="el-icon-edit"></i>配置</span>
        <deploy-show :restInfoVO="restInfoVO" :restInfo="restInfo" :varTypeNum="varTypeNum" :resultTypeNum="resultTypeNum">
        </deploy-show>
      </el-tab-pane>
      <el-tab-pane name="debug">
        <span slot="label"><i class="iconfont iconbug"></i>调试</span>
        <!-- <debug-show :restInfo="restInfo" :requestArgs="requestArgs"></debug-show> -->
        <debug-show :restInfoVO="restInfoVO" :restInfo="restInfo"></debug-show>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import { getApiExt } from '@/api/fastrest/api';
  import { Backtop } from 'element-ui';
  const DebugShow = () =>  import ('./DebugShow');
  const DocShow = () => import ('./DocShow');
  const DeployShow = () => import('./DeployShow');
  export default {
    components: {
      DebugShow,
      DocShow,
      DeployShow
    },
    name: 'DebugFunction',
    data() {
      return {
        activeName: 'document',
        id: 0,
        restInfo: {
          id: null,
          restName: '',
          restCode: '',
          restSerialNo: '',
          system: '',
          request: '',
          response: '',
          method: '',
          tpl: {
            template: ''
          },
          sqls: []
        },
        restInfoVO: {},
        requestArgs: '',
        varTypeNum:[],
        resultTypeNum: []
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.id = this.$route.params.id;
        this.getRestInfoId();
      } else {
        this.initalData();
      }
    },
    methods: {
      getRestInfoId() {
        getApiExt(this.id).then((res) => {
          if (res.code == 200){
            this.restInfoVO = res.data;
            this.restInfo = res.data.restInfo;
            this.restInfoVO.requestHeaderJson = [];
            this.restInfoVO.responseHeaderJson = [];
            let sqls = this.restInfo.sqls;
            this.varTypeNum = sqls.map((val) => {
              return val.varType;
            });
            this.resultTypeNum = sqls.map((val) => {
              return val.resultType;
            });
          }
        });
      },
      handleArgs(data) {
        this.requestArgs = data;
      },
      initalData() {
        this.restInfoVO = {
          requestHeaderJson: [],
          requestMetaJson: [],
          responseHeaderJson: [],
          responseMetaJson: [],
          restInfo: {}
        }
        this.restInfo = {
          id: null,
          restName: '',
          restCode: '',
          restSerialNo: '',
          system: '',
          request: '',
          response: '',
          method: '',
          tpl: {
            template: ''
          },
          sqls: []
        }
      }
    }
  }
</script>
