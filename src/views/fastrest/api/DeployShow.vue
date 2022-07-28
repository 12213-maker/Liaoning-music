<template>
  <div id="doc">
    <div id="api-edit-details">
      <div id="api-edit-content" class="form">
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
        <ul uk-tab>
          <li v-on:click="flag.demoShow='request'"><a>请求参数(示例)</a></li>
          <li class="uk-active" v-on:click="flag.demoShow='response'"><a>响应结果(示例)</a></li>
        </ul>
        <div class="item"  v-cloak v-show="flag.demoShow=='request'">
          <editor
            @init="editorInit"
            v-model="restInfo.requestArgs"
            width="100%"
            height="300"
            @input="inputJson"
            :lang="'json'">
          </editor>
        </div>
        <div class="item" v-cloak v-show="flag.demoShow=='response'">
          <editor
            @init="editorInit"
            v-model="restInfo.responseArgs"
            width="100%"
            height="300"
            @input="inputJson"
            :lang="'json'"
          >
          </editor>
        </div>

        <ul uk-tab>
          <li class="uk-active" ><a>模板编辑</a></li>
        </ul>
        <div class="item">
          <editor
            @init="editorInit"
            v-model="restInfo.tpl.template"
            width="100%"
            height="300"
            @input="inputJson"
            :lang="'json'"
          >
          </editor>
        </div>

        <ul uk-tab>
          <li class="uk-active"><a>变量配置</a></li>
        </ul>
        <div class="rest-sql"  v-cloak>
          <el-button class="add-btn"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd">新增</el-button>
          <div class="rest-interface" v-for="(item,index) in restInfo.sqls" :key="index">
            <div class="rest-sql-head-info">
              <i class="arrow-icon el-icon-caret-right"
                 @click="handleDisplay(index)"
                 ref="arrowBtn"></i>
              <el-form
                ref="sqlForm"
                :model="item"
                size="mini"
                :disabled="parame[index] === undefined ? true : parame[index]"
                :rules="rules">
                <el-form-item label="变量名称：" class="var-name" prop="varName">
                  <el-tooltip effect="dark" content="Top Center 提示文字" placement="top-start">
                    <i class="question-icon el-icon-question"></i>
                  </el-tooltip>
                  <el-input v-model="item.varName" @blur="judgeVarName"></el-input>
                </el-form-item>
                <el-form-item label="排序号：" class="sn">
                  <el-input v-model="item.sn"></el-input>
                </el-form-item>
                <el-form-item label="变量类型：" class="var-type" prop="varType">
                  <el-select v-model="varTypes[index]">
                    <el-option
                      v-for="items in options"
                      :key="items.value"
                      :label="items.label"
                      :value="items.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="变量结果是否存入map：" class="result-type" prop="resultType">
                  <el-select v-model="resultTypes[index]">
                    <el-option
                      v-for="items in resultOptions"
                      :key="items.value"
                      :label="items.label"
                      :value="items.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="edit-btn">
                <button @click="handleEdit(index)">编辑 </button> |
                <button @click="handleMore(index)">
                  更多
                  <span class="iconfont iconarrow_down"></span>
                </button>
                <div class="more-choose" ref="more" @mouseleave="closeMore(index)">
                  <button @click="handleCopy(index)">复制</button>
                  <button @click="handleDel(index)">删除</button>
                </div>
              </div>
            </div>
            <div class="rule-type" ref="ruleType">
              <el-form ref="item" :model="item" :rules="rules" label-width="100px" size="mini">
                <el-form-item label="规则配置：" prop="sqlTpl">
                  <el-input type="textarea" v-model="item.sqlTpl"></el-input>
                </el-form-item>
                <el-form-item label="备注：" class="remark">
                  <el-input type="textarea" v-model="item.remark" ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>

      <div class="base-btn">
        <el-row>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {getApi,updateApi,delSql} from "@/api/fastrest/api";
