<template>
	<div class="map-rank-wrap" :style="{height:height}">
    <span class="title-h3" style="font-family:syhtLight; font-size:14px; padding-left:10px;">概览排名</span>
    <el-scrollbar wrap-style="overflow-x:hidden;" style="height:100%;">
      <p v-for="(item,idx) in lists" 
      class="item-wrap"
      @mouseover="hightLightArea(true,item)" 
      @mouseout="hightLightArea(false,item)" 
      :class="currentId==item.cityid && cityId!='999'?'active':''">
        <a class="square" 
        :style="{background:idx<3?colors[0]:idx>=rankLists.length-3?colors[2]:colors[1]}">
	      {{idx+1}}</a>
        <el-tooltip effect="dark" :content="item.cityname" placement="top-start">
        	<span>{{item.cityname}}</span>
        </el-tooltip>
      </p>
	  </el-scrollbar>
  </div>
</template>

<script>

  export default {
    name:"MapRank",
    components:{
    },
    data() {
    	return {
    		currentId:null
    	}
    },
    props:['rankLists','height','colors','cityId'],

    computed: {
    	lists() {
    		if(this.cityId=='999') {
    			return this.rankLists.splice(0,5)
    		}
    		return this.rankLists;
    	}
    },

    methods:{
    	hightLightArea(flag,item) {
    		this.currentId = item.cityid;
    		this.$emit('hightLightArea',flag,item.cityid)
    	}
    }

  };
</script>

<style lang="scss" scoped="">
	.map-rank-wrap { 
		min-width:120px; 
		width:120px;
		font-size:14px;
		height:100%;
		display:flex;
		flex-direction:column;

		.item-wrap {
			height:30px; 
			display:flex; 
			align-items:center;
			cursor:pointer;
			padding-left:10px;
			transition:all .2s linear;

			span {
				display:block;
				min-width:30px;
				flex-grow:2;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
			}
			.square {
				display:inline-block;
				width:16px; 
				min-width:16px;
				height:16px; 
				line-height:16px; 
				text-align:center; 
				font-size:12px; 
				color:#fff; 
				font-family:syhtLight; 
				margin-right:10px; 
				border-radius:2px;
			}
		}

		.item-wrap.active {
			background: rgba(0,0,0,0.04);
			color:#ff9900
		}
	}
</style>