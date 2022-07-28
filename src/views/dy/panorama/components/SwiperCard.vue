<!-- 网络洞察 -->
<template>
  <div class="carousel-card-wrap">
    <!-- <div v-show='carouselLists.length' style="height:100%; position:relative;" >
      <div class="card-wrap">
        <div 
        v-for="(indexItem,idx) in carouselLists[activeIdx].data" 
        :key='idx' 
        class="card"
        :style="{borderBottom:idx==6||idx==7||idx==8||idx==13||idx==12||idx==14?'0px':'border-bottom: 1px dashed #d5d5d5'}" 
        @click="onCardClick(indexItem)">
            <div class="text-wrap"
            :class="indexItem.target_id==activeId?'active':''" 
            v-if="indexItem.target_name">
              <p 
              class="title"
              :class="idx==0?'level1':(idx==7||idx==8||idx==10||idx==11?'level3':'level2')" >
                {{indexItem.target_name}}
              </p>
              <div style="width:100%; display:flex; height:40px; justify-content:space-between;">
                <div class="detail-wrap">
                  <p>投诉总量：{{indexItem.score}}</p>
                  <p>万投比：{{indexItem.investbasis}}</p>
                </div>

                <div class="detail-wrap">
                  <p>环比：<Arrow :num='Number(indexItem.momrate)':isUpset="true"/></p>
                  <p>环比：<Arrow :num='Number(indexItem.yearbasis)':isUpset="true"/></p>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div class="pointer-wrap">
        <a :style="{background:activeIdx==0?'#ff9900':'#DFDFDF',marginRight:'20px'}" @click="onChange(0)"></a>
        <a :style="{background:activeIdx==1?'#ff9900':'#DFDFDF'}" @click="onChange(1)"></a>
      </div>

    </div> -->

    <el-carousel 
    v-show='carouselLists.length'
    trigger="click" 
    :autoplay='false' 
    style="height:100%" 
    arrow='never' 
    @change="onChange">
      <el-carousel-item v-for="(item,index) in carouselLists" :key="index">
        <el-scrollbar wrap-style="overflow-x:hidden;" style="height:100%;">
          <div class="card-wrap">
            <div 
            v-for="(indexItem,idx) in item.data" 
            :key='idx' 
            class="card"
            :style="{borderBottom:idx==6||idx==7||idx==8||idx==13||idx==12||idx==14?'0px':'border-bottom: 1px dashed #d5d5d5'}" 
            @click="onCardClick(indexItem)">
                <div class="text-wrap"
                :class="indexItem.target_id==activeId?'active':''" 
                v-if="indexItem.target_name">
                  <p 
                  class="title"
                  :class="idx==0?'level1':(idx==7||idx==8||idx==10||idx==11?'level3':'level2')" >
                    {{indexItem.target_name}}
                  </p>
                  <div style="width:100%; display:flex; height:40px; justify-content:space-between;">
                    <div class="detail-wrap">
                      <p>投诉总量：{{indexItem.score}}</p>
                      <p>万投比：{{indexItem.investbasis}}</p>
                    </div>

                    <div class="detail-wrap">
                      <p>环比：<Arrow :num='Number(indexItem.momrate)':isUpset="true"/></p>
                      <p>环比：<Arrow :num='Number(indexItem.yearbasis)':isUpset="true"/></p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </el-scrollbar>
      </el-carousel-item>
    </el-carousel>
    <Blank v-show='carouselLists.length.length==0' />
  </div>
</template>

<script>
import Blank from '@/components/common/Blank';
import Arrow from '@/components/common/arrow2';

