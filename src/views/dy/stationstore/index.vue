<template>
  <div class="dy-page-wrap">
    <div class="dy-container">
      <el-form :inline="true" :model="queryParams" style="text-align: right">
        <el-form-item label="线条：">
          <el-select v-model="queryParams.applyLine" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="市场" value="市场"></el-option>
            <el-option label="网络" value="网络"></el-option>
            <el-option label="政企" value="政企"></el-option>
            <el-option label="服务" value="服务"></el-option>
            <el-option label="综合" value="综合"></el-option>
            <el-option label="支撑" value="支撑"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工单状态：">
          <el-select v-model="queryParams.status" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="进行中" value="0"></el-option>
            <el-option label="归档" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工单主题：">
          <el-input v-model="queryParams.applyTheme" placeholder="工单主题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryStationStore">查询</el-button>
          <el-button type="primary" @click="create">发起站店申请单</el-button>
        </el-form-item>
      </el-form>
      <div class="el-table el-table--enable-row-hover el-table--medium dy-table-wrap">
        <el-table v-loading="loading"  :data="stationStoreData">
          <el-table-column label="工单主题" width="200" align="center" prop="applyTheme" />
          <el-table-column label="工单状态" align="center" prop="status" :formatter="formatStatus" :show-overflow-tooltip="true" />
          <el-table-column label="线条" align="center" prop="applyLine"  :show-overflow-tooltip="true" />
          <el-table-column label="创建时间" align="center" prop="createtime" :show-overflow-tooltip="true" />
          <el-table-column label="归档时间" align="center" prop="modifytime" :show-overflow-tooltip="true" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button @click="applyDetail(scope.row,0)" type="text" size="small">查看</el-button>
              <el-button v-if="scope.row.status=='0'" @click="applyDetail(scope.row,1)" type="text" size="small">归档</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNo"
          :limit.sync="queryParams.pageSize"
          @pagination="queryStationStore"
        />
      </div>

  </div>
    <el-dialog :title="status==1?'站店申请单归档':'站店申请单详情'" :visible.sync="detailVisible" width="800px">
      <el-form :model="applyForm" :rules="rules" ref="archiveForm" label-width="150px" style="width: 750px;">
        <el-form-item label="姓名:" prop="applyPersonName">
          <el-col :span="6">
            <span>{{applyForm.applyPersonName}}</span>
          </el-col>
          <el-col class="line" :span="6">
            <label class="el-form-item__label" style="float: right">所属区域：</label>
          </el-col>
          <el-col :span="12">
            <span>{{applyForm.applyPersonProvince}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="所在部门:">
          <el-col :span="6">
            <span>{{applyForm.applyPersonDept}}</span>
          </el-col>
          <el-col class="line" :span="6">
            <label class="el-form-item__label" style="float: right">所在职位：</label>
          </el-col>
          <el-col :span="12">
            <span>{{applyForm.applyPersonDuty}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="线条:" prop="applyLine" required>
          {{applyForm.applyLine}}
<!--          <el-radio-group v-model="applyForm.applyLine">-->
<!--            <el-radio label="市场"></el-radio>-->
<!--            <el-radio label="网络"></el-radio>-->
<!--            <el-radio label="政企"></el-radio>-->
<!--            <el-radio label="服务"></el-radio>-->
<!--            <el-radio label="综合"></el-radio>-->
<!--            <el-radio label="支撑"></el-radio>-->
<!--          </el-radio-group>-->
        </el-form-item>
        <el-form-item label="主题:" prop="applyTheme" required>
          {{applyForm.applyTheme}}
<!--          <el-input v-model="applyForm.applyTheme"  placeholder="请填写主题" style="width: 60%;"></el-input>-->
        </el-form-item>
        <el-form-item label="需求处理时间:" prop="applyTime" required>
          {{applyForm.applyTime}}
<!--          <el-date-picker type="date" placeholder="请选择日期" v-model="applyForm.applyTime" value-format="yyyy-MM-dd" style="width: 60%;"></el-date-picker>-->
        </el-form-item>
        <el-form-item label="触点信息:" prop="contactInfo">
          {{applyForm.contactInfo}}
<!--          <el-input v-model="applyForm.contactInfo" @focus="openContactDialog"  placeholder="触点信息"></el-input>-->
        </el-form-item>
        <el-form-item label="目标:" prop="target">
          {{applyForm.target}}
<!--          <el-input type="textarea" v-model="applyForm.target" rows="5"></el-input>-->
        </el-form-item>
        <el-form-item  v-if='applyForm.status==1' label="工单处理意见:" prop="handlingOpinion">
          {{applyForm.handlingOpinion}}
        </el-form-item>
        <el-form-item  v-if='applyForm.status==1' label="工单处理人:" prop="handler">
          {{applyForm.handler}}
        </el-form-item>
        <el-form-item  v-if='applyForm.status==1' label="处理人联系方式:" prop="handlerInfor">
          {{applyForm.handlerInfor}}
        </el-form-item>
        <el-form-item  v-if='status==1' label="工单处理意见:" prop="handlingOpinion">
          <el-input type="textarea" v-model="applyForm.handlingOpinion" rows="5"  placeholder="请填写工单处理意见" ></el-input>
        </el-form-item>
        <el-form-item  v-if='status==1' label="工单处理人:" prop="handler">
            <el-input v-model="applyForm.handler"  placeholder="请填写工单处理人" style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item  v-if='status==1' label="处理人联系方式:" prop="handlerInfor">
          <el-input v-model="applyForm.handlerInfor"  placeholder="请填写处理人联系方式" style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item v-if='status==1'>
          <el-button  type="primary" @click="createApplyQuestion(applyForm)" size="small">创建问题工单</el-button>
          <el-button  type="primary" @click="applyArchive(applyForm)"  size="small">归档</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="close()">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {
    queryStationStoreApplyInfoByPage,stationStoreApplyArchive,getStationStoreDetail
  } from "@/api/stationstore/api";
  import sessionStorage from "js-cookie";

  export default {
    components:{},
    data() {
      return {
        queryParams: {
          pageNo: 1,
          pageSize: 10,
          applyTheme: null,
          applyLine: null,
          status: null,
        },
        total:0,
        stationStoreData:[],
        detailVisible: false,
        applyForm:[],
        rules: {
          handlingOpinion: [
            { required: true, message: '请填写工单处理意见', trigger: 'blur' }
          ],
          handler: [
            { required: true, message: '请填写工单处理人', trigger: 'blur' }
          ],
          handlerInfor: [
            { required: true, message: '请填写处理人联系方式', trigger: 'blur' }
          ],
        },
        status: 0 // 详情页面按钮状态 0 查看 1 归档
      }
    },
    created() {
      this.queryStationStore();
    },
    methods: {
      queryStationStore(){
        this.loading = true;
        if ( this.queryParams.applyTheme === null || this.queryParams.applyTheme === undefined || this.queryParams.applyTheme === "" ) {
          this.queryParams.applyTheme = null
        }
        if ( this.queryParams.applyLine === null || this.queryParams.applyLine === undefined || this.queryParams.applyLine === "" ) {
          this.queryParams.applyLine = null
        }
        if ( this.queryParams.status === null || this.queryParams.status === undefined || this.queryParams.status === "" ) {
          this.queryParams.status = null
        }
        queryStationStoreApplyInfoByPage(this.queryParams).then((res) => {
          if (res.status == 200){
            this.stationStoreData = res.data.list || [];
            this.total =parseInt(res.data.total && res.data.total||0);
            this.loading = false;
          }
        });
      },
      //详情/归档弹出
      applyDetail(item,status) {
        this.status = status
        getStationStoreDetail(item.id).then((res) => {
          if (res.status == 200){
            this.applyForm = res.data;
            this.applyForm.contactInfo = res.data.contactCity+'/'+res.data.contactCounty+'/'+res.data.contactType+'/'+res.data.contactName+'/'
              +res.data.contactPerson+'/'+res.data.contactPersonDuty+'/'+res.data.contactPersonTelephone+'/'+res.data.contactPersonEmail;
            this.loading = false;
            this.detailVisible = true;
            this.applyForm.handler = res.data.contactPerson?res.data.contactPerson:'';
            this.applyForm.handlerInfor = res.data.contactPersonTelephone?res.data.contactPersonTelephone:'';
            // this.initDept();
          }
        });
      },
      // 关闭详情
      close() {
        this.detailVisible = false;
      },
      // 归档
      applyArchive(item) {
        this.$refs["archiveForm"].validate((valid) => {
          if (valid) {
            this.detailVisible = false;
            const params ={};
            params.id = item.id;
            params.handlingOpinion =  this.applyForm.handlingOpinion;
            params.handler =  this.applyForm.handler;
            params.handlerInfor =  this.applyForm.handlerInfor;
            stationStoreApplyArchive(params).then((res) => {
              if (res.status == 200){
                // this.stationStoreData = res.data.list;
                // this.total = res.data.total;
                this.$message({
                  type: "success",
                  message: "归档成功",
                });
                this.queryStationStore();
              }else{
                this.$message({
                  type: "error",
                  message: "归档失败:"+res.message,
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      // 创建问题工单
      createApplyQuestion(item) {
        this.detailVisible = false;
        this.$router.push('stationStoreQuestionEdit/2/0/'+item.id);

      },
      // 新建
      create(){
        this.$router.push('stationStoreEdit/' + 0)
      },
      initDept(){
        const dept = JSON.parse((window.sessionStorage.getItem("dept") || '{"oaCode":"","oaName":"","deptName":"","provinceCity":"","duty":""}'));
        this.applyForm.applyPersonUserCode = dept.oaCode &&dept.oaCode;
        this.applyForm.applyPersonName = dept.oaName &&  dept.oaName;
        this.applyForm.applyPersonDept = dept.deptName &&  dept.deptName;
        this.applyForm.applyPersonDuty = dept.duty &&  dept.duty;
        this.applyForm.applyPersonProvince = dept.provinceCity && dept.provinceCity;
      },
      formatStatus(row){
        if(row.status=='0'){
          return '进行中'
        }else{
          return '归档'
        }
      }
    }
  }
</script>

<style scoped>
.dy-table-wrap {
  padding: 30px;
  background: #ffffff;
}
</style>
