<template>
  <div class="order" style="height: 100%; width: 100%; overflow: auto; background: #f5f5f5;">
    <WorkflowTable></WorkflowTable>
  </div>
</template>

<script>
import './styles/order.css';
// import {workflowListCount} from '@/api/workflow/index';
import WorkflowTable from './components/WorkflowTable/index.vue';

export default {
  name: 'Workflow',
  components:{
    WorkflowTable
  },

  computed :{
    computedrHeader() {
      return this.headerArr.filter((item) => item.visible);
    }
  }
};
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  padding: 0px 48px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: center;
  .card{
    width:25%;
    height: 104px;
    padding: 16px;
    .content{
      height: 100%;
      display: flex;
      justify-content: space-between;
      // &:hover{
      //    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      // }
     
      .card_left{
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 40%;
          background: #ffffff;
          img{
            align-self: center;
          }
        }
        .card_right{
          width: 60%;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          span{
            height: 22px;
            font-size: 14px;
            font-family: SourceHanSansSC-Regular, SourceHanSansSC;
            font-weight: 400;
            color: #262626;
            line-height: 22px;
            display: block;

          }
          .num {
            font-weight: 400;
            line-height: 22px;
            font-size: 24px;
            margin-top: 8px;
          }
        } 
      
      } 
  }
}
.workflow_table{
  .el-tabs__item.is-active{
    color: #262626;
    font-weight: 500;
  }
}
.title-type {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  line-height: 24px;
  box-sizing: border-box;
  font-family: SourceHanSansSC-Medium;
  font-size: 16px;
  color: #262626;
  letter-spacing: -0.39px;
  background: #ffffff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.03);
}

</style>