export default {
  name:'SwiperCard',
  props:['carouselLists','selectTargetId'],

  components:{
    Blank,
    Arrow
  },

  data () {
      let _this = this;
      return {
        show: true,
        activeId:'',
        currentActive:null,
        activeIdx:0,
      }
  },

  watch:{
    carouselLists:{
      deep:true,
      handler(val,oldval){
        if(val[0].data.length!=0) {
          if(!this.activeId) {
            this.activeId = val[0].data[0].target_id;
            this.currentActive = val[0].data[0];
          }
          this.$emit('onActiveCardChange',this.currentActive);
        } else {
          this.$emit('onActiveCardChange');
        }
        
      }
    }
  },
  
  methods: {
    onCardClick(item) {
      if(item.target_name) {
        this.activeId = item.target_id;
        this.currentActive = item;
        this.$emit('onActiveCardChange',item);
      }
    },

    onChange(idx) {
      this.activeIdx = idx;
      this.$emit('swiperChange',idx)
    }
  },

  created(){
  },

  mounted(){
  },
};

</script>
<style lang='scss'>
  @import '~@/assets/styles/variables.scss';
  .carousel-card-wrap {
    box-sizing:border-box;
    width:100%; 
    height:100%;

    .pointer-wrap {
      width:100%; 
      display:flex; 
      justify-content:center; 
      align-items:center; 
      height:40px; 
      bottom:0px; 
      position:absolute;

      a {
        width:16px; 
        height:16px; 
        border-radius:12px;
      }
    }
    

    h1,h2,h3,h4,h5,p {
      margin:0px;
    }

    h1,h2,h3,h4,h5 {
      font-family: syhtMedium;
      -font-weight:normal;
    }

    .el-carousel__container {
      height: 100%;
    }

    .el-carousel__button {
      width: 16px; 
      height: 16px;
      border-radius: 16px;
      background: #BFBFBF;
    }

    .el-carousel__indicator.is-active button {
      background: $themeColor;
    }


    .el-carousel__indicator--horizontal {
      padding:12px 10px;
    }

    .el-carousel-item {
      width:100%; 
      height:100%;
    }

    .el-carousel__indicators--horizontal {
      width: 100%; background:#fff;
      display:flex;
      justify-content:center;
    }

    .card-wrap {
      width:100%; 
      height:auto;
      display:flex; 
      flex-wrap:wrap; 
      justify-content:center;
      padding:0 6px 30px 6px;
      column-gap: 0px;
      row-gap:10px;
      position:relative;
    }

    .card {
      display:flex; 
      flex-direction:column;
      align-items:center; 
      width:30%; 
      flex-grow:2;
      height:100px;
      cursor: pointer;
      margin-bottom:20px;
      border-bottom: 1px dashed #d5d5d5;
      padding-right:10px;

      .text-wrap {
        font-family: syht;
        display: flex; 
        flex-direction: column; 
        justify-content: space-around; 
        width: 100%;
        height: 100%;
        text-align: left;
        padding: 6px 10px;
        box-sizing:border-box;
        border: 1px solid #FFF;

        .title {
          font-size:14px;
          margin-bottom:10px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
        }

        .title.level1 {
          font-size: 20px;
          font-family:'syhtMedium';
          color:#333;
        }

        .title.level2 {
          font-size: 16px;
          font-family:'syht';
        }

        .title.level3 {
          font-size: 14px;
          font-family:'syhtNomral';
          color: #363636
        }

        .value {
          font-size: 24px;
          font-weight: normal;
          font-family: syht;
          display:flex;
          align-items:center;
          column-gap:20px;
        }

        .detail-wrap {
          display:flex; 
          font-size:12px; 
          height:20px; 
          -align-items:center; 
          flex-direction:column;
          color:#595959; 
          width:auto;

          p {
            display:flex; 
            align-items:center;
            margin-bottom:8px;
          }
        }
      }
    }

    .text-wrap.active {
      background: #FFFFFF;
      border: 1px solid #FF9900;
      box-shadow: 0 2px 4px 0 rgba(255,153,0,0.45);
      .title {
        color: #ff9900;
      }
    }

    .line1 {
      position:absolute; height:342px; border-left:1px solid #d0d0d0; top:142px; left: 33.3%;
    }

    .line2 {
      position:absolute; width:64%; border-bottom:1px solid #d0d0d0; top:234px; left: 35%;
    }
  }
  
</style>