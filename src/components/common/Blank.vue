<template>
	<div class="blank-page" :style="{background: background}">
       <img src="@/assets/images/empty.png" />
       <p>{{text?text:'抱歉，暂无数据！'}}</p>
    </div>
</template>
<script>
    export default {
        name:"Blank",
        props:{
            text:String,
            background:{
                default:'#fff',
                type:String
            }
        },
        data(){
            return {
               
            }
        }
    };
</script>
<style lang='scss'>
    .blank-page {
        width: 100%; 
        height: auto;
        display: flex;
        flex-direction: column;
        padding: 40px 0;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color:#262626;
        p {
            line-height: 40px;
        }
    }
</style>