<!-- 全景视图 -->
<template>
  <div class="dy-page-wrap unsatify-customer" style=" display:flex; flex-direction:column;">
    <div class="dy-container">
      <div class="content" v-loading="loading">
        <el-row :gutter="16">
          <el-col :span="6">
            <span class="label">客群名称：</span>
            <el-input placeholder="请输入关键字模糊查询" v-model="keyword" size="small" clearable></el-input>
          </el-col>
          <el-col :span="18" >
            <span class="label">创建时间：</span>
            <div style="position:relative; width:298px;">
              <el-date-picker
                size="small"
                v-model="createTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                range-separator="-"
                :picker-options="pickerOptions"
                :clearable="true"
                style="width:298px;">
              </el-date-picker>
              <img src='@/assets/images/riqi.png' style="position:absolute; right:10px; top:8px;">
            </div>
            <el-button size="small" type="primary" style="margin-left:16px;" @click="onQuery">查询</el-button>
          </el-col>
        </el-row>
        <div style="margin-bottom:16px;">
          <el-button type="primary" plain size="small" @click="gotoAddLink">新增客群</el-button>
        </div>

        <el-table
          element-loading-text="拼命加载中..."
          :header-cell-style="{
            background: '#f9f9f9',
            color: '#262626',
            fontSize: '14px',
            fontWeight: '400'
          }"
          :data="tableData"
          style="border: 1px solid #e1e1e1"
        >
            <el-table-column 
            prop="group_id" 
            label="客群编号" 
            align="center" 
            width="140" >
            </el-table-column>

            <el-table-column 
            prop="group_name" 
            label="客群名称" 
            align="center" 
            min-width="140" 
            width="auto" >
            </el-table-column>

            <el-table-column 
            prop="user_num" 
            label="用户数量" 
            align="center" 
            min-width="120" 
            width="auto" >
            </el-table-column>

            <el-table-column 
            prop="fix_num" 
            label="修复数量" 
            align="center" 
            min-width="120" 
            width="auto">
            </el-table-column>

            <el-table-column 
            prop="fix_rate" 
            label="修复率" 
            align="center" 
            width="230"
            min-width="230">
              <template slot-scope="scope">
                <Progress :data="scope.row.fix_rate"/>
              </template>
            </el-table-column>

            <el-table-column 
            prop="create_time" 
            label="创建时间" 
            align="center" 
            min-width="170"
            width="auto" >
            </el-table-column>

            <el-table-column label="操作" align="center" width="140" >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  style="font-size: 14px"
                  size="mini"
                  @click="gotoAnalysis(scope.row)"
                  >客群修复分析
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="
              height: 60px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              margin-top:10px;
            "
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Blank from '@/components/common/Blank';
import Progress from './components/Progress';
import { getCustomerList } from '@/api/dy/unsatifyAnalysis';


export default {
  name: "CustomerQuery",
  components:{
    Blank,
    Progress
  },
  data() {
    return {
      keyword:'',
      createTime:[],
      currentPage:1,
      pageSize:10,
      total:0,
      tableData:[
        /*{
          create_time:"2022-07-15 17:19:10",
          fix_num:"33",
          fix_rate:"75",
          group_id:"1",
          group_name:"测试客户群",
          user_num:"111"
        }*/
      ],
      loading:false,
      queryForm: {
        name: '',
        start: '',
        end: '',
        pageNum: 1,
        pageSize: 10
      },

      cityId: sessionStorage.getItem('cityId'),

      pickerOptions:{
        disabledDate:(date)=>{
          return date.getTime() > new Date().getTime();
        }
      }
    };
  },
  
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1;
      this.queryForm.pageNum = 1;
      this.queryForm.pageSize = val;
      this.getData();
    },

    handleCurrentChange(val) {
      this.queryForm.pageNum = val;
      this.getData();
    },

    // 客群修复分析
    gotoAnalysis(row) {
      this.$router.push({
        name:'CustomerAnalysis',
        params: {
          id: row.group_id
        }
      })
    },

    // 查询
    onQuery() {
      this.currentPage = 1;
      this.setQueryForm();
      this.getData();
    },

    setQueryForm() {
      this.queryForm = {
        name: this.keyword,
        start: this.createTime && this.createTime.length ? this.createTime[0] : '',
        end: this.createTime && this.createTime.length ? this.createTime[1] : '',
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        cityId: this.cityId
      }
    },

    getData() {
      // 调用查询接口
      this.loading = true;
      getCustomerList(this.queryForm)
      .then(res=>{
        if(res.records) {
          this.tableData = res.records;
          this.total = res.total;
        }
      })
      .finally(()=>{
        this.loading = false;
      })
    },

    gotoAddLink() {
      this.$confirm('前往标签库创建客群时，请创建“一次性客群”，否则后台无法计算客群信息。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // console.log('跳转标签库');
        setTimeout(()=>{
           window.open("http://10.68.76.66/loc/#label/label_market?withoutIframe=true&ailk_autoLogin_userId=ED2705F227C3C80B");
         },200)
       
      }).catch(() => {
        
      });
    }
  },

  mounted() {
    this.setQueryForm();
    this.getData();
  }
};
</script>

<style lang="scss">
.unsatify-customer {

  .content {
    width: 100%; 
    height: auto; 
    min-height:500px;
    background: #fff; 
    margin-top: 14px;
    padding: 0 24px;
    padding-bottom:10px;
    box-sizing:border-box;
  }

  .el-col {
    display:flex;
    align-items:center;
    margin: 24px 0 16px 0;

    .label {
      display:inline-block;
      width:80px;
      min-width:80px;
      font-size:14px;
      color:#262626;
    }
  }

  .el-date-editor .el-range__icon {
    display: none;
  }

  .el-date-editor .el-range__close-icon {
    position: absolute;
    right:24px;
    top:3px;
  }

  .el-range-editor--small .el-range-input {
    margin-top: 2px;
  }


  .el-date-editor .el-range-separator {
    padding:0px
  }

}

</style>

