<template>
	<div class="service-part-02">
    <div style="width:100%; height:auto; display:flex;">
      <div style="width:200px;">
        <ul class="nav-lists">
          <li class="title-h3"><span class="active">满意度</span></li>
        </ul>

      </div>
      <div class="right-wrap">
        <div class="right-inner-wrap" v-for="(item,idx) in lists" :key="item.title" :style="{marginTop:idx!=0?'20px':'0px'}">
          <h3 class="title-h3" style="margin-top:6px;">{{item.title}}</h3>
          <div style="display:flex; column-gap:20px; row-gap:20px; flex-wrap:wrap;">
            <ServiceCard 
            v-for="(card,cidx) in item.data" 
            :key="card.label"
            :data='card'/>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import ServiceCard from './Card'
  export default {
    name:"ServicePart02",
    components:{
      ServiceCard
    },
    props:{
    },
    data(){
      return {
        lists:[
          {
            title:'手机客户（用后即评）',
            data:[
              {
                label:'资费套餐',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              },{
                label:'手机上网',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              },{
                label:'语音通话',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              },{
                label:'触点质量-热线',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              },{
                label:'触点质量-手厅',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              },{
                label:'触点质量-营业厅',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              }
            ]
          },{
            title:'家宽客户（用后即评）',
            data:[
              {
                label:'资费套餐',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              },{
                label:'手机上网',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              },{}
            ]
          },{
            title:'政企客户（用后即评）',
            data:[
              {
                label:'资费套餐',
                score:'80',
                rank:'20',
                rankScore:'2',
                ratio:'1.2',
                ratioScore:'1.02',
              },{},{}
            ]
          }
        ]
      }
    },
    watch: {
    },
    mounted(){

    },
    methods:{ 

    }

  };
</script>

<style lang="scss" scoped>
.service-part-02 {
  width:100%;
  height:auto;
  margin-top:20px;
  display:flex;
  flex-direction:column;

  .right-wrap {
    width:65%; 
    flex-grow:2;
    box-sizing:border-box;
    padding:20px; 
    padding-top:6px;
    padding-left:30px;
    position:relative;

    .right-inner-wrap {
      background: #fff;
      width:100%;
      padding:10px 20px 20px 20px;
    }
  }


  .nav-lists {
    width:100%;
    height:100%;
    padding:0px;
    margin:0px;
    list-style-type:none;

    li {
      width: 100%;
      height:40px;
      line-height:40px;

      span {
        display:inline-block;
        width: 120px;
        height:40px;
        line-height:40px;
        position:relative;
        text-align:center;
        cursor:pointer;
      }

      span:hover {
        color: #ff9900
      }

      span.active:hover {
        color:#262626
      }

      .active {
        &::after {
          content:'';
          position:absolute;
          width:100%;
          height:3px;
          background:#ff9900;
          bottom: 0px;
          left:0px;
        }
      }
    }
  }
}
</style>

