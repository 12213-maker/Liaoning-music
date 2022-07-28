<template>
  <div id="doc" v-cloak>
    <datalist id="headerlist">
      <option v-for="(item,index) in flag.headers" :value="item" :key="index"></option>
    </datalist>
    <datalist id="requestlist">
      <option v-for="(item,index) in flag.requests" :value="item" :key="index"></option>
    </datalist>
    <datalist id="responselist">
      <option v-for="(item,index) in flag.responses" :value="item" :key="index"></option>
    </datalist>

    <div id="api-edit-details">
      <div id="api-edit-content" class="form">
        <!-- <div class="to-edit" v-hasPermi="['fastrest:api:edit']" @click="jumpEdit">
          <a class="iconfont iconarrow-right"> 接口配置</a>
        </div> -->
        <ul uk-tab>
          <li class="uk-active"><a>基本信息</a></li>
        </ul>
        <div class="item">
          <div class="col-sm-1 label">接口名称</div>
          <div class="col-sm-11">
            <input type="text" class="uk-input" maxlength="30" v-model="restInfo.restName" placeholder="请输入接口名称"/>
          </div>
        </div>
        <div class="item">
          <div class="col-sm-1 label">接口编码</div>
          <div class="col-sm-5">
            <input type="text" v-model="restInfo.restCode" class="uk-input">
          </div>
          <div class="col-sm-1 label">接口序列号</div>
          <div class="col-sm-5">
            <input type="text" v-model="restInfo.restSerialNo" readonly class="uk-input">
          </div>
        </div>
        <div class="item">
          <div class="col-sm-1 label">请求方法</div>
          <div class="col-sm-2">
            <select v-model="restInfo.method" class="uk-select">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
              <option value="COPY">COPY</option>
              <option value="OPTIONS">OPTIONS</option>
            </select>
          </div>
          <div class="col-sm-1 label">请求类型</div>
          <div class="col-sm-2">
            <select v-model="content.dataType" class="uk-select">
              <option value="X-WWW-FORM-URLENCODED">X-WWW-FORM-URLENCODED</option>
              <template v-if="content.requestMethod == 'POST'">
                <option value="FORM-DATA">FORM-DATA</option>
                <option value="BINARY">BINARY</option>
              </template>
              <option value="JSON">JSON</option>
              <option value="RAW">RAW</option>
              <option value="XML">XML</option>
            </select>
          </div>
          <div class="col-sm-1 label">响应类型</div>
          <div class="col-sm-2">
            <select v-model="content.contentType" class="uk-select">
              <option value="JSON">JSON</option>
              <option value="JSONP">JSONP</option>
              <option value="TEXT">TEXT</option>
              <option value="XML">XML</option>
              <option value="HTML">HTML</option>
              <option value="IMAGE">IMAGE</option>
              <option value="BINARY">BINARY</option>
            </select>
          </div>
        </div>
        <div class="item">
          <div class="col-sm-1 label">接口描述</div>
          <div class="col-sm-11">
            <div contenteditable="true" class="uk-textarea" id="api-description" v-html="restInfo.restDesc"></div>
          </div>
        </div>
        <div class="item">
          <label class="col-sm-2 label" for="ignoreGHttpReqArgs">忽略全局请求参数</label>
          <div class="col-sm-1 label-content">
            <input type="checkbox" class="uk-checkbox" id="ignoreGHttpReqArgs" v-model="content.ignoreGHttpReqArgs">
          </div>
          <label class="col-sm-2 label" for="ignoreGHttpReqHeaders">忽略全局请求头</label>
          <div class="col-sm-1 label-content">
            <input type="checkbox" class="uk-checkbox" id="ignoreGHttpReqHeaders" v-model="content.ignoreGHttpReqHeaders">
          </div>
          <label class="col-sm-2 label" for="ignoreGHttpRespHeaders">忽略全局响应头</label>
          <div class="col-sm-1 label-content">
            <input type="checkbox" class="uk-checkbox" id="ignoreGHttpRespHeaders" v-model="content.ignoreGHttpRespHeaders">
          </div>
          <label class="col-sm-2 label" for="ignoreGHttpRespArgs">忽略全局响应参数</label>
          <div class="col-sm-1 label-content">
            <input type="checkbox" class="uk-checkbox" id="ignoreGHttpRespArgs" v-model="content.ignoreGHttpRespArgs">
          </div>
        </div>

        <div>
          <ul uk-tab>
            <li v-on:click="flag.tab='header'"><a>请求头(Header)</a></li>
            <li class="uk-active" v-on:click="flag.tab='body'"><a>请求参数(Body)</a></li>
          </ul>

          <!-- 请求头参数 -->
          <div class="tab-content" v-cloak v-show="flag.tab=='header'">
            <div class="div-table">
              <ul class="div-table-header div-table-line cb">
                <li class="col-sm-1">操作</li>
                <li class="col-sm-3">参数名称</li>
                <li class="col-sm-2">是否必须</li>
                <li class="col-sm-2">默认值</li>
                <li class="col-sm-4">描述</li>
              </ul>
            </div>
            <div class="div-table editing div-editing-table">
              <!-- <request-headers-vue :name="'requestHeaders'" v-bind:request-headers.sync="restInfo.requestHeader" :pid="0" v-bind:editing="editing">
              </request-headers-vue> -->
              <request-headers-vue :name="'requestHeaders'" v-bind:requestHeaders="restInfoVO.requestHeaderJson" :pid="0" v-bind:editing="editing">
              </request-headers-vue>
            </div>
            <div class="item">
              <button class="btn btn-default btn-sm" v-on:click="newRow('requestHeaderJson')">
                <i class="iconfont icon-tianjia"></i>添加参数
              </button>
              <button class="btn btn-default btn-sm" v-on:click="importJSON('requestHeaderJson'),(dialogFormVisible = true)">
                <i class="iconfont icon-importexport"></i>导入json
              </button>
            </div>
          </div>
          <div class="form-header">
            <textarea rows="5" readonly class="api-example api-field uk-textarea" v-model="formRequestHeader" placeholder="请添加一些示例数据"></textarea>
          </div>

          <!-- 请求参数 -->
          <div class="tab-content" v-cloak v-show="flag.tab=='body'">
            <div class="div-table">
              <ul class="div-table-header div-table-line cb">
                <li class="col-sm-1">操作</li>
                <li class="col-sm-3">参数名称</li>
                <li class="col-sm-2">是否必须</li>
                <li class="col-sm-2">类型</li>
                <li class="col-sm-2">默认值</li>
                <li class="col-sm-2">描述</li>
              </ul>
            </div>
            <div class="div-table editing">
              <!-- <request-args-vue :name="'requestArgs'" v-bind:request-args="restInfoVO.requestMetaJson" :pid="0" v-bind:editing="editing">
              </request-args-vue> -->
              <request-args-vue :name="'requestArgs'" :requestArgs="restInfoVO.requestMetaJson" :pid="0" v-bind:editing="editing">
              </request-args-vue>
            </div>
            <div class="item">
              <button class="btn btn-default btn-sm" v-on:click="newRow('requestMetaJson')">
                <i class="iconfont icon-tianjia"></i>添加参数
              </button>
              <button class="btn btn-default btn-sm" v-on:click="importJSON('requestMetaJson'),(dialogFormVisible = true)">
                <!-- <button class="btn btn-default btn-sm" v-on:click="dialogFormVisible = true"> -->
                <i class="iconfont icon-importexport"></i>导入json
              </button>
            </div>
          </div>
          <ul uk-tab>
            <li class="uk-active"><a>请求示例数据</a></li>
          </ul>
          <textarea rows="5" readonly class="api-example api-field uk-textarea" v-model="formRequestArgs" placeholder="请添加一些示例数据"></textarea>

          <!-- 响应参数 -->
          <ul uk-tab>
            <li v-on:click="flag.resp='header'"><a>响应头(Header)</a></li>
            <li class="uk-active" v-on:click="flag.resp='body'"><a>响应数据(Body)</a></li>
          </ul>

          <!-- 响应头 -->
          <div class="tab-content" v-cloak v-show="flag.resp=='header'">
            <div class="div-table">
              <ul class="div-table-header div-table-line cb">
                <li class="col-sm-1">操作</li>
                <li class="col-sm-3">参数名称</li>
                <li class="col-sm-2">是否必须</li>
                <li class="col-sm-6">描述</li>
              </ul>
            </div>
            <div class="div-table editing ">
              <!-- <response-headers-vue :name="'responseHeaders'"
                v-bind:response-headers.sync="restInfo.responseHeader" :pid="0"
                v-bind:editing="editing"></response-headers-vue> -->
              <response-headers-vue :name="'responseHeaders'"
                                    v-bind:responseHeaders="restInfoVO.responseHeaderJson" :pid="0"
                                    v-bind:editing="editing"></response-headers-vue>
            </div>
            <div class="item">
              <button class="btn btn-default btn-sm" v-on:click="newRow('responseHeaderJson')">
                <i class="iconfont icon-tianjia"></i>添加参数
              </button>
              <button class="btn btn-default btn-sm" v-on:click="importJSON('responseHeaderJson'),(dialogFormVisible = true)">
                <i class="iconfont icon-importexport"></i>导入json
              </button>
            </div>
          </div>
          <div class="form-header">
            <textarea rows="5" readonly class="api-example api-field uk-textarea" v-model="formResponseHeader" placeholder="请添加一些示例数据"></textarea>
          </div>

          <!-- 响应数据 -->
          <div v-cloak v-show="flag.resp=='body'">
            <div class="div-table">
              <ul class="div-table-header div-table-line cb">
                <li class="col-sm-1">操作</li>
                <li class="col-sm-3">参数名称</li>
                <li class="col-sm-2">是否必须</li>
                <li class="col-sm-2">类型</li>
                <li class="col-sm-4">描述</li>
              </ul>
            </div>
            <div class="div-table editing " id="responseArgs">
              <!-- <response-args-vue v-bind:response-args="restInfoVO.responseMetaJson" :name="'responseArgs'" :pid="0" v-bind:editing="editing">
              </response-args-vue> -->
              <response-args-vue :responseArgs="restInfoVO.responseMetaJson" :name="'responseArgs'" :pid="0" v-bind:editing="editing">
              </response-args-vue>
            </div>
            <div class="item">
              <button class="btn btn-default btn-sm" v-on:click="newRow('responseMetaJson')">
                <i class="iconfont icon-tianjia"></i>添加参数
              </button>
              <button class="btn btn-default btn-sm" v-on:click="importJSON('responseMetaJson'),(dialogFormVisible = true)">
                <i class="iconfont icon-importexport"></i>导入json
              </button>
            </div>
          </div>
          <ul uk-tab>
            <li class="uk-active"><a>响应示例数据</a></li>
          </ul>
          <textarea rows="5" readonly class="api-example api-field uk-textarea" v-model="formResponseArgs"
                    placeholder="请添加一些示例数据"></textarea>

          <!-- 附件 -->
          <ul uk-tab>
            <li class="uk-active"><a>附件</a></li>
          </ul>
          <div class="doc-http-attach" ref="fileDiv">
            <label for="file" ref="fileLable">
              <input multiple type="file" name="file" @change="fileUpload" ref="fileInput">
            </label>
            点击、拖拽可上传文件。单文件不能超过1M
            <!-- <div class="file-path" ref="filePath"></div> -->
          </div>
          <br/>

          <div class="cb" v-if="attachs && attachs.length>0">
            <div class="doc-attach" v-for="item in attachs" :key="item" :class="{'file':item.type=='FILE'}">
              <i class="iconfont icon-close" v-on:click="deleteFile(item)"></i>
              <a :href="fileAccess+item.url" v-if="item.type=='FILE'"
                 target="_blank">{{item.fileName}}</a>
              <img v-if="item.type =='IMG'" v-bind:src="fileAccess+item.url"
                   :onclick="'window.open(\''+fileAccess+item.url+'\')'">
            </div>
          </div>

          <!-- 导入Json弹框 -->
          <el-dialog title="导入JSON" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入json数据"
              v-model="jsonData">
            </el-input>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="inputJson">确 定</el-button>
            </div>
          </el-dialog>

        </div>

        <div class="base-btn">
          <el-row>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/uikit/v3.0.0-beta.30/css/uikit.css';
  import '@/assets/doc/app.css';
  import '@/assets/doc/http.css';
  import '@/assets/uikit/v3.0.0-beta.30/js/uikit.js';
  import '@/assets/js/doc.commons.js';
  import utils from '@/assets/js/utils.js'
  import commons from '@/assets/js/doc.commons.js'
  import wangEditor from '@/assets/wangeditor3/wangEditor.js'

  import ResponseArgsVue from '@/components/ApiDoc/ResponseArgs/index';
  import RequestArgsVue from '@/components/ApiDoc/RequestArgs/index';
  import RequestHeadersVue from '@/components/ApiDoc/RequestHeaders/index';
  import ResponseHeadersVue from '@/components/ApiDoc/ResponseHeaders/index';
  import { MessageBox } from 'element-ui';
  import { addApi } from '@/api/fastrest/api'

  export default {
    name: 'DocShow',
    components: {
      ResponseArgsVue,
      RequestArgsVue,
      RequestHeadersVue,
      ResponseHeadersVue
    },
    props: ["restInfoVO","restInfo"],
    data () {
      return {
        fileName: '',
        content:{
          "requestMethod": "GET",
          "dataType": "JSON",
          "contentType": "JSON",
          "requestArgs": [
            {
              "id": "dwrkzk",
              "require": "true",
              "children": [],
              "type": "number",
              "name": "id",
              "description": "主键",
              "defaultValue": 1
            },
            {
              "id": "v2kd4k",
              "require": "true",
              "children": [],
              "type": "string",
              "name": "name",
              "defaultValue": "raoifeng",
              "description": "用户名"
            },
            {
              "id": "weu5m7",
              "require": "true",
              "children": [],
              "type": "array[string]",
              "name": "type",
              "defaultValue": "1,2,3",
              "description": "测试数据"
            }
          ],
          "requestHeaders": [],
          "responseHeaders": [],
          "responseArgs": [
            {
              "id": "o33kz3",
              "require": "true",
              "children": [],
              "type": "string",
              "name": "username",
              "description": "姓名"
            },
            {
              "id": "nothhk",
              "require": "true",
              "children": [],
              "type": "string",
              "name": "password",
              "description": "密码"
            },
            {
              "id": "3wta5s",
              "require": "true",
              "children": [
                {
                  "id": "bc0u4r",
                  "require": "true",
                  "type": "string",
                  "children": [],
                  "name": "name",
                  "description": "姓名"
                },
                {
                  "id": "rdkems",
                  "require": "true",
                  "type": "string",
                  "children": [],
                  "name": "age",
                  "description": "年龄"
                },
                {
                  "id": "cqg8ya",
                  "require": "true",
                  "type": "array[string]",
                  "children": [],
                  "name": "phones",
                  "description": "电话[可以有多个]"
                },
                {
                  "id": "uipqxd",
                  "require": "true",
                  "type": "string",
                  "children": [],
                  "name": "image",
                  "description": "照片"
                }
              ],
              "type": "array[object]",
              "name": "users",
              "description": "用户列表"
            }
          ],
          "url": "",
          "status": "有效",
          "description": "",
          "ignoreGHttpReqArgs": false ,
          "reqExample":{"req":"aaaa"},
          "resExample":{"res":"bbbb"}
        },
        doc:{
          id:'testdoc01'
        },
        flag:{
          headers: [],
          requests: [],
          responses: [],
          tab:'body',
          resp: 'body',
        },
        attachs:[],
        /* importValue:{
          "xAxis": {
            "type": "category",
            "data": [
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
              "Sun"
            ]
          },
          "yAxis": {
            "type": "value"
          },
          "series": [
            {
              "data": [
                120,
                200,
                150,
                80,
                70,
                110,
                130
              ],
              "type": "bar"
            }
          ]
        }, */
        dialogFormVisible: false,
        jsonData: "",
        areaName: ""
      }
    },
    mounted() {
      if(this.restInfo.requestArgs != undefined) {
        this.$emit("listenArgs",this.restInfo.requestArgs);
      }
    },
    computed:{
      /* 请求头部数据 */
      formRequestHeader() {
        if(!this.restInfoVO.requestHeaderJson){
          return ;
        }
        let header = this.restInfoVO.requestHeaderJson;
        for(let key in header){
          let temp = this.doc.id + ':args:' + header[key].name;
          header[key].testValue = localStorage.getItem(temp);
        }
        header=this.headerPreview(header);
        return header;
      },

      /* 请求示例数据 */
      formRequestArgs() {
        if(!this.restInfoVO.requestMetaJson){
          return ;
        }
        let args = this.restInfoVO.requestMetaJson;

        for(let key in args){
          let temp = this.doc.id + ':args:' + args[key].name;
          args[key].testValue = localStorage.getItem(temp);
        }
        args=this.argsPreview(args);
        return args;
      },

      /* 响应头部数据 */
      formResponseHeader() {
        if(!this.restInfoVO.responseHeaderJson){
          return ;
        }
        let header = this.restInfoVO.responseHeaderJson;
        for(let key in header){
          let temp = this.doc.id + ':args:' + header[key].name;
          header[key].testValue = localStorage.getItem(temp);
        }
        header=this.headerPreview(header);
        return header;
      },

      /* 响应示例数据 */
      formResponseArgs() {
        if(!this.restInfoVO.responseMetaJson){
          return ;
        }
        let args = this.restInfoVO.responseMetaJson;
        for(let key in args){
          let temp = this.doc.id + ':args:' + args[key].name;
          args[key].testValue = localStorage.getItem(temp);
        }
        args=this.argsPreview(args)
        return args;
      }
    },
    methods: {
      /**附件上传**/
      fileUpload() {
        let filePath = this.$refs.fileInput.value;
        let arr = filePath.split('\\');
        this.fileName = arr[arr.length-1];
        let item = document.createElement("P");
        item.innerHTML = this.fileName;
        item.title = this.fileName;
        let itemSpan = document.createElement("SPAN");
        itemSpan.setAttribute("class","el-icon-close");
        itemSpan.onclick = this.closeItem;
        item.appendChild(itemSpan);
        this.$refs.filePath.appendChild(item);
      },
      editing() {

      },
      headerPreview(data) {
        let obj = this.getRequestHeaderObject(data);
        if (obj) {
          return JSON.stringify(obj, null, '\t');
        }
        return '{}';
      },
      argsPreview(data) {
        let obj = this.getRequestArgsObject(data);
        if (obj) {
          return JSON.stringify(obj, null, '\t');
        }
        return '{}';
      },
      getRequestHeaderObject(data) {
        if (!(data && data.forEach)) {
          return '';
        }
        let obj = {};
        data.forEach((d)=> {
          let name = d.name;
          obj[name] = d.testValue || d.defaultValue || '';
        });
        return obj;
      },
      getRequestArgsObject(data) {
        if (!(data && data.forEach)) {
          return '';
        }
        let obj = {};
        data.forEach((d)=> {
          let name = d.name;
          switch (d.type) {
            case 'string':
              obj[name] = d.testValue || d.defaultValue || '';
              break;
            case 'number':
              obj[name] = d.testValue || d.defaultValue || 0;
              break;
            case 'boolean':
              obj[name] = d.testValue || d.defaultValue;
              break;
            case 'object':
              obj[name] = this.getRequestArgsObject(d.children);
              break;
            case 'array':
              obj[name] = [];
              break;
            case 'array[number]':
              obj[name] = d.testValue || d.defaultValue;
              break;
            case 'array[boolean]':
              obj[name] = [true];
              break;
            case 'array[string]':
              obj[name] = [''];
              break;
            case 'array[object]':
              obj[name] = [this.getRequestArgsObject(d.children)];
              break;
            case 'array[array]':
              obj[name] = [[]];
              break;
            default:
              obj[name] = '';
              break;
          }
        });
        return obj;
      },
      parseImportData(data, temp) {
        if (data.constructor.name === 'Array') {
          let fullObj = {};
          data.forEach((d) => {
            if (d.constructor.name === 'Object') {
              for (let key in d) {
                fullObj[key] = d[key];
              }
            } else if (d.constructor.name === 'Array') {
              this.parseImportData(d, temp);
            }
          });
          this.parseImportData(fullObj, temp);
        } else if (data.constructor.name === 'Object') {
          for (let key in data) {
            let v = data[key];
            let t = {children: []};
            t.name = key;
            if (v !== undefined && v !== null) {
              if (v.constructor.name === 'Object') {
                t.type = 'object';
                this.parseImportData(v, t.children);
              } else if (v.constructor.name === 'Array') {
                t.type = this.getArrayValueType(v);
                if (t.type === 'array[object]') {
                  this.parseImportData(v, t.children);
                } /* else if (t.type === 'array[number]') {
                  this.parseImportData(v[0], t.children);
                  t.defaultValue = v;
                } */ else {
                  this.parseImportData(v[0], t.children);
                  t.defaultValue = v;
                }
              } else if (v.constructor.name === 'String') {
                t.type = 'string'
                t.defaultValue = v;
              } else if (v.constructor.name === 'Number') {
                t.type = 'number'
                t.defaultValue = v;
              } else if (v.constructor.name === 'Boolean') {
                t.type = 'boolean'
                t.defaultValue = v;
              }
            } else {
              t.type = 'string';
            }
            t.require = 'true';
            temp.push(t);
          }
        }
      },
      getArrayValueType(value) {
        let type = 'array';
        if (value.length > 0) {
          let name = value[0].constructor.name;
          if (name === 'Array') {
            type = 'array[array]';
          } else if (name === 'Object') {
            type = 'array[object]';
          } else if (name === 'String') {
            type = 'array[string]'
          } else if (name === 'Number') {
            type = 'array[number]'
          } else if (name === 'Boolean') {
            type = 'array[boolean]'
          }
        }
        return type;
      },
      closeItem(ev) {
        this.$refs.filePath.removeChild(ev.target.parentElement);
        if(this.$refs.filePath.innerHTML === "") {
          this.$refs.fileInput.value = "";
        }
      },
      newRow(type) {
        if(type ==='requestHeaderJson' || type ==='responseHeaderJson'){
          this.restInfoVO[type].push({id:utils.generateUID(),require:'true',children:[]});
        } else if(type ==='requestMetaJson' || type ==='responseMetaJson') {
          this.restInfoVO[type].push({id:utils.generateUID(),require:'true',children:[],type:'string'});
        }
        commons._initsort_(this,type);
      },
      importJSON(type) {
        this.areaName = type;
      },
      inputJson() {
        let data = null;
        try {
          data = JSON.parse(this.jsonData);
          this.dialogFormVisible = false;
        } catch (e) {
          alert('JSON格式有误');
          return;
        }
        let temp = [];
        this.parseImportData(data, temp);
        temp.forEach((d) => {
          this.restInfoVO[this.areaName].push(d);
        });
      },

      /* 跳转修改功能页面 */
      jumpEdit() {
        let editIdArr = window.location.pathname.split('/');
        let editId = editIdArr[editIdArr.length-1];
        this.$router.push("/api/edit/" + editId);
      },

      /* 保存功能 */
      onSubmit() {
        this.restInfo.requestHeader = this.formRequestHeader;
        this.restInfo.requestArgs = this.formRequestArgs;
        this.restInfo.responseHeader = this.formResponseHeader;
        this.restInfo.responseArgs = this.formResponseArgs;
        this.restInfo.requestMeta=JSON.stringify(this.restInfoVO.requestMetaJson);
        this.restInfo.responseMeta=JSON.stringify(this.restInfoVO.responseMetaJson);
        // console.log('restInfo==>',this.restInfo);
        addApi(this.restInfo).then(res => {
          if (res.code == 200){
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          } else {
            this.$message.error('保存失败');
          }
        });
        this.$emit("listenArgs",this.restInfo.requestArgs);
        // console.log("restInfo==>",this.restInfo);
      }
    },
  }
