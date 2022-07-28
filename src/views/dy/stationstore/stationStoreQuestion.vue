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
            <el-option label="进行中" value="1"></el-option>
            <el-option label="提交OA" value="2"></el-option>
            <el-option label="已完结" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="触点类别：">
          <el-select v-model="queryParams.contactType" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="营业厅" value="营业厅"></el-option>
            <el-option label="装维随同" value="装维随同"></el-option>
            <el-option label="网格行销" value="网格行销"></el-option>
            <el-option label="政企集团随销" value="政企集团随销"></el-option>
            <el-option label="10086热线旁听" value="10086热线旁听"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工单主题：">
          <el-input v-model="queryParams.applyTheme" placeholder="工单主题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryStationStoreQuestion">查询</el-button>
          <el-button type="primary" @click="create">发起自发问题单</el-button>
        </el-form-item>
      </el-form>
      <div class="el-table el-table--enable-row-hover el-table--medium dy-table-wrap">
        <el-table v-loading="loading" :data="stationStoreData">
          <el-table-column label="工单主题" width="200" align="center" prop="applyTheme" />
          <el-table-column label="工单状态" align="center" prop="status"  :formatter="formatStatus" :show-overflow-tooltip="true" />
          <el-table-column label="线条" align="center" prop="applyLine"  :show-overflow-tooltip="true" />
          <el-table-column label="触点类型" align="center" prop="contactType"  :formatter="formatContactType" :show-overflow-tooltip="true" />
          <el-table-column label="问题类型" align="center" prop="sourceType" :show-overflow-tooltip="true" />
          <el-table-column label="创建时间" align="center" prop="createtime" :show-overflow-tooltip="true" />
<!--          <el-table-column label="受理时间" align="center" prop="sourceType" :show-overflow-tooltip="true" />-->
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button @click="applyDetail(scope.row,0)" type="text" size="small">查看</el-button>
<!--              <el-button @click="applyDetail(scope.row,1)" type="text" size="small">受理</el-button>-->
                  <el-button v-if="scope.row.status=='1'" @click="applyDetail(scope.row,1)" type="text" size="small">受理</el-button>
              <!--              <el-button v-if="scope.row.status=='1' || (scope.row.status=='3'&& scope.row.isProblemSolved!='是')" @click="applyDetail(scope.row,1)" type="text" size="small">受理</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNo"
          :limit.sync="queryParams.pageSize"
          @pagination="queryStationStoreQuestion"
        />
      </div>
    </div>
    <StationStoreQuestionDetail
      :status="status"
      :questionId ='questionId'
      :detailVisible="detailVisible"
      @closeDetail="closeDetail"
      @submitOa="submitOa"
      @goFlow="goFlow"/>
  </div>
</template>

<script>
  import {
    queryStationStoreQuestionInfoByPage,submitOA
  } from "@/api/stationstore/api";
  import StationStoreQuestionDetail from '@/views/dy/stationstore/stationStoreQuestionDetail';
  export default {
    data() {
      return {
        queryParams: {
          pageNo: 1,
          pageSize: 10,
          applyTheme: null,
          applyLine: null,
          status: null,
          contactType: null,
        },
        total:0,
        stationStoreData:[],
        detailVisible: false,
        questionId:'',
        status: 0 // 详情页面按钮状态 0 查看 1 归档
      }
    },
    components:{
      StationStoreQuestionDetail,
    },
    created() {
      this.queryStationStoreQuestion();
    },
    methods: {
      queryStationStoreQuestion(){
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
        if ( this.queryParams.contactType === null || this.queryParams.contactType === undefined || this.queryParams.contactType === "" ) {
          this.queryParams.contactType = null
        }
        queryStationStoreQuestionInfoByPage(this.queryParams).then((res) => {
          if (res.status == 200){
            this.stationStoreData =  (res.data && res.data.list) || [];
            this.total =parseInt((res.data && res.data.total)||0);
            this.loading = false;
          }
        });
      },
      // 详情
      applyDetail(item,status) {
        this.questionId = item.id;
        this.detailVisible = true;
        this.status = status;
      },
      // 提交oa
      submitOa(id) {
        submitOA(id).then((res) => {
          if (res.status == 200){
            this.$message({
              type: "success",
              message: "提交OA成功",
            });
            this.queryStationStoreQuestion();
          }else{
            this.$message({
              type: "error",
              message: "提交OA失败:"+res.message,
            });
          }
        });
      },
      // 新建
      create(){
        this.$router.push('stationStoreQuestionEdit/3/0/0')
      },
      closeDetail(){
        this.detailVisible = !this.detailVisible;
      },
      formatStatus(row){
        if(row.status=='1'){
          return '进行中'
        }else if(row.status=='2'){
          return '提交OA'
        }else{
          return '已完结'
        }
      },
      formatContactType(row){
        if(row.contactType==''||row.contactType==null){
          return '-'
        }else{
          return row.contactType
        }
      },
      goFlow(id,sourceType){
        let identyDetail;
        if(sourceType =='听音问题'){
          identyDetail='03'
        }else  if(sourceType =='站店问题'){
          identyDetail='02'
        }else {
          identyDetail='04'
        }
        this.$router.push('/add/03/0302/'+id);
        // this.$router.push({
        //   path: '/add',
        //   query: {
        //     // fromAudition: '1',
        //     // identyDetail: identyDetail,
        //     fileNo:id
        //   }
        // })
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
