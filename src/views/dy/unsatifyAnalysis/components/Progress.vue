
<template>
  <div style="width:100%; display:flex; align-items:center; ">
    <div style="flex-grow:2;width:50px; background: #f5f5f5; height:12px; position:relative">
      <div
      class="progress-inner" 
      :style="{width:data+'%'}" 
      ></div>
    </div>
    <div style="width:auto; text-align:left; margin-left:8px;">{{data}}%</div>
  </div>
</template>

<script>


export default {
  name: "Progress",
  props:['data']
};
</script>

<style lang="scss">
.progress-inner {
  position:absolute;
  left:0px;
  background: linear-gradient(270deg,#ffc266, #ff9900);
  height:100%;
}

</style>

