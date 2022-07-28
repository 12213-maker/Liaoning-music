<template>
  <div class="debug">
    <div class="debug-show">
      <div class="debug-send-box">
        <el-input :disabled="true" v-model="restInfo.restSerialNo">
          <template slot="prepend">接口ID</template>
          <el-button slot="append" @click="handleCallApi">发送</el-button>
        </el-input>
      </div>
      <el-checkbox v-model="mock">mock</el-checkbox>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 请求头部 -->
        <el-tab-pane label="请求头部" name="requestHeader">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="handleAdd"
            class="add-btn"
          >新增
          </el-button>
          <el-table :data="table" border style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="requestHead" label="请求头" width="150">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.requestHead[scope.$index].headKey"
                          @change="requestChange(scope)">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="内容">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.requestHead[scope.$index].content" @change="contentChange(scope)">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleDel(scope)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 请求参数 -->
        <el-tab-pane label="请求参数" name="requestArgs">
          <div class="radio-box" @change="handleChecked">
            <el-radio v-model="radio" label="x-www-form-urlencoded" :disabled="true">x-www-form-urlencoded</el-radio>
            <el-radio v-model="radio" label="form-data" :disabled="true">form-data</el-radio>
            <el-radio v-model="radio" label="raw">raw</el-radio>
            <span>JSON(application/json)</span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- editor -->
    <div class="main-content">
      <div v-if="displayRowEidt">
        <editor
          v-model="restInfo.requestArgs"
          @init="editorInit"
          width="100%"
          height="300"
          @input="inputJson"
          :lang="'json'"
        >
        </editor>
      </div>
    </div>

<!--    <div class="main-content">-->
    <div class="response-info" @tab-click="handleClickRes" v-show="hasResData">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">响应信息</el-menu-item>
      </el-menu>
      <div>
        <json-viewer :value="resData" :expand-depth=4 copyable sort></json-viewer>
      </div>
    </div>

  </div>
</template>

<script>
  import { callRestApi, callRestApiMock } from '@/api/fastrest/api'
  import EditorDebugShow from './EditorDebugShow'
  import JsonViewer from 'vue-json-viewer'

  export default {
    name: 'DebugShow',
    props: ["restInfoVO","restInfo"],
    data() {
      return {
        inputContent: '',
        activeName: 'requestArgs',
        activeNameRes: '',
        table: [],
        requestHead: [],
        radio: 'raw',
        displayRowEidt: false,
        lang: "json",
        hasResData: false,
        resData: '',
        innerContent: '{}',
        mock: false
      }
    },
    components: {
      JsonViewer,
      EditorDebugShow,
      editor: require('vue2-ace-editor')
    },
    computed: {
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.id = this.$route.params.id;
      }
    },
    mounted() {
      this.handleChecked();
      let tab = {};
      tab.name = "requestArgs";
      this.handleClick(tab);
    },
    watch: {
      requestArgs(value) {
        this.innerContent = value;
      }
    },
    methods: {
      handleClickRes(tab, event){
        console.log(tab, event);
      },
      debugEditorChange(value) {
        this.$emit('debugEditorChange', value);
      },
      /*调用rest-api接口*/
      handleCallApi() {
        let mock = this.mock;
        let serialStr = '';
        if(this.requestHead.length === 0) {
          serialStr = this.restInfo.restSerialNo;
        } else {
          let requestArr = [];
          this.requestHead.filter((val)=>{
            let item = val.headKey + '=' + val.content;
            requestArr.push(item);
          });
          let requestStr = requestArr.join("&");
          serialStr = this.restInfo.restSerialNo + "?" + requestStr;
        }
        let innerContent = JSON.stringify(JSON.parse(this.innerContent));
        if(mock == true) {
          callRestApiMock(innerContent, serialStr, mock).then(res => {
            this.hasResData = true;
            this.activeNameRes = 'requestHeader';
            this.resData = res.data;
          });
        } else {
          callRestApi(innerContent, serialStr).then(res => {
            this.hasResData = true;
            this.activeNameRes = 'requestHeader';
            this.resData = res.data;
          });
        }
      },
      handleClick(tab) {
        if (tab.name === 'requestArgs' && this.radio === 'raw') {
          this.displayRowEidt = true;
        } else {
          this.displayRowEidt = false;
        }
      },
      handleAdd() {
        let header = {
          headKey: "",
          content: ""
        };
        this.requestHead.push(header);
        this.table.push({
          requestHead: this.requestHead
        })
        // this.table.push(this.requestHead);
      },
      requestChange(row) {
        // console.log("===>行数在改变",row.$index);
      },
      contentChange(row) {
        // console.log("===",row,"===")
      },
      handleDel(scope) {
        this.requestHead.splice(scope.$index, 1);
        this.table.splice(scope.$index, 1);
      },
      handleChecked() {
        this.displayRowEidt = this.radio === 'raw' ? true : false;
      },
      editorInit() {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/theme/eclipse')
        require('brace/mode/json')
        require('brace/mode/text')
        require('brace/mode/html')
        require('brace/mode/xml')
        require('brace/mode/javascript')
        require('brace')
        require('brace/theme/chrome')
        require('brace/snippets/json')
        require('brace/snippets/html')
      },
      inputJson() {
      }
    }
  }
</script>