</script>

<style>
  .form {
    position: relative;
  }
  /* .to-edit {
    position: absolute;
    top: 0;
    left: 92%;
    z-index: 9;
  }
  .to-edit a {
    font-size: 14px;
  } */
  .item button {
    margin-right: 10px;
  }
  .doc-http-attach {
    width: 100%;
    overflow: hidden;
  }
  .doc-http-attach label {
    position: relative;
    display: block;
    width: 100%;
    height: 50px;
    border:1px dashed #dddddd;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 48px;
    color: #bebebe;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .doc-http-attach input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: pointer;
    opacity: 0;
  }
  .doc-http-attach .file-path {
    width: 100%;
  }
  .file-path p {
    width: 70px;
    height: 70px;
    box-sizing: border-box;
    line-height:16px;
    font-size: 12px;
    padding: 4px;
    display: inline-block;
    margin: 0 10px 0 0;
    background-color: #efefefda;
    word-wrap:break-word;
    position: relative;
    overflow:hidden;
    cursor: pointer;
  }
  .file-path p span {
    width: 15px;
    height: 15px;
    display: block;
    position: absolute;
    top: 3px;
    left: 57px;
    color: #333;
  }
  /* .input-json {
    width: 50%;
  }
  .input-json textarea{
    rows:5;
    cols:50;
  } */
  .form-header {
    display: none;
  }
</style>