import {listDir} from "@/api/fastrest/dir"
export default {
  name: 'DeployShow',
  components: {
    editor: require('vue2-ace-editor'),
  },
  props: ["restInfoVO","restInfo","varTypeNum","resultTypeNum"],
  data() {
    return {
      flag:{
        demoShow:"response"
      },
      parame: {},
      resultTypes: [],
      rules: {
        restName: { required: true, message: '请输入接口名称', trigger: 'blur' },
        restCode: { required: true, message: '请输入接口编码', trigger: 'blur' },
        dirCode: { required: true, message: '请选择所属目录', trigger: 'blur' },
        method: { required: true, message: '请输入接口方法', trigger: 'blur' },
        request: { required: true, message: '请输入请求参数样例', trigger: 'blur' },
        response: { required: true, message: '请输入响应结果样例', trigger: 'blur' },
        system: { required: true, message: '请输入归属系统', trigger: 'blur' },
        template: { required: true, message: '请输入响应结果JSON模版', trigger: 'blur' },
        sqlTpl: { required: true, message: '请输入规则配置', trigger: 'blur' },
        varName: { required: true, message: '请输入变量名称', trigger: 'blur' },
        varType: { required: true, message: '请选择变量类型', trigger: 'blur' },
        resultType: { required: true, message: '请确定变量结果是否存入map', trigger: 'blur' }
      },
      options: [{
        value: 1,
        label: '单个值(str),如:34'
      }, {
        value: 2,
        label: '单数组(str),如:[1,2,3]'
      }, {
        value: 3,
        label: '数组集合(str),如:[[1,3,5],[2,4,6]]'
      }, {
        value: 4,
        label: '单个对象(obj),如:{"name":"中国","code":"ai"}'
      }, {
        value: 5,
        label: '多个对象(obj)，如:[{},{}]'
      }, {
        value: 6,
        label: '单列转数组(str),如["34","56"]'
      }, {
        value: 7,
        label: '键值对象(obj),如{"userName":"中国","code":"ai"}'
      }, {
        value: 8,
        label: '单个对象(str),如:"{\'name\':\'中国\',\'code\':\'ai\'}"'
      }, {
        value: 9,
        label: '多个对象(str)，如:"[{},{}]"'
      }],
      resultOptions: [{
        value: 0,
        label: "否"
      },{
        value: 1,
        label: "是"
      }],
      varTypes: []
    }
  },
  watch: {
    varTypeNum() {
      if(this.varTypeNum) {
        this.varTypeNum.filter((val) => {
          this.judgeVarType(val);
        });
      }
    },
    resultTypeNum() {
      if(this.resultTypeNum) {
        this.resultTypeNum.filter((val) => {
          this.judgeResultType(val);
        });
      }
    }
  },
  methods: {
    editorInit() {
      require('brace/ext/language_tools') //language extension prerequsite...
      require("brace/theme/eclipse");
      require("brace/mode/json");
      require("brace/mode/text");
      require("brace/mode/html");
      require("brace/mode/xml");
      require("brace/mode/javascript");
      require('brace');
      require('brace/theme/chrome')
      require('brace/snippets/json')
      require('brace/snippets/html')
    },
    inputJson() {

    },
    /*获取目录列表*/
    getDirList(){
      listDir().then(res=>{
        if (res.code == 200){
          for (let i = 0;i<res.data.length;i++){
            this.dir = res.data[i];
            this.dirList.push(this.dir);
          }
        }
      })
    },
    /* 保存按钮操作 */
    onSubmit() {
      let restInfo = this.deepCopy(this.restInfo);
      this.varTypes.filter((val,index)=>{
        if(typeof(val) === "number") {
          restInfo.sqls[index].varType = val;
        }
      });
      this.resultTypes.filter((val,index)=>{
        if(typeof(val) === "number") {
          restInfo.sqls[index].resultType = val;
        }
      });
      console.log('restINFO==>',restInfo);

      updateApi(restInfo).then((res)=>{
        if(res.code === 200) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          Object.keys(this.parame).forEach((key)=>{
            this.parame[key] = true;
          })
        }else {
          this.$message.error('更新失败');
        }
      });
    },
    /* 显示“规则配置”操作 */
    handleDisplay(index) {
      if(this.$refs.ruleType[index].className === "rule-type") {
        this.$refs.ruleType[index].style.display = "block";
        this.$refs.arrowBtn[index].style.transform = "rotate(90deg)";
        this.$refs.ruleType[index].className = "rule-type display-type";
        // this.$refs.arrowBtn[index].className = "el-icon-caret-right";
      } else {
        this.$refs.ruleType[index].style.display = "none";
        this.$refs.arrowBtn[index].style.transform = "rotate(0deg)";
        this.$refs.ruleType[index].className = "rule-type";
        // this.$refs.arrowBtn[index].className = "el-icon-caret-down";
      }
    },
    /* 修改接口变量配置操作 */
    handleEdit(index) {
      if(this.parame[index]){
        this.parame[index] = !this.parame[index];
      }else{
        this.$set(this.parame,index,false);
      }
    },
    /* 接口变量配置显示“更多”操作 */
    handleMore(index) {
      this.$refs.more.filter((val)=>{
        val.className = "more-choose";
        val.style.display = "none";
      });
      if(this.$refs.more[index].className === "more-choose") {
        this.$refs.more[index].style.display = "block";
        this.$refs.more[index].className = "more-choose display-type";
      } else {
        this.$refs.more[index].style.display = "none";
        this.$refs.more[index].className = "more-choose";
      }
    },
    /* 接口变量配置新增操作 */
    handleAdd() {
      let sql = {
        id: null,
        varName: "",
        sn: null,
        varType: null,
        remark: "",
        sqlTpl: ""
      }
      this.restInfo.sqls.push(sql);
      this.handleEdit(this.restInfo.sqls.length-1);
    },
    /* 接口变量配置删除操作 */
    handleDel(index) {
      this.$confirm('是否确认删除变量名为"' + this.restInfo.sqls[index].varName + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning"
      }).then(()=>{
        if(this.restInfo.sqls[index].id) {
          delSql(this.restInfo.sqls[index].id).then((res)=>{
            if(res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.restInfo.sqls.splice(index,1);
            }else {
              this.$message.error('删除失败');
            }
          })
        }else{
          this.restInfo.sqls.splice(index,1);
        }
      }).catch(() => {});
      this.$refs.more[index].style.display = "none";
    },
    /* 接口变量配置复制操作 */
    handleCopy(index) {
      let sql = this.deepCopy(this.restInfo.sqls[index]);
      sql.id = null;
      this.judgeVarType(sql.varType);
      this.judgeResultType(sql.resultType);
      this.restInfo.sqls.push(sql);
      this.handleEdit(this.restInfo.sqls.length-1);
      this.$refs.more[index].style.display = "none";
    },
    /* 深拷贝 */
    deepCopy(obj) {
      let newObj = Array.isArray(obj)?[]:{};
      if(obj && typeof obj === "object") {
        for(let key in obj) {
          if(obj[key] && typeof obj[key] === "object") {
            newObj[key] = this.deepCopy(obj[key]);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      return newObj;
    },
    /* 判断varType的值 */
    judgeVarType(num) {
      if(num === 1) {
        this.varTypes.push('单个值(str),如:34');
      } else if(num === 2) {
        this.varTypes.push('单数组(str),如:[1,2,3]');
      } else if(num === 3) {
        this.varTypes.push('数组集合(str),如:[[1,3,5],[2,4,6]]');
      } else if(num === 4) {
        this.varTypes.push('单个对象(obj),如:{"name":"中国","code":"ai"}');
      } else if(num === 5) {
        this.varTypes.push('多个对象(obj)，如:[{},{}]');
      } else if(num === 6) {
        this.varTypes.push('单列转数组(str),如["34","56"]');
      } else if(num === 7) {
        this.varTypes.push('键值对象(obj),如{"userName":"中国","code":"ai"}');
      } else if(num === 8) {
        this.varTypes.push('单个对象(str),如:"{\'name\':\'中国\',\'code\':\'ai\'}"');
      } else if(num === 9) {
        this.varTypes.push('多个对象(str)，如:"[{},{}]"');
      }
    },
    /* 判断resultType的值 */
    judgeResultType(num) {
      if(num === 0) {
        this.resultTypes.push("否");
      } else if(num === 1) {
        this.resultTypes.push("是");
      }
    },
    /* 判断varName */
    judgeVarName() {
      let sqlsArr = [];
      this.restInfo.sqls.filter((val)=>{
        sqlsArr.push(val.varName);
      })
      sqlsArr.filter((value)=>{
        if(sqlsArr.indexOf(value) != sqlsArr.lastIndexOf(value)) {
          this.$confirm('数据项中有重复变量名称，请删除或修改重复变量名称的数据项', "警告", {
            confirmButtonText: "确定",
            closeOnClickModal: false,
            type: "warning"
          }).then(()=>{}).catch(()=>{});
        }
      })
    },
    /* 关闭更多弹框 */
    closeMore(index) {
      this.$refs.more[index].style.display = "none";
    },
    /* 查看varType数据 */
    handleSqls() {
      // console.log('restInfo==>',this.restInfo);
    },

  }
}
</script>